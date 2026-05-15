#!/usr/bin/env -S bun run
/**
 * Schema codegen CLI（Story-2.5 实际跑批 + 汇总 index.ts / _registry.ts）。
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
 * - 写出 `index.ts` 显式 re-export 所有生成类（ESM tree-shake 友好）；
 * - 写出 `_registry.ts` 暴露 `registerWordprocessingElements(registry)`，
 *   把全部非抽象元素注册进 ElementRegistry；
 * - 输出确定性：两次跑产物字节一致。
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type SchemaType, generateElement } from "./element-template.js";
import { classNameToFileName, parseSchemaName } from "./transforms/names.js";
import { prefixForUri } from "./transforms/namespaces.js";

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

interface GeneratedClass {
  readonly className: string;
  readonly fileName: string;
  readonly isAbstract: boolean;
  readonly localName: string;
  readonly namespaceUri: string;
}

async function main(): Promise<void> {
  const { input, output } = parseArgs();
  process.stdout.write(`Reading schema: ${input}\n`);
  const json = JSON.parse(await readFile(input, "utf-8")) as SchemaFile;
  await mkdir(output, { recursive: true });

  const sourcePath = input.replace(`${REPO_ROOT}/`, "");
  const generated: GeneratedClass[] = [];
  const seenFiles = new Set<string>();
  const skippedDuplicates: string[] = [];

  for (const type of json.Types) {
    if (type.ClassName.length === 0) continue;
    const fileName = classNameToFileName(type.ClassName);
    if (seenFiles.has(fileName)) {
      skippedDuplicates.push(type.ClassName);
      continue;
    }
    seenFiles.add(fileName);

    const content = generateElement(type, {
      targetNamespace: json.TargetNamespace,
      sourcePath,
    });
    await writeFile(join(output, `${fileName}.ts`), content);

    const parsed = parseSchemaName(type.Name);
    const ns =
      parsed.elementPrefix.length === 0
        ? ""
        : prefixForUri(json.TargetNamespace) === parsed.elementPrefix
          ? json.TargetNamespace
          : json.TargetNamespace;
    generated.push({
      className: type.ClassName,
      fileName,
      isAbstract: parsed.isAbstract === true || type.IsAbstract === true,
      localName: parsed.elementName,
      namespaceUri: ns,
    });
  }

  generated.sort((a, b) => a.className.localeCompare(b.className));

  await writeFile(join(output, "index.ts"), buildIndex(generated, sourcePath));
  await writeFile(join(output, "_registry.ts"), buildRegistry(generated, sourcePath));

  process.stdout.write(
    `Generated ${generated.length} element classes into ${output}\n${
      skippedDuplicates.length > 0
        ? `Skipped ${skippedDuplicates.length} duplicate ClassName(s): ${skippedDuplicates.slice(0, 5).join(", ")}${skippedDuplicates.length > 5 ? "..." : ""}\n`
        : ""
    }`,
  );
}

function buildIndex(classes: readonly GeneratedClass[], sourcePath: string): string {
  const lines = ["// THIS FILE IS GENERATED. DO NOT EDIT.", `// Source: ${sourcePath}`, ""];
  for (const c of classes) {
    lines.push(`export { ${c.className} } from "./${c.fileName}.js";`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildRegistry(classes: readonly GeneratedClass[], sourcePath: string): string {
  const concrete = classes.filter((c) => !c.isAbstract && c.localName.length > 0);
  const imports = concrete
    .map((c) => `import { ${c.className} } from "./${c.fileName}.js";`)
    .join("\n");
  const registrations = concrete
    .map(
      (c) =>
        `  registry.register(${quote(c.namespaceUri)}, ${quote(c.localName)}, ${c.className});`,
    )
    .join("\n");

  return [
    "// THIS FILE IS GENERATED. DO NOT EDIT.",
    `// Source: ${sourcePath}`,
    "",
    `import type { ElementRegistry } from "../../element/index.js";`,
    imports,
    "",
    "/**",
    " * 把 wordprocessingml 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。",
    " * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，",
    " * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。",
    " */",
    "export function registerWordprocessingElements(registry: ElementRegistry): void {",
    registrations,
    "}",
    "",
  ].join("\n");
}

function quote(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

main().catch((err) => {
  process.stderr.write(`codegen failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
