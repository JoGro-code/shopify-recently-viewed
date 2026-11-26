import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const checker = fileURLToPath(new URL("./check.mjs", import.meta.url));
const blockType = "shopify://apps/example-app/blocks/replacement/12345678-1234-1234-1234-123456789abc";
const privateValue = 'Example "quoted" configuration https://example.com/a//b,} /* value */';
const expectations = [
  { template: "templates/product.json", blockType, settings: { note: privateValue, market: "GB" } },
  { template: "templates/product.alternate.json", blockType },
];

function document() {
  return {
    sections: {
      main: {
        type: "product-information",
        blocks: {
          details: {
            type: "group",
            blocks: { app: { type: blockType, settings: { market: "GB", note: privateValue } } },
            block_order: ["app"],
          },
        },
        block_order: ["details"],
      },
    },
    order: ["main"],
  };
}

function run(workspace, placements = expectations, root = ".") {
  return spawnSync(process.execPath, [checker], {
    env: { ...process.env, GITHUB_WORKSPACE: workspace, "INPUT_THEME-ROOT": root, INPUT_PLACEMENTS: JSON.stringify(placements) },
    encoding: "utf8",
  });
}

async function setup(t, mutate = () => {}, transform = (source) => source) {
  const workspace = await mkdtemp(join(tmpdir(), "shopify-theme-preflight-"));
  t.after(() => rm(workspace, { recursive: true, force: true }));
  await mkdir(join(workspace, "theme", "templates"), { recursive: true });
  const original = document();
  mutate(original);
  const first = JSON.stringify(original).replace('{"sections":', '{"sections": /* theme schema */');
  await writeFile(join(workspace, "theme", expectations[0].template), transform(first));
  await writeFile(
    join(workspace, "theme", expectations[1].template),
    `\uFEFF/*\n * This file is auto-generated.\n */\n${JSON.stringify(document()).replace(/}$/, ",}")} // Theme editor\n`,
  );
  return workspace;
}

test("verifies two exact app-block placements with nested JSONC, quotes, comments, and a trailing comma", async (t) => {
  const result = run(await setup(t), expectations, "theme");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  assert.match(result.stdout, /Verified 2 Shopify theme app-block placement/);
  assert.ok(!result.stdout.includes(privateValue));
});

const regressions = [
  ["missing exact block", (x) => { x.sections.main.blocks.details.blocks.app.type += "-different"; }, /exact required app-block type is missing/],
  ["disabled ancestor", (x) => { x.sections.main.blocks.details.disabled = true; }, /Block "details" is disabled/],
  ["disabled section", (x) => { x.sections.main.disabled = true; }, /Section "main" is disabled/],
  ["disabled exact block", (x) => { x.sections.main.blocks.details.blocks.app.disabled = true; }, /Block "app" is disabled/],
  ["unscheduled section", (x) => { x.order = []; }, /Section "main" must occur once in order/],
  ["unscheduled ancestor", (x) => { x.sections.main.block_order = []; }, /Block "details" must occur once in block_order/],
  ["unscheduled exact block", (x) => { x.sections.main.blocks.details.block_order = []; }, /Block "app" must occur once in block_order/],
  ["duplicate block order", (x) => { x.sections.main.blocks.details.block_order.push("app"); }, /Block "app" must occur once in block_order/],
  ["duplicate matching type", (x) => {
    const parent = x.sections.main.blocks.details;
    parent.blocks.duplicate = structuredClone(parent.blocks.app);
    parent.block_order.push("duplicate");
  }, /exact required app-block type occurs more than once/],
  ["wrong settings", (x) => { x.sections.main.blocks.details.blocks.app.settings.market = "DE"; }, /settings differ from the exact expected settings/],
  ["static parent", (x) => {
    x.sections.main.blocks.details.static = true;
    x.sections.main.block_order = [];
  }, /Static block "details" requires a native preview/],
];

for (const [name, mutation, message] of regressions) {
  test(`rejects ${name}`, async (t) => {
    const result = run(await setup(t, mutation), expectations, "theme");
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Placement 1 \(templates\/product\.json\):/);
    assert.match(result.stderr, message);
    assert.ok(!result.stderr.includes(privateValue));
  });
}

test("rejects malformed JSONC without echoing its content", async (t) => {
  const workspace = await setup(t, undefined, (source) => source.replace(/^\{/u, "{,"));
  const result = run(workspace, expectations, "theme");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /not valid Shopify JSONC/);
  assert.ok(!result.stderr.includes(privateValue));
});

test("fails when the expected checkout template is unreadable", async (t) => {
  const workspace = await setup(t);
  await rm(join(workspace, "theme", expectations[0].template));
  const result = run(workspace, expectations, "theme");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /template could not be read/);
});

test("rejects duplicate input pairs and paths outside product templates", async (t) => {
  const workspace = await setup(t);
  const first = expectations[0];
  assert.match(run(workspace, [first, first], "theme").stderr, /listed more than once/);
  assert.match(run(workspace, [{ ...first, template: "../templates/product.json" }], "theme").stderr, /requires an exact product template path/);
});

test("rejects an absolute or symlinked checkout template path outside the theme directory", async (t) => {
  const workspace = await setup(t);
  const outsideTheme = join(workspace, "outside.json");
  await writeFile(outsideTheme, JSON.stringify(document()));
  const original = join(workspace, "theme", expectations[0].template);
  await rm(original);
  await symlink(outsideTheme, original, "file");
  assert.match(run(workspace, expectations, "theme").stderr, /resolves outside the theme directory/);
  assert.match(run(workspace, expectations, join(workspace, "theme")).stderr, /must be relative to and inside the workspace/);
});

test("uses the checkout working directory when invoked without GitHub context", async (t) => {
  const workspace = await setup(t);
  const env = { ...process.env, INPUT_PLACEMENTS: JSON.stringify(expectations) };
  delete env.GITHUB_WORKSPACE;
  delete env["INPUT_THEME-ROOT"];
  const output = execFileSync(process.execPath, [checker], { cwd: join(workspace, "theme"), env, encoding: "utf8" });
  assert.match(output, /Verified 2 Shopify theme app-block placement/);
});
