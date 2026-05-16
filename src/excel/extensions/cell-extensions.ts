/**
 * `Cell.resolvedText` partial mixin（Story-3.4 / Architecture §4.3 + ADR-016）。
 *
 * codegen 产物 `src/excel/generated/cell.ts` 不允许手改。本模块通过 TS
 * module augmentation + 运行时 `Object.defineProperty` 给 `Cell` 类挂一个
 * `resolvedText` getter，按 `dataType` 分派：
 *
 * - `dataType === "s"`（共享串索引）：走 parent 链找到 worksheet，再从
 *   注册表（`shared-string-table.ts` 维护的 WeakMap）取出
 *   `SharedStringResolver`，调用 `resolve(parseInt(cellValue))`。
 *   找不到 worksheet（孤儿 Cell）或未注册 resolver 时返回 undefined，
 *   不抛错（Architecture §4.3）。
 * - `dataType === "inlineStr"`（内联富文本）：拼 Cell > InlineString > Text
 *   段。
 * - 其它（"n" / "str" / "b" / 空）：直接返回 `<v>` 的文本（`cellValue.text`），
 *   不存在返回 undefined。
 *
 * 副作用：导入本模块会触发 `Object.defineProperty(Cell.prototype, ...)`，
 * 调用方负责保证至少 import 一次（典型路径是 `openxml-ts/excel` 公共 entry
 * 重新导出本模块）。
 */

import type { OpenXmlElement } from "../../element/index.js";
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
  }
}

Object.defineProperty(Cell.prototype, "resolvedText", {
  configurable: false,
  enumerable: false,
  get(this: Cell): string | undefined {
    const dataType = this.extendedAttributes.get("t");
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
