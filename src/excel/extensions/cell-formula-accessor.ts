// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-49：`Cell.prototype.formula` / `Cell.prototype.cachedValue` 类型化访问器。
 *
 * 本模块通过 TS module augmentation + `Object.defineProperty` 给 `Cell`
 * 挂两个 typed 访问器：
 *
 * `formula`（读写 `<f>` 子元素）：
 * - getter：返回 `<f>` 的文本内容（公式字符串），无 `<f>` 子元素时返回 `undefined`。
 * - setter：传字符串 → 新建或覆盖 `<f>` 子元素；传 `undefined` → 删除 `<f>` 子元素。
 *   修改会自动触发 `cell.isDirty = true`（通过 cell-extensions.ts 的 appendChild/remove
 *   override，或 markCellDirty），令 SpreadsheetDocument flush 阶段丢弃 CalcChainPart。
 *
 * `cachedValue`（读写 `<v>` 子元素）：
 * - getter：返回 `<v>` 文本（公式缓存结果），无则 `undefined`。
 * - setter：传字符串 → 新建或覆盖 `<v>`；传 `undefined` → 删除。
 *
 * 副作用：导入本模块会执行 `Object.defineProperty(Cell.prototype, "formula", …)` 和
 * `Object.defineProperty(Cell.prototype, "cachedValue", …)`。
 */

import { CellFormula } from "../generated/cell-formula.js";
import { CellValue } from "../generated/cell-value.js";
import { Cell } from "../generated/cell.js";
import { markCellDirty } from "./cell-extensions.js";

declare module "../generated/cell.js" {
  interface Cell {
    /**
     * `<f>` 公式文本（Epic-49）。
     *
     * - getter：返回公式字符串，无 `<f>` 子元素时返回 `undefined`。
     * - setter：传字符串 → 新建或覆盖 `<f>`；传 `undefined` → 删除 `<f>`。
     *   写入后 `cell.isDirty` 自动变为 `true`，CalcChain 将在下次 flush 时失效。
     */
    formula: string | undefined;

    /**
     * `<v>` 缓存值文本（Epic-49）。
     *
     * - getter：返回 `<v>` 文本原始字符串；无 `<v>` 子元素时返回 `undefined`。
     * - setter：传字符串 → 新建或覆盖 `<v>`；传 `undefined` → 删除 `<v>`。
     */
    cachedValue: string | undefined;
  }
}

// ─── `formula` accessor ───────────────────────────────────────────────────────

Object.defineProperty(Cell.prototype, "formula", {
  configurable: false,
  enumerable: false,

  get(this: Cell): string | undefined {
    return this.firstChild(CellFormula)?.text;
  },

  set(this: Cell, value: string | undefined): void {
    const existing = this.firstChild(CellFormula);
    if (value === undefined) {
      if (existing !== undefined) {
        this.remove(existing); // remove override in cell-extensions.ts marks dirty
      }
      return;
    }
    if (existing !== undefined) {
      existing.text = value;
      markCellDirty(this); // in-place text update, no appendChild → mark manually
    } else {
      const f = new CellFormula();
      f.text = value;
      this.appendChild(f); // appendChild override marks dirty automatically
    }
  },
});

// ─── `cachedValue` accessor ───────────────────────────────────────────────────

Object.defineProperty(Cell.prototype, "cachedValue", {
  configurable: false,
  enumerable: false,

  get(this: Cell): string | undefined {
    return this.firstChild(CellValue)?.text;
  },

  set(this: Cell, value: string | undefined): void {
    const existing = this.firstChild(CellValue);
    if (value === undefined) {
      if (existing !== undefined) {
        this.remove(existing); // remove override marks dirty
      }
      return;
    }
    if (existing !== undefined) {
      existing.text = value;
      markCellDirty(this); // in-place update
    } else {
      const v = new CellValue();
      v.text = value;
      this.appendChild(v); // appendChild override marks dirty
    }
  },
});
