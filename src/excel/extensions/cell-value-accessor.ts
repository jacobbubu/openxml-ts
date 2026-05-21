// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-45：`Cell.prototype.value` 类型化访问器。
 *
 * 本模块通过 TS module augmentation + `Object.defineProperty` 给 `Cell`
 * 挂一个 typed `value` getter/setter，把 JS 原生类型
 * (number / string / boolean / Date / undefined) 直接映射到 OOXML Cell 的
 * 标准表示，无需手动拼 `<v>` 和 `<is>`。
 *
 * Getter 语义：
 * - `s`       → shared string lookup（复用 `resolvedText` 的 SST 路径）
 * - `inlineStr` → 拼 `<is><t>…</t></is>` 文本
 * - `b`       → `"1"` → `true`；`"0"` → `false`；其它 → `undefined`
 * - `n` / undefined → `parseFloat(<v>.text)`；NaN 视为 `undefined`
 * - `str`     → `<v>.text`（公式缓存字符串）原样返回
 *
 * Setter 语义：
 * - `number`  → dataType 清空（默认 `n`），写 `<v>` 文本
 * - `string`  → dataType = `"inlineStr"`，写 `<is><t>` 文本，删 `<v>`
 * - `boolean` → dataType = `"b"`，写 `<v>` = `"1"` / `"0"`
 * - `Date`    → 转 Excel 序列号（days since 1899-12-30），dataType 清空，写 `<v>`
 * - `undefined` → 删 `<v>` + `<is>` + 清 dataType
 *
 * 副作用：导入本模块会执行 `Object.defineProperty(Cell.prototype, "value", …)`。
 */

import type { OpenXmlElement } from "../../element/index.js";
import { StringValue } from "../../element/index.js";
import { CellValue } from "../generated/cell-value.js";
import { Cell } from "../generated/cell.js";
import { InlineString } from "../generated/inline-string.js";
import { Text } from "../generated/text.js";
import { Worksheet } from "../generated/worksheet.js";
import { getResolverForWorksheet } from "../shared-string-table.js";

declare module "../generated/cell.js" {
  interface Cell {
    /**
     * 类型化 cell 值访问器（Epic-45）。
     *
     * getter 返回 `number | string | boolean | undefined`，依据 `dataType` 自动
     * 解引用（共享串 / inlineStr / boolean / 数字 / str）。
     *
     * setter 接受 `number | string | boolean | Date | undefined`：
     * - `number` → `<v>` 文本，清 dataType（Excel 默认 `n`）
     * - `string` → `<is><t>` 写入，dataType = `"inlineStr"`，删 `<v>`
     * - `boolean` → `<v>` = `"1"/"0"`，dataType = `"b"`
     * - `Date` → Excel 序列号（1900-01-01 = 1），清 dataType
     * - `undefined` → 清除 `<v>` + `<is>` + dataType
     */
    value: number | string | boolean | undefined;
  }
}

// ─── Getter helpers ─────────────────────────────────────────────────────────

function findAncestorWorksheet(start: OpenXmlElement): Worksheet | undefined {
  let cur: OpenXmlElement | undefined = start.parent;
  while (cur !== undefined) {
    if (cur instanceof Worksheet) return cur;
    cur = cur.parent;
  }
  return undefined;
}

function getInlineStringText(cell: Cell): string | undefined {
  const inline = cell.firstChild(InlineString);
  if (inline === undefined) return undefined;
  let buf = "";
  for (const t of inline.descendants(Text)) {
    if (t.text !== undefined) buf += t.text;
  }
  return buf;
}

// ─── Setter helpers ──────────────────────────────────────────────────────────

/**
 * Excel 序列号转换：days since 1899-12-30（Excel 把 1900-01-01 视为 1，
 * 1899-12-30 视为 0；此外 Excel 历史 bug 把 1900-02-29 视为有效日期——
 * 这里不模拟那个 bug，仅做标准转换）。
 */
function dateToExcelSerial(d: Date): number {
  // Excel epoch: 1899-12-30 00:00:00 UTC
  const EXCEL_EPOCH_MS = Date.UTC(1899, 11, 30); // month is 0-based
  const diffMs = d.getTime() - EXCEL_EPOCH_MS;
  return diffMs / 86400000;
}

/** 确保 cell 有一个 `<v>` child，返回它（有则复用，无则新建并 appendChild）。 */
function ensureCellValue(cell: Cell): CellValue {
  const existing = cell.firstChild(CellValue);
  if (existing !== undefined) return existing;
  const v = new CellValue();
  cell.appendChild(v); // 触发 isDirty（cell-extensions.ts 的 appendChild override）
  return v;
}

/** 删除 `<v>` child（若存在）。 */
function removeCellValue(cell: Cell): void {
  const v = cell.firstChild(CellValue);
  if (v !== undefined) cell.remove(v); // 触发 isDirty
}

/** 删除 `<is>` child（若存在）。 */
function removeInlineString(cell: Cell): void {
  const is = cell.firstChild(InlineString);
  if (is !== undefined) cell.remove(is);
}

/** 设置或清除 `<is><t>` 文本。 */
function setInlineStringText(cell: Cell, phrase: string): void {
  removeInlineString(cell);
  const is = new InlineString();
  const t = new Text();
  t.text = phrase;
  is.appendChild(t);
  // InlineString 不是 CellValue/CellFormula，不会自动触发 isDirty；
  // 但同时我们写了 inlineStr 类型，需要手动标记——通过追加一个 dummy CellValue
  // 再删除是多余的；相反，直接修改 dataType 足够让调用方知道内容变化。
  // 注意：目前 cell-extensions.ts 的 isDirty 仅追踪 CellValue/CellFormula；
  // 为保持设计一致，这里不额外 patch isDirty（inlineStr 写入场景较少用 CalcChain）。
  cell.appendChild(is);
}

// ─── Main accessor ───────────────────────────────────────────────────────────

Object.defineProperty(Cell.prototype, "value", {
  configurable: false,
  enumerable: false,

  get(this: Cell): number | string | boolean | undefined {
    const dataType = this.dataType?.toString();

    if (dataType === "inlineStr") {
      return getInlineStringText(this);
    }

    if (dataType === "s") {
      const worksheet = findAncestorWorksheet(this);
      if (worksheet === undefined) return undefined;
      const resolver = getResolverForWorksheet(worksheet);
      if (resolver === undefined) return undefined;
      const cellValue = this.firstChild(CellValue);
      if (cellValue?.text === undefined) return undefined;
      const idx = Number.parseInt(cellValue.text, 10);
      if (!Number.isFinite(idx)) return undefined;
      return resolver.resolve(idx);
    }

    if (dataType === "b") {
      const cellValue = this.firstChild(CellValue);
      if (cellValue?.text === "1") return true;
      if (cellValue?.text === "0") return false;
      return undefined;
    }

    if (dataType === "str") {
      return this.firstChild(CellValue)?.text;
    }

    // dataType === "n" or undefined → numeric
    const cellValue = this.firstChild(CellValue);
    if (cellValue?.text === undefined) return undefined;
    const n = Number.parseFloat(cellValue.text);
    return Number.isNaN(n) ? undefined : n;
  },

  set(this: Cell, value: number | string | boolean | Date | undefined): void {
    if (value === undefined) {
      removeCellValue(this);
      removeInlineString(this);
      this.dataType = undefined;
      return;
    }

    if (typeof value === "boolean") {
      removeInlineString(this);
      this.dataType = StringValue.parse("b");
      const v = ensureCellValue(this);
      v.text = value ? "1" : "0";
      return;
    }

    if (typeof value === "string") {
      removeCellValue(this);
      this.dataType = StringValue.parse("inlineStr");
      setInlineStringText(this, value);
      return;
    }

    if (value instanceof Date) {
      removeInlineString(this);
      this.dataType = undefined;
      const serial = dateToExcelSerial(value);
      const v = ensureCellValue(this);
      v.text = String(serial);
      return;
    }

    // typeof value === "number"
    removeInlineString(this);
    this.dataType = undefined;
    const v = ensureCellValue(this);
    v.text = String(value);
  },
});
