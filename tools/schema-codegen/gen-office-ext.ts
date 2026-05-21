#!/usr/bin/env -S bun run
/**
 * Epic-76: 批量生成全部剩余扩展命名空间 → src/office-ext/<dir>/generated/
 *
 * 跑法：`pnpm gen:office-ext`
 *
 * 行为：
 * - 读 ../../github/Open-XML-SDK/data/schemas/*.json
 * - 跳过 0 ClassName 的 schema + 已在现有 30 个子系统里的命名空间
 * - 对每个剩余 schema 调用 generate.ts --input <schema> --output src/office-ext/<dir>/generated --element-depth 3
 * - 最后打印汇总
 */

import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
// The schemas live at a fixed absolute path on this machine.
// We try several candidate paths to handle both main worktree and git worktrees.
function findSchemasDir(): string {
  const candidates = [
    resolve(REPO_ROOT, "../../github/Open-XML-SDK/data/schemas"),
    "/Users/rongshen/github/Open-XML-SDK/data/schemas",
  ];
  for (const c of candidates) {
    try {
      readdirSync(c);
      return c;
    } catch {
      // try next
    }
  }
  throw new Error(`Cannot find Open-XML-SDK schemas dir. Tried:\n${candidates.join("\n")}`);
}
const SCHEMAS_DIR = findSchemasDir();
const OUTPUT_BASE = resolve(REPO_ROOT, "src/office-ext");
const GENERATE_TS = resolve(HERE, "generate.ts");

// Already-done namespace URIs (from existing 30 subsystem dirs)
const ALREADY_DONE = new Set<string>([
  "http://schemas.microsoft.com/office/drawing/2010/main",
  "http://schemas.microsoft.com/office/drawing/2014/chartex",
  "http://schemas.microsoft.com/office/powerpoint/2010/main",
  "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  "http://schemas.microsoft.com/office/word/2010/wordml",
  "http://schemas.openxmlformats.org/drawingml/2006/chart",
  "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
  "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
  "http://schemas.openxmlformats.org/drawingml/2006/diagram",
  "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
  "http://schemas.openxmlformats.org/drawingml/2006/main",
  "http://schemas.openxmlformats.org/drawingml/2006/picture",
  "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
  "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
  "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  "http://schemas.openxmlformats.org/officeDocument/2006/math",
  "http://schemas.openxmlformats.org/presentationml/2006/main",
  "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  "urn:schemas-microsoft-com:vml",
  "urn:schemas-microsoft-com:office:office",
  "urn:schemas-microsoft-com:office:excel",
  "urn:schemas-microsoft-com:office:word",
  "urn:schemas-microsoft-com:office:powerpoint",
]);

interface SchemaFile {
  readonly TargetNamespace: string;
  readonly Types?: readonly { readonly ClassName: string }[];
}

/** Convert schema filename (without .json) to kebab-case dir name. */
function schemaFileToDir(basename: string): string {
  // Replace underscores with hyphens, collapse multiple hyphens
  let dir = basename.replace(/_/g, "-");
  while (dir.includes("--")) {
    dir = dir.replace(/--/g, "-");
  }
  return dir.replace(/^-+/, "");
}

const schemaFiles = readdirSync(SCHEMAS_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

const worklist: Array<{ schemaPath: string; dir: string; ns: string; classCount: number }> = [];
const skippedZero: string[] = [];
const skippedDone: string[] = [];

for (const fname of schemaFiles) {
  const schemaPath = join(SCHEMAS_DIR, fname);
  let data: SchemaFile;
  try {
    data = JSON.parse(readFileSync(schemaPath, "utf-8")) as SchemaFile;
  } catch {
    process.stderr.write(`Warning: could not parse ${fname}\n`);
    continue;
  }

  const ns = data.TargetNamespace ?? "";
  const classCount = (data.Types ?? []).filter((t) => t.ClassName.length > 0).length;

  if (classCount === 0) {
    skippedZero.push(fname);
    continue;
  }
  if (ALREADY_DONE.has(ns)) {
    skippedDone.push(fname);
    continue;
  }

  const dir = schemaFileToDir(fname.replace(/\.json$/, ""));
  worklist.push({ schemaPath, dir, ns, classCount });
}

process.stdout.write(
  `Epic-76 gen-office-ext: ${worklist.length} schemas to generate (skipped ${skippedZero.length} zero-class, ${skippedDone.length} already-done)\n\n`,
);

let successCount = 0;
let failCount = 0;
const failures: string[] = [];

for (const { schemaPath, dir, ns, classCount } of worklist) {
  const outputDir = join(OUTPUT_BASE, dir, "generated");
  process.stdout.write(
    `  [${String(successCount + failCount + 1).padStart(3)}/${worklist.length}] ${dir} (${classCount} classes) ...\n`,
  );

  const result = spawnSync(
    "bun",
    ["run", GENERATE_TS, "--input", schemaPath, "--output", outputDir, "--element-depth", "3"],
    {
      cwd: REPO_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf-8",
    },
  );

  if (result.status !== 0) {
    failCount += 1;
    failures.push(`${dir}: ${result.stderr ?? result.stdout ?? "(no output)"}`);
    process.stderr.write(`    FAILED: ${result.stderr ?? result.stdout ?? "(no output)"}\n`);
  } else {
    successCount += 1;
  }
}

process.stdout.write(`\nDone: ${successCount} succeeded, ${failCount} failed.\n`);
if (failures.length > 0) {
  process.stderr.write("\nFailures:\n");
  for (const f of failures) {
    process.stderr.write(`  ${f}\n`);
  }
  process.exit(1);
}
