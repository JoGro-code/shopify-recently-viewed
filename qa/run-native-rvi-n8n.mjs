import assert from "node:assert/strict";
import { execFile, spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as pause } from "node:timers/promises";
import { promisify } from "node:util";

const version = "2.49.5";
const expectedSha = "252b3dabbd4c87c93a2eccf1b7a09d750ab9b1360e14bc112b6a500d0f93fc10";
const [workflowPath] = process.argv.slice(2);
assert.ok(workflowPath, "Pass the exact published n8n workflow JSON path");
assert.equal(process.env.RVI_N8N_QA_GO, "1", "Run this only in a coordinated isolated container");
assert.deepEqual(await readdir("/sys/class/net"), ["lo"], "Expected network isolation with only loopback");
const exact = await readFile(workflowPath);
assert.equal(createHash("sha256").update(exact).digest("hex"), expectedSha);
const workflow = JSON.parse(exact);
assert.equal(workflow.active, false);
assert.ok(workflow.nodes.every((node) => !node.credentials));
const manual = workflow.nodes.filter((node) => node.type === "n8n-nodes-base.manualTrigger");
const http = workflow.nodes.filter((node) => node.type === "n8n-nodes-base.httpRequest");
assert.equal(manual.length, 1);
assert.equal(http.length, 1);
assert.equal(http[0].parameters.url, "={{ $json.endpoint }}");
assert.equal(workflow.settings.saveManualExecutions, false);

const cli = promisify(execFile);
const origin = "http://127.0.0.1:5678";
const workspace = await mkdtemp(join(tmpdir(), "rvi-n8n-editor-"));
const env = {
  PATH: process.env.PATH,
  HOME: workspace,
  N8N_USER_FOLDER: workspace,
  N8N_LISTEN_ADDRESS: "127.0.0.1",
  N8N_HOST: "127.0.0.1",
  N8N_PORT: "5678",
  N8N_PROTOCOL: "http",
  N8N_SECURE_COOKIE: "false",
  N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS: "true",
  N8N_DIAGNOSTICS_ENABLED: "false",
  N8N_VERSION_NOTIFICATIONS_ENABLED: "false",
  N8N_TEMPLATES_ENABLED: "false",
  N8N_RUNNERS_MODE: "internal",
  N8N_RUNNERS_MAX_CONCURRENCY: "1",
  N8N_LOG_LEVEL: "error",
  N8N_SSRF_PROTECTION_ENABLED: "true",
  N8N_SSRF_ALLOWED_IP_RANGES: "127.0.0.1/32",
};
const status = (step) => console.log(JSON.stringify({ status: "step", step }));
const deadline = Date.now() + 435_000;
const bounded = (milliseconds) => AbortSignal.timeout(Math.max(1, Math.min(milliseconds, deadline - Date.now())));
let phase = "version", server, child, exit, cookie, failureStatus, processError;

function editorFetch(path, options = {}) {
  return fetch(origin + path, { ...options, redirect: "error", signal: bounded(10_000) });
}
async function editor(path, body, allowed = [200]) {
  const response = await editorFetch("/rest" + path, {
    method: body === undefined ? "GET" : "POST",
    headers: { ...(cookie ? { Cookie: cookie } : {}), ...(body === undefined ? {} : { "Content-Type": "application/json" }) },
    body: typeof body === "string" ? body : body === undefined ? undefined : JSON.stringify(body),
  });
  failureStatus = response.status;
  assert.ok(allowed.includes(response.status), "Unexpected n8n editor status");
  const json = await response.json();
  return { response, data: json.data };
}
async function until(test, interval, max, limitMessage) {
  const end = Math.min(Date.now() + max, deadline);
  do {
    assert.equal(processError, undefined, "n8n process stopped before a required editor event");
    const result = await test();
    if (result !== undefined) return result;
    await pause(interval);
  } while (Date.now() < end);
  assert.fail(limitMessage);
}
function documentedGraph(value) {
  return value.nodes.map(({ id, name, type, typeVersion, position, parameters, onError }) =>
    ({ id, name, type, typeVersion, position, parameters, onError }));
}
function assertStored(actual, expected) {
  assert.equal(actual?.name, expected.name);
  assert.notEqual(actual.active, true);
  assert.ok(!actual.activeVersionId);
  assert.deepEqual(documentedGraph(actual), documentedGraph(expected));
  assert.deepEqual(actual.connections, expected.connections);
  for (const [key, value] of Object.entries(expected.settings)) assert.deepEqual(actual.settings[key], value);
}

const country = "DE", language = "DE", currency = "EUR", sizeOption = "Größe", size = "42";
const shop = "rvi-exact-size-fixture.myshopify.com";
const source = { handle: "ridge-original", id: "90071992547409971", productId: "gid://shopify/Product/90071992547409981", price: "79.95" };
const replacement = { handle: "ridge-other", id: "90071992547409972", productId: "gid://shopify/Product/90071992547409982", price: "84.50" };
const href = ({ handle, id }) => `https://${shop}/de-de/products/${handle}?variant=${id}`;
const gid = (id) => "gid://shopify/ProductVariant/" + id;
const variables = { source: gid(source.id), replacement: gid(replacement.id), sourceHandle: source.handle,
  replacementHandle: replacement.handle, country, language };
const item = ({ id, productId, price }, availableForSale) => ({
  id: gid(id), availableForSale, currentlyNotInStock: false, requiresComponents: false,
  price: { amount: price, currencyCode: currency }, selectedOptions: [{ name: sizeOption, value: size }],
  product: { id: productId, requiresSellingPlan: false },
});
const mockResponse = (available) => ({
  data: {
    shop: { primaryDomain: { host: shop } }, localization: { country: { isoCode: country, currency: { isoCode: currency } } },
    source: item(source, false), replacement: item(replacement, available),
    sourceLink: { id: source.productId }, replacementLink: { id: replacement.productId },
  },
  extensions: { context: { country, language } },
});
let mockCase = "eligible";
const calls = [], mockFailures = [];
async function listenToFixture() {
  server = createServer(async (request, response) => {
    try {
      assert.equal(request.method, "POST");
      assert.equal(request.url, "/api/2026-10/graphql.json");
      assert.match(request.headers["content-type"] ?? "", /^application\/json\b/iu);
      for (const header of ["authorization", "cookie", "x-shopify-access-token", "x-shopify-storefront-access-token"]) {
        assert.equal(request.headers[header], undefined);
      }
      let body = "";
      request.setEncoding("utf8");
      for await (const chunk of request) {
        body += chunk;
        assert.ok(body.length < 16 * 1024);
      }
      const payload = JSON.parse(body);
      assert.deepEqual(Object.keys(payload).sort(), ["query", "variables"]);
      assert.match(payload.query, /^query RviN8nExactSize\b/u);
      assert.match(payload.query, /@inContext\(country: \$country, language: \$language\)/u);
      assert.doesNotMatch(payload.query, /\bmutation\b|customer|checkout|cart|inventoryQuantity/iu);
      assert.deepEqual(payload.variables, variables);
      calls.push(mockCase);
      response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(mockResponse(mockCase === "eligible")));
    } catch (error) {
      mockFailures.push(error.name);
      response.writeHead(500, { "Content-Type": "application/json" }).end("{}");
    }
  });
  server.requestTimeout = 10_000;
  await new Promise((resolve, reject) => server.listen(0, "127.0.0.1", resolve).once("error", reject));
}
async function manualRun(id, expected, parseFlatted) {
  const { data: result } = await editor(`/workflows/${id}/run`, { triggerToStartFrom: { name: manual[0].name } });
  const executionId = String(result?.executionId ?? "");
  assert.match(executionId, /^[0-9]+$/u, "Expected a persisted manual execution ID");
  const complete = await until(async () => {
    const { data } = await editor(`/executions/${executionId}`, undefined, [200, 404]);
    if (data && !["new", "running", "unknown"].includes(data.status)) return data;
  }, 300, 70_000, "Manual execution did not complete");
  assert.equal(complete.status, "success", "Native manual execution did not succeed");
  const resultData = parseFlatted(complete.data).resultData;
  const final = "Verify exact size and availability";
  assert.equal(resultData.lastNodeExecuted, final);
  assert.equal(resultData.error, undefined);
  assert.deepEqual(resultData.runData[final][0].data.main[0].map((entry) => entry.json), [expected]);
}
function stopProcess(signal) {
  if (!child?.pid) return;
  try { process.kill(-child.pid, signal); }
  catch (error) { if (error.code !== "ESRCH") throw error; }
}

try {
  const versionOutput = await cli("n8n", ["--version"], { env, signal: bounded(45_000), maxBuffer: 128 * 1024 });
  assert.deepEqual(versionOutput.stdout.trim().split(/\r?\n/u).filter((line) => /^\d+\.\d+\.\d+$/u.test(line)), [version]);
  status(phase);
  phase = "readiness";
  child = spawn("n8n", ["start"], { env, detached: true, stdio: "ignore" });
  exit = new Promise((resolve) => {
    child.once("error", (error) => { processError = error.code || "spawn"; resolve(); });
    child.once("exit", (code, signal) => { processError = code ?? signal ?? "exit"; resolve(); });
  });
  await until(async () => {
    const anonymously = await editorFetch("/healthz/readiness").catch(() => null);
    if (anonymously?.ok) return true;
  }, 400, 125_000, "n8n readiness did not become healthy");
  status(phase);

  phase = "owner";
  const owner = await editor("/owner/setup", { email: "editor-fixture@example.invalid", firstName: "Offline", lastName: "Fixture",
    password: "Aa9-" + randomBytes(18).toString("hex") }, [200, 201]);
  cookie = owner.response.headers.getSetCookie().map((header) => header.split(";", 1)[0]).join("; ");
  assert.ok(cookie.startsWith("n8n-auth="), "Disposable owner did not get a native session cookie");
  status(phase);

  phase = "exact-editor-import";
  const { data: imported } = await editor("/workflows", exact.toString("utf8"), [200, 201]);
  assert.match(imported?.id ?? "", /^[\w-]{1,64}$/u);
  assertStored((await editor(`/workflows/${imported.id}`)).data, workflow);
  status(phase);

  phase = "mock-create";
  await listenToFixture();
  const fixture = structuredClone(workflow);
  fixture.nodes.find((node) => node.type === "n8n-nodes-base.set").parameters.jsonOutput = JSON.stringify({
    shop, country, language, sizeOption, sourceUrl: href(source), replacementUrl: href(replacement),
  });
  fixture.nodes.find((node) => node.type === "n8n-nodes-base.httpRequest").parameters.url = `http://127.0.0.1:${server.address().port}/api/2026-10/graphql.json`;
  // Preserve the published workflow untouched. Only the fixture needs a database receipt to read via the editor.
  Object.assign(fixture.settings, { saveManualExecutions: true, saveDataSuccessExecution: "all", saveDataErrorExecution: "all" });
  const { data: created } = await editor("/workflows", fixture, [200, 201]);
  assert.match(created?.id ?? "", /^[\w-]{1,64}$/u);
  assert.notEqual(created.id, imported.id);
  assertStored((await editor(`/workflows/${created.id}`)).data, fixture);
  const parseFlatted = createRequire("/usr/local/lib/node_modules/n8n/package.json")("flatted").parse;
  status(phase);

  phase = "eligible";
  const output = ({ id, price, handle }) => ({ id, price, href: href({ id, handle }) });
  await manualRun(created.id, { status: "eligible", country, currency, sizeOption, size,
    source: output(source), replacement: output(replacement) }, parseFlatted);
  status(phase);
  phase = "unavailable";
  mockCase = "replacement-unavailable";
  await manualRun(created.id, { status: "replacement-unavailable" }, parseFlatted);
  status(phase);
  assert.deepEqual(calls, ["eligible", "replacement-unavailable"]);
  assert.deepEqual(mockFailures, []);
  console.log(JSON.stringify({ status: "pass", n8n: version, workflowSha256: expectedSha,
    exactUpload: true, exactGraphReadback: true, manualExecutions: 2, outcomes: calls,
    fixtureChanges: ["Edit Inputs values", "HTTP Request loopback URL", "test-only save settings"],
    providerRequests: 0, providerMutations: 0, observedAtUtc: new Date().toISOString() }));
} catch (error) {
  console.error(JSON.stringify({ status: "fail", phase, reason: error.name, httpStatus: failureStatus ?? null,
    childExit: processError ?? null, mockRequests: calls.length, mockFailures: mockFailures.length }));
  process.exitCode = 1;
} finally {
  server?.closeAllConnections();
  if (server?.listening) await new Promise((resolve) => server.close(resolve));
  stopProcess("SIGTERM");
  if (exit) await Promise.race([exit, pause(4_000)]);
  stopProcess("SIGKILL");
  await rm(workspace, { recursive: true, force: true });
}
