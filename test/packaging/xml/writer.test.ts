import { describe, expect, it } from "vitest";
import { XmlWriter } from "../../../src/packaging/xml/writer.js";

describe("XmlWriter", () => {
  it("declaration 写入标准声明", () => {
    expect(new XmlWriter().declaration().toString()).toBe(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    );
  });

  it("empty 写自闭合元素 + 属性", () => {
    const w = new XmlWriter();
    w.empty("Default", [
      ["Extension", "xml"],
      ["ContentType", "application/xml"],
    ]);
    expect(w.toString()).toBe('<Default Extension="xml" ContentType="application/xml"/>');
  });

  it("open/close 包文本时转义", () => {
    const w = new XmlWriter();
    w.open("Root").text("A & B < C").close("Root");
    expect(w.toString()).toBe("<Root>A &amp; B &lt; C</Root>");
  });

  it("属性内含特殊字符被转义", () => {
    const w = new XmlWriter();
    w.empty("X", [["k", 'v"&<>']]);
    expect(w.toString()).toBe('<X k="v&quot;&amp;&lt;&gt;"/>');
  });

  it("undefined 属性值被跳过", () => {
    const w = new XmlWriter();
    w.empty("X", [
      ["a", "1"],
      ["b", undefined],
      ["c", "3"],
    ]);
    expect(w.toString()).toBe('<X a="1" c="3"/>');
  });

  it("可链式调用", () => {
    const w = new XmlWriter()
      .declaration()
      .open("Root", [["xmlns", "ns:x"]])
      .empty("Leaf", [["v", "1"]])
      .close("Root");
    expect(w.toString()).toBe(
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Root xmlns="ns:x"><Leaf v="1"/></Root>',
    );
  });
});
