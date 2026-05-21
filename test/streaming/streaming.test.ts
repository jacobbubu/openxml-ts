/**
 * OpenXmlPartReader + OpenXmlPartWriter 流式 API 测试（Epic-80）。
 *
 * 测试策略：
 * - 使用内联 XML 字符串构造 Reader / Writer（不依赖文件 I/O），
 *   同时包含一个基于 OPC 包（docx fixture）的集成测试。
 * - ≥10 个独立 `it(...)` 断言覆盖 reader / writer / round-trip。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  ElementRegistry,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  deserialize,
  serialize,
} from "../../src/index.js";
import { openAsync } from "../../src/index.js";
import { OpenXmlPartReader } from "../../src/streaming/openxml-part-reader.js";
import { OpenXmlPartWriter } from "../../src/streaming/openxml-part-writer.js";

// ---- Shared fixture XML ----

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

const SIMPLE_XML = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="${W_NS}">
  <w:body>
    <w:p>
      <w:r><w:t>Hello</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>World</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`;

// ---- Test element classes ----

class WText extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
}

class WRun extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class WParagraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class WBody extends OpenXmlCompositeElement {
  override readonly localName = "body" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class WDocument extends OpenXmlCompositeElement {
  override readonly localName = "document" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

function freshRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  r.register(W_NS, "document", WDocument);
  r.register(W_NS, "body", WBody);
  r.register(W_NS, "p", WParagraph);
  r.register(W_NS, "r", WRun);
  r.register(W_NS, "t", WText);
  return r;
}

// ---- Helper: collect all start-element nodes ----

function collectStartElements(xml: string): Array<{ localName: string; depth: number }> {
  const reader = new OpenXmlPartReader(xml);
  const results: Array<{ localName: string; depth: number }> = [];
  while (reader.read()) {
    if (reader.isStartElement) {
      results.push({ localName: reader.localName, depth: reader.depth });
    }
  }
  return results;
}

// ===========================================================================
// OpenXmlPartReader tests
// ===========================================================================

describe("OpenXmlPartReader", () => {
  it("read() returns false at EOF after consuming all tokens", () => {
    const reader = new OpenXmlPartReader(SIMPLE_XML);
    let count = 0;
    while (reader.read()) count += 1;
    expect(reader.eof).toBe(true);
    expect(count).toBeGreaterThan(0);
  });

  it("counts start elements correctly in SIMPLE_XML", () => {
    const starts = collectStartElements(SIMPLE_XML);
    // document, body, p, r, t, p, r, t = 8
    expect(starts.length).toBe(8);
    expect(starts.map((s) => s.localName)).toEqual([
      "document",
      "body",
      "p",
      "r",
      "t",
      "p",
      "r",
      "t",
    ]);
  });

  it("depth increases correctly as we descend", () => {
    const starts = collectStartElements(SIMPLE_XML);
    // document=0, body=1, p=2, r=3, t=4
    expect(starts[0]?.depth).toBe(0); // document
    expect(starts[1]?.depth).toBe(1); // body
    expect(starts[2]?.depth).toBe(2); // p
    expect(starts[3]?.depth).toBe(3); // r
    expect(starts[4]?.depth).toBe(4); // t
  });

  it("localName, prefix, namespaceUri are resolved correctly", () => {
    const reader = new OpenXmlPartReader(SIMPLE_XML);
    reader.read(); // -> document
    expect(reader.localName).toBe("document");
    expect(reader.prefix).toBe("w");
    expect(reader.namespaceUri).toBe(W_NS);
  });

  it("isStartElement / isEndElement toggle correctly", () => {
    const xml = `<w:p xmlns:w="${W_NS}"><w:r/></w:p>`;
    const reader = new OpenXmlPartReader(xml);

    reader.read();
    expect(reader.isStartElement).toBe(true);
    expect(reader.isEndElement).toBe(false);
    expect(reader.localName).toBe("p");

    reader.read();
    expect(reader.isStartElement).toBe(true);
    expect(reader.localName).toBe("r");

    reader.read(); // end of p
    expect(reader.isEndElement).toBe(true);
    expect(reader.isStartElement).toBe(false);
  });

  it("attributes are exposed on start elements", () => {
    const xml = `<w:document xmlns:w="${W_NS}" w:foo="bar"/>`;
    const reader = new OpenXmlPartReader(xml);
    reader.read();
    expect(reader.isStartElement).toBe(true);
    const attrs = reader.attributes;
    const fooAttr = attrs.find((a) => a.name === "w:foo");
    expect(fooAttr?.value).toBe("bar");
  });

  it("getText() returns text node content", () => {
    const xml = `<w:t xmlns:w="${W_NS}">Hello</w:t>`;
    const reader = new OpenXmlPartReader(xml);
    reader.read(); // open w:t
    reader.read(); // text node
    expect(reader.isMiscNode).toBe(true);
    expect(reader.getText()).toBe("Hello");
  });

  it("elementType resolved from registry when element is registered", () => {
    const registry = freshRegistry();
    const reader = new OpenXmlPartReader(SIMPLE_XML, { registry });
    reader.read(); // -> document
    expect(reader.elementType).toBe(WDocument);
  });

  it("elementType is undefined when registry is not provided", () => {
    const reader = new OpenXmlPartReader(SIMPLE_XML);
    reader.read();
    expect(reader.elementType).toBeUndefined();
  });

  it("readNextSibling() skips to next sibling, skipping subtree", () => {
    // Use compact XML without whitespace to avoid text nodes between elements
    const xml = `<w:document xmlns:w="${W_NS}"><w:body><w:p><w:r/></w:p><w:p><w:r/></w:p></w:body></w:document>`;
    const reader = new OpenXmlPartReader(xml);
    reader.read(); // document
    reader.read(); // body
    reader.read(); // first p

    expect(reader.localName).toBe("p");
    // Skip first paragraph subtree, jump to second p
    const advanced = reader.readNextSibling();
    expect(advanced).toBe(true);
    expect(reader.localName).toBe("p");
    // Should be the second p (still a start element)
    expect(reader.isStartElement).toBe(true);
  });

  it("readFirstChild() enters the first child of current element", () => {
    const xml = `<w:body xmlns:w="${W_NS}"><w:p><w:r/></w:p></w:body>`;
    const reader = new OpenXmlPartReader(xml);
    reader.read(); // body

    expect(reader.localName).toBe("body");
    const entered = reader.readFirstChild();
    expect(entered).toBe(true);
    expect(reader.localName).toBe("p");
  });

  it("loadCurrentElement() materializes typed subtree and advances reader", () => {
    const registry = freshRegistry();
    const reader = new OpenXmlPartReader(SIMPLE_XML, { registry });

    // Advance to body
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "body") break;
    }

    expect(reader.localName).toBe("body");
    const body = reader.loadCurrentElement();
    expect(body).toBeInstanceOf(WBody);

    // Body should have 2 paragraph children
    const bodyComp = body as WBody;
    expect(bodyComp.children.count).toBe(2);
    const paragraphs = [...bodyComp.elements(WParagraph)];
    expect(paragraphs).toHaveLength(2);
  });

  it("loadCurrentElement() with self-closing element materializes leaf", () => {
    const xml = `<w:r xmlns:w="${W_NS}"/>`;
    const registry = freshRegistry();
    const reader = new OpenXmlPartReader(xml, { registry });
    reader.read();
    expect(reader.localName).toBe("r");
    const el = reader.loadCurrentElement();
    expect(el).toBeInstanceOf(WRun);
    expect(reader.eof).toBe(true);
  });

  it("loadCurrentElement() returns undefined when not at startElement", () => {
    const xml = `<w:p xmlns:w="${W_NS}"></w:p>`;
    const reader = new OpenXmlPartReader(xml);
    reader.read(); // open
    reader.read(); // close
    expect(reader.isEndElement).toBe(true);
    expect(reader.loadCurrentElement()).toBeUndefined();
  });
});

// ===========================================================================
// OpenXmlPartWriter tests
// ===========================================================================

describe("OpenXmlPartWriter", () => {
  it("writeStartDocument() emits XML declaration", () => {
    const writer = new OpenXmlPartWriter();
    writer.writeStartDocument();
    const xml = writer.close();
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  });

  it("writeStartElement(descriptor) + writeEndElement() produce balanced tags", () => {
    const writer = new OpenXmlPartWriter();
    writer.writeStartElement({ localName: "p", prefix: "w" });
    writer.writeEndElement();
    const xml = writer.close();
    expect(xml).toBe("<w:p></w:p>");
  });

  it("writeString() writes text content with escaping", () => {
    const writer = new OpenXmlPartWriter();
    writer.writeStartElement({ localName: "t", prefix: "w" });
    writer.writeString("Hello & <World>");
    writer.writeEndElement();
    const xml = writer.close();
    expect(xml).toBe("<w:t>Hello &amp; &lt;World&gt;</w:t>");
  });

  it("writeElement() writes a typed element subtree", () => {
    const registry = freshRegistry();
    const srcXml = `<w:p xmlns:w="${W_NS}"><w:r><w:t>Hi</w:t></w:r></w:p>`;
    const para = deserialize(srcXml, { registry }) as WParagraph;

    const writer = new OpenXmlPartWriter();
    writer.writeElement(para);
    const xml = writer.close();

    // round-trip check
    const back = deserialize(xml, { registry });
    expect(back).toBeInstanceOf(WParagraph);
    expect(serialize(back)).toBe(serialize(para));
  });

  it("writeStartElement(OpenXmlElement) writes open tag attributes", () => {
    const registry = freshRegistry();
    const srcXml = `<w:document xmlns:w="${W_NS}"><w:body/></w:document>`;
    const doc = deserialize(srcXml, { registry }) as WDocument;

    const writer = new OpenXmlPartWriter();
    writer.writeStartDocument();
    writer.writeStartElement(doc); // open tag with xmlns:w attr
    const body = doc.firstChild(WBody);
    expect(body).toBeDefined();
    if (body !== undefined) writer.writeElement(body);
    writer.writeEndElement();
    const xml = writer.close();

    expect(xml).toContain("w:document");
    expect(xml).toContain(`xmlns:w="${W_NS}"`);
  });

  it("close() auto-closes unclosed elements", () => {
    const writer = new OpenXmlPartWriter();
    writer.writeStartElement({ localName: "root" });
    writer.writeStartElement({ localName: "child" });
    const xml = writer.close();
    expect(xml).toBe("<root><child></child></root>");
  });

  it("writeEndElement() throws when stack is empty", () => {
    const writer = new OpenXmlPartWriter();
    expect(() => writer.writeEndElement()).toThrow();
  });

  it("writing after close() throws", () => {
    const writer = new OpenXmlPartWriter();
    writer.close();
    expect(() => writer.writeStartDocument()).toThrow();
  });
});

// ===========================================================================
// Round-trip tests
// ===========================================================================

describe("Reader → Writer round-trip", () => {
  it("stream-copy all elements via reader + writer produces equivalent XML", () => {
    const registry = freshRegistry();
    const reader = new OpenXmlPartReader(SIMPLE_XML, { registry });
    const writer = new OpenXmlPartWriter();

    while (reader.read()) {
      if (reader.isStartElement) {
        const node = {
          localName: reader.localName,
          prefix: reader.prefix,
          attributes: [...reader.attributes],
        };
        writer.writeStartElement(node);
      } else if (reader.isEndElement) {
        writer.writeEndElement();
      } else if (reader.isMiscNode) {
        writer.writeString(reader.getText());
      }
    }

    const out = writer.close();
    // Should deserialize to equivalent structure
    const orig = deserialize(SIMPLE_XML, { registry });
    const copy = deserialize(out, { registry });
    expect(serialize(copy)).toBe(serialize(orig));
  });

  it("loadCurrentElement + writeElement gives a correct subtree round-trip", () => {
    const registry = freshRegistry();
    const reader = new OpenXmlPartReader(SIMPLE_XML, { registry });

    // Collect all paragraphs via loadCurrentElement
    const paragraphs: WParagraph[] = [];
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "p") {
        const el = reader.loadCurrentElement();
        if (el instanceof WParagraph) paragraphs.push(el);
      }
    }

    expect(paragraphs).toHaveLength(2);

    // Write them back via the writer
    const writer = new OpenXmlPartWriter();
    writer.writeStartDocument();
    writer.writeStartElement({
      localName: "body",
      prefix: "w",
      attributes: [{ name: "xmlns:w", value: W_NS }],
    });
    for (const p of paragraphs) {
      writer.writeElement(p);
    }
    writer.writeEndElement();
    const out = writer.close();

    // Re-parse and check paragraph count
    const body = deserialize(out, { registry }) as WBody;
    expect([...body.elements(WParagraph)]).toHaveLength(2);
  });
});

// ---- Helper: read all bytes from ReadableStream ----

async function readAllBytes(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  return out;
}

async function partToXml(part: { openReadStream(): ReadableStream<Uint8Array> }): Promise<string> {
  const bytes = await readAllBytes(part.openReadStream());
  return new TextDecoder("utf-8").decode(bytes);
}

// ===========================================================================
// Integration: docx fixture test
// ===========================================================================

describe("OpenXmlPartReader with real docx fixture", () => {
  const HERE = dirname(fileURLToPath(import.meta.url));
  const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

  it("streams an XML part from a real .docx, counting start elements", async () => {
    const buf = await readFile(join(FIXTURES_DIR, "5Errors.docx"));
    const pkg = await openAsync(new Uint8Array(buf));
    const parts = [...pkg.parts()];

    // Find an XML part (not .rels which may differ in format)
    const xmlPart = parts.find((p) => {
      const uri = p.uri.toString();
      return uri.endsWith(".xml") && !uri.endsWith(".rels");
    });
    if (xmlPart === undefined) throw new Error("No XML part found in fixture");

    const xml = await partToXml(xmlPart);
    expect(typeof xml).toBe("string");
    expect(xml.length).toBeGreaterThan(0);

    const reader = new OpenXmlPartReader(xml);
    let startCount = 0;
    while (reader.read()) {
      if (reader.isStartElement) startCount += 1;
    }
    expect(startCount).toBeGreaterThan(0);
    expect(reader.eof).toBe(true);

    await pkg.dispose();
  });
});
