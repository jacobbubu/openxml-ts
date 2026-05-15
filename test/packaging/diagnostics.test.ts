import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { type PartUri, createInMemory, openAsync, tryPartUri } from "../../src/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

function uri(s: string): PartUri {
  const u = tryPartUri(s);
  if (u === undefined) throw new Error(`bad fixture URI ${s}`);
  return u;
}

describe("package.diagnostics", () => {
  it("空包：partCount=0、relationshipCount=0、warnings=[]", () => {
    const pkg = createInMemory();
    const d = pkg.diagnostics;
    expect(d.partCount).toBe(0);
    expect(d.relationshipCount).toBe(0);
    expect(d.warnings).toEqual([]);
  });

  it("Part 与关系数量累计正确", () => {
    const pkg = createInMemory();
    const doc = pkg.createPart(uri("/word/document.xml"), "application/xml");
    pkg.createPart(uri("/word/styles.xml"), "application/xml");
    pkg.relationships.create({
      type: "http://example.com/main",
      target: "word/document.xml",
      targetMode: "internal",
    });
    doc.relationships.create({
      type: "http://example.com/styles",
      target: "styles.xml",
      targetMode: "internal",
    });
    const d = pkg.diagnostics;
    expect(d.partCount).toBe(2);
    expect(d.relationshipCount).toBe(2);
  });

  it("真实 docx 的 diagnostics 与 golden 数量一致", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
    const pkg = await openAsync(bytes);
    const d = pkg.diagnostics;
    expect(d.partCount).toBeGreaterThan(0);
    expect(d.relationshipCount).toBeGreaterThan(0);
    expect(d.warnings).toEqual([]); // HelloWorld.docx 是健康文档
  });

  it("ZIP 内有孤立 .rels 时 warnings 收到记录", async () => {
    const { Uint8ArrayReader, Uint8ArrayWriter, ZipWriter } = await import("@zip.js/zip.js");
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
    const d = pkg.diagnostics;
    expect(d.warnings.length).toBe(1);
    expect(d.warnings[0]).toContain("Orphan");
    expect(d.warnings[0]).toContain("orphan.xml.rels");
  });
});
