/**
 * Epic-120-follow sanity smoke：WorkbookPart (16) + WorksheetPart (10) 扩展 typed Part getter。
 *
 * 验证契约：
 * - Single getter：part 不存在时返回 undefined（不抛）；二次访问同 undefined（缓存 null）
 * - Collection getter：part 不存在时返回空数组（不抛）
 * - static contentType / relationshipType 可访问且非空
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry } from "../../src/element/index.js";
import { registerSpreadsheetElements } from "../../src/excel/generated/_registry.js";
import {
  CellMetadataPart,
  NamedSheetViewsPart,
  PivotTableCacheDefinitionPart,
  PivotTablePart,
  QueryTablePart,
  RdArrayPart,
  RdRichValuePart,
  RdRichValueStructurePart,
  RdRichValueTypesPart,
  RdRichValueWebImagePart,
  RdSupportingPropertyBagPart,
  RdSupportingPropertyBagStructurePart,
  RichStylesPart,
  SingleCellTablePart,
  SpreadsheetPrinterSettingsPart,
  TableDefinitionPart,
  VbaProjectPart,
  VmlDrawingPart,
  VolatileDependenciesPart,
  WorkbookPart,
  WorkbookPersonPart,
  WorkbookRevisionHeaderPart,
  WorkbookRevisionLogPart,
  WorkbookUserDataPart,
  WorksheetCommentsPart,
  WorksheetPart,
  WorksheetSortMapPart,
  WorksheetThreadedCommentsPart,
} from "../../src/excel/parts/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";

const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerSpreadsheetElements(r);
  return r;
}

/** 构造最小空工作簿 pkg + WorkbookPart（无任何扩展关系）。 */
async function makeEmptyWorkbookPart(): Promise<WorkbookPart> {
  const pkg = createInMemory();
  const part = pkg.createPart("/xl/workbook.xml" as PartUri, WorkbookPart.contentType);
  await part.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);
  return new WorkbookPart(part, makeRegistry(), pkg);
}

/** 构造最小空工作表 pkg + WorksheetPart（无任何扩展关系）。 */
async function makeEmptyWorksheetPart(): Promise<WorksheetPart> {
  const pkg = createInMemory();
  const part = pkg.createPart("/xl/worksheets/sheet1.xml" as PartUri, WorksheetPart.contentType);
  await part.writeAsync(`<x:worksheet xmlns:x="${XNS}"><x:sheetData/></x:worksheet>`);
  return new WorksheetPart(part, makeRegistry());
}

// ──────────────────────────────────────────────────────────────────────────────
// WorkbookPart 扩展 Part 静态常量
// ──────────────────────────────────────────────────────────────────────────────

describe("Epic-120 Excel WorkbookPart 扩展 Part 静态常量", () => {
  const singleParts = [
    CellMetadataPart,
    VolatileDependenciesPart,
    WorkbookRevisionHeaderPart,
    WorkbookUserDataPart,
    VbaProjectPart,
    RdRichValueWebImagePart,
  ] as const;

  const collectionParts = [
    WorkbookPersonPart,
    WorkbookRevisionLogPart,
    PivotTableCacheDefinitionPart,
    RdArrayPart,
    RdRichValuePart,
    RdRichValueStructurePart,
    RdRichValueTypesPart,
    RdSupportingPropertyBagPart,
    RdSupportingPropertyBagStructurePart,
    RichStylesPart,
  ] as const;

  for (const Ctor of [...singleParts, ...collectionParts]) {
    it(`${Ctor.name} contentType / relationshipType 非空`, () => {
      expect(Ctor.contentType).toBeTruthy();
      expect(Ctor.relationshipType).toBeTruthy();
    });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// WorkbookPart single getter：缺 Part → undefined（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("WorkbookPart single getter 缺 Part → undefined", () => {
  it("cellMetadataPart 无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.cellMetadataPart).toBeUndefined();
    expect(wp.cellMetadataPart).toBeUndefined();
  });

  it("volatileDependenciesPart 无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.volatileDependenciesPart).toBeUndefined();
    expect(wp.volatileDependenciesPart).toBeUndefined();
  });

  it("workbookRevisionHeaderPart 无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.workbookRevisionHeaderPart).toBeUndefined();
    expect(wp.workbookRevisionHeaderPart).toBeUndefined();
  });

  it("workbookUserDataPart 无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.workbookUserDataPart).toBeUndefined();
    expect(wp.workbookUserDataPart).toBeUndefined();
  });

  it("vbaProjectPart（WorkbookPart）无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.vbaProjectPart).toBeUndefined();
    expect(wp.vbaProjectPart).toBeUndefined();
  });

  it("rdRichValueWebImagePart 无关系 → undefined；二访同样", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdRichValueWebImagePart).toBeUndefined();
    expect(wp.rdRichValueWebImagePart).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// WorkbookPart collection getter：缺 Part → 空数组（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("WorkbookPart collection getter 缺 Part → 空数组", () => {
  it("workbookPersonParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    const parts = wp.workbookPersonParts;
    expect(Array.isArray(parts)).toBe(true);
    expect(parts.length).toBe(0);
  });

  it("workbookRevisionLogParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.workbookRevisionLogParts.length).toBe(0);
  });

  it("pivotTableCacheDefinitionParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.pivotTableCacheDefinitionParts.length).toBe(0);
  });

  it("rdArrayParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdArrayParts.length).toBe(0);
  });

  it("rdRichValueParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdRichValueParts.length).toBe(0);
  });

  it("rdRichValueStructureParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdRichValueStructureParts.length).toBe(0);
  });

  it("rdRichValueTypesParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdRichValueTypesParts.length).toBe(0);
  });

  it("rdSupportingPropertyBagParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdSupportingPropertyBagParts.length).toBe(0);
  });

  it("rdSupportingPropertyBagStructureParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.rdSupportingPropertyBagStructureParts.length).toBe(0);
  });

  it("richStylesParts 无关系 → 空数组", async () => {
    const wp = await makeEmptyWorkbookPart();
    expect(wp.richStylesParts.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// WorkbookPart 端到端：有真实关系时能解出实例
// ──────────────────────────────────────────────────────────────────────────────

describe("WorkbookPart single getter 有关系 → 返回实例", () => {
  it("cellMetadataPart 有关系 → 实例；二访同实例", async () => {
    const pkg = createInMemory();
    const wbPart = pkg.createPart("/xl/workbook.xml" as PartUri, WorkbookPart.contentType);
    await wbPart.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    pkg.createPart("/xl/metadata.xml" as PartUri, CellMetadataPart.contentType);
    await pkg.getPart("/xl/metadata.xml" as PartUri).writeAsync("<root/>");
    wbPart.relationships.create({
      type: CellMetadataPart.relationshipType,
      target: "metadata.xml",
      targetMode: "internal",
    });

    const wp = new WorkbookPart(wbPart, makeRegistry(), pkg);
    const resolved = wp.cellMetadataPart;
    expect(resolved).toBeInstanceOf(CellMetadataPart);
    expect(wp.cellMetadataPart).toBe(resolved);
  });

  it("workbookPersonParts 有 2 个关系 → 长度 2；二访同数组", async () => {
    const pkg = createInMemory();
    const wbPart = pkg.createPart("/xl/workbook.xml" as PartUri, WorkbookPart.contentType);
    await wbPart.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    for (const name of ["person1", "person2"]) {
      pkg.createPart(`/xl/${name}.xml` as PartUri, WorkbookPersonPart.contentType);
      await pkg.getPart(`/xl/${name}.xml` as PartUri).writeAsync("<root/>");
      wbPart.relationships.create({
        type: WorkbookPersonPart.relationshipType,
        target: `${name}.xml`,
        targetMode: "internal",
      });
    }

    const wp = new WorkbookPart(wbPart, makeRegistry(), pkg);
    const parts = wp.workbookPersonParts;
    expect(parts.length).toBe(2);
    expect(parts[0]).toBeInstanceOf(WorkbookPersonPart);
    expect(wp.workbookPersonParts).toBe(parts);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// WorksheetPart 扩展 Part 静态常量
// ──────────────────────────────────────────────────────────────────────────────

describe("Epic-120 Excel WorksheetPart 扩展 Part 静态常量", () => {
  const parts = [
    WorksheetCommentsPart,
    WorksheetSortMapPart,
    SingleCellTablePart,
    WorksheetThreadedCommentsPart,
    NamedSheetViewsPart,
    PivotTablePart,
    QueryTablePart,
    TableDefinitionPart,
    VmlDrawingPart,
    SpreadsheetPrinterSettingsPart,
  ] as const;

  for (const Ctor of parts) {
    it(`${Ctor.name} contentType / relationshipType 非空`, () => {
      expect(Ctor.contentType).toBeTruthy();
      expect(Ctor.relationshipType).toBeTruthy();
    });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// WorksheetPart single getter：缺 Part → undefined（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("WorksheetPart single getter 缺 Part → undefined", () => {
  it("worksheetCommentsPart 无关系 → undefined；二访同样", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.worksheetCommentsPart).toBeUndefined();
    expect(wsp.worksheetCommentsPart).toBeUndefined();
  });

  it("worksheetSortMapPart 无关系 → undefined；二访同样", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.worksheetSortMapPart).toBeUndefined();
    expect(wsp.worksheetSortMapPart).toBeUndefined();
  });

  it("singleCellTablePart 无关系 → undefined；二访同样", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.singleCellTablePart).toBeUndefined();
    expect(wsp.singleCellTablePart).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// WorksheetPart collection getter：缺 Part → 空数组（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("WorksheetPart collection getter 缺 Part → 空数组", () => {
  it("worksheetThreadedCommentsParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.worksheetThreadedCommentsParts.length).toBe(0);
  });

  it("namedSheetViewsParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.namedSheetViewsParts.length).toBe(0);
  });

  it("pivotTableParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.pivotTableParts.length).toBe(0);
  });

  it("queryTableParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.queryTableParts.length).toBe(0);
  });

  it("tableDefinitionParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.tableDefinitionParts.length).toBe(0);
  });

  it("vmlDrawingParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.vmlDrawingParts.length).toBe(0);
  });

  it("spreadsheetPrinterSettingsParts 无关系 → 空数组", async () => {
    const wsp = await makeEmptyWorksheetPart();
    expect(wsp.spreadsheetPrinterSettingsParts.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// WorksheetPart 端到端：有真实关系时能解出实例
// ──────────────────────────────────────────────────────────────────────────────

describe("WorksheetPart single getter 有关系 → 返回实例", () => {
  it("worksheetCommentsPart 有关系 → 实例；二访同实例", async () => {
    const pkg = createInMemory();
    const wsRaw = pkg.createPart("/xl/worksheets/sheet1.xml" as PartUri, WorksheetPart.contentType);
    await wsRaw.writeAsync(`<x:worksheet xmlns:x="${XNS}"><x:sheetData/></x:worksheet>`);

    pkg.createPart("/xl/comments1.xml" as PartUri, WorksheetCommentsPart.contentType);
    await pkg.getPart("/xl/comments1.xml" as PartUri).writeAsync("<root/>");
    wsRaw.relationships.create({
      type: WorksheetCommentsPart.relationshipType,
      target: "../comments1.xml",
      targetMode: "internal",
    });

    const wsp = new WorksheetPart(wsRaw, makeRegistry());
    const resolved = wsp.worksheetCommentsPart;
    expect(resolved).toBeInstanceOf(WorksheetCommentsPart);
    expect(wsp.worksheetCommentsPart).toBe(resolved);
  });

  it("spreadsheetPrinterSettingsParts 有 1 个关系 → 长度 1", async () => {
    const pkg = createInMemory();
    const wsRaw = pkg.createPart("/xl/worksheets/sheet1.xml" as PartUri, WorksheetPart.contentType);
    await wsRaw.writeAsync(`<x:worksheet xmlns:x="${XNS}"><x:sheetData/></x:worksheet>`);

    pkg.createPart(
      "/xl/printerSettings/printerSettings1.bin" as PartUri,
      SpreadsheetPrinterSettingsPart.contentType,
    );
    wsRaw.relationships.create({
      type: SpreadsheetPrinterSettingsPart.relationshipType,
      target: "../printerSettings/printerSettings1.bin",
      targetMode: "internal",
    });

    const wsp = new WorksheetPart(wsRaw, makeRegistry());
    const parts = wsp.spreadsheetPrinterSettingsParts;
    expect(parts.length).toBe(1);
    expect(parts[0]).toBeInstanceOf(SpreadsheetPrinterSettingsPart);
  });
});
