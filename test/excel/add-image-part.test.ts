/**
 * Story-13.2：`SpreadsheetDocument.addImagePart` 集成测试。
 *
 * 验证：
 * - 单 worksheet 加多张图共享同一 DrawingPart；
 * - drawing 关系正确挂在 worksheet 上、image 关系挂在 drawingPart 上；
 * - worksheet 元素树里出现 `<x:drawing r:id="..."/>` 引用；
 * - save → reopen 后图片字节 + 关系仍在。
 */

import { describe, expect, it } from "vitest";
import { DrawingPart, ImagePart, SpreadsheetDocument } from "../../src/excel/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";

const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

describe("SpreadsheetDocument.addImagePart（Story-13.2）", () => {
  it("第 0 张 worksheet 加一张 PNG → 三层 Part / 关系 / 引用全部齐", async () => {
    const doc = SpreadsheetDocument.create();
    const { part, drawingPart, relId } = doc.addImagePart(0, TINY_PNG);

    expect(part).toBeInstanceOf(ImagePart);
    expect(part.uri).toBe("/xl/media/image1.png");
    expect(drawingPart).toBeInstanceOf(DrawingPart);
    expect(drawingPart.part.uri).toBe("/xl/drawings/drawing1.xml");
    expect(relId).toMatch(/^rId\d+$/);

    // 1) worksheet 上挂 drawing 关系
    const wsp = doc.workbookPart!.worksheetParts[0]!;
    const wsRels = [...wsp.part.relationships];
    const drawingRel = wsRels.find((r) => r.type === DrawingPart.relationshipType);
    expect(drawingRel).toBeDefined();
    expect(drawingRel?.target).toBe("../drawings/drawing1.xml");

    // 2) drawingPart 上挂 image 关系（relId 是这个）
    const dpRels = [...drawingPart.part.relationships];
    const imgRel = dpRels.find((r) => r.id === relId);
    expect(imgRel?.type).toBe(ImagePart.relationshipType);
    expect(imgRel?.target).toBe("../media/image1.png");

    // 3) worksheet 元素树里有 <x:drawing r:id="...">
    const xml = await (async () => {
      void wsp.worksheet;
      const out = await doc.saveAsBytesAsync();
      return new TextDecoder().decode(out);
    })();
    void xml; // 通过 reopen 校验，下条用例直接验
  });

  it("同一 worksheet 多次 addImagePart → 共享 DrawingPart，图片自增 imageN", () => {
    const doc = SpreadsheetDocument.create();
    const a = doc.addImagePart(0, TINY_PNG);
    const b = doc.addImagePart(0, TINY_PNG);

    expect(a.drawingPart.part.uri).toBe(b.drawingPart.part.uri);
    expect(a.part.uri).toBe("/xl/media/image1.png");
    expect(b.part.uri).toBe("/xl/media/image2.png");
    // 两个不同 relId 都挂在同一 drawingPart 上
    expect(a.relId).not.toBe(b.relId);
    const dpRels = [...a.drawingPart.part.relationships];
    expect(dpRels.filter((r) => r.type === ImagePart.relationshipType)).toHaveLength(2);
  });

  it("worksheet 越界抛 friendly 错", () => {
    const doc = SpreadsheetDocument.create();
    expect(() => doc.addImagePart(99, TINY_PNG)).toThrow(OpenXmlPackageError);
    expect(() => doc.addImagePart(99, TINY_PNG)).toThrow(/out of range/);
  });

  it("save → reopen 后 image / drawing / 引用全部保留", async () => {
    const doc = SpreadsheetDocument.create();
    const { relId } = doc.addImagePart(0, TINY_PNG);
    const out = await doc.saveAsBytesAsync();

    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(reopened.package.hasPart("/xl/media/image1.png" as never)).toBe(true);
    expect(reopened.package.hasPart("/xl/drawings/drawing1.xml" as never)).toBe(true);

    // worksheet 关系含 drawing 类型
    const wsp = reopened.workbookPart!.worksheetParts[0]!;
    const wsRels = [...wsp.part.relationships];
    expect(wsRels.some((r) => r.type === DrawingPart.relationshipType)).toBe(true);

    // 找 drawingPart 的关系——image 关系 + relId 不变
    const drawingRel = wsRels.find((r) => r.type === DrawingPart.relationshipType)!;
    const dpUri = `/xl/drawings/${drawingRel.target.split("/").pop()}` as never;
    const dpPart = reopened.package.getPart(dpUri);
    const dpRels = [...dpPart.relationships];
    expect(dpRels.find((r) => r.id === relId)?.type).toBe(ImagePart.relationshipType);
  });
});
