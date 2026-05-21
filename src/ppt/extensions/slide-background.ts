// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-47：PPT `Slide.backgroundColorHex` 访问器 mixin。
 *
 * 操作 `<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr val="FFFF00"/></a:solidFill></p:bgPr></p:bg>`
 *
 * - getter：返回 solid fill 的 hex 色（无 #）；无 bg 或非 solidFill 返 undefined
 * - setter：写入 hex 色字符串 → 创建/更新 bg → bgPr → solidFill → srgbClr 链
 * - setter undefined → 删除 `<p:bg>`
 *
 * 注意：`<p:bg>` 必须在 `<p:cSld>` 中位于 `<p:spTree>` 之前（schema 顺序）。
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { RgbColorModelHex } from "../../drawing/generated/rgb-color-model-hex.js";
import { SolidFill } from "../../drawing/generated/solid-fill.js";
import { HexBinaryValue, OpenXmlCompositeElement } from "../../element/index.js";
import { BackgroundProperties } from "../generated/background-properties.js";
import { Background } from "../generated/background.js";
import { CommonSlideData } from "../generated/common-slide-data.js";
import { Slide } from "../generated/slide.js";

declare module "../generated/slide.js" {
  interface Slide {
    /**
     * 幻灯片背景色 hex（无 #，如 `"FFFF00"`）。
     * - getter：无 bg 或非 solidFill 时返回 undefined。
     * - setter undefined → 删除 `<p:bg>`。
     */
    backgroundColorHex: string | undefined;
  }
}

Object.defineProperty(Slide.prototype, "backgroundColorHex", {
  configurable: false,
  enumerable: false,
  get(this: Slide): string | undefined {
    const cSld = this.firstChild(CommonSlideData);
    if (cSld === undefined) return undefined;
    const bg = cSld.firstChild(Background);
    if (bg === undefined) return undefined;
    const bgPr = bg.firstChild(BackgroundProperties);
    if (bgPr === undefined) return undefined;
    const fill = bgPr.firstChild(SolidFill);
    if (fill === undefined) return undefined;
    return fill.firstChild(RgbColorModelHex)?.val?.toString();
  },
  set(this: Slide, value: string | undefined): void {
    // 删除场景
    if (value === undefined) {
      const cSld = this.firstChild(CommonSlideData);
      if (cSld === undefined) return;
      const bg = cSld.firstChild(Background);
      if (bg !== undefined) cSld.children.remove(bg);
      return;
    }

    // 确保 cSld 存在
    let cSld = this.firstChild(CommonSlideData);
    if (cSld === undefined) {
      cSld = new CommonSlideData();
      this.appendChild(cSld);
    }

    // 确保 bg 存在，且位于 spTree 之前
    let bg = cSld.firstChild(Background);
    if (bg === undefined) {
      bg = new Background();
      // 找到 spTree，插到其前面；没有就直接 prepend
      let spTree: OpenXmlCompositeElement | undefined;
      for (const c of cSld.children) {
        if (c.localName === "spTree" && c instanceof OpenXmlCompositeElement) {
          spTree = c;
          break;
        }
      }
      if (spTree !== undefined) {
        cSld.children.insertBefore(bg, spTree);
      } else {
        const first = cSld.children.at(0);
        if (first === undefined) {
          cSld.appendChild(bg);
        } else {
          cSld.children.insertBefore(bg, first);
        }
      }
    }

    // 确保 bgPr 存在
    let bgPr = bg.firstChild(BackgroundProperties);
    if (bgPr === undefined) {
      bgPr = new BackgroundProperties();
      bg.appendChild(bgPr);
    }

    // 清旧 fill children，写入 solidFill > srgbClr
    for (const c of bgPr.children.toArray()) bgPr.children.remove(c);
    const fill = new SolidFill();
    const color = new RgbColorModelHex();
    color.val = new HexBinaryValue(value);
    fill.appendChild(color);
    bgPr.appendChild(fill);
  },
});
