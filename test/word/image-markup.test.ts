/**
 * Story-12.3：Word `createImageRunForWord` 单元测试。
 *
 * 验输出的 Run XML 字节级形状——包含 `<w:drawing>` / `<wp:inline>` / `<a:graphic>` /
 * `<pic:pic>` 完整链路 + `r:embed` 引用入参 relId。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { createImageRunForWord } from "../../src/word/index.js";

describe("createImageRunForWord（Story-12.3）", () => {
  it("一行生成可挂的 Run，xml 含完整 drawing 链", () => {
    const run = createImageRunForWord("rId7", 2000000, 1500000, { name: "Logo" });
    const xml = serialize(run);

    expect(xml).toContain("<w:drawing>");
    expect(xml).toContain('<wp:inline distT="0" distB="0" distL="0" distR="0">');
    expect(xml).toContain('<wp:extent cx="2000000" cy="1500000"');
    expect(xml).toContain('<wp:docPr id="1" name="Logo"');
    expect(xml).toContain('uri="http://schemas.openxmlformats.org/drawingml/2006/picture"');
    expect(xml).toContain("<pic:pic");
    expect(xml).toContain('<a:blip r:embed="rId7"');
    expect(xml).toContain('<a:ext cx="2000000" cy="1500000"');
    expect(xml).toContain('<a:prstGeom prst="rect"');
  });

  it("可选 descr 通过 wp:docPr.descr 透传", () => {
    const run = createImageRunForWord("rId1", 100, 100, {
      id: 3,
      name: "Hero",
      descr: "公司 logo",
    });
    const xml = serialize(run);
    expect(xml).toContain('<wp:docPr id="3" name="Hero" descr="公司 logo"');
  });

  it("Run 自身声明 4 个外部 namespace 让其独立 serialize 时合法", () => {
    const xml = serialize(createImageRunForWord("rId1", 1, 1));
    expect(xml).toContain(
      'xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"',
    );
    expect(xml).toContain('xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"');
    expect(xml).toContain('xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"');
    expect(xml).toContain(
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"',
    );
  });
});
