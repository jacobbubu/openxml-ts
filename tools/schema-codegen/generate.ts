#!/usr/bin/env -S bun run
/**
 * Schema codegen CLI（Story-2.4 完成、Story-2.5 实际跑通批量）。
 *
 * 跑法：`pnpm gen:word [--input <path>] [--output <dir>]`
 *
 * 默认输入：`/Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json`
 * 默认输出：`src/word/generated/`
 *
 * 行为：
 * - 读 schema JSON；
 * - 对每个非空 ClassName 的 Type 调用 generateElement；
 * - 写到 `<outDir>/<file-name>.ts`，文件名由 classNameToFileName 计算；
 * - 输出确定性：两次跑产物字节一致。
 *
 * 暂不生成 `_registry.ts` 与 `index.ts` 汇总——Story-2.5 拓展时统一加入。
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type SchemaType, generateElement } from "./element-template.js";
import { classNameToFileName } from "./transforms/names.js";

interface SchemaFile {
  readonly TargetNamespace: string;
  readonly Types: readonly SchemaType[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
const DEFAULT_INPUT = resolve(
  REPO_ROOT,
  "../../github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json",
);
const DEFAULT_OUTPUT = resolve(REPO_ROOT, "src/word/generated");

function parseArgs(): { input: string; output: string } {
  const args = process.argv.slice(2);
  let input = DEFAULT_INPUT;
  let output = DEFAULT_OUTPUT;
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--input" && args[i + 1] !== undefined) {
      input = resolve(args[++i] as string);
    } else if (a === "--output" && args[i + 1] !== undefined) {
      output = resolve(args[++i] as string);
    }
  }
  return { input, output };
}

async function main(): Promise<void> {
  const { input, output } = parseArgs();
  process.stdout.write(`Reading schema: ${input}\n`);
  const json = JSON.parse(await readFile(input, "utf-8")) as SchemaFile;
  await mkdir(output, { recursive: true });

  let count = 0;
  for (const type of json.Types) {
    if (type.ClassName.length === 0) continue;
    const sourcePath = input.replace(`${REPO_ROOT}/`, "");
    const content = generateElement(type, {
      targetNamespace: json.TargetNamespace,
      sourcePath,
    });
    const file = join(output, `${classNameToFileName(type.ClassName)}.ts`);
    await writeFile(file, content);
    count += 1;
  }
  process.stdout.write(`Generated ${count} element classes into ${output}\n`);
}

main().catch((err) => {
  process.stderr.write(`codegen failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
