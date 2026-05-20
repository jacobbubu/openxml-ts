/**
 * Epic-58：Excel 数据验证便捷层单测。
 */

import { describe, expect, it } from "vitest";
import {
  DataValidations,
  SpreadsheetDocument,
  Worksheet,
  addCellListValidation,
  addCellRangeValidation,
  clearCellValidations,
  getCellValidations,
} from "../../src/excel/index.js";

describe("addCellListValidation", () => {
  it("空 worksheet 上添加列表验证 → 自动创建 dataValidations 元素", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["Apple", "Banana", "Cherry"] });
    const container = ws.firstChild(DataValidations);
    expect(container).toBeDefined();
  });

  it("列表验证 formula1 格式正确（引号内逗号分隔）", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["Apple", "Banana", "Cherry"] });
    const infos = getCellValidations(ws);
    expect(infos).toHaveLength(1);
    expect(infos[0]?.formula1).toBe('"Apple,Banana,Cherry"');
    expect(infos[0]?.type).toBe("list");
    expect(infos[0]?.sqref).toBe("A1:A10");
  });

  it("列表验证 count 属性同步正确", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["X", "Y"] });
    addCellListValidation(ws, "B1:B10", { values: ["P", "Q"] });
    const container = ws.firstChild(DataValidations);
    expect(container?.count?.toString()).toBe("2");
  });

  it("列表验证携带提示信息", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A5", {
      values: ["Yes", "No"],
      promptTitle: "请选择",
      prompt: "从列表中选择一个值",
      errorTitle: "无效输入",
      error: "请从下拉列表中选择",
    });
    const infos = getCellValidations(ws);
    expect(infos[0]?.promptTitle).toBe("请选择");
    expect(infos[0]?.prompt).toBe("从列表中选择一个值");
    expect(infos[0]?.errorTitle).toBe("无效输入");
    expect(infos[0]?.error).toBe("请从下拉列表中选择");
  });
});

describe("addCellRangeValidation", () => {
  it("整数范围验证 formula1/formula2 正确", () => {
    const ws = new Worksheet();
    addCellRangeValidation(ws, "B1:B10", { type: "whole", min: 1, max: 100 });
    const infos = getCellValidations(ws);
    expect(infos).toHaveLength(1);
    expect(infos[0]?.type).toBe("whole");
    expect(infos[0]?.operator).toBe("between");
    expect(infos[0]?.formula1).toBe("1");
    expect(infos[0]?.formula2).toBe("100");
    expect(infos[0]?.sqref).toBe("B1:B10");
  });

  it("小数范围验证", () => {
    const ws = new Worksheet();
    addCellRangeValidation(ws, "C1:C10", { type: "decimal", min: 0, max: 1 });
    const infos = getCellValidations(ws);
    expect(infos[0]?.type).toBe("decimal");
    expect(infos[0]?.formula1).toBe("0");
    expect(infos[0]?.formula2).toBe("1");
  });

  it("仅 min → operator 推断为 greaterThanOrEqual", () => {
    const ws = new Worksheet();
    addCellRangeValidation(ws, "D1:D10", { type: "whole", min: 5 });
    const infos = getCellValidations(ws);
    expect(infos[0]?.operator).toBe("greaterThanOrEqual");
    expect(infos[0]?.formula1).toBe("5");
    expect(infos[0]?.formula2).toBeUndefined();
  });

  it("仅 max → operator 推断为 lessThanOrEqual", () => {
    const ws = new Worksheet();
    addCellRangeValidation(ws, "E1:E10", { type: "whole", max: 99 });
    const infos = getCellValidations(ws);
    expect(infos[0]?.operator).toBe("lessThanOrEqual");
    expect(infos[0]?.formula2).toBe("99");
  });

  it("显式 operator 覆盖推断", () => {
    const ws = new Worksheet();
    addCellRangeValidation(ws, "F1:F10", {
      type: "whole",
      min: 10,
      operator: "greaterThan",
    });
    const infos = getCellValidations(ws);
    expect(infos[0]?.operator).toBe("greaterThan");
  });
});

describe("clearCellValidations", () => {
  it("清除指定 sqref 的验证规则", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["A", "B"] });
    addCellRangeValidation(ws, "B1:B10", { type: "whole", min: 1, max: 100 });
    clearCellValidations(ws, "A1:A10");
    const infos = getCellValidations(ws);
    expect(infos).toHaveLength(1);
    expect(infos[0]?.sqref).toBe("B1:B10");
  });

  it("清除最后一条验证后 dataValidations 元素自动删除", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["X"] });
    clearCellValidations(ws, "A1:A10");
    expect(ws.firstChild(DataValidations)).toBeUndefined();
    expect(getCellValidations(ws)).toEqual([]);
  });

  it("清除不存在的 sqref 静默跳过", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["X"] });
    expect(() => clearCellValidations(ws, "Z1:Z10")).not.toThrow();
    expect(getCellValidations(ws)).toHaveLength(1);
  });

  it("空 worksheet 上 clearCellValidations 不抛错", () => {
    const ws = new Worksheet();
    expect(() => clearCellValidations(ws, "A1:A10")).not.toThrow();
  });
});

describe("getCellValidations", () => {
  it("无验证时返回空数组", () => {
    const ws = new Worksheet();
    expect(getCellValidations(ws)).toEqual([]);
  });

  it("多范围多类型验证均能列出", () => {
    const ws = new Worksheet();
    addCellListValidation(ws, "A1:A10", { values: ["Yes", "No"] });
    addCellRangeValidation(ws, "B1:B10", { type: "whole", min: 1, max: 100 });
    addCellRangeValidation(ws, "C1:C10", { type: "decimal", min: 0, max: 1 });
    const infos = getCellValidations(ws);
    expect(infos).toHaveLength(3);
    expect(infos[0]?.type).toBe("list");
    expect(infos[1]?.type).toBe("whole");
    expect(infos[2]?.type).toBe("decimal");
  });
});

describe("round-trip", () => {
  it("通过 SpreadsheetDocument save → reopen 后验证规则仍在", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
    if (ws === undefined) throw new Error("expected worksheet");

    addCellListValidation(ws, "A1:A10", { values: ["Apple", "Banana"] });
    addCellRangeValidation(ws, "B1:B10", { type: "whole", min: 1, max: 100 });

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart?.worksheetParts[0]?.worksheet;
    if (reWs === undefined) throw new Error("expected worksheet after reopen");

    const infos = getCellValidations(reWs);
    expect(infos).toHaveLength(2);
    expect(infos[0]?.type).toBe("list");
    expect(infos[0]?.formula1).toBe('"Apple,Banana"');
    expect(infos[1]?.type).toBe("whole");
    expect(infos[1]?.formula1).toBe("1");
    expect(infos[1]?.formula2).toBe("100");

    const container = reWs.firstChild(DataValidations);
    expect(container?.count?.toString()).toBe("2");
  });

  it("clearCellValidations round-trip：清除后 reopen 验证不再存在", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
    if (ws === undefined) throw new Error("expected worksheet");

    addCellListValidation(ws, "A1:A10", { values: ["X", "Y"] });
    clearCellValidations(ws, "A1:A10");

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart?.worksheetParts[0]?.worksheet;
    if (reWs === undefined) throw new Error("expected worksheet after reopen");

    expect(getCellValidations(reWs)).toEqual([]);
    expect(reWs.firstChild(DataValidations)).toBeUndefined();
  });
});
