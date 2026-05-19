/**
 * Epic-28：Excel addDefinedName / removeDefinedName / listDefinedNames 集成测试。
 */

import { describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";

describe("SpreadsheetDocument.addDefinedName（Epic-28）", () => {
  it("第一次添加：自动创建 <definedNames> 容器", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.listDefinedNames()).toHaveLength(0);

    doc.addDefinedName("Range1", "'Sheet1'!$A$1:$B$5");
    const list = doc.listDefinedNames();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual({ name: "Range1", formula: "'Sheet1'!$A$1:$B$5" });
  });

  it("多次添加 → 全部列出", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("A", "Sheet1!$A$1");
    doc.addDefinedName("B", "Sheet1!$B$1");
    doc.addDefinedName("C", "Sheet1!$C$1");
    expect(doc.listDefinedNames().map((n) => n.name)).toEqual(["A", "B", "C"]);
  });

  it("localSheetId 区分 scope", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("Range1", "Sheet1!$A$1");
    doc.addDefinedName("Range1", "Sheet1!$A$2", { localSheetId: 0 });
    const list = doc.listDefinedNames();
    expect(list).toHaveLength(2);
    expect(list[0].localSheetId).toBeUndefined();
    expect(list[1].localSheetId).toBe(0);
  });

  it("hidden=true 透传", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("Secret", "Sheet1!$Z$1", { hidden: true });
    expect(doc.listDefinedNames()[0].hidden).toBe(true);
  });

  it("name 非法（空 / 超 255 字符）抛", () => {
    const doc = SpreadsheetDocument.create();
    expect(() => doc.addDefinedName("", "Sheet1!$A$1")).toThrow(/1\.\.255 chars/);
    expect(() => doc.addDefinedName("a".repeat(256), "Sheet1!$A$1")).toThrow(/1\.\.255 chars/);
  });

  it("同 scope 重名抛 friendly 错", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("X", "Sheet1!$A$1");
    expect(() => doc.addDefinedName("X", "Sheet1!$A$2")).toThrow(OpenXmlPackageError);
    expect(() => doc.addDefinedName("X", "Sheet1!$A$2")).toThrow(/already exists/);
  });

  it("不同 scope 同名允许", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("Same", "Sheet1!$A$1");
    doc.addDefinedName("Same", "Sheet1!$A$2", { localSheetId: 0 });
    expect(doc.listDefinedNames()).toHaveLength(2);
  });
});

describe("SpreadsheetDocument.removeDefinedName（Epic-28）", () => {
  it("找到则删除并返 true", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("ToRemove", "Sheet1!$A$1");
    expect(doc.removeDefinedName("ToRemove")).toBe(true);
    expect(doc.listDefinedNames()).toHaveLength(0);
  });

  it("找不到返 false", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.removeDefinedName("Nope")).toBe(false);
  });

  it("scope 不匹配返 false", () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("X", "Sheet1!$A$1");
    expect(doc.removeDefinedName("X", { localSheetId: 0 })).toBe(false);
    expect(doc.removeDefinedName("X")).toBe(true);
  });
});

describe("端到端 save → reopen 后 definedNames 保留", () => {
  it("加 + save + reopen 后 listDefinedNames 返同等内容", async () => {
    const doc = SpreadsheetDocument.create();
    doc.addDefinedName("R1", "Sheet1!$A$1:$B$5");
    doc.addDefinedName("R2", "Sheet1!$C$1", { localSheetId: 0, hidden: true });

    const out = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(out);
    const list = reopened.listDefinedNames();
    expect(list).toHaveLength(2);
    expect(list.find((n) => n.name === "R1")?.formula).toBe("Sheet1!$A$1:$B$5");
    expect(list.find((n) => n.name === "R2")?.localSheetId).toBe(0);
  });
});
