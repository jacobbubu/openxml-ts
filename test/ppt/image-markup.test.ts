/**
 * Story-12.3：PPT `createImagePictureForPpt` 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { createImagePictureForPpt } from "../../src/ppt/index.js";

describe("createImagePictureForPpt（Story-12.3）", () => {
  it("一行生成 <p:pic> shape，含完整 nvPicPr / blipFill / spPr", () => {
    const pic = createImagePictureForPpt(
      "rId3",
      { xEmu: 914400, yEmu: 914400 },
      { cxEmu: 4572000, cyEmu: 3429000 },
      { id: 7, name: "Hero" },
    );
    const xml = serialize(pic);

    expect(xml).toContain("<p:pic");
    expect(xml).toContain('<p:cNvPr id="7" name="Hero"');
    expect(xml).toContain('<a:picLocks noChangeAspect="1"');
    expect(xml).toContain(
      '<a:blip xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:embed="rId3"',
    );
    expect(xml).toContain('<a:off x="914400" y="914400"');
    expect(xml).toContain('<a:ext cx="4572000" cy="3429000"');
    expect(xml).toContain('<a:prstGeom prst="rect"');
  });

  it("descr 通过 cNvPr.descr 透传", () => {
    const pic = createImagePictureForPpt(
      "rId1",
      { xEmu: 0, yEmu: 0 },
      { cxEmu: 1, cyEmu: 1 },
      { id: 4, name: "X", descr: "Alt text 内容" },
    );
    const xml = serialize(pic);
    expect(xml).toContain('descr="Alt text 内容"');
  });
});
