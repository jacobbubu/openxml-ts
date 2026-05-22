/**
 * OpenXmlDomReader 测试（Epic-97）。
 *
 * 测试策略：
 * - 手动构建元素树，验证 DOM 读取器的游标行为；
 * - 与 OpenXmlPartReader 对比等价 XML 内容的遍历结果；
 * - ≥7 个独立 it() 断言。
 */

import { describe, expect, it } from "vitest";

import {
  ElementRegistry,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  deserialize,
} from "../../src/index.js";
import { OpenXmlDomReader } from "../../src/streaming/openxml-dom-reader.js";
import { OpenXmlPartReader } from "../../src/streaming/openxml-part-reader.js";

// ---- Shared fixture classes ----

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

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

/**
 * 构建一棵简单的 DOM 树：
 * document
 *   body
 *     p
 *       r
 *         t  (text: "Hello")
 *     p
 *       r
 *         t  (text: "World")
 */
function buildTree(): WDocument {
  const doc = new WDocument();
  const body = new WBody();
  doc.appendChild(body);

  const p1 = new WParagraph();
  const r1 = new WRun();
  const t1 = new WText();
  t1.text = "Hello";
  r1.appendChild(t1);
  p1.appendChild(r1);
  body.appendChild(p1);

  const p2 = new WParagraph();
  const r2 = new WRun();
  const t2 = new WText();
  t2.text = "World";
  r2.appendChild(t2);
  p2.appendChild(r2);
  body.appendChild(p2);

  return doc;
}

// ===========================================================================
// OpenXmlDomReader tests
// ===========================================================================

describe("OpenXmlDomReader", () => {
  it("read() returns false at EOF after traversing all nodes", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    let count = 0;
    while (reader.read()) count += 1;
    expect(reader.eof).toBe(true);
    expect(count).toBeGreaterThan(0);
  });

  it("traverses start elements in correct DFS order", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    const starts: string[] = [];
    while (reader.read()) {
      if (reader.isStartElement) starts.push(reader.localName);
    }
    // document, body, p, r, t, p, r, t
    expect(starts).toEqual(["document", "body", "p", "r", "t", "p", "r", "t"]);
  });

  it("depth increases and decreases correctly", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    const depths: Array<{ localName: string; depth: number }> = [];
    while (reader.read()) {
      if (reader.isStartElement) {
        depths.push({ localName: reader.localName, depth: reader.depth });
      }
    }
    expect(depths[0]).toEqual({ localName: "document", depth: 0 });
    expect(depths[1]).toEqual({ localName: "body", depth: 1 });
    expect(depths[2]).toEqual({ localName: "p", depth: 2 });
    expect(depths[3]).toEqual({ localName: "r", depth: 3 });
    expect(depths[4]).toEqual({ localName: "t", depth: 4 });
  });

  it("localName, prefix, namespaceUri are reported on start elements", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    reader.read(); // -> document start
    expect(reader.localName).toBe("document");
    expect(reader.prefix).toBe("w");
    expect(reader.namespaceUri).toBe(W_NS);
    expect(reader.isStartElement).toBe(true);
    expect(reader.isEndElement).toBe(false);
  });

  it("isStartElement / isEndElement toggle correctly", () => {
    // Single leaf element: start then end
    const t = new WText();
    const reader = new OpenXmlDomReader(t);

    reader.read(); // leafStart
    expect(reader.isStartElement).toBe(true);
    expect(reader.isEndElement).toBe(false);

    reader.read(); // end
    expect(reader.isEndElement).toBe(true);
    expect(reader.isStartElement).toBe(false);

    const done = reader.read();
    expect(done).toBe(false);
    expect(reader.eof).toBe(true);
  });

  it("loadCurrentElement() returns element at startElement and advances to endElement", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);

    // Advance to body
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "body") break;
    }
    expect(reader.localName).toBe("body");

    const el = reader.loadCurrentElement();
    expect(el).toBeInstanceOf(WBody);
    // After loadCurrentElement, cursor should be at end of body
    expect(reader.isEndElement).toBe(true);
    expect(reader.localName).toBe("body");
  });

  it("loadCurrentElement() returns undefined when not at startElement", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    // State is Null before first read
    expect(reader.loadCurrentElement()).toBeUndefined();
  });

  it("getText() returns leaf text content", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    const texts: string[] = [];
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "t") {
        const text = reader.getText();
        if (text.length > 0) texts.push(text);
      }
    }
    expect(texts).toEqual(["Hello", "World"]);
  });

  it("readFirstChild() enters first child of current element", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    reader.read(); // document start
    expect(reader.localName).toBe("document");

    const entered = reader.readFirstChild();
    expect(entered).toBe(true);
    expect(reader.localName).toBe("body");
    expect(reader.isStartElement).toBe(true);
  });

  it("readNextSibling() skips to next sibling, skipping subtree", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    // Navigate to first p
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "p") break;
    }
    expect(reader.localName).toBe("p");

    // Skip to next sibling (second p)
    const advanced = reader.readNextSibling();
    expect(advanced).toBe(true);
    expect(reader.isStartElement).toBe(true);
    expect(reader.localName).toBe("p");
  });

  it("skip() skips current element subtree and moves to next sibling or parent end", () => {
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc);
    // Navigate to body start
    while (reader.read()) {
      if (reader.isStartElement && reader.localName === "body") break;
    }
    // skip body — jumps past all paragraphs
    reader.skip();
    // Should now be at end of document or EOF
    // (no sibling of body, so document end)
    expect(reader.isEndElement).toBe(true);
    expect(reader.localName).toBe("document");
  });

  it("elementType resolved from registry when element is registered", () => {
    const registry = freshRegistry();
    const doc = buildTree();
    const reader = new OpenXmlDomReader(doc, { registry });
    reader.read(); // document start
    expect(reader.elementType).toBe(WDocument);
  });
});

// ===========================================================================
// Equivalence tests: DomReader vs PartReader on same content
// ===========================================================================

describe("OpenXmlDomReader vs OpenXmlPartReader equivalence", () => {
  const EQUIV_XML = `<w:document xmlns:w="${W_NS}"><w:body><w:p><w:r/></w:p><w:p><w:r/></w:p></w:body></w:document>`;

  it("both readers produce the same start-element sequence", () => {
    const registry = freshRegistry();

    // PartReader traversal
    const partReader = new OpenXmlPartReader(EQUIV_XML, { registry });
    const partStarts: string[] = [];
    while (partReader.read()) {
      if (partReader.isStartElement) partStarts.push(partReader.localName);
    }

    // DomReader traversal
    const doc = deserialize(EQUIV_XML, { registry }) as WDocument;
    const domReader = new OpenXmlDomReader(doc, { registry });
    const domStarts: string[] = [];
    while (domReader.read()) {
      if (domReader.isStartElement) domStarts.push(domReader.localName);
    }

    expect(domStarts).toEqual(partStarts);
  });

  it("both readers produce the same depth sequence for start elements", () => {
    const registry = freshRegistry();

    // PartReader depths
    const partReader = new OpenXmlPartReader(EQUIV_XML, { registry });
    const partDepths: number[] = [];
    while (partReader.read()) {
      if (partReader.isStartElement) partDepths.push(partReader.depth);
    }

    // DomReader depths
    const doc = deserialize(EQUIV_XML, { registry }) as WDocument;
    const domReader = new OpenXmlDomReader(doc, { registry });
    const domDepths: number[] = [];
    while (domReader.read()) {
      if (domReader.isStartElement) domDepths.push(domReader.depth);
    }

    expect(domDepths).toEqual(partDepths);
  });
});
