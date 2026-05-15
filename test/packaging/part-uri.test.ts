import { describe, expect, it } from "vitest";
import { isPartUri, tryPartUri } from "../../src/packaging/interfaces/types.js";

describe("PartUri 校验", () => {
  describe("isPartUri", () => {
    it.each([
      ["/word/document.xml"],
      ["/xl/worksheets/sheet1.xml"],
      ["/ppt/slides/slide1.xml"],
      ["/[Content_Types].xml"],
      ["/_rels/.rels"],
      ["/docProps/core.xml"],
      ["/word/_rels/document.xml.rels"],
    ])("接受合法 OPC URI %s", (uri) => {
      expect(isPartUri(uri)).toBe(true);
    });

    it.each([
      ["", "空字符串"],
      ["/", "仅根（OPC 规定包根不是 Part）"],
      ["word/document.xml", "缺前导 /"],
      ["//word/document.xml", "双斜线"],
      ["/word//document.xml", "中间双斜线"],
      ["/word/", "末尾斜线"],
      ["/word/../etc/passwd", "包含 ..  segment"],
      ["/./document.xml", "包含 . segment"],
    ])("拒绝 %s（%s）", (uri) => {
      expect(isPartUri(uri)).toBe(false);
    });

    it("拒绝非字符串", () => {
      expect(isPartUri(undefined)).toBe(false);
      expect(isPartUri(null)).toBe(false);
      expect(isPartUri(123)).toBe(false);
      expect(isPartUri({ toString: () => "/foo.xml" })).toBe(false);
    });
  });

  describe("tryPartUri", () => {
    it("合法输入返回原值（已 brand）", () => {
      const uri = tryPartUri("/word/document.xml");
      expect(uri).toBe("/word/document.xml");
    });

    it("非法输入返回 undefined", () => {
      expect(tryPartUri("")).toBeUndefined();
      expect(tryPartUri("relative")).toBeUndefined();
      expect(tryPartUri("/bad/../path")).toBeUndefined();
    });
  });
});
