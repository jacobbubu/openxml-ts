/**
 * Epic-41：Word `Run.styleId` 访问器 mixin（与 Epic-40 段落样式 ID 对称）。
 *
 * 给 `Run.prototype` 挂 getter/setter，封装 `<w:r><w:rPr><w:rStyle w:val="..."/></w:rPr>`。
 *
 * - 读：rPr > RunStyle.val
 * - 写：set 字符串 → 创建 / 替换；undefined → 删 rStyle
 * - rPr 不存在时自动创建并作为 Run 第一个 child（与 run-formatting mixin 同构）
 * - rStyle 在 rPr 里通常是第一个子（schema 顺序）
 */

import { StringValue } from "../../element/index.js";
import { RunProperties } from "../generated/run-properties.js";
import { RunStyle } from "../generated/run-style.js";
import { Run } from "../generated/run.js";

declare module "../generated/run.js" {
  interface Run {
    /**
     * Run 引用 Character Style 条目（如 "Strong" / "Emphasis" / "Hyperlink"）。
     * undefined 表示不引用样式（继承段落 / 默认）。
     */
    styleId: string | undefined;
  }
}

Object.defineProperty(Run.prototype, "styleId", {
  configurable: false,
  enumerable: false,
  get(this: Run): string | undefined {
    return this.firstChild(RunProperties)?.firstChild(RunStyle)?.val?.toString();
  },
  set(this: Run, value: string | undefined): void {
    let rPr = this.firstChild(RunProperties);
    if (value === undefined) {
      if (rPr === undefined) return;
      const existing = rPr.firstChild(RunStyle);
      if (existing !== undefined) rPr.children.remove(existing);
      return;
    }
    if (rPr === undefined) {
      rPr = new RunProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(rPr);
      else this.children.insertBefore(rPr, first);
    }
    let rStyle = rPr.firstChild(RunStyle);
    if (rStyle === undefined) {
      rStyle = new RunStyle();
      // rStyle 在 rPr 第一个子（schema 顺序）
      const firstRpChild = rPr.children.at(0);
      if (firstRpChild === undefined) rPr.appendChild(rStyle);
      else rPr.children.insertBefore(rStyle, firstRpChild);
    }
    rStyle.val = StringValue.parse(value);
  },
});
