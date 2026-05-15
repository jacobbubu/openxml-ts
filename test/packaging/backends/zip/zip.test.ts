import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } from "@zip.js/zip.js";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ZipOpenXmlPackage } from "../../../../src/backends/zip/zip-package.js";
import { packageToZipBytes } from "../../../../src/backends/zip/zip-writer.js";
import {
  OpenXmlPackage,
  type PartUri,
  createInMemory,
  openAsync,
  tryPartUri,
} from "../../../../src/index.js";

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

/** 构造一份「最小可用」OPC 包：包含 doc Part + 包级关系。 */
async function buildSampleZip(): Promise<Uint8Array> {
  const mem = createInMemory();
  const doc = mem.createPart(uri("/word/document.xml"), "application/xml");
  await doc.writeAsync('<?xml version="1.0"?><document/>');
  mem.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    target: "word/document.xml",
    targetMode: "internal",
  });
  doc.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
    target: "styles.xml",
    targetMode: "internal",
  });
  // 内部强转：MemoryOpenXmlPackage 是具体类型，我们的 zip writer 直接吃它
  return packageToZipBytes(mem as never);
}

describe("openAsync / ZIP backend — happy path", () => {
  it("从 Uint8Array 打开一份 SDK 自造 ZIP", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    expect(pkg).toBeInstanceOf(OpenXmlPackage);
    expect(pkg).toBeInstanceOf(ZipOpenXmlPackage);

    const part = pkg.getPart(uri("/word/document.xml"));
    expect(part.contentType).toBe("application/xml");
    const content = new TextDecoder().decode(await readAll(part.openReadStream()));
    expect(content).toContain("<document/>");

    expect(pkg.relationships.count).toBe(1);
    expect(part.relationships.count).toBe(1);
  });

  it("Blob 输入", async () => {
    const bytes = await buildSampleZip();
    const blob = new Blob([bytes]);
    const pkg = await openAsync(blob);
    expect(pkg.hasPart(uri("/word/document.xml"))).toBe(true);
  });

  it("ReadableStream 输入", async () => {
    const bytes = await buildSampleZip();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    });
    const pkg = await openAsync(stream);
    expect(pkg.hasPart(uri("/word/document.xml"))).toBe(true);
  });
});

describe("openAsync — round-trip 字节级稳定", () => {
  it("open(bytes) → saveAsBytesAsync → open 第二次结构等价", async () => {
    const bytes = await buildSampleZip();
    const pkg1 = await openAsync(bytes);
    const bytes2 = await pkg1.saveAsBytesAsync();
    const pkg2 = await openAsync(bytes2);

    expect([...pkg2.parts()].map((p) => p.uri)).toEqual([...pkg1.parts()].map((p) => p.uri));
    expect(pkg2.relationships.count).toBe(pkg1.relationships.count);
    const part1 = pkg1.getPart(uri("/word/document.xml"));
    const part2 = pkg2.getPart(uri("/word/document.xml"));
    expect(part1.contentType).toBe(part2.contentType);
    expect(part1.relationships.count).toBe(part2.relationships.count);
  });

  it("第二轮 saveAsBytesAsync 与第一轮结构等价（ZIP 含时间戳，仅校验 entry 列表 & 内容）", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    const a = await pkg.saveAsBytesAsync();
    const b = await pkg.saveAsBytesAsync();
    const reopenedA = await openAsync(a);
    const reopenedB = await openAsync(b);
    expect([...reopenedA.parts()].map((p) => p.uri)).toEqual(
      [...reopenedB.parts()].map((p) => p.uri),
    );
    expect(reopenedA.relationships.count).toBe(reopenedB.relationships.count);
  });
});

describe("openAsync — 文件路径 I/O", () => {
  let tmp: string;
  beforeEach(async () => {
    tmp = await mkdtemp(join(tmpdir(), "openxml-ts-"));
  });
  afterEach(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  it("string 路径输入 + saveAsync 默认回写到原路径", async () => {
    const bytes = await buildSampleZip();
    const path = join(tmp, "sample.docx");
    await (await import("node:fs/promises")).writeFile(path, bytes);

    const pkg = await openAsync(path);
    expect(pkg).toBeInstanceOf(ZipOpenXmlPackage);
    await pkg.saveAsync();

    const reopened = await openAsync(path);
    expect(reopened.hasPart(uri("/word/document.xml"))).toBe(true);
  });

  it("saveAsAsync 写到新路径，并把 saveAsync 默认目标切到新路径", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    const newPath = join(tmp, "renamed.docx");
    await pkg.saveAsAsync(newPath);

    const reread = await readFile(newPath);
    expect(reread.byteLength).toBeGreaterThan(0);

    // 再调 saveAsync 应该往 newPath 写
    await pkg.saveAsync();
    const reread2 = await readFile(newPath);
    expect(reread2.byteLength).toBeGreaterThan(0);
  });

  it("openAsync(bytes) 后调 saveAsync 抛 UNSUPPORTED_OPERATION（无原路径可回写）", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    await expect(pkg.saveAsync()).rejects.toMatchObject({ code: "UNSUPPORTED_OPERATION" });
  });

  it("saveAsAsync 空路径抛 BACKEND_ERROR", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    await expect(pkg.saveAsAsync("")).rejects.toMatchObject({ code: "BACKEND_ERROR" });
  });
});

describe("openAsync — 负向 / 安全", () => {
  it("空字节流抛 INVALID_ZIP", async () => {
    await expect(openAsync(new Uint8Array(0))).rejects.toMatchObject({ code: "INVALID_ZIP" });
  });

  it("非 ZIP 字节流抛 INVALID_ZIP", async () => {
    await expect(openAsync(new Uint8Array([0x00, 0x01, 0x02]))).rejects.toMatchObject({
      code: "INVALID_ZIP",
    });
  });

  it("缺失 [Content_Types].xml 抛 MISSING_CONTENT_TYPES", async () => {
    // 用 @zip.js 写一个只含一个无关 entry 的 zip
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add("hello.txt", new Uint8ArrayReader(new TextEncoder().encode("hi")));
    const zipBytes = await w.close();
    await expect(openAsync(zipBytes)).rejects.toMatchObject({
      code: "MISSING_CONTENT_TYPES",
    });
  });

  it("路径穿越（..）entry 抛 SECURITY_VIOLATION", async () => {
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add("../etc/passwd", new Uint8ArrayReader(new TextEncoder().encode("evil")));
    const zipBytes = await w.close();
    await expect(openAsync(zipBytes)).rejects.toMatchObject({
      code: "SECURITY_VIOLATION",
    });
  });

  it("单 Part 超出 maxEntryBytes 抛 SECURITY_VIOLATION", async () => {
    // 构造一个内容为 200 字节的 entry，但 limit 设为 100
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add(
      "[Content_Types].xml",
      new Uint8ArrayReader(
        new TextEncoder().encode(
          '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>',
        ),
      ),
    );
    await w.add("big.bin", new Uint8ArrayReader(new Uint8Array(200).fill(0x41)));
    const zipBytes = await w.close();
    await expect(openAsync(zipBytes, { limits: { maxEntryBytes: 100 } })).rejects.toMatchObject({
      code: "SECURITY_VIOLATION",
    });
  });

  it("ZIP 总和超 maxTotalBytes 抛 SECURITY_VIOLATION", async () => {
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add(
      "[Content_Types].xml",
      new Uint8ArrayReader(
        new TextEncoder().encode(
          '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>',
        ),
      ),
    );
    for (let i = 0; i < 5; i += 1) {
      await w.add(`file${i}.bin`, new Uint8ArrayReader(new Uint8Array(50).fill(0x41)));
    }
    const zipBytes = await w.close();
    await expect(openAsync(zipBytes, { limits: { maxTotalBytes: 100 } })).rejects.toMatchObject({
      code: "SECURITY_VIOLATION",
    });
  });

  it("Part 内容类型在 manifest 中查不到 → CONTENT_TYPE_MISSING", async () => {
    // 写一个 ZIP：合法 manifest 只声明 .rels，但有一个 word/document.xml 的 entry
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add(
      "[Content_Types].xml",
      new Uint8ArrayReader(
        new TextEncoder().encode(
          '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/></Types>',
        ),
      ),
    );
    await w.add("word/document.xml", new Uint8ArrayReader(new TextEncoder().encode("<doc/>")));
    const zipBytes = await w.close();
    await expect(openAsync(zipBytes)).rejects.toMatchObject({
      code: "CONTENT_TYPE_MISSING",
    });
  });
});

describe("openAsync — 部分关系与 Part-rels 整合", () => {
  it("Part 级 .rels 被关联到 owner Part", async () => {
    const bytes = await buildSampleZip();
    const pkg = await openAsync(bytes);
    const doc = pkg.getPart(uri("/word/document.xml"));
    expect(doc.relationships.count).toBe(1);
    const styleRel = [...doc.relationships][0];
    expect(styleRel?.target).toBe("styles.xml");
  });

  it("孤立 .rels（owner 不存在）会被静默丢弃，不抛错", async () => {
    const out = new Uint8ArrayWriter();
    const w = new ZipWriter(out);
    await w.add(
      "[Content_Types].xml",
      new Uint8ArrayReader(
        new TextEncoder().encode(
          '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>',
        ),
      ),
    );
    await w.add(
      "word/_rels/orphan.xml.rels",
      new Uint8ArrayReader(
        new TextEncoder().encode(
          '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>',
        ),
      ),
    );
    const zipBytes = await w.close();
    const pkg = await openAsync(zipBytes);
    expect([...pkg.parts()]).toEqual([]);
  });
});
