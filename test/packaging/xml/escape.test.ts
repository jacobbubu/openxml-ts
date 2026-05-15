import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../../src/packaging/errors.js";
import { xmlEscapeAttr, xmlEscapeText, xmlUnescape } from "../../../src/packaging/xml/escape.js";

describe("xmlEscapeText", () => {
  it("仅转义 & < >", () => {
    expect(xmlEscapeText("a&b<c>d\"e'f")).toBe("a&amp;b&lt;c&gt;d\"e'f");
  });
  it("普通文本直通", () => {
    expect(xmlEscapeText("中文 hello")).toBe("中文 hello");
  });
});

describe("xmlEscapeAttr", () => {
  it("转义 & < > 与双引号", () => {
    expect(xmlEscapeAttr("a&b<c>d\"e'f")).toBe("a&amp;b&lt;c&gt;d&quot;e'f");
  });
});

describe("xmlUnescape", () => {
  it("识别 5 个命名实体", () => {
    expect(xmlUnescape("a&amp;b&lt;c&gt;d&quot;e&apos;f")).toBe("a&b<c>d\"e'f");
  });

  it("识别十进制与十六进制数字实体", () => {
    expect(xmlUnescape("A&#65;&#x42;")).toBe("AAB");
    expect(xmlUnescape("&#x4E2D;&#x6587;")).toBe("中文");
  });

  it("无实体的字符串原样返回", () => {
    expect(xmlUnescape("plain text")).toBe("plain text");
  });

  it("未终止的 & 抛错", () => {
    expect(() => xmlUnescape("ab&amp")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("空实体抛错", () => {
    expect(() => xmlUnescape("a&;b")).toThrowError(OpenXmlPackageError);
  });

  it("拒绝未知命名实体（无外部 DTD 支持）", () => {
    expect(() => xmlUnescape("&nbsp;")).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("拒绝非法十六进制数字", () => {
    expect(() => xmlUnescape("&#xZZ;")).toThrowError(OpenXmlPackageError);
  });

  it("拒绝越界码点", () => {
    expect(() => xmlUnescape("&#x110000;")).toThrowError(OpenXmlPackageError);
  });
});
