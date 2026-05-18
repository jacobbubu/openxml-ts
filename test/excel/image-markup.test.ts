/**
 * Story-13.3：Excel `createImageTwoCellAnchorForExcel` 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { createImageTwoCellAnchorForExcel } from "../../src/excel/index.js";

describe("createImageTwoCellAnchorForExcel（Story-13.3）", () => {
  it("一行生成完整 <xdr:twoCellAnchor>", () => {
    const anchor = createImageTwoCellAnchorForExcel(
      "rId1",
      { col: 1, row: 1 },
      { col: 5, row: 10 },
    );
    const xml = serialize(anchor);

    expect(xml).toContain('<xdr:twoCellAnchor editAs="oneCell">');
    expect(xml).toContain("<xdr:from>");
    expect(xml).toContain("<xdr:col>1</xdr:col>");
    expect(xml).toContain("<xdr:row>1</xdr:row>");
    expect(xml).toContain("<xdr:colOff>0</xdr:colOff>");
    expect(xml).toContain("<xdr:rowOff>0</xdr:rowOff>");
    expect(xml).toContain("</xdr:from>");
    expect(xml).toContain("<xdr:to>");
    expect(xml).toContain("<xdr:col>5</xdr:col>");
    expect(xml).toContain("<xdr:row>10</xdr:row>");
    expect(xml).toContain("</xdr:to>");
    expect(xml).toContain('<a:blip r:embed="rId1"');
    expect(xml).toContain('<a:prstGeom prst="rect"');
    expect(xml).toContain("<xdr:clientData/>");
  });

  it("colOff/rowOff 默认 0；可显式给 EMU 偏移", () => {
    const anchor = createImageTwoCellAnchorForExcel(
      "rId2",
      { col: 0, row: 0, colOffEmu: 12345, rowOffEmu: 67890 },
      { col: 2, row: 5 },
    );
    const xml = serialize(anchor);
    expect(xml).toContain("<xdr:colOff>12345</xdr:colOff>");
    expect(xml).toContain("<xdr:rowOff>67890</xdr:rowOff>");
  });

  it("editAs 可改 twoCell / absolute", () => {
    const a1 = createImageTwoCellAnchorForExcel(
      "r",
      { col: 0, row: 0 },
      { col: 1, row: 1 },
      { editAs: "twoCell" },
    );
    expect(serialize(a1)).toContain('editAs="twoCell"');

    const a2 = createImageTwoCellAnchorForExcel(
      "r",
      { col: 0, row: 0 },
      { col: 1, row: 1 },
      { editAs: "absolute" },
    );
    expect(serialize(a2)).toContain('editAs="absolute"');
  });

  it("name / id / descr 全部透传到 cNvPr", () => {
    const anchor = createImageTwoCellAnchorForExcel(
      "rId1",
      { col: 0, row: 0 },
      { col: 1, row: 1 },
      { id: 42, name: "Hero", descr: "Alt 文字" },
    );
    const xml = serialize(anchor);
    expect(xml).toContain('id="42"');
    expect(xml).toContain('name="Hero"');
    expect(xml).toContain('descr="Alt 文字"');
  });
});
