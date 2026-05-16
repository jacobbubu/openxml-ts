/**
 * Story-3.5 端到端验证：SpreadsheetDocument 强类型门面 + create() 工厂。
 *
 * 覆盖：
 * - openAsync / saveAsBytesAsync / saveAsAsync / dispose / asyncDispose
 * - create() 最小可用空白 xlsx → save → reopen 三轮等价
 * - typed Part 多次访问同实例（缓存）
 * - workbookPart 之外的 part-level typed Part 获取
 * - SST resolver 自动注册：openAsync 后 cell.resolvedText 可解 sharedString
 * - PackageDiagnostics elementCounter 注册：未触碰 = 0；触碰 mainDoc = > 0
 */

import { describe, expect, it } from "vitest";
import {
  Cell,
  CellValue,
  Row,
  SharedStringItem,
  SheetData,
  SpreadsheetDocument,
  Text,
} from "../../src/excel/index.js";

describe("SpreadsheetDocument · create() 最小可用空白 xlsx", () => {
  it("create + saveAsBytes + openAsync 三轮等价", async () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.workbookPart).toBeDefined();
    expect(doc.workbookPart?.worksheetParts).toHaveLength(1);
    expect(doc.sharedStringTablePart).toBeDefined();

    const out = await doc.saveAsBytesAsync();
    expect(out.byteLength).toBeGreaterThan(0);

    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(reopened.workbookPart).toBeDefined();
    expect(reopened.workbookPart?.worksheetParts).toHaveLength(1);
    expect(reopened.sharedStringTablePart?.sharedStringTable.localName).toBe("sst");
  });

  it("默认 Sheet1 的 worksheet root 是空 SheetData，能继续追加 Row/Cell", async () => {
    const doc = SpreadsheetDocument.create();
    const wsp = doc.workbookPart?.worksheetParts[0];
    expect(wsp).toBeDefined();
    const ws = wsp!.worksheet;
    const sd = ws.firstChild(SheetData);
    expect(sd).toBeDefined();

    const r = new Row();
    const c = new Cell();
    const v = new CellValue();
    v.text = "42";
    c.appendChild(v);
    r.appendChild(c);
    sd!.appendChild(r);

    const out = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(out);
    const reSd = reopened.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData)!;
    const reRow = reSd.firstChild(Row)!;
    const reCell = reRow.firstChild(Cell)!;
    expect(reCell.firstChild(CellValue)?.text).toBe("42");
  });
});

describe("SpreadsheetDocument · typed Part 缓存", () => {
  it("workbookPart 多次访问返回同一实例", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.workbookPart).toBe(doc.workbookPart);
  });

  it("sharedStringTablePart / workbookStylesPart 多次访问同实例；CalcChain / Theme 缺关系返回 undefined", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.sharedStringTablePart).toBe(doc.sharedStringTablePart);
    expect(doc.workbookStylesPart).toBe(doc.workbookStylesPart);
    expect(doc.workbookStylesPart).toBeDefined(); // create() 现在 seed 一份最小 stylesheet
    // create() 没建 calcChain / theme 关系，应为 undefined
    expect(doc.calculationChainPart).toBeUndefined();
    expect(doc.themePart).toBeUndefined();
  });
});

describe("SpreadsheetDocument · SST resolver 自动注册", () => {
  it("openAsync 含 SST 的 xlsx 后，cell.resolvedText 能解 sharedString", async () => {
    // 先构造一份含 SST 的 xlsx
    const seed = SpreadsheetDocument.create();
    const wsp = seed.workbookPart!.worksheetParts[0]!;
    const sd = wsp.worksheet.firstChild(SheetData)!;
    const sstPart = seed.sharedStringTablePart!;

    // 用 SharedStringResolver.intern 添加一项
    const sst = sstPart.sharedStringTable;
    const si = new SharedStringItem();
    const t = new Text();
    t.text = "Apple";
    si.appendChild(t);
    sst.appendChild(si);

    // 添加 cell t="s" v=0 → 指向 "Apple"
    const r = new Row();
    const c = new Cell();
    c.extendedAttributes.set("t", "s");
    const v = new CellValue();
    v.text = "0";
    c.appendChild(v);
    r.appendChild(c);
    sd.appendChild(r);

    const out = await seed.saveAsBytesAsync();

    // 重新打开：自动注册 SST resolver
    const reopened = await SpreadsheetDocument.openAsync(out);
    const reWsp = reopened.workbookPart!.worksheetParts[0]!;
    const reCell = reWsp.worksheet.firstChild(SheetData)!.firstChild(Row)!.firstChild(Cell)!;
    expect(reCell.extendedAttributes.get("t")).toBe("s");
    expect(reCell.resolvedText).toBe("Apple");
  });
});

describe("SpreadsheetDocument · PackageDiagnostics elementCounter", () => {
  it("未触碰任何 typed Part 时 elementCount = 0", async () => {
    const doc = SpreadsheetDocument.create();
    const fresh = await SpreadsheetDocument.openAsync(await doc.saveAsBytesAsync());
    expect(fresh.package.diagnostics.elementCount).toBe(0);
  });

  it("触碰 workbookPart 后 elementCount > 0", async () => {
    const doc = SpreadsheetDocument.create();
    const fresh = await SpreadsheetDocument.openAsync(await doc.saveAsBytesAsync());
    void fresh.workbookPart;
    expect(fresh.package.diagnostics.elementCount).toBeGreaterThan(0);
    expect(fresh.package.diagnostics.unknownElementCount).toBe(0);
  });
});

describe("SpreadsheetDocument · 不破坏 v0.2.0 公共 API", () => {
  it("doc.package 仍是 IPackage，可读 parts/relationships", async () => {
    const doc = SpreadsheetDocument.create();
    expect([...doc.package.parts()].length).toBeGreaterThan(0);
    expect(doc.package.relationships.count).toBeGreaterThan(0);
  });

  it("await using dispose 流", async () => {
    let bytes: Uint8Array;
    {
      await using doc = SpreadsheetDocument.create();
      bytes = await doc.saveAsBytesAsync();
    }
    expect(bytes.byteLength).toBeGreaterThan(0);
  });
});
