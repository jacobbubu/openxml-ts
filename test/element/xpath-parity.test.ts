/**
 * Epic-126：XmlPathTest 8 个 Fact 移植。
 *
 * 对位上游 ofapiTest/XmlPathTest.cs 的 8 个 Fact，验证 OpenXmlElement.getXPath()
 * 返回的 XPath 字符串与 .NET XmlPath.XPath 一致。
 *
 * 差异说明：
 * - .NET XmlPath 返回包含 XPath、PartUri、Namespaces 的对象；TS 只实现 XPath 字符串。
 * - .NET `new OpenXmlUnknownElement("my:test", "http://my")` 的 2 参数构造器在 TS
 *   对应 `new OpenXmlUnknownElement("my", "test", "http://my")`（prefix, localName, ns）。
 * - GetXPathTest7（OpenXmlMiscNode/注释节点）：TS 未实现 OpenXmlMiscNode，标为 todo。
 * - GetXPathTest8（WordprocessingDocument / PartUri）：TS getXPath() 只返回文档内路径字符串，
 *   第一断言（不挂 part 时）等同 GetXPathTest4，第二断言（挂入 part 后路径含 document 根）
 *   标为 todo，需要 TS 端 WordprocessingDocument 与 Part 概念的完整集成。
 *
 * 命名空间前缀对应：
 *   w → http://schemas.openxmlformats.org/wordprocessingml/2006/main
 */

import { describe, expect, it } from "vitest";
import { OpenXmlUnknownElement } from "../../src/element/index.js";
import { Body, BookmarkEnd, Paragraph, Run } from "../../src/word/index.js";

// ---------------------------------------------------------------------------
// GetXPathTest1：body → p，获取 p 的 XPath
// ---------------------------------------------------------------------------

describe("GetXPathTest1", () => {
  it("paragraph in body returns /w:body[1]/w:p[1]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);

    expect(p.getXPath()).toBe("/w:body[1]/w:p[1]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest2：p 的第一个子元素（run）的 XPath
// ---------------------------------------------------------------------------

describe("GetXPathTest2", () => {
  it("first run in paragraph returns /w:body[1]/w:p[1]/w:r[1]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);

    const firstChild = p.firstChildElement!;
    expect(firstChild.getXPath()).toBe("/w:body[1]/w:p[1]/w:r[1]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest3：body 前置一个 Paragraph，获取第 2 个 p 下 bookmarkEnd 的 XPath
// ---------------------------------------------------------------------------

describe("GetXPathTest3", () => {
  it("bookmarkEnd in second paragraph returns /w:body[1]/w:p[2]/w:bookmarkEnd[1]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);
    body.prependChild(new Paragraph());

    // p.FirstChild.NextSibling() → BookmarkEnd（第 2 个 p 下的 bookmarkEnd）
    const bookmarkEnd = p.firstChildElement!.nextSibling()!;
    expect(bookmarkEnd.getXPath()).toBe("/w:body[1]/w:p[2]/w:bookmarkEnd[1]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest4：第 2 个 p 下最后一个子元素（run）的 XPath
// ---------------------------------------------------------------------------

describe("GetXPathTest4", () => {
  it("last run in second paragraph returns /w:body[1]/w:p[2]/w:r[2]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);
    body.prependChild(new Paragraph());

    const lastChild = p.lastChildElement!;
    expect(lastChild.getXPath()).toBe("/w:body[1]/w:p[2]/w:r[2]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest5：未知元素 my:test 的 XPath（前置到 p 中）
// ---------------------------------------------------------------------------

describe("GetXPathTest5", () => {
  it("unknown element my:test prepended to paragraph returns /w:body[1]/w:p[2]/my:test[1]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);
    body.prependChild(new Paragraph());

    // C# 中 new OpenXmlUnknownElement("my:test", "http://my") → prefix="my", localName="test"
    const unknown1 = p.prependChild(new OpenXmlUnknownElement("my", "test", "http://my"));
    expect(unknown1.getXPath()).toBe("/w:body[1]/w:p[2]/my:test[1]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest6：第二个 my:test（追加）的 XPath
// ---------------------------------------------------------------------------

describe("GetXPathTest6", () => {
  it("second unknown element my:test appended returns /w:body[1]/w:p[2]/my:test[2]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);
    body.prependChild(new Paragraph());

    p.prependChild(new OpenXmlUnknownElement("my", "test", "http://my"));
    const unknown2 = p.appendChild(new OpenXmlUnknownElement("my", "test", "http://my"));

    expect(unknown2.getXPath()).toBe("/w:body[1]/w:p[2]/my:test[2]");
  });
});

// ---------------------------------------------------------------------------
// GetXPathTest7：OpenXmlMiscNode（注释节点）的 XPath
// TS 端未实现 OpenXmlMiscNode，跳过此测试。
// ---------------------------------------------------------------------------

describe("GetXPathTest7", () => {
  it.todo(
    "misc node (comment) returns /w:body[1]/w:p[2]/<!-- comment --> — requires OpenXmlMiscNode which is not yet implemented in TS",
  );
});

// ---------------------------------------------------------------------------
// GetXPathTest8：元素移入 WordprocessingDocument 后 XPath 包含 document 根
// 第一部分（不挂 part）与 GetXPathTest4 等价，直接断言。
// 第二部分（挂入 Part 后前缀含 w:document）需要 TS WordprocessingDocument 集成，跳过。
// ---------------------------------------------------------------------------

describe("GetXPathTest8", () => {
  it("run before being added to document returns /w:body[1]/w:p[2]/w:r[2]", () => {
    const p = new Paragraph();
    p.append(new Run(), new BookmarkEnd(), new Run());
    const body = new Body();
    body.appendChild(p);
    body.prependChild(new Paragraph());

    // C# captures r = p.LastChild BEFORE appending unknown elements
    const r = p.lastChildElement!; // second Run, will become /w:r[2] after mutations

    p.prependChild(new OpenXmlUnknownElement("my", "test", "http://my"));
    p.appendChild(new OpenXmlUnknownElement("my", "test", "http://my"));
    // p children now: [my:test, run, bookmarkEnd, run(=r), my:test]
    // r is still the same Run object at position 4 (1-based index 2 among Runs)
    expect(r.getXPath()).toBe("/w:body[1]/w:p[2]/w:r[2]");
  });

  it.todo(
    "run after being added to WordprocessingDocument returns /w:document[1]/w:body[1]/w:p[2]/w:r[2] with PartUri — requires TS WordprocessingDocument integration",
  );
});

// ---------------------------------------------------------------------------
// 边界测试（额外）
// ---------------------------------------------------------------------------

describe("getXPath() edge cases", () => {
  it("detached element (no parent) returns /prefix:localName[1]", () => {
    const p = new Paragraph();
    expect(p.getXPath()).toBe("/w:p[1]");
  });

  it("root element returns /prefix:localName[1]", () => {
    const body = new Body();
    const p = new Paragraph();
    body.appendChild(p);
    expect(body.getXPath()).toBe("/w:body[1]");
  });

  it("deeply nested element has correct path", () => {
    const body = new Body();
    const p = new Paragraph();
    const r = new Run();
    body.appendChild(p);
    p.appendChild(r);
    expect(r.getXPath()).toBe("/w:body[1]/w:p[1]/w:r[1]");
  });

  it("unknown element with no prefix uses namespaceUri:localName", () => {
    const body = new Body();
    const unknown = new OpenXmlUnknownElement("", "foo", "http://example.com");
    body.appendChild(unknown);
    expect(unknown.getXPath()).toBe("/w:body[1]/http://example.com:foo[1]");
  });

  it("siblings of same type get correct 1-based indices", () => {
    const body = new Body();
    const p1 = new Paragraph();
    const p2 = new Paragraph();
    const p3 = new Paragraph();
    body.append(p1, p2, p3);
    expect(p1.getXPath()).toBe("/w:body[1]/w:p[1]");
    expect(p2.getXPath()).toBe("/w:body[1]/w:p[2]");
    expect(p3.getXPath()).toBe("/w:body[1]/w:p[3]");
  });
});
