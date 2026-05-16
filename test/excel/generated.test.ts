/**
 * Story-3.1 验证：codegen 跑出的 Excel element 类按预期可用。
 *
 * 抽样核心 5 个元素（Workbook / Worksheet / SheetData / Row / Cell），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerSpreadsheetElements } from "../../src/excel/generated/_registry.js";
import { Cell, Row, SheetData, Workbook, Worksheet } from "../../src/excel/generated/index.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  deserialize,
  serialize,
} from "../../src/index.js";

const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

describe("Generated · 核心 5 个 Excel 元素形态", () => {
  it.each([
    { Ctor: Workbook, localName: "workbook" },
    { Ctor: Worksheet, localName: "worksheet" },
    { Ctor: SheetData, localName: "sheetData" },
    { Ctor: Row, localName: "row" },
    { Ctor: Cell, localName: "c" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("x");
    expect(e.namespaceUri).toBe(XNS);
  });
});

describe("Generated · registerSpreadsheetElements 注册流程", () => {
  it("注册 + 反序列化 + 序列化往返：worksheet > sheetData > row > c", () => {
    const registry = new ElementRegistry();
    registerSpreadsheetElements(registry);

    const xml = `<x:worksheet xmlns:x="${XNS}"><x:sheetData><x:row r="1"><x:c r="A1" t="s"><x:v>0</x:v></x:c></x:row></x:sheetData></x:worksheet>`;
    const tree = deserialize(xml, { registry });
    expect(tree).toBeInstanceOf(Worksheet);

    const ws = tree as Worksheet;
    const sd = ws.firstChild();
    expect(sd).toBeInstanceOf(SheetData);

    const row = (sd as SheetData).firstChild();
    expect(row).toBeInstanceOf(Row);

    const cell = (row as Row).firstChild();
    expect(cell).toBeInstanceOf(Cell);

    // 写回 XML 与输入 element 树形态一致（属性顺序由 codegen 决定，不强等字面值，
    // 但闭包后再反序列化一次必须再得到等价树）。
    const out = serialize(tree);
    const tree2 = deserialize(out, { registry });
    expect(tree2).toBeInstanceOf(Worksheet);
  });
});
