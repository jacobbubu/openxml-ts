/**
 * Epic-45：Excel Cell.value typed 访问器单元测试。
 */

import { describe, expect, it } from "vitest";
import { StringValue, UInt32Value } from "../../src/element/index.js";
import {
  Cell,
  CellValue,
  InlineString,
  Row,
  SheetData,
  SpreadsheetDocument,
} from "../../src/excel/index.js";

// ─── getter：空 Cell ──────────────────────────────────────────────────────────

describe("Cell.value getter — 空 Cell", () => {
  it("空 Cell 返回 undefined", () => {
    expect(new Cell().value).toBeUndefined();
  });
});

// ─── setter + getter 基本类型 ─────────────────────────────────────────────────

describe("Cell.value setter/getter — number", () => {
  it("写 number 后读回为 number", () => {
    const c = new Cell();
    c.value = 42;
    expect(c.value).toBe(42);
  });

  it("写 number 后 dataType 为 undefined（默认 n）", () => {
    const c = new Cell();
    c.value = 3.14;
    expect(c.dataType).toBeUndefined();
    expect(c.firstChild(CellValue)?.text).toBe("3.14");
  });

  it("写 0 后读回为 0", () => {
    const c = new Cell();
    c.value = 0;
    expect(c.value).toBe(0);
  });

  it("写负数后读回为负数", () => {
    const c = new Cell();
    c.value = -99.5;
    expect(c.value).toBe(-99.5);
  });
});

describe("Cell.value setter/getter — string (inlineStr)", () => {
  it("写 string 后读回为 string", () => {
    const c = new Cell();
    c.value = "Apple";
    expect(c.value).toBe("Apple");
  });

  it("写 string 后 dataType = inlineStr", () => {
    const c = new Cell();
    c.value = "Hello";
    expect(c.dataType?.toString()).toBe("inlineStr");
  });

  it("写 string 后 <is><t> 存在，<v> 不存在", () => {
    const c = new Cell();
    c.value = "World";
    expect(c.firstChild(InlineString)).toBeDefined();
    expect(c.firstChild(CellValue)).toBeUndefined();
  });

  it("覆盖 string 值", () => {
    const c = new Cell();
    c.value = "First";
    c.value = "Second";
    expect(c.value).toBe("Second");
    // <is> 只有一个
    let count = 0;
    for (const child of c.children) if (child instanceof InlineString) count++;
    expect(count).toBe(1);
  });
});

describe("Cell.value setter/getter — boolean", () => {
  it("写 true 后读回为 true", () => {
    const c = new Cell();
    c.value = true;
    expect(c.value).toBe(true);
  });

  it("写 false 后读回为 false", () => {
    const c = new Cell();
    c.value = false;
    expect(c.value).toBe(false);
  });

  it("写 true 后 dataType = b，<v>.text = '1'", () => {
    const c = new Cell();
    c.value = true;
    expect(c.dataType?.toString()).toBe("b");
    expect(c.firstChild(CellValue)?.text).toBe("1");
  });

  it("写 false 后 <v>.text = '0'", () => {
    const c = new Cell();
    c.value = false;
    expect(c.firstChild(CellValue)?.text).toBe("0");
  });
});

describe("Cell.value setter/getter — Date", () => {
  it("写 Date 后读回为 number（Excel 序列号）", () => {
    const c = new Cell();
    // 2024-01-01 00:00:00 UTC
    c.value = new Date(Date.UTC(2024, 0, 1));
    const v = c.value;
    expect(typeof v).toBe("number");
    // Excel serial for 2024-01-01: days since 1899-12-30
    // rough check: between 45000 and 46000
    expect(v as number).toBeGreaterThan(45000);
    expect(v as number).toBeLessThan(46000);
  });

  it("写 Date 后 dataType 为 undefined", () => {
    const c = new Cell();
    c.value = new Date(Date.UTC(2024, 0, 1));
    expect(c.dataType).toBeUndefined();
  });
});

// ─── undefined 清除 ───────────────────────────────────────────────────────────

describe("Cell.value = undefined 清除状态", () => {
  it("清除 number value → undefined", () => {
    const c = new Cell();
    c.value = 42;
    c.value = undefined;
    expect(c.value).toBeUndefined();
    expect(c.firstChild(CellValue)).toBeUndefined();
  });

  it("清除 string value → undefined，<is> 被删除", () => {
    const c = new Cell();
    c.value = "test";
    c.value = undefined;
    expect(c.value).toBeUndefined();
    expect(c.firstChild(InlineString)).toBeUndefined();
    expect(c.dataType).toBeUndefined();
  });

  it("清除 boolean value → undefined", () => {
    const c = new Cell();
    c.value = true;
    c.value = undefined;
    expect(c.value).toBeUndefined();
    expect(c.dataType).toBeUndefined();
  });
});

// ─── isDirty 集成 ─────────────────────────────────────────────────────────────

describe("Cell.value setter 触发 isDirty", () => {
  it("写 number → isDirty = true", () => {
    const c = new Cell();
    c.value = 10;
    expect(c.isDirty).toBe(true);
  });

  it("写 boolean → isDirty = true", () => {
    const c = new Cell();
    c.value = false;
    expect(c.isDirty).toBe(true);
  });

  it("清除 number → isDirty = true", () => {
    const c = new Cell();
    c.value = 5;
    // 新建 doc 时 isDirty 被重置，这里直接测第二次 set
    c.value = undefined;
    expect(c.isDirty).toBe(true);
  });
});

// ─── 类型切换 ─────────────────────────────────────────────────────────────────

describe("Cell.value 类型切换", () => {
  it("number → string：切换后读回 string", () => {
    const c = new Cell();
    c.value = 99;
    c.value = "ninety-nine";
    expect(c.value).toBe("ninety-nine");
    expect(c.dataType?.toString()).toBe("inlineStr");
    expect(c.firstChild(CellValue)).toBeUndefined();
  });

  it("string → boolean：切换后读回 boolean", () => {
    const c = new Cell();
    c.value = "yes";
    c.value = true;
    expect(c.value).toBe(true);
    expect(c.dataType?.toString()).toBe("b");
    expect(c.firstChild(InlineString)).toBeUndefined();
  });

  it("boolean → number：切换后读回 number", () => {
    const c = new Cell();
    c.value = true;
    c.value = 7;
    expect(c.value).toBe(7);
    expect(c.dataType).toBeUndefined();
  });
});

// ─── str dataType（公式缓存值） ───────────────────────────────────────────────

describe("Cell.value getter — dataType='str'", () => {
  it("dataType='str' 时读回 <v> 文本原样返回", () => {
    const c = new Cell();
    c.dataType = StringValue.parse("str");
    const v = new CellValue();
    v.text = "formula result";
    c.appendChild(v);
    expect(c.value).toBe("formula result");
  });
});

// ─── Round-trip via SpreadsheetDocument ──────────────────────────────────────

describe("Cell.value 端到端 round-trip", () => {
  async function makeDocWithCells(): Promise<{
    bytes: Uint8Array;
    refs: { ref: string; value: number | string | boolean | Date | undefined }[];
  }> {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
    let sheetData = ws.firstChild(SheetData);
    if (sheetData === undefined) {
      sheetData = new SheetData();
      ws.appendChild(sheetData);
    }

    const refs: { ref: string; value: number | string | boolean | Date | undefined }[] = [
      { ref: "A1", value: 42 },
      { ref: "B1", value: "Apple" },
      { ref: "C1", value: true },
      { ref: "D1", value: false },
    ];

    const row = new Row();
    row.rowIndex = UInt32Value.parse("1");

    for (const { ref, value } of refs) {
      const cell = new Cell();
      cell.cellReference = StringValue.parse(ref);
      cell.value = value as number | string | boolean;
      row.appendChild(cell);
    }
    sheetData.appendChild(row);

    const bytes = await doc.saveAsBytesAsync();
    return { bytes, refs };
  }

  it("number round-trip: save → reopen 读回 number", async () => {
    const { bytes } = await makeDocWithCells();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];
    const a1 = cells.find((c) => c.cellReference?.toString() === "A1");
    expect(a1?.value).toBe(42);
  });

  it("string round-trip: save → reopen 读回 string", async () => {
    const { bytes } = await makeDocWithCells();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];
    const b1 = cells.find((c) => c.cellReference?.toString() === "B1");
    expect(b1?.value).toBe("Apple");
  });

  it("boolean true round-trip", async () => {
    const { bytes } = await makeDocWithCells();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];
    const c1 = cells.find((c) => c.cellReference?.toString() === "C1");
    expect(c1?.value).toBe(true);
  });

  it("boolean false round-trip", async () => {
    const { bytes } = await makeDocWithCells();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];
    const d1 = cells.find((c) => c.cellReference?.toString() === "D1");
    expect(d1?.value).toBe(false);
  });
});
