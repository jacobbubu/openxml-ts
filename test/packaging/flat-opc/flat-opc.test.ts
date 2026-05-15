import { describe, expect, it } from "vitest";
import { type PartUri, createInMemory, tryPartUri } from "../../../src/index.js";
import { CONTENT_TYPES_NS } from "../../../src/packaging/content-types/index.js";
import {
  FLAT_OPC_NS,
  base64ToBytes,
  bytesToBase64,
  fromFlatOpcAsync,
  isXmlContentType,
  parseFlatOpc,
} from "../../../src/packaging/flat-opc/index.js";
import { RELATIONSHIPS_NS } from "../../../src/packaging/relationships/index.js";

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

describe("isXmlContentType", () => {
  it("识别 application/xml、text/xml、+xml 后缀", () => {
    expect(isXmlContentType("application/xml")).toBe(true);
    expect(isXmlContentType("text/xml")).toBe(true);
    expect(
      isXmlContentType(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
      ),
    ).toBe(true);
  });

  it("二进制 ContentType 返回 false", () => {
    expect(isXmlContentType("image/png")).toBe(false);
    expect(isXmlContentType("application/octet-stream")).toBe(false);
  });
});

describe("base64 helpers", () => {
  it("round-trip 任意字节", () => {
    const bytes = new Uint8Array([0, 1, 2, 250, 251, 255]);
    const b64 = bytesToBase64(bytes);
    expect(base64ToBytes(b64)).toEqual(bytes);
  });

  it("解码时容忍换行 / 空白", () => {
    const bytes = new Uint8Array([1, 2, 3]);
    const b64 = bytesToBase64(bytes);
    const padded = `${b64.slice(0, 2)}\n  ${b64.slice(2)}`;
    expect(base64ToBytes(padded)).toEqual(bytes);
  });
});

describe("packageToFlatOpc — 序列化", () => {
  it("最小可用包：含 ContentTypes + 1 个 XML Part", () => {
    const pkg = createInMemory();
    const doc = pkg.createPart(uri("/word/document.xml"), "application/xml");
    void doc.writeAsync('<?xml version="1.0"?><document/>');
    const flat = pkg.toFlatOpc();

    expect(flat).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
    expect(flat).toContain(`xmlns:pkg="${FLAT_OPC_NS}"`);
    expect(flat).toContain('pkg:name="/[Content_Types].xml"');
    expect(flat).toContain('pkg:name="/word/document.xml"');
    expect(flat).toContain("<pkg:xmlData>");
    // Part 内嵌 XML 不再带自家声明（被剥掉）
    const docPartStart = flat.indexOf('pkg:name="/word/document.xml"');
    const docXmlData = flat.slice(docPartStart);
    expect(docXmlData).not.toContain('<?xml version="1.0"?>');
  });

  it("二进制 Part 走 base64 + <pkg:binaryData>", async () => {
    const pkg = createInMemory();
    const img = pkg.createPart(uri("/word/media/img.png"), "image/png");
    await img.writeAsync(new Uint8Array([0x89, 0x50, 0x4e, 0x47]));
    const flat = pkg.toFlatOpc();
    expect(flat).toContain('pkg:contentType="image/png"');
    expect(flat).toContain("<pkg:binaryData>");
    expect(flat).toContain("iVBO"); // base64 of \x89PNG
  });

  it("progId 选项产出 <?mso-application?> PI", () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    const flat = pkg.toFlatOpc({ progId: "Word.Document" });
    expect(flat).toContain('<?mso-application progid="Word.Document"?>');
  });

  it('包级关系输出为 <pkg:part pkg:name="/_rels/.rels">', () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    pkg.relationships.create({
      type: "http://example.com/main",
      target: "word/document.xml",
      targetMode: "internal",
    });
    const flat = pkg.toFlatOpc();
    expect(flat).toContain('pkg:name="/_rels/.rels"');
    expect(flat).toContain(`xmlns="${RELATIONSHIPS_NS}"`);
  });

  it("Part 级关系输出为对应的 /<path>/_rels/<base>.rels part", () => {
    const pkg = createInMemory();
    const doc = pkg.createPart(uri("/word/document.xml"), "application/xml");
    doc.relationships.create({
      type: "http://example.com/styles",
      target: "styles.xml",
      targetMode: "internal",
    });
    const flat = pkg.toFlatOpc();
    expect(flat).toContain('pkg:name="/word/_rels/document.xml.rels"');
  });

  it("ContentTypes 嵌入时不重复 XML 声明", () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    const flat = pkg.toFlatOpc();
    const ctIdx = flat.indexOf('pkg:name="/[Content_Types].xml"');
    const tail = flat.slice(ctIdx);
    const innerStart = tail.indexOf("<pkg:xmlData>");
    const innerEnd = tail.indexOf("</pkg:xmlData>");
    const inner = tail.slice(innerStart + "<pkg:xmlData>".length, innerEnd);
    expect(inner).not.toContain("<?xml");
    expect(inner).toContain(`xmlns="${CONTENT_TYPES_NS}"`);
  });
});

describe("parseFlatOpc — 解析", () => {
  it("解析最小 Flat OPC 包", () => {
    const pkg = createInMemory();
    pkg.createPart(uri("/word/document.xml"), "application/xml");
    const flat = pkg.toFlatOpc();
    const parsed = parseFlatOpc(flat);
    const names = parsed.entries.map((e) => e.name);
    expect(names).toContain("/[Content_Types].xml");
    expect(names).toContain("/word/document.xml");
  });

  it("缺 <pkg:package> 抛 BACKEND_ERROR", () => {
    expect(() => parseFlatOpc('<?xml version="1.0"?><other/>')).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("xmlns:pkg 错误抛 BACKEND_ERROR", () => {
    expect(() =>
      parseFlatOpc('<?xml version="1.0"?><pkg:package xmlns:pkg="http://wrong/ns"></pkg:package>'),
    ).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("空 <pkg:package> 抛 BACKEND_ERROR（无 part）", () => {
    expect(() =>
      parseFlatOpc(`<?xml version="1.0"?><pkg:package xmlns:pkg="${FLAT_OPC_NS}"></pkg:package>`),
    ).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("DTD 攻击拒绝（SECURITY_VIOLATION）", () => {
    const xml = `<!DOCTYPE x SYSTEM "evil.dtd"><pkg:package xmlns:pkg="${FLAT_OPC_NS}"></pkg:package>`;
    expect(() => parseFlatOpc(xml)).toThrowError(
      expect.objectContaining({ code: "SECURITY_VIOLATION" }),
    );
  });

  it("<pkg:part> 缺 pkg:name 抛 BACKEND_ERROR", () => {
    const xml = `<?xml version="1.0"?><pkg:package xmlns:pkg="${FLAT_OPC_NS}"><pkg:part pkg:contentType="application/xml"><pkg:xmlData><x/></pkg:xmlData></pkg:part></pkg:package>`;
    expect(() => parseFlatOpc(xml)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("<pkg:part> 缺 pkg:contentType 抛 BACKEND_ERROR", () => {
    const xml = `<?xml version="1.0"?><pkg:package xmlns:pkg="${FLAT_OPC_NS}"><pkg:part pkg:name="/x.xml"><pkg:xmlData><x/></pkg:xmlData></pkg:part></pkg:package>`;
    expect(() => parseFlatOpc(xml)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("Part name 不是合法 OPC URI 抛 INVALID_PART_URI", () => {
    const xml = `<?xml version="1.0"?><pkg:package xmlns:pkg="${FLAT_OPC_NS}"><pkg:part pkg:name="word/document.xml" pkg:contentType="application/xml"><pkg:xmlData><x/></pkg:xmlData></pkg:part></pkg:package>`;
    expect(() => parseFlatOpc(xml)).toThrowError(
      expect.objectContaining({ code: "INVALID_PART_URI" }),
    );
  });
});

describe("fromFlatOpcAsync — 反序列化", () => {
  it("最小包 round-trip 等价", async () => {
    const original = createInMemory();
    const doc = original.createPart(uri("/word/document.xml"), "application/xml");
    await doc.writeAsync("<document>hi</document>");
    original.relationships.create({
      type: "http://example.com/main",
      target: "word/document.xml",
      targetMode: "internal",
    });
    doc.relationships.create({
      type: "http://example.com/styles",
      target: "styles.xml",
      targetMode: "internal",
    });

    const flat = original.toFlatOpc();
    const restored = await fromFlatOpcAsync(flat);

    expect([...restored.parts()].map((p) => p.uri)).toEqual(["/word/document.xml"]);
    expect(restored.relationships.count).toBe(1);
    const restoredDoc = restored.getPart(uri("/word/document.xml"));
    expect(restoredDoc.relationships.count).toBe(1);
    const content = new TextDecoder().decode(await readAll(restoredDoc.openReadStream()));
    expect(content).toContain("hi");
  });

  it("二进制 Part round-trip 字节级保真", async () => {
    const original = createInMemory();
    const img = original.createPart(uri("/word/media/img.png"), "image/png");
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    await img.writeAsync(bytes);

    const flat = original.toFlatOpc();
    const restored = await fromFlatOpcAsync(flat);
    const restoredImg = restored.getPart(uri("/word/media/img.png"));
    expect(await readAll(restoredImg.openReadStream())).toEqual(bytes);
    expect(restoredImg.contentType).toBe("image/png");
  });

  it("XML Part round-trip 字节级保真（保留 UTF-8 内容）", async () => {
    const original = createInMemory();
    const doc = original.createPart(uri("/word/document.xml"), "application/xml");
    await doc.writeAsync('<document xmlns="urn:test">中文 &amp; ✓</document>');

    const flat = original.toFlatOpc();
    const restored = await fromFlatOpcAsync(flat);
    const restoredDoc = restored.getPart(uri("/word/document.xml"));
    const inner = new TextDecoder().decode(await readAll(restoredDoc.openReadStream()));
    expect(inner).toContain("中文");
    expect(inner).toContain("&amp;"); // 实体在 inner XML 中保持原样
  });

  it("两次 toFlatOpc → fromFlatOpcAsync → toFlatOpc 字节级等价", async () => {
    const original = createInMemory();
    original.createPart(uri("/word/document.xml"), "application/xml");
    original.createPart(uri("/word/styles.xml"), "application/xml");

    const flat1 = original.toFlatOpc();
    const round1 = await fromFlatOpcAsync(flat1);
    const flat2 = round1.toFlatOpc();
    // 第二次得到的 Flat OPC 应与第一次完全一致
    expect(flat2).toBe(flat1);
  });

  it("自闭合 <pkg:part .../> 被视为空 Part", async () => {
    const xml = `<?xml version="1.0"?><pkg:package xmlns:pkg="${FLAT_OPC_NS}"><pkg:part pkg:name="/[Content_Types].xml" pkg:contentType="application/vnd.openxmlformats-package.content-types+xml"><pkg:xmlData><Types xmlns="${CONTENT_TYPES_NS}"><Override PartName="/empty.bin" ContentType="application/octet-stream"/></Types></pkg:xmlData></pkg:part><pkg:part pkg:name="/empty.bin" pkg:contentType="application/octet-stream"/></pkg:package>`;
    const restored = await fromFlatOpcAsync(xml);
    const part = restored.getPart(uri("/empty.bin"));
    expect(await readAll(part.openReadStream())).toEqual(new Uint8Array(0));
  });
});

describe("Flat OPC ↔ ZIP 互通", () => {
  it("createInMemory → toFlatOpc → fromFlatOpcAsync 与原包内容等价", async () => {
    const a = createInMemory();
    const docA = a.createPart(uri("/word/document.xml"), "application/xml");
    await docA.writeAsync("<document>hi</document>");
    const imgA = a.createPart(uri("/word/media/img.bin"), "application/octet-stream");
    await imgA.writeAsync(new Uint8Array([0x01, 0x02, 0x03, 0x04]));
    a.relationships.create({
      type: "http://example.com/main",
      target: "word/document.xml",
      targetMode: "internal",
    });

    const b = await fromFlatOpcAsync(a.toFlatOpc());

    expect([...b.parts()].map((p) => p.uri).sort()).toEqual(
      [...a.parts()].map((p) => p.uri).sort(),
    );
    expect(b.relationships.count).toBe(a.relationships.count);
    expect(await readAll(b.getPart(uri("/word/media/img.bin")).openReadStream())).toEqual(
      new Uint8Array([0x01, 0x02, 0x03, 0x04]),
    );
  });
});
