/**
 * Story-1.6: 在 ZIP backend 上验证 Part CRUD + Web Streams 持久化往返。
 *
 * 这一层不直接重复 Story-1.2 的 Memory backend 行为测试，只关注：
 * - mutate 后 saveAsBytesAsync → reopen，状态等价；
 * - openReadStream / writeAsync 4 类输入对 ZIP backend 同样可用；
 * - deletePart 在持久化层级联清理 relationships + ContentTypes Override。
 */

import { describe, expect, it } from "vitest";
import type { ZipOpenXmlPackage } from "../../../../src/backends/zip/zip-package.js";
import { packageToZipBytes } from "../../../../src/backends/zip/zip-writer.js";
import { type PartUri, createInMemory, openAsync, tryPartUri } from "../../../../src/index.js";

function uri(s: string): PartUri {
  const u = tryPartUri(s);
  if (u === undefined) throw new Error(`bad fixture URI ${s}`);
  return u;
}

async function readAll(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
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

async function readText(part: { openReadStream(): ReadableStream<Uint8Array> }): Promise<string> {
  return new TextDecoder().decode(await readAll(part.openReadStream()));
}

async function freshZip(): Promise<Uint8Array> {
  const mem = createInMemory();
  const doc = mem.createPart(uri("/word/document.xml"), "application/xml");
  await doc.writeAsync('<?xml version="1.0"?><document>初始</document>');
  mem.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    target: "word/document.xml",
    targetMode: "internal",
  });
  return packageToZipBytes(mem as never);
}

describe("Story-1.6 · ZIP backend CRUD 持久化", () => {
  it("open → addPart → saveAsBytes → reopen 看到新 Part", async () => {
    const pkg = await openAsync(await freshZip());
    const styles = pkg.createPart(uri("/word/styles.xml"), "application/xml");
    await styles.writeAsync('<?xml version="1.0"?><styles/>');

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(reopened.hasPart(uri("/word/styles.xml"))).toBe(true);
    const stylesPart = reopened.getPart(uri("/word/styles.xml"));
    expect(stylesPart.contentType).toBe("application/xml");
    expect(await readText(stylesPart)).toContain("<styles/>");
  });

  it("open → deletePart → saveAsBytes → reopen，Part + 关系 + Override 都不见", async () => {
    const pkg = await openAsync(await freshZip());
    // 给 doc Part 加一条 part-level rel；删 doc 后该 rel 应消失
    const doc = pkg.getPart(uri("/word/document.xml"));
    doc.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
      target: "styles.xml",
      targetMode: "internal",
    });

    expect(pkg.contentTypes.hasOverride(uri("/word/document.xml"))).toBe(true);
    pkg.deletePart(uri("/word/document.xml"));
    expect(pkg.hasPart(uri("/word/document.xml"))).toBe(false);
    expect(pkg.contentTypes.hasOverride(uri("/word/document.xml"))).toBe(false);
    // 包级关系指向 document.xml 的应被级联清掉（target 字符串匹配）
    expect([...pkg.relationships]).toEqual([]);

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(reopened.hasPart(uri("/word/document.xml"))).toBe(false);
    expect(reopened.relationships.count).toBe(0);
  });

  it("open → 修改 Part 内容 → save → reopen 内容已更新", async () => {
    const pkg = await openAsync(await freshZip());
    const doc = pkg.getPart(uri("/word/document.xml"));
    await doc.writeAsync('<?xml version="1.0"?><document>已改</document>');

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(await readText(reopened.getPart(uri("/word/document.xml")))).toContain("已改");
  });

  it("writeAsync 接受 ReadableStream 输入并持久化", async () => {
    const pkg = await openAsync(await freshZip());
    const doc = pkg.getPart(uri("/word/document.xml"));
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("<stream/>"));
        controller.close();
      },
    });
    await doc.writeAsync(stream);

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(await readText(reopened.getPart(uri("/word/document.xml")))).toBe("<stream/>");
  });

  it("writeAsync 接受 Blob 输入并持久化", async () => {
    const pkg = await openAsync(await freshZip());
    const doc = pkg.getPart(uri("/word/document.xml"));
    await doc.writeAsync(new Blob([new TextEncoder().encode("<blob/>")]));
    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(await readText(reopened.getPart(uri("/word/document.xml")))).toBe("<blob/>");
  });

  it("writeAsync 接受 string（UTF-8）并持久化", async () => {
    const pkg = await openAsync(await freshZip());
    const doc = pkg.getPart(uri("/word/document.xml"));
    await doc.writeAsync("<utf8>中文</utf8>");
    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect(await readText(reopened.getPart(uri("/word/document.xml")))).toBe("<utf8>中文</utf8>");
  });

  it("非法 URI 仍抛 INVALID_PART_URI（ZIP backend 一致行为）", async () => {
    const pkg = await openAsync(await freshZip());
    expect(() => pkg.createPart("/foo/../bar.xml" as PartUri, "application/xml")).toThrowError(
      expect.objectContaining({ code: "INVALID_PART_URI" }),
    );
  });

  it("createPart 重复 URI 抛 PART_ALREADY_EXISTS（持久化形态下）", async () => {
    const pkg = await openAsync(await freshZip());
    expect(() => pkg.createPart(uri("/word/document.xml"), "application/xml")).toThrowError(
      expect.objectContaining({ code: "PART_ALREADY_EXISTS" }),
    );
  });

  it("Part 顺序在 save → reopen 后保持稳定", async () => {
    const pkg = await openAsync(await freshZip());
    pkg.createPart(uri("/word/styles.xml"), "application/xml");
    pkg.createPart(uri("/word/settings.xml"), "application/xml");

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect([...reopened.parts()].map((p) => p.uri)).toEqual([
      "/word/document.xml",
      "/word/styles.xml",
      "/word/settings.xml",
    ]);
  });

  it("deletePart 后 Part order 重新整理", async () => {
    const pkg = await openAsync(await freshZip());
    pkg.createPart(uri("/word/a.xml"), "application/xml");
    pkg.createPart(uri("/word/b.xml"), "application/xml");
    pkg.deletePart(uri("/word/a.xml"));

    const reopened = await openAsync(await pkg.saveAsBytesAsync());
    expect([...reopened.parts()].map((p) => p.uri)).toEqual(["/word/document.xml", "/word/b.xml"]);
  });

  it("read-only ZIP 包禁止写", async () => {
    const pkg = await openAsync(await freshZip(), { accessMode: "read" });
    expect(() => pkg.createPart(uri("/word/styles.xml"), "application/xml")).toThrowError(
      expect.objectContaining({ code: "UNSUPPORTED_OPERATION" }),
    );
    await expect((pkg as ZipOpenXmlPackage).saveAsBytesAsync()).rejects.toMatchObject({
      code: "UNSUPPORTED_OPERATION",
    });
  });
});
