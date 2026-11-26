import { readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { isDeepStrictEqual } from "node:util";

const templatePath = /^templates\/product(?:\.[a-zA-Z0-9_-]+)?\.json$/u;
const appBlockType = /^shopify:\/\/apps\/[a-zA-Z0-9_-]+\/blocks\/[a-zA-Z0-9_-]+\/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/iu;
const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

function parseTemplate(source) {
  const commentsAndStrings = /"(?:[^"\\\r\n]|\\.)*"|\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/gu;
  const stringsAndTrailingCommas = /"(?:[^"\\\r\n]|\\.)*"|,(?=\s*[}\]])/gu;
  const withoutComments = source.replace(/^\uFEFF/u, "").replace(commentsAndStrings, (token) =>
    token.startsWith('"') ? token : " ",
  );
  const normalized = withoutComments.replace(stringsAndTrailingCommas, (token, index) => {
    if (token !== ",") return token;
    const preceding = withoutComments.slice(0, index).trimEnd().at(-1);
    return preceding && !"[{,:".includes(preceding) ? "" : token;
  });
  return JSON.parse(normalized);
}

function parsePlacements(value) {
  let placements;
  try {
    placements = JSON.parse(value);
  } catch {
    throw new Error("The placements input must be a JSON array.");
  }
  if (!Array.isArray(placements) || placements.length === 0) {
    throw new Error("Supply at least one required app-block placement.");
  }
  for (const [index, placement] of placements.entries()) {
    if (!object(placement) || typeof placement.template !== "string" || !templatePath.test(placement.template) ||
        typeof placement.blockType !== "string" || !appBlockType.test(placement.blockType) ||
        (Object.hasOwn(placement, "settings") && !object(placement.settings)) ||
        Object.keys(placement).some((key) => !["template", "blockType", "settings"].includes(key))) {
      throw new Error(`Placement ${index + 1} requires an exact product template path, app-block type, and optional settings object.`);
    }
  }
  const keys = placements.map(({ template, blockType }) => `${template} ${blockType}`);
  if (new Set(keys).size !== keys.length) {
    throw new Error("The same template and app-block type are listed more than once.");
  }
  return placements;
}

function verifyPath(chain) {
  for (const { id, node, order, rootSection } of chain) {
    if (node.disabled !== undefined && node.disabled !== false) {
      return `${rootSection ? "Section" : "Block"} ${JSON.stringify(id)} is disabled or has an invalid disabled flag.`;
    }
    if (!rootSection && node.static === true) {
      return `Static block ${JSON.stringify(id)} requires a native preview to verify its Liquid placement.`;
    }
    if (!Array.isArray(order) || order.filter((item) => item === id).length !== 1) {
      return `${rootSection ? "Section" : "Block"} ${JSON.stringify(id)} must occur once in ${rootSection ? "order" : "block_order"}.`;
    }
  }
  return null;
}

function checkTemplate(template, expectation) {
  if (!object(template?.sections)) {
    return "The template has no sections object.";
  }
  const matches = [];
  function visit(nodes, order, ancestorChain) {
    for (const [id, node] of Object.entries(nodes)) {
      if (!object(node)) continue;
      const chain = [...ancestorChain, { id, node, order, rootSection: ancestorChain.length === 0 }];
      if (ancestorChain.length && node.type === expectation.blockType) matches.push(chain);
      if (object(node.blocks)) visit(node.blocks, node.block_order, chain);
    }
  }
  visit(template.sections, template.order, []);
  if (matches.length === 0) return "The exact required app-block type is missing.";
  if (matches.length > 1) return "The exact required app-block type occurs more than once.";
  const pathProblem = verifyPath(matches[0]);
  if (pathProblem) return pathProblem;
  const { node } = matches[0].at(-1);
  if (Object.hasOwn(expectation, "settings") && !isDeepStrictEqual(node.settings, expectation.settings)) {
    return "The app-block settings differ from the exact expected settings.";
  }
  return null;
}

function contains(parent, child) {
  const location = relative(parent, child);
  return !isAbsolute(location) && location !== ".." && !location.startsWith(`..${sep}`);
}

async function readTemplate(root, template) {
  try {
    const filename = await realpath(resolve(root, template));
    if (!contains(root, filename)) return { problem: "The template resolves outside the theme directory." };
    return { template: parseTemplate(await readFile(filename, "utf8")) };
  } catch (error) {
    return { problem: error instanceof SyntaxError ? "The template is not valid Shopify JSONC." : "The template could not be read." };
  }
}

async function run({ workspace, root, expected }) {
  const placements = parsePlacements(expected);
  const checkout = await realpath(workspace);
  let theme;
  try {
    theme = await realpath(resolve(checkout, root));
  } catch {
    throw new Error("The checked-out theme directory could not be opened.");
  }
  if (isAbsolute(root) || !contains(checkout, theme)) {
    throw new Error("The theme directory must be relative to and inside the workspace.");
  }

  const templates = new Map();
  let failures = 0;
  for (const [index, placement] of placements.entries()) {
    if (!templates.has(placement.template)) {
      templates.set(placement.template, await readTemplate(theme, placement.template));
    }
    const result = templates.get(placement.template);
    const problem = result.problem ?? checkTemplate(result.template, placement);
    if (problem) {
      error(`Placement ${index + 1} (${placement.template}): ${problem}`);
      failures += 1;
    }
  }
  if (!failures) console.log(`Verified ${placements.length} Shopify theme app-block placement(s).`);
  process.exitCode = failures ? 1 : 0;
}

function error(message) {
  const escaped = message.replaceAll("%", "%25").replaceAll("\r", "%0D").replaceAll("\n", "%0A");
  console.error(`::error::${escaped}`);
}

try {
  await run({
    workspace: process.env.GITHUB_WORKSPACE ?? process.cwd(),
    root: process.env["INPUT_THEME-ROOT"]?.trim() || ".",
    expected: process.env.INPUT_PLACEMENTS,
  });
} catch (failure) {
  error(failure.message);
  process.exitCode = 1;
}
