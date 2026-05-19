/**
 * `Cell` 的 partial mixin（Story-3.4 + Story-3.6）。
 *
 * codegen 产物 `src/excel/generated/cell.ts` 不允许手改。本模块通过 TS
 * module augmentation + 运行时 `Object.defineProperty` / 方法替换给 `Cell`
 * 类挂两组扩展：
 *
 * Story-3.4 · `resolvedText` getter（Architecture §4.3 + ADR-016）：
 * - `dataType === "s"`（共享串索引）：走 parent 链找到 worksheet，再从
 *   注册表（`shared-string-table.ts` 维护的 WeakMap）取出
 *   `SharedStringResolver`，调用 `resolve(parseInt(cellValue))`。
 *   找不到 worksheet（孤儿 Cell）或未注册 resolver 时返回 undefined，
 *   不抛错（Architecture §4.3）。
 * - `dataType === "inlineStr"`：拼 Cell > InlineString > Text 段。
 * - 其它（"n" / "str" / "b" / 空）：直接返回 `<v>` 的文本，不存在返回 undefined。
 *
 * Story-3.6 · `isDirty` 跟踪 + CalcChain 失效（ADR-019）：
 * - 内部 Symbol-keyed `_dirty` 标志；
 * - 覆盖 `Cell.prototype.appendChild`：当 child 是 `CellValue` / `CellFormula`
 *   时标 dirty（触发 SpreadsheetDocument flush 阶段丢弃 CalcChainPart）；
 * - 覆盖 `Cell.prototype.remove`：移除上述子元素同样标 dirty；
 * - 暴露 `cell.isDirty` getter 给 SpreadsheetDocument 扫描；
 * - `clearCellDirty(cell)` 帮 flush 完后复位（仅给同包内 SpreadsheetDocument 用）。
 *
 * 副作用：导入本模块会触发 `Object.defineProperty(Cell.prototype, ...)`，
 * 调用方负责保证至少 import 一次（典型路径是 `openxml-ts/excel` 公共 entry
 * 重新导出本模块）。
 */

import type { OpenXmlElement } from "../../element/index.js";
import { isTypedPartLoading } from "../../parts/typed-xml-part.js";
import { CellFormula } from "../generated/cell-formula.js";
import { CellValue } from "../generated/cell-value.js";
import { Cell } from "../generated/cell.js";
import { InlineString } from "../generated/inline-string.js";
import { Text } from "../generated/text.js";
import { Worksheet } from "../generated/worksheet.js";
import { getResolverForWorksheet } from "../shared-string-table.js";

declare module "../generated/cell.js" {
  interface Cell {
    /** 解引用 sharedString / inlineStr / 直接值后的纯文本；找不到 / 越界返回 undefined。 */
    readonly resolvedText: string | undefined;
    /** 是否被标记为「内容已改动」——用于 SpreadsheetDocument 决定 CalcChain 是否失效。 */
    readonly isDirty: boolean;
  }
}

Object.defineProperty(Cell.prototype, "resolvedText", {
  configurable: false,
  enumerable: false,
  get(this: Cell): string | undefined {
    // #139 后 Cell 继承 CellType 的 `t` 字段（typed），不再走 extendedAttributes；
    // 兜底兼容 typed 之外的写入路径。
    const dataType = this.dataType?.toString() ?? this.extendedAttributes.get("t");
    if (dataType === "inlineStr") return collectInlineString(this);
    const cellValue = this.firstChild(CellValue);
    if (cellValue?.text === undefined) return undefined;
    if (dataType === "s") {
      const worksheet = findAncestorWorksheet(this);
      if (worksheet === undefined) return undefined;
      const resolver = getResolverForWorksheet(worksheet);
      if (resolver === undefined) return undefined;
      const idx = Number.parseInt(cellValue.text, 10);
      if (!Number.isFinite(idx)) return undefined;
      return resolver.resolve(idx);
    }
    return cellValue.text;
  },
});

function collectInlineString(cell: Cell): string | undefined {
  const inline = cell.firstChild(InlineString);
  if (inline === undefined) return undefined;
  let buf = "";
  for (const t of inline.descendants(Text)) {
    if (t.text !== undefined) buf += t.text;
  }
  return buf;
}

function findAncestorWorksheet(start: OpenXmlElement): Worksheet | undefined {
  let cur: OpenXmlElement | undefined = start.parent;
  while (cur !== undefined) {
    if (cur instanceof Worksheet) return cur;
    cur = cur.parent;
  }
  return undefined;
}

// ─── Story-3.6 · dirty tracking ────────────────────────────────────────────

const kDirty = Symbol("openxml-ts.cell.dirty");

interface CellWithDirty {
  [kDirty]?: boolean;
}

Object.defineProperty(Cell.prototype, "isDirty", {
  configurable: false,
  enumerable: false,
  get(this: Cell): boolean {
    return (this as unknown as CellWithDirty)[kDirty] === true;
  },
});

const originalAppendChild = Cell.prototype.appendChild;
Cell.prototype.appendChild = function appendChildWithDirty<T extends OpenXmlElement>(
  this: Cell,
  child: T,
): T {
  const result = originalAppendChild.call(this, child) as T;
  if (!isTypedPartLoading() && (child instanceof CellValue || child instanceof CellFormula)) {
    (this as unknown as CellWithDirty)[kDirty] = true;
  }
  return result;
};

const originalRemove = Cell.prototype.remove;
Cell.prototype.remove = function removeWithDirty(this: Cell, child: OpenXmlElement): boolean {
  const wasCellValueOrFormula = child instanceof CellValue || child instanceof CellFormula;
  const ok = originalRemove.call(this, child);
  if (ok && !isTypedPartLoading() && wasCellValueOrFormula) {
    (this as unknown as CellWithDirty)[kDirty] = true;
  }
  return ok;
};

/** SpreadsheetDocument 用：flush 完后把 dirty 标志复位。 */
export function clearCellDirty(cell: Cell): void {
  (cell as unknown as CellWithDirty)[kDirty] = false;
}

// ─── Epic-25 · Cell.formula / Cell.cachedValue 访问器 ────────────────────────

declare module "../generated/cell.js" {
  interface Cell {
    /** \`<f>\` 公式文本——不存在返 undefined。setter 传 undefined 删 \`<f>\`，传字符串新建或替换。 */
    formula: string | undefined;
    /** \`<v>\` 缓存值文本——同上。setter 传 undefined 删 \`<v>\`。 */
    cachedValue: string | undefined;
  }
}

Object.defineProperty(Cell.prototype, "formula", {
  configurable: false,
  enumerable: false,
  get(this: Cell): string | undefined {
    return this.firstChild(CellFormula)?.text;
  },
  set(this: Cell, value: string | undefined): void {
    const existing = this.firstChild(CellFormula);
    if (value === undefined) {
      if (existing !== undefined) this.children.remove(existing);
      return;
    }
    if (existing !== undefined) {
      existing.text = value;
      if (!isTypedPartLoading()) (this as unknown as CellWithDirty)[kDirty] = true;
    } else {
      const f = new CellFormula();
      f.text = value;
      this.appendChild(f); // appendChild override 会自动标 dirty
    }
  },
});

Object.defineProperty(Cell.prototype, "cachedValue", {
  configurable: false,
  enumerable: false,
  get(this: Cell): string | undefined {
    return this.firstChild(CellValue)?.text;
  },
  set(this: Cell, value: string | undefined): void {
    const existing = this.firstChild(CellValue);
    if (value === undefined) {
      if (existing !== undefined) this.children.remove(existing);
      return;
    }
    if (existing !== undefined) {
      existing.text = value;
      if (!isTypedPartLoading()) (this as unknown as CellWithDirty)[kDirty] = true;
    } else {
      const v = new CellValue();
      v.text = value;
      this.appendChild(v);
    }
  },
});
