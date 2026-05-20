/**
 * Epic-58：Excel 数据验证便捷层。
 *
 * 给 `<x:worksheet>` 管理数据验证（`<x:dataValidations>` / `<x:dataValidation>`）：
 *   - 自动创建 `<x:dataValidations>`，放在 `<x:sheetData>` 之后（OOXML schema 顺序）
 *   - 同步 `count` 属性
 *   - 空的 `<x:dataValidations>` 自动删除
 *
 * 公开 API：
 *   addCellListValidation(worksheet, "A1:A10", { values: ["A","B"] })
 *   addCellRangeValidation(worksheet, "B1:B10", { type: "whole", min: 1, max: 100 })
 *   clearCellValidations(worksheet, "A1:A10")
 *   getCellValidations(worksheet): CellValidationInfo[]
 */

import { BooleanValue, StringValue, UInt32Value } from "../element/index.js";
import { DataValidation } from "./generated/data-validation.js";
import { DataValidations } from "./generated/data-validations.js";
import { Formula1 } from "./generated/formula1.js";
import { Formula2 } from "./generated/formula2.js";
import { SheetData } from "./generated/sheet-data.js";
import type { Worksheet } from "./generated/worksheet.js";

// ─── 公开类型 ─────────────────────────────────────────────────────────────────

/** 下拉列表验证选项。 */
export interface ListValidationOptions {
  /** 候选值列表，转成 Formula1 = `"A,B,C"`（引号内逗号分隔）。 */
  readonly values: string[];
  /** 允许空白单元格，默认 true。 */
  readonly allowBlank?: boolean;
  /** 输入提示标题。 */
  readonly promptTitle?: string;
  /** 输入提示内容。 */
  readonly prompt?: string;
  /** 错误提示标题。 */
  readonly errorTitle?: string;
  /** 错误提示内容。 */
  readonly error?: string;
}

/** 数值范围验证类型。 */
export type RangeValidationType = "whole" | "decimal" | "date" | "time" | "textLength";

/** 数值范围验证运算符。 */
export type RangeValidationOperator =
  | "between"
  | "notBetween"
  | "equal"
  | "notEqual"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual";

/** 数值范围验证选项。 */
export interface RangeValidationOptions {
  /** 验证类型：整数 / 小数 / 日期 / 时间 / 文本长度。 */
  readonly type: RangeValidationType;
  /** 最小值（operator=between 时为下界）。 */
  readonly min?: number | string;
  /** 最大值（operator=between 时为上界）。 */
  readonly max?: number | string;
  /**
   * 比较运算符，默认 "between"（同时提供 min/max）。
   * 仅提供 min 或 max 时，推断为 greaterThanOrEqual / lessThanOrEqual。
   */
  readonly operator?: RangeValidationOperator;
  /** 允许空白单元格，默认 true。 */
  readonly allowBlank?: boolean;
  /** 输入提示标题。 */
  readonly promptTitle?: string;
  /** 输入提示内容。 */
  readonly prompt?: string;
  /** 错误提示标题。 */
  readonly errorTitle?: string;
  /** 错误提示内容。 */
  readonly error?: string;
}

/** getCellValidations 返回的验证信息结构。 */
export interface CellValidationInfo {
  /** 应用范围，如 "A1:A10"。 */
  readonly sqref: string;
  /** 验证类型（"list" / "whole" / "decimal" 等）。 */
  readonly type: string | undefined;
  /** 比较运算符。 */
  readonly operator: string | undefined;
  /** 允许空白。 */
  readonly allowBlank: boolean | undefined;
  /** Formula1 文本内容（如 `"A,B,C"` 或 `"1"`）。 */
  readonly formula1: string | undefined;
  /** Formula2 文本内容（范围验证上界）。 */
  readonly formula2: string | undefined;
  /** 输入提示标题。 */
  readonly promptTitle: string | undefined;
  /** 输入提示内容。 */
  readonly prompt: string | undefined;
  /** 错误提示标题。 */
  readonly errorTitle: string | undefined;
  /** 错误提示内容。 */
  readonly error: string | undefined;
}

// ─── 公开 API ─────────────────────────────────────────────────────────────────

/**
 * 添加下拉列表验证。
 *
 * @param worksheet 目标 `<x:worksheet>` 节点。
 * @param sqref     应用范围，如 "A1:A10"。
 * @param options   验证选项。
 */
export function addCellListValidation(
  worksheet: Worksheet,
  sqref: string,
  options: ListValidationOptions,
): void {
  const container = ensureDataValidations(worksheet);

  const dv = new DataValidation();
  dv.type = StringValue.parse("list");
  dv.sequenceOfReferences = StringValue.parse(sqref);
  dv.allowBlank = BooleanValue.parse(String(options.allowBlank !== false ? "1" : "0"));
  dv.showInputMessage = BooleanValue.parse("1");
  dv.showErrorMessage = BooleanValue.parse("1");

  if (options.promptTitle !== undefined) {
    dv.promptTitle = StringValue.parse(options.promptTitle);
  }
  if (options.prompt !== undefined) {
    dv.prompt = StringValue.parse(options.prompt);
  }
  if (options.errorTitle !== undefined) {
    dv.errorTitle = StringValue.parse(options.errorTitle);
  }
  if (options.error !== undefined) {
    dv.error = StringValue.parse(options.error);
  }

  const formula1 = new Formula1();
  formula1.text = `"${options.values.join(",")}"`;
  dv.appendChild(formula1);

  container.appendChild(dv);
  syncCount(container);
}

/**
 * 添加数值范围验证。
 *
 * @param worksheet 目标 `<x:worksheet>` 节点。
 * @param sqref     应用范围，如 "B1:B10"。
 * @param options   验证选项。
 */
export function addCellRangeValidation(
  worksheet: Worksheet,
  sqref: string,
  options: RangeValidationOptions,
): void {
  const container = ensureDataValidations(worksheet);

  const operator = resolveOperator(options);

  const dv = new DataValidation();
  dv.type = StringValue.parse(options.type);
  dv.operator = StringValue.parse(operator);
  dv.sequenceOfReferences = StringValue.parse(sqref);
  dv.allowBlank = BooleanValue.parse(String(options.allowBlank !== false ? "1" : "0"));
  dv.showInputMessage = BooleanValue.parse("1");
  dv.showErrorMessage = BooleanValue.parse("1");

  if (options.promptTitle !== undefined) {
    dv.promptTitle = StringValue.parse(options.promptTitle);
  }
  if (options.prompt !== undefined) {
    dv.prompt = StringValue.parse(options.prompt);
  }
  if (options.errorTitle !== undefined) {
    dv.errorTitle = StringValue.parse(options.errorTitle);
  }
  if (options.error !== undefined) {
    dv.error = StringValue.parse(options.error);
  }

  if (options.min !== undefined) {
    const formula1 = new Formula1();
    formula1.text = String(options.min);
    dv.appendChild(formula1);
  }

  if (options.max !== undefined) {
    const formula2 = new Formula2();
    formula2.text = String(options.max);
    dv.appendChild(formula2);
  }

  container.appendChild(dv);
  syncCount(container);
}

/**
 * 移除指定 sqref 上的所有验证规则。
 *
 * @param worksheet 目标 `<x:worksheet>` 节点。
 * @param sqref     要清除验证的范围。
 */
export function clearCellValidations(worksheet: Worksheet, sqref: string): void {
  const container = worksheet.firstChild(DataValidations);
  if (container === undefined) return;

  const toRemove: DataValidation[] = [];
  for (const child of container.children) {
    if (child instanceof DataValidation && child.sequenceOfReferences?.toString() === sqref) {
      toRemove.push(child);
    }
  }
  for (const dv of toRemove) {
    container.children.remove(dv);
  }

  if (countValidations(container) === 0) {
    worksheet.children.remove(container);
  } else {
    syncCount(container);
  }
}

/**
 * 获取 worksheet 当前所有数据验证规则。
 *
 * @returns 验证信息数组；无验证时返回空数组。
 */
export function getCellValidations(worksheet: Worksheet): CellValidationInfo[] {
  const container = worksheet.firstChild(DataValidations);
  if (container === undefined) return [];

  const result: CellValidationInfo[] = [];
  for (const child of container.children) {
    if (!(child instanceof DataValidation)) continue;
    const sqref = child.sequenceOfReferences?.toString();
    if (sqref === undefined) continue;

    const formula1El = child.firstChild(Formula1);
    const formula2El = child.firstChild(Formula2);
    const allowBlankVal = child.allowBlank?.toString();

    result.push({
      sqref,
      type: child.type?.toString(),
      operator: child.operator?.toString(),
      allowBlank:
        allowBlankVal === undefined ? undefined : allowBlankVal === "1" || allowBlankVal === "true",
      formula1: formula1El?.text,
      formula2: formula2El?.text,
      promptTitle: child.promptTitle?.toString(),
      prompt: child.prompt?.toString(),
      errorTitle: child.errorTitle?.toString(),
      error: child.error?.toString(),
    });
  }
  return result;
}

// ─── 内部 ─────────────────────────────────────────────────────────────────────

function resolveOperator(options: RangeValidationOptions): string {
  if (options.operator !== undefined) return options.operator;
  if (options.min !== undefined && options.max !== undefined) return "between";
  if (options.min !== undefined) return "greaterThanOrEqual";
  if (options.max !== undefined) return "lessThanOrEqual";
  return "between";
}

function countValidations(container: DataValidations): number {
  let n = 0;
  for (const child of container.children) {
    if (child instanceof DataValidation) n += 1;
  }
  return n;
}

function syncCount(container: DataValidations): void {
  container.count = UInt32Value.parse(String(countValidations(container)));
}

function ensureDataValidations(worksheet: Worksheet): DataValidations {
  const existing = worksheet.firstChild(DataValidations);
  if (existing !== undefined) return existing;

  const dv = new DataValidations();
  // OOXML schema 顺序：dataValidations 在 sheetData 之后插入。
  const sheetData = worksheet.firstChild(SheetData);
  if (sheetData !== undefined) {
    let inserted = false;
    let foundSheetData = false;
    for (const child of worksheet.children) {
      if (child === sheetData) {
        foundSheetData = true;
        continue;
      }
      if (foundSheetData) {
        worksheet.children.insertBefore(dv, child);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      worksheet.appendChild(dv);
    }
  } else {
    worksheet.appendChild(dv);
  }

  return dv;
}
