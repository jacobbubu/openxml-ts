/**
 * Story-3.4 验证：SharedStringResolver + Cell.resolvedText partial mixin。
 *
 * 覆盖 sharedString / inlineStr / numeric / 孤儿 / intern 去重 5 类场景，
 * 加 resolve 越界、富文本 `<r><t>` 拼接、注册机制 WeakMap 行为各 1 条。
 */

import { describe, expect, it } from "vitest";
import { CellValue } from "../../src/excel/generated/cell-value.js";
import { Cell } from "../../src/excel/generated/cell.js";
import { InlineString } from "../../src/excel/generated/inline-string.js";
import { Row } from "../../src/excel/generated/row.js";
import { Run } from "../../src/excel/generated/run.js";
import { SharedStringItem } from "../../src/excel/generated/shared-string-item.js";
import { SharedStringTable } from "../../src/excel/generated/shared-string-table.js";
import { SheetData } from "../../src/excel/generated/sheet-data.js";
import { Text } from "../../src/excel/generated/text.js";
import { Worksheet } from "../../src/excel/generated/worksheet.js";
import {
  SharedStringResolver,
  registerSharedStringResolver,
} from "../../src/excel/shared-string-table.js";
// 必须导入扩展模块以挂上 Cell.prototype.resolvedText
import "../../src/excel/extensions/cell-extensions.js";

function makeSst(...phrases: readonly string[]): SharedStringTable {
  const sst = new SharedStringTable();
  for (const p of phrases) {
    const si = new SharedStringItem();
    const t = new Text();
    t.text = p;
    si.appendChild(t);
    sst.appendChild(si);
  }
  return sst;
}

function makeCellInWorksheet(opts: {
  dataType?: string;
  cellValueText?: string;
  inline?: string;
}): { worksheet: Worksheet; cell: Cell } {
  const worksheet = new Worksheet();
  const sd = new SheetData();
  const row = new Row();
  const cell = new Cell();
  if (opts.dataType !== undefined) cell.extendedAttributes.set("t", opts.dataType);
  if (opts.cellValueText !== undefined) {
    const v = new CellValue();
    v.text = opts.cellValueText;
    cell.appendChild(v);
  }
  if (opts.inline !== undefined) {
    const is = new InlineString();
    const t = new Text();
    t.text = opts.inline;
    is.appendChild(t);
    cell.appendChild(is);
  }
  row.appendChild(cell);
  sd.appendChild(row);
  worksheet.appendChild(sd);
  return { worksheet, cell };
}

describe("SharedStringResolver · resolve", () => {
  it("简单 `<si><t>` → 解出原始文本", () => {
    const sst = makeSst("Apple", "Banana", "Cherry");
    const r = new SharedStringResolver(sst);
    expect(r.resolve(0)).toBe("Apple");
    expect(r.resolve(1)).toBe("Banana");
    expect(r.resolve(2)).toBe("Cherry");
  });

  it("富文本 `<si><r><t>` 多段 → 拼接所有 `<t>`", () => {
    const sst = new SharedStringTable();
    const si = new SharedStringItem();
    for (const segment of ["Hello", " ", "World"]) {
      const r = new Run();
      const t = new Text();
      t.text = segment;
      r.appendChild(t);
      si.appendChild(r);
    }
    sst.appendChild(si);
    expect(new SharedStringResolver(sst).resolve(0)).toBe("Hello World");
  });

  it("越界 / 负数 / 非整数 → undefined", () => {
    const sst = makeSst("only");
    const r = new SharedStringResolver(sst);
    expect(r.resolve(1)).toBeUndefined();
    expect(r.resolve(-1)).toBeUndefined();
    expect(r.resolve(1.5)).toBeUndefined();
  });
});

describe("SharedStringResolver · intern 强制去重", () => {
  it("新 phrase → 追加到表，返回新 index", () => {
    const sst = makeSst("Apple");
    const r = new SharedStringResolver(sst);
    const idx = r.intern("Banana");
    expect(idx).toBe(1);
    expect(r.resolve(1)).toBe("Banana");
  });

  it("已存在 phrase → 返回既有 index，不重复追加", () => {
    const sst = makeSst("Apple", "Banana");
    const r = new SharedStringResolver(sst);
    const before = [...sst.elements(SharedStringItem)].length;
    const idx = r.intern("Apple");
    const after = [...sst.elements(SharedStringItem)].length;
    expect(idx).toBe(0);
    expect(after).toBe(before);
  });

  it("intern 后即时可 resolve", () => {
    const sst = new SharedStringTable();
    const r = new SharedStringResolver(sst);
    const idx = r.intern("Fresh");
    expect(r.resolve(idx)).toBe("Fresh");
  });
});

describe("Cell.resolvedText · dataType 分派", () => {
  it('dataType="s" + 已注册 resolver → 解出共享串', () => {
    const sst = makeSst("Apple", "Banana");
    const resolver = new SharedStringResolver(sst);
    const { worksheet, cell } = makeCellInWorksheet({ dataType: "s", cellValueText: "1" });
    registerSharedStringResolver(worksheet, resolver);
    expect(cell.resolvedText).toBe("Banana");
  });

  it('dataType="inlineStr" → 拼 `<is><t>`', () => {
    const { cell } = makeCellInWorksheet({ dataType: "inlineStr", inline: "Inline phrase" });
    expect(cell.resolvedText).toBe("Inline phrase");
  });

  it("无 dataType（数字默认）→ 直接 cellValue.text", () => {
    const { cell } = makeCellInWorksheet({ cellValueText: "42" });
    expect(cell.resolvedText).toBe("42");
  });

  it('dataType="n" → 直接 cellValue.text', () => {
    const { cell } = makeCellInWorksheet({ dataType: "n", cellValueText: "3.14" });
    expect(cell.resolvedText).toBe("3.14");
  });

  it("孤儿 Cell（无 parent worksheet）→ undefined，不抛错", () => {
    const cell = new Cell();
    cell.extendedAttributes.set("t", "s");
    const v = new CellValue();
    v.text = "0";
    cell.appendChild(v);
    expect(() => cell.resolvedText).not.toThrow();
    expect(cell.resolvedText).toBeUndefined();
  });

  it('dataType="s" + worksheet 未注册 resolver → undefined', () => {
    const { cell } = makeCellInWorksheet({ dataType: "s", cellValueText: "0" });
    expect(cell.resolvedText).toBeUndefined();
  });

  it('dataType="s" + index 越界 → undefined', () => {
    const sst = makeSst("Apple");
    const resolver = new SharedStringResolver(sst);
    const { worksheet, cell } = makeCellInWorksheet({ dataType: "s", cellValueText: "99" });
    registerSharedStringResolver(worksheet, resolver);
    expect(cell.resolvedText).toBeUndefined();
  });
});
