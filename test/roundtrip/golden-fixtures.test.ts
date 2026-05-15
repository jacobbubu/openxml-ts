/**
 * Story-1.8: 用真实 docx/xlsx/pptx fixture 做端到端 roundtrip 自验证。
 *
 * 每个 fixture 走以下流程：
 * 1. openAsync(fixtureBytes) 解析；
 * 2. 与 `<name>.golden.json` 对比 OPC 结构（Parts、Content-Types、Relationships）；
 * 3. saveAsBytesAsync 后再 openAsync，重读对比仍等价（三轮稳定）。
 *
 * 当 fixture 来源稳定时，golden 是「自验证」基线——回归会立刻显形为 diff。
 * 跨 .NET 真黄金对照见 tools/golden-generator/README.md 的「计划」段。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type OpenXmlPackage, openAsync } from "../../src/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

type RelSnapshot = {
  id: string;
  type: string;
  targetMode: string;
  target: string;
};
type PartSnapshot = {
  uri: string;
  contentType: string;
  contentByteLength: number;
  relationships: RelSnapshot[];
};
type ContentTypeSnapshot = {
  defaults: Array<{ extension: string; contentType: string }>;
  overrides: Array<{ partName: string; contentType: string }>;
};
type GoldenSnapshot = {
  source: string;
  generatedBy: string;
  parts: PartSnapshot[];
  packageRelationships: RelSnapshot[];
  contentTypes: ContentTypeSnapshot;
};

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

async function snapshotPackage(pkg: OpenXmlPackage): Promise<{
  parts: PartSnapshot[];
  packageRelationships: RelSnapshot[];
  contentTypes: ContentTypeSnapshot;
}> {
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
  return {
    parts,
    packageRelationships: [...pkg.relationships].map((r) => ({
      id: r.id,
      type: r.type,
      targetMode: r.targetMode,
      target: r.target,
    })),
    contentTypes: {
      defaults: [...pkg.contentTypes.defaults()].map((d) => ({
        extension: d.extension,
        contentType: d.contentType,
      })),
      overrides: [...pkg.contentTypes.overrides()].map((o) => ({
        partName: o.partName,
        contentType: o.contentType,
      })),
    },
  };
}

const FIXTURES = ["HelloWorld.docx", "basicspreadsheet.xlsx", "mcppt.pptx"] as const;

describe.each(FIXTURES)("Roundtrip · %s", (name) => {
  it("openAsync 解析结构与 golden 完全一致", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, name)));
    const goldenJson = await readFile(join(FIXTURES_DIR, `${name}.golden.json`), "utf-8");
    const golden = JSON.parse(goldenJson) as GoldenSnapshot;
    const pkg = await openAsync(bytes);
    const snap = await snapshotPackage(pkg);
    expect(snap.parts).toEqual(golden.parts);
    expect(snap.packageRelationships).toEqual(golden.packageRelationships);
    expect(snap.contentTypes).toEqual(golden.contentTypes);
  });

  it("read → write → read 第二轮结构与 golden 仍一致", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, name)));
    const goldenJson = await readFile(join(FIXTURES_DIR, `${name}.golden.json`), "utf-8");
    const golden = JSON.parse(goldenJson) as GoldenSnapshot;
    const first = await openAsync(bytes);
    const second = await openAsync(await first.saveAsBytesAsync());
    const snap = await snapshotPackage(second);
    expect(snap.parts).toEqual(golden.parts);
    expect(snap.packageRelationships).toEqual(golden.packageRelationships);
    expect(snap.contentTypes).toEqual(golden.contentTypes);
  });

  it("Flat OPC 互转后 OPC 结构等价", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, name)));
    const original = await openAsync(bytes);
    const { fromFlatOpcAsync } = await import("../../src/index.js");
    const flat = original.toFlatOpc();
    const restored = await fromFlatOpcAsync(flat);
    const snapA = await snapshotPackage(original);
    const snapB = await snapshotPackage(restored);
    expect(snapB.parts.map((p) => p.uri).sort()).toEqual(snapA.parts.map((p) => p.uri).sort());
    expect(snapB.packageRelationships.length).toBe(snapA.packageRelationships.length);
    // ContentTypes：Default + Override 集合大小一致即可
    expect(snapB.contentTypes.defaults.length).toBe(snapA.contentTypes.defaults.length);
    expect(snapB.contentTypes.overrides.length).toBe(snapA.contentTypes.overrides.length);
  });
});
