// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-48：PPT `Shape` 无障碍属性访问器 mixin。
 *
 * 在 `Shape.prototype` 上挂三个属性：
 *
 *   shape.name           — `p:cNvPr.name`（形状名称）
 *   shape.altTitle       — `p:cNvPr.title`（屏幕阅读器标题）
 *   shape.altDescription — `p:cNvPr.descr`（屏幕阅读器详细描述）
 *
 * - getter：cNvPr 不存在 → undefined
 * - setter value → 写入（若 nvSpPr / cNvPr 不存在则自动创建）
 * - setter undefined → 删除该属性
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { StringValue } from "../../element/index.js";
import { NonVisualDrawingProperties } from "../generated/non-visual-drawing-properties.js";
import { NonVisualShapeProperties } from "../generated/non-visual-shape-properties.js";
import { Shape } from "../generated/shape.js";

declare module "../generated/shape.js" {
  interface Shape {
    /**
     * 形状名称（`p:cNvPr.name`）。
     * cNvPr 不存在时 getter 返 undefined；setter 自动创建。
     */
    name: string | undefined;

    /**
     * 屏幕阅读器标题（`p:cNvPr.title`）。
     * cNvPr 不存在时 getter 返 undefined；setter 自动创建。
     */
    altTitle: string | undefined;

    /**
     * 屏幕阅读器详细描述（`p:cNvPr.descr`）。
     * cNvPr 不存在时 getter 返 undefined；setter 自动创建。
     */
    altDescription: string | undefined;
  }
}

/** 从 Shape 拿到 p:cNvPr，只读模式下不创建。 */
function getCNvPr(sp: Shape, createIfMissing: true): NonVisualDrawingProperties;
function getCNvPr(sp: Shape, createIfMissing: false): NonVisualDrawingProperties | undefined;
function getCNvPr(sp: Shape, createIfMissing: boolean): NonVisualDrawingProperties | undefined {
  let nvSpPr = sp.firstChild(NonVisualShapeProperties);
  if (nvSpPr === undefined) {
    if (!createIfMissing) return undefined;
    nvSpPr = new NonVisualShapeProperties();
    const first = sp.children.at(0);
    if (first === undefined) sp.appendChild(nvSpPr);
    else sp.children.insertBefore(nvSpPr, first);
  }

  let cNvPr = nvSpPr.firstChild(NonVisualDrawingProperties);
  if (cNvPr === undefined) {
    if (!createIfMissing) return undefined;
    cNvPr = new NonVisualDrawingProperties();
    const first = nvSpPr.children.at(0);
    if (first === undefined) nvSpPr.appendChild(cNvPr);
    else nvSpPr.children.insertBefore(cNvPr, first);
  }

  return cNvPr;
}

Object.defineProperty(Shape.prototype, "name", {
  configurable: false,
  enumerable: false,
  get(this: Shape): string | undefined {
    return getCNvPr(this, false)?.name?.value;
  },
  set(this: Shape, value: string | undefined): void {
    if (value === undefined) {
      const cNvPr = getCNvPr(this, false);
      if (cNvPr !== undefined) cNvPr.name = undefined;
      return;
    }
    getCNvPr(this, true).name = StringValue.parse(value);
  },
});

Object.defineProperty(Shape.prototype, "altTitle", {
  configurable: false,
  enumerable: false,
  get(this: Shape): string | undefined {
    return getCNvPr(this, false)?.title?.value;
  },
  set(this: Shape, value: string | undefined): void {
    if (value === undefined) {
      const cNvPr = getCNvPr(this, false);
      if (cNvPr !== undefined) cNvPr.title = undefined;
      return;
    }
    getCNvPr(this, true).title = StringValue.parse(value);
  },
});

Object.defineProperty(Shape.prototype, "altDescription", {
  configurable: false,
  enumerable: false,
  get(this: Shape): string | undefined {
    return getCNvPr(this, false)?.description?.value;
  },
  set(this: Shape, value: string | undefined): void {
    if (value === undefined) {
      const cNvPr = getCNvPr(this, false);
      if (cNvPr !== undefined) cNvPr.description = undefined;
      return;
    }
    getCNvPr(this, true).description = StringValue.parse(value);
  },
});
