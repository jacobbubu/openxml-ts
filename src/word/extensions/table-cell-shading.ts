/**
 * Epic-36：Word `TableCell.shading` 访问器 mixin。
 *
 * 给 TableCell.prototype 挂 getter/setter，封装 `<w:tcPr><w:shd>` 单元格底纹。
 *
 * - fill：背景填充色（hex "FFFF00"，或 "auto"）
 * - color：图案前景色（默认 "auto"）
 * - pattern：图案 val（默认 "clear" = 纯色填充）
 * - setter merge 语义；undefined 删 `<w:shd>`
 * - tcPr 不存在时自动创建并作为 TableCell 第一个 child（与 Paragraph mixin 同构）
 */

import { StringValue } from "../../element/index.js";
import { Shading } from "../generated/shading.js";
import { TableCellProperties } from "../generated/table-cell-properties.js";
import { TableCell } from "../generated/table-cell.js";

export interface CellShading {
  /** 背景填充色（hex，如 "FFFF00"；"auto" 表示主题默认）。 */
  readonly fill?: string;
  /** 图案前景色（hex 或 "auto"）。 */
  readonly color?: string;
  /** 图案 val，默认 "clear"（纯色填充）。 */
  readonly pattern?: string;
}

declare module "../generated/table-cell.js" {
  interface TableCell {
    /**
     * 单元格底纹。读不到任何字段返 undefined。setter undefined 删 `<w:shd>`；
     * 传 partial 对象时 merge 进已有 shd。
     */
    shading: CellShading | undefined;
  }
}

Object.defineProperty(TableCell.prototype, "shading", {
  configurable: false,
  enumerable: false,
  get(this: TableCell): CellShading | undefined {
    const tcPr = this.firstChild(TableCellProperties);
    const shd = tcPr?.firstChild(Shading);
    if (shd === undefined) return undefined;
    const out: { -readonly [K in keyof CellShading]: CellShading[K] } = {};
    const f = shd.fill?.toString();
    const c = shd.color?.toString();
    const p = shd.val?.toString();
    if (f !== undefined) out.fill = f;
    if (c !== undefined) out.color = c;
    if (p !== undefined) out.pattern = p;
    return Object.keys(out).length === 0 ? undefined : out;
  },
  set(this: TableCell, value: CellShading | undefined): void {
    let tcPr = this.firstChild(TableCellProperties);
    if (value === undefined) {
      if (tcPr === undefined) return;
      const existing = tcPr.firstChild(Shading);
      if (existing !== undefined) tcPr.children.remove(existing);
      return;
    }
    if (tcPr === undefined) {
      tcPr = new TableCellProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(tcPr);
      else this.children.insertBefore(tcPr, first);
    }
    let shd = tcPr.firstChild(Shading);
    if (shd === undefined) {
      shd = new Shading();
      tcPr.appendChild(shd);
    }
    if (value.fill !== undefined) shd.fill = StringValue.parse(value.fill);
    if (value.color !== undefined) shd.color = StringValue.parse(value.color);
    if (value.pattern !== undefined) shd.val = StringValue.parse(value.pattern);
  },
});
