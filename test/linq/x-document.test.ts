/**
 * Story-5.3 验证：XDocument.Parse + Load 兼容入口。
 *
 * 覆盖：
 * - Parse 解 XML 字符串到 XDocument.Root；
 * - Load 解 UTF-8 字节流（含 BOM）；
 * - Root 是 XElement（typed if registered，否则 OpenXmlUnknownElement 包壳）；
 * - Elements / Descendants 直接从 XDocument 出发；
 * - 命名空间在 Root.Name 上正确解析；
 * - .NET 教程范式 1:1 翻译能跑通。
 */

import { describe, expect, it } from "vitest";
import { XDocument, XName, XNamespace } from "../../src/linq/index.js";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

describe("XDocument · Parse / Load", () => {
  it("Parse 解 XML 字符串到 XDocument，Root 是 XElement", () => {
    const doc = XDocument.Parse('<root><a>x</a><a>y</a></root>');
    expect(doc.Root).toBeDefined();
    expect(doc.Root?.Name.LocalName).toBe("root");
    expect(doc.Root?.Elements("a")).toHaveLength(2);
  });

  it("Parse 解 带命名空间的 XML", () => {
    const xml = `<w:document xmlns:w="${W_NS}"><w:body><w:p/><w:p/></w:body></w:document>`;
    const doc = XDocument.Parse(xml);
    expect(doc.Root?.Name.NamespaceName).toBe(W_NS);
    expect(doc.Root?.Name.LocalName).toBe("document");
  });

  it("Load 从 UTF-8 字节流解（无 BOM）", () => {
    const xml = "<root>hi</root>";
    const bytes = new TextEncoder().encode(xml);
    const doc = XDocument.Load(bytes);
    expect(doc.Root?.Name.LocalName).toBe("root");
    expect(doc.Root?.Value).toBe("hi");
  });

  it("Load 解带 UTF-8 BOM 的字节流", () => {
    const xml = "<root>bom</root>";
    const bytes = new Uint8Array([0xef, 0xbb, 0xbf, ...new TextEncoder().encode(xml)]);
    const doc = XDocument.Load(bytes);
    // TextDecoder('utf-8') 默认会吃掉 BOM
    expect(doc.Root?.Name.LocalName).toBe("root");
  });
});

describe("XDocument · 顶层 Elements / Descendants", () => {
  function buildDoc(): XDocument {
    return XDocument.Parse(
      `<w:document xmlns:w="${W_NS}">` +
        `<w:body>` +
        `<w:p><w:r><w:t>A</w:t></w:r></w:p>` +
        `<w:p><w:r><w:t>B</w:t></w:r></w:p>` +
        `</w:body>` +
        `</w:document>`,
    );
  }

  it("Elements() 等价 Root.Elements()", () => {
    const doc = buildDoc();
    expect(doc.Elements().map((e) => e.Name.LocalName)).toEqual(["body"]);
  });

  it("Descendants(name) 走 Root.Descendants(name)", () => {
    const doc = buildDoc();
    const W = XNamespace.Get(W_NS);
    expect(doc.Descendants(W.GetName("p"))).toHaveLength(2);
    expect(doc.Descendants(W.GetName("t"))).toHaveLength(2);
  });

  it("Descendants(string expanded)", () => {
    const doc = buildDoc();
    expect(doc.Descendants(`{${W_NS}}r`)).toHaveLength(2);
  });
});

describe("XDocument · .NET 教程范式 1:1 翻译", () => {
  it(".NET style: var doc = XDocument.Parse(xml); var W = ...; doc.Descendants(W + 'p')", () => {
    const xml = `<w:document xmlns:w="${W_NS}"><w:body><w:p/><w:p/><w:p/></w:body></w:document>`;
    const doc = XDocument.Parse(xml);
    const W = XNamespace.Get(W_NS);
    const ps = doc.Descendants(W.GetName("p"));
    expect(ps).toHaveLength(3);
    for (const p of ps) {
      expect(p.Name.Equals(XName.Get(W_NS, "p"))).toBe(true);
    }
  });
});
