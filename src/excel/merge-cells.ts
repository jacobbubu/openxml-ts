/**
 * Epic-53：Excel 合并单元格便捷层。
 *
 * 给 `<x:worksheet>` 管理合并单元格（`<x:mergeCells>` / `<x:mergeCell>`）：
 *   - 自动创建 `<x:mergeCells>`，放在 `<x:sheetData>` 之后（OOXML schema 顺序）
 *   - 重复 range 幂等（已存在则跳过）
 *   - 同步 `count` 属性
 *   - 空的 `<x:mergeCells>` 自动删除
 *
 * 公开 API：
 *   mergeCells(worksheet, "A1:B2")             // 添加单个合并范围
 *   mergeCells(worksheet, ["A1:B2", "C1:D2"])  // 批量添加
 *   unmergeCells(worksheet, "A1:B2")           // 删除指定范围
 *   clearAllMergedCells(worksheet)             // 清除全部
 *   getMergedRanges(worksheet): string[]       // 读取当前列表
 */

import { StringValue, UInt32Value } from "../element/index.js";
import { MergeCell } from "./generated/merge-cell.js";
import { MergeCells } from "./generated/merge-cells.js";
import { SheetData } from "./generated/sheet-data.js";
import type { Worksheet } from "./generated/worksheet.js";

/** 合法 range 格式：`A1:B2`（也允许单格 `A1`）。 */
const RANGE_RE = /^[A-Z]+\d+(:[A-Z]+\d+)?$/;

function validateRange(range: string): void {
  if (!RANGE_RE.test(range)) {
    throw new RangeError(`Invalid merge range: "${range}". Expected format like "A1:B2" or "A1".`);
  }
}

/**
 * 添加合并单元格范围。
 *
 * @param worksheet 目标 `<x:worksheet>` 节点。
 * @param range     单个 range 字符串或多个 range 的数组；重复范围幂等。
 */
export function mergeCells(worksheet: Worksheet, range: string | string[]): void {
  const ranges = Array.isArray(range) ? range : [range];
  for (const r of ranges) {
    validateRange(r);
  }

  const mergeCellsEl = ensureMergeCells(worksheet);

  for (const r of ranges) {
    if (!hasRange(mergeCellsEl, r)) {
      const mc = new MergeCell();
      mc.reference = StringValue.parse(r);
      mergeCellsEl.appendChild(mc);
    }
  }

  syncCount(mergeCellsEl);
}

/**
 * 删除指定合并范围。不存在时静默跳过。
 *
 * @param worksheet 目标 `<x:worksheet>` 节点。
 * @param range     要删除的 range 字符串。
 */
export function unmergeCells(worksheet: Worksheet, range: string): void {
  validateRange(range);

  const mergeCellsEl = worksheet.firstChild(MergeCells);
  if (mergeCellsEl === undefined) return;

  const toRemove: MergeCell[] = [];
  for (const c of mergeCellsEl.children) {
    if (c instanceof MergeCell && c.reference?.toString() === range) {
      toRemove.push(c);
    }
  }
  for (const c of toRemove) {
    mergeCellsEl.children.remove(c);
  }

  if (countMergeCells(mergeCellsEl) === 0) {
    worksheet.children.remove(mergeCellsEl);
  } else {
    syncCount(mergeCellsEl);
  }
}

/**
 * 清除 worksheet 上的所有合并范围，并删除 `<x:mergeCells>` 元素。
 */
export function clearAllMergedCells(worksheet: Worksheet): void {
  const mergeCellsEl = worksheet.firstChild(MergeCells);
  if (mergeCellsEl === undefined) return;
  worksheet.children.remove(mergeCellsEl);
}

/**
 * 读取 worksheet 当前的所有合并范围。
 *
 * @returns range 字符串数组（顺序与 XML 中一致）；无合并时返回空数组。
 */
export function getMergedRanges(worksheet: Worksheet): string[] {
  const mergeCellsEl = worksheet.firstChild(MergeCells);
  if (mergeCellsEl === undefined) return [];
  const result: string[] = [];
  for (const c of mergeCellsEl.children) {
    if (c instanceof MergeCell && c.reference !== undefined) {
      result.push(c.reference.toString());
    }
  }
  return result;
}

// ─── 内部 ────────────────────────────────────────────────────────────────────

function hasRange(mergeCellsEl: MergeCells, range: string): boolean {
  for (const c of mergeCellsEl.children) {
    if (c instanceof MergeCell && c.reference?.toString() === range) return true;
  }
  return false;
}

function countMergeCells(mergeCellsEl: MergeCells): number {
  let n = 0;
  for (const c of mergeCellsEl.children) {
    if (c instanceof MergeCell) n += 1;
  }
  return n;
}

function syncCount(mergeCellsEl: MergeCells): void {
  const n = countMergeCells(mergeCellsEl);
  mergeCellsEl.count = UInt32Value.parse(String(n));
}

function ensureMergeCells(worksheet: Worksheet): MergeCells {
  const existing = worksheet.firstChild(MergeCells);
  if (existing !== undefined) return existing;

  const mc = new MergeCells();
  // OOXML schema 顺序：mergeCells 在 sheetData 之后插入。
  const sheetData = worksheet.firstChild(SheetData);
  if (sheetData !== undefined) {
    // 找到 sheetData 的下一个兄弟节点，insertBefore 它；没有则 append。
    let inserted = false;
    const children = worksheet.children;
    let foundSheetData = false;
    for (const child of children) {
      if (child === sheetData) {
        foundSheetData = true;
        continue;
      }
      if (foundSheetData) {
        children.insertBefore(mc, child);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      worksheet.appendChild(mc);
    }
  } else {
    worksheet.appendChild(mc);
  }

  return mc;
}
