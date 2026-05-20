/**
 * Epic-63：PPT `Slide.hidden` 隐藏幻灯片访问器 mixin。
 *
 * 操作 `<p:sld>` 的 `show` 属性控制幻灯片在放映时是否显示。
 *
 * - getter：`show` 属性缺失或为 true → 返回 false（幻灯片可见）；
 *           `show` 属性为 false → 返回 true（幻灯片隐藏）
 * - setter true  → 写 `show="0"`（隐藏）
 * - setter false → 删除 `show` 属性（恢复可见，语义等同 show="1"）
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { BooleanValue } from "../../element/index.js";
import { Slide } from "../generated/slide.js";

declare module "../generated/slide.js" {
  interface Slide {
    /**
     * 幻灯片是否在放映时隐藏。
     * - getter：`show` 属性缺失或为 true → false（可见）；`show="0"` → true（隐藏）。
     * - setter true  → 写 `show="0"`。
     * - setter false → 删除 `show` 属性（恢复可见）。
     */
    hidden: boolean;
  }
}

Object.defineProperty(Slide.prototype, "hidden", {
  configurable: false,
  enumerable: false,

  get(this: Slide): boolean {
    if (this.show === undefined) return false;
    return !this.show.value;
  },

  set(this: Slide, value: boolean): void {
    if (value) {
      this.show = new BooleanValue(false);
    } else {
      this.show = undefined;
    }
  },
});
