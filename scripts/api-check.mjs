#!/usr/bin/env node
/**
 * api-extractor 多 entry 调度器。
 *
 * 跑法：
 *   pnpm api:check    # 校验 dist/<entry>/index.d.ts 与 api/<entry>.api.md 一致；漂移则非零退出
 *   pnpm api:update   # 重新生成 api/<entry>.api.md（开发改 API 后用）
 *
 * 调用前确保 \`pnpm build\` 跑过——本脚本读 dist/ 下的 .d.ts。
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const API_DIR = resolve(ROOT, "api");

const ENTRIES = [
  { name: "root", config: "extractor-root.json", report: "openxml-ts.api.md" },
  { name: "word", config: "extractor-word.json", report: "openxml-ts-word.api.md" },
  { name: "excel", config: "extractor-excel.json", report: "openxml-ts-excel.api.md" },
  { name: "ppt", config: "extractor-ppt.json", report: "openxml-ts-ppt.api.md" },
  { name: "drawing", config: "extractor-drawing.json", report: "openxml-ts-drawing.api.md" },
  { name: "chart", config: "extractor-chart.json", report: "openxml-ts-chart.api.md" },
  { name: "picture", config: "extractor-picture.json", report: "openxml-ts-picture.api.md" },
  {
    name: "spreadsheet-drawing",
    config: "extractor-spreadsheet-drawing.json",
    report: "openxml-ts-spreadsheet-drawing.api.md",
  },
  {
    name: "wordprocessing-drawing",
    config: "extractor-wordprocessing-drawing.json",
    report: "openxml-ts-wordprocessing-drawing.api.md",
  },
  {
    name: "chart-drawing",
    config: "extractor-chart-drawing.json",
    report: "openxml-ts-chart-drawing.api.md",
  },
  { name: "linq", config: "extractor-linq.json", report: "openxml-ts-linq.api.md" },
  { name: "math", config: "extractor-math.json", report: "openxml-ts-math.api.md" },
  { name: "diagram", config: "extractor-diagram.json", report: "openxml-ts-diagram.api.md" },
  {
    name: "extended-properties",
    config: "extractor-extended-properties.json",
    report: "openxml-ts-extended-properties.api.md",
  },
  {
    name: "custom-properties",
    config: "extractor-custom-properties.json",
    report: "openxml-ts-custom-properties.api.md",
  },
  {
    name: "doc-props-vtypes",
    config: "extractor-doc-props-vtypes.json",
    report: "openxml-ts-doc-props-vtypes.api.md",
  },
  {
    name: "bibliography",
    config: "extractor-bibliography.json",
    report: "openxml-ts-bibliography.api.md",
  },
  {
    name: "custom-xml",
    config: "extractor-custom-xml.json",
    report: "openxml-ts-custom-xml.api.md",
  },
  {
    name: "schema-library",
    config: "extractor-schema-library.json",
    report: "openxml-ts-schema-library.api.md",
  },
  {
    name: "locked-canvas",
    config: "extractor-locked-canvas.json",
    report: "openxml-ts-locked-canvas.api.md",
  },
  {
    name: "drawing-compatibility",
    config: "extractor-drawing-compatibility.json",
    report: "openxml-ts-drawing-compatibility.api.md",
  },
  { name: "vml", config: "extractor-vml.json", report: "openxml-ts-vml.api.md" },
  {
    name: "vml-office",
    config: "extractor-vml-office.json",
    report: "openxml-ts-vml-office.api.md",
  },
  {
    name: "vml-excel",
    config: "extractor-vml-excel.json",
    report: "openxml-ts-vml-excel.api.md",
  },
  {
    name: "vml-word",
    config: "extractor-vml-word.json",
    report: "openxml-ts-vml-word.api.md",
  },
  {
    name: "vml-powerpoint",
    config: "extractor-vml-powerpoint.json",
    report: "openxml-ts-vml-powerpoint.api.md",
  },
];

const isUpdate = process.argv.includes("--update");

if (!existsSync(resolve(ROOT, "dist/index.d.ts"))) {
  process.stderr.write(
    "dist/index.d.ts not found — run `pnpm build` before `pnpm api:check`/`api:update`.\n",
  );
  process.exit(2);
}

let allOk = true;
const reports = [];
for (const entry of ENTRIES) {
  const configPath = resolve(API_DIR, entry.config);
  if (!existsSync(configPath)) {
    process.stderr.write(`config missing: ${configPath}\n`);
    process.exit(3);
  }
  const args = ["run", `--config=${configPath}`];
  if (isUpdate) args.push("--local");
  const result = spawnSync(resolve(ROOT, "node_modules/.bin/api-extractor"), args, {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf-8",
  });
  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  // 把每个 entry 的输出合并展示
  const drift = result.status !== 0;
  if (drift) allOk = false;
  reports.push({ entry: entry.name, status: result.status ?? -1, stdout, stderr });
}

for (const r of reports) {
  const label = `[${r.entry}]`;
  if (r.status === 0) {
    process.stdout.write(`${label} OK\n`);
  } else {
    process.stdout.write(`${label} FAILED (exit ${r.status})\n`);
    if (r.stderr) process.stderr.write(`${r.stderr}\n`);
    if (r.stdout) process.stdout.write(`${r.stdout}\n`);
  }
}

if (!allOk) {
  if (isUpdate) {
    process.stderr.write(
      "\napi:update finished with errors — please review the diagnostics above.\n",
    );
  } else {
    process.stderr.write(
      [
        "",
        "API report drift detected. Run `pnpm api:update` to refresh api/*.api.md files,",
        "then commit them with your PR. Any changes to public API surface should be visible",
        "in the diff and labeled in the PR description (see docs/api-stability.md).",
        "",
      ].join("\n"),
    );
  }
  process.exit(1);
}

process.stdout.write(`\nAll ${ENTRIES.length} entries OK.\n`);
