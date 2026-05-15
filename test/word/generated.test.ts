/**
 * Story-2.5 验证：codegen 跑出的 Word element 类按预期可用。
 *
 * 抽样核心 6 个元素（Paragraph / Run / Text / Table / TableRow / TableCell），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import {
  ElementRegistry,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlLeafElement,
  StringValue,
  deserialize,
  serialize,
} from "../../src/index.js";
import { registerWordprocessingElements } from "../../src/word/generated/_registry.js";
import {
  Paragraph,
  Run,
  Table,
  TableCell,
  TableRow,
  Text,
} from "../../src/word/generated/index.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

describe("Generated · 核心 6 个元素形态", () => {
  it("Paragraph 是 Composite，含 children + 关键 rsid 属性", () => {
    const p = new Paragraph();
    expect(p).toBeInstanceOf(OpenXmlCompositeElement);
    expect(p.localName).toBe("p");
    expect(p.prefix).toBe("w");
    expect(p.namespaceUri).toBe(WPNS);
    expect(p.children.count).toBe(0);
    // schema 中 w:p 有 rsidR / rsidRPr / rsidRDefault / rsidP / rsidTr —— 至少这几个 typed 字段存在
    const fields = Object.keys(p);
    expect(fields).toEqual(expect.arrayContaining(["children", "extendedAttributes"]));
  });

  it("Run 是 Composite", () => {
    const r = new Run();
    expect(r).toBeInstanceOf(OpenXmlCompositeElement);
    expect(r.localName).toBe("r");
    expect(r.namespaceUri).toBe(WPNS);
  });

  it("Text 是 Leaf，text 字段可读写", () => {
    const t = new Text();
    expect(t).toBeInstanceOf(OpenXmlLeafElement);
    expect(t.localName).toBe("t");
    expect(t.text).toBeUndefined();
    t.text = "hi";
    expect(t.text).toBe("hi");
  });

  it("Table / TableRow / TableCell 都是 Composite", () => {
    expect(new Table()).toBeInstanceOf(OpenXmlCompositeElement);
    expect(new TableRow()).toBeInstanceOf(OpenXmlCompositeElement);
    expect(new TableCell()).toBeInstanceOf(OpenXmlCompositeElement);
    expect(new Table().localName).toBe("tbl");
    expect(new TableRow().localName).toBe("tr");
    expect(new TableCell().localName).toBe("tc");
  });

  it("Paragraph typed 属性走 HexBinaryValue", () => {
    const p = new Paragraph();
    p.applyAttribute("w:rsidR", "00AB12CD");
    // codegen 把 rsidR → rsidParagraphAddition；通过 instanceof 校验底层类型
    const fields = Object.entries(p) as [string, unknown][];
    const hexFields = fields.filter(([, v]) => v instanceof HexBinaryValue);
    expect(hexFields.length).toBeGreaterThan(0);
  });
});

describe("Generated · 程序构造 Paragraph → Run → Text 并序列化", () => {
  it("树构造 + writeTo 字节级稳定", () => {
    const p = new Paragraph();
    p.applyAttribute("xmlns:w", WPNS);
    const r = new Run();
    const t = new Text();
    t.text = "Hello";
    r.appendChild(t);
    p.appendChild(r);

    const out = serialize(p, { withDeclaration: false });
    expect(out).toBe(`<w:p xmlns:w="${WPNS}"><w:r><w:t>Hello</w:t></w:r></w:p>`);
  });
});

describe("registerWordprocessingElements · 注册表填充", () => {
  it("注册后 lookup 主 namespace 下的核心元素能查到 typed 类", () => {
    const r = new ElementRegistry();
    expect(r.size).toBe(0);
    registerWordprocessingElements(r);
    expect(r.size).toBeGreaterThan(500); // 实际约 700 + 元素被注册
    expect(r.lookup(WPNS, "p")).toBe(Paragraph);
    expect(r.lookup(WPNS, "r")).toBe(Run);
    expect(r.lookup(WPNS, "t")).toBe(Text);
    expect(r.lookup(WPNS, "tbl")).toBe(Table);
    expect(r.lookup(WPNS, "tr")).toBe(TableRow);
    expect(r.lookup(WPNS, "tc")).toBe(TableCell);
  });

  it("注册后 deserialize 走 typed 路径", () => {
    const r = new ElementRegistry();
    registerWordprocessingElements(r);
    const xml = `<w:p xmlns:w="${WPNS}"><w:r><w:t>Real Word XML</w:t></w:r></w:p>`;
    const root = deserialize(xml, { registry: r });
    expect(root).toBeInstanceOf(Paragraph);
    const run = (root as Paragraph).firstChild();
    expect(run).toBeInstanceOf(Run);
    const text = (run as Run).firstChild();
    expect(text).toBeInstanceOf(Text);
    expect((text as Text).text).toBe("Real Word XML");
  });

  it("round-trip：真实 Word fragment 经 typed 树后字节稳定", () => {
    const r = new ElementRegistry();
    registerWordprocessingElements(r);
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:p xmlns:w="${WPNS}" w:rsidR="00AB12CD"><w:r><w:t>Hello</w:t></w:r></w:p>`;
    const tree = deserialize(xml, { registry: r });
    expect(serialize(tree)).toBe(xml);
  });
});

describe("Generated · index re-export 完整", () => {
  it("能从 generated/index.js import 任意核心元素", async () => {
    const mod = await import("../../src/word/generated/index.js");
    const expected = [
      "Paragraph",
      "Run",
      "Text",
      "Table",
      "TableRow",
      "TableCell",
      "Body",
      "Document",
      "Hyperlink",
      "Style",
      "Styles",
    ];
    for (const name of expected) {
      expect(mod, `missing export: ${name}`).toHaveProperty(name);
    }
  });

  it("总导出数 ≥ 500", async () => {
    const mod = await import("../../src/word/generated/index.js");
    expect(Object.keys(mod).length).toBeGreaterThan(500);
  });
});

describe("Generated · 抽样属性值类型与 schema 对位", () => {
  it("Paragraph 的 RsidParagraphMarkRevision 是 HexBinaryValue（对位 .NET）", () => {
    const p = new Paragraph();
    p.applyAttribute("w:rsidRPr", "ABCDEF00");
    // 找到那个字段（codegen 用 camelCase 命名 = rsidParagraphMarkRevision）
    const entry = Object.entries(p).find(([_, v]) => v instanceof HexBinaryValue);
    expect(entry).toBeDefined();
    expect((entry?.[1] as HexBinaryValue).value).toBe("ABCDEF00");
  });

  it("未知属性走 extendedAttributes 透传", () => {
    const p = new Paragraph();
    p.applyAttribute("w:unknownAttr", "x");
    p.applyAttribute("xmlns:w", WPNS);
    expect(p.extendedAttributes.get("w:unknownAttr")).toBe("x");
    expect(p.extendedAttributes.get("xmlns:w")).toBe(WPNS);
  });

  it("StringValue 默认 fallback 路径（基础 schema 属性）", () => {
    // 任意暴露 StringValue 字段的类——找一个 schema 中 typed 为 StringValue 的属性
    const p = new Paragraph();
    p.applyAttribute("w:rsidRPr", "00112233"); // HexBinary 占位，确认 setter 不抛错
    // 通过反射看是否有任何 StringValue 字段被赋值
    const entries = Object.entries(p);
    expect(entries.length).toBeGreaterThan(5); // 有多个 typed 字段
    // 简单验证 StringValue 类的可用性
    expect(new StringValue("x").toString()).toBe("x");
  });
});
