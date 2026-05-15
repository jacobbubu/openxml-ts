#!/usr/bin/env -S node --experimental-strip-types
/**
 * Golden 生成器 —— 把 `test/fixtures/golden/*.{docx,xlsx,pptx}` 用 openxml-ts 读出来，
 * 把 OPC 结构（Parts / Content-Types / Relationships）落到对应 `<name>.golden.json`。
 *
 * 用法：
 *   pnpm tsx tools/golden-generator/generate.ts
 *
 * 何时跑：fixture 新增/替换、或公共 API 行为变更影响快照时。
 *
 * 未来扩展：本工具旨在被 .NET cli 实现替代，以提供跨实现的「真正黄金」
 * 参照。见同目录 README.md。
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openAsync } from "../../src/index.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(HERE, "../../test/fixtures/golden");

interface RelSnapshot {
  id: string;
  type: string;
  targetMode: string;
  target: string;
}

interface PartSnapshot {
  uri: string;
  contentType: string;
  contentByteLength: number;
  relationships: RelSnapshot[];
}

interface ContentTypeSnapshot {
  defaults: Array<{ extension: string; contentType: string }>;
  overrides: Array<{ partName: string; contentType: string }>;
}

interface GoldenSnapshot {
  source: string;
  generatedBy: string;
  parts: PartSnapshot[];
  packageRelationships: RelSnapshot[];
  contentTypes: ContentTypeSnapshot;
}

async function readBytes(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value !== undefined) {
      chunks.push(value);
      total += value.byteLength;
    }
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

async function snapshot(filePath: string): Promise<GoldenSnapshot> {
  const bytes = new Uint8Array(await readFile(filePath));
  const pkg = await openAsync(bytes);
  const parts: PartSnapshot[] = [];
  for (const p of pkg.parts()) {
    const content = await readBytes(p.openReadStream());
    parts.push({
      uri: p.uri,
      contentType: p.contentType,
      contentByteLength: content.byteLength,
      relationships: [...p.relationships].map((r) => ({
        id: r.id,
        type: r.type,
        targetMode: r.targetMode,
        target: r.target,
      })),
    });
  }
  const contentTypes: ContentTypeSnapshot = {
    defaults: [...pkg.contentTypes.defaults()].map((d) => ({
      extension: d.extension,
      contentType: d.contentType,
    })),
    overrides: [...pkg.contentTypes.overrides()].map((o) => ({
      partName: o.partName,
      contentType: o.contentType,
    })),
  };
  return {
    source: filePath.split("/").slice(-1)[0] ?? filePath,
    generatedBy: "openxml-ts tools/golden-generator",
    parts,
    packageRelationships: [...pkg.relationships].map((r) => ({
      id: r.id,
      type: r.type,
      targetMode: r.targetMode,
      target: r.target,
    })),
    contentTypes,
  };
}

async function main(): Promise<void> {
  const entries = await readdir(FIXTURES_DIR);
  for (const entry of entries) {
    const ext = extname(entry).toLowerCase();
    if (ext !== ".docx" && ext !== ".xlsx" && ext !== ".pptx") continue;
    const filePath = join(FIXTURES_DIR, entry);
    process.stdout.write(`Generating golden for ${entry} ... `);
    const snap = await snapshot(filePath);
    const out = `${filePath}.golden.json`;
    await writeFile(out, `${JSON.stringify(snap, null, 2)}\n`);
    process.stdout.write("ok\n");
  }
}

main().catch((err) => {
  process.stderr.write(`golden-generator failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
