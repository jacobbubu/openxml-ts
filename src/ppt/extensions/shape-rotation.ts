// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-60：PPT `Shape` 旋转与翻转访问器 mixin。
 *
 * 在 `Shape.prototype` 上挂三个属性：
 *
 *   shape.rotationDegrees  — `p:spPr > a:xfrm @rot`（度，0–360）
 *   shape.flipHorizontal   — `p:spPr > a:xfrm @flipH`（boolean）
 *   shape.flipVertical     — `p:spPr > a:xfrm @flipV`（boolean）
 *
 * - getter：xfrm 不存在或属性未设置 → undefined
 * - setter value → 写入（若 spPr / xfrm 不存在则自动创建）
 * - setter undefined → 删除对应属性
 *
 * 内部换算：1 度 = 60000（OOXML 单位）。
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { Transform2D } from "../../drawing/generated/transform2-d.js";
import { BooleanValue, Int32Value } from "../../element/index.js";
import { NonVisualShapeProperties } from "../generated/non-visual-shape-properties.js";
import { ShapeProperties } from "../generated/shape-properties.js";
import { Shape } from "../generated/shape.js";

/** OOXML 单位：60000 分之 1 度 = 1 度。 */
const EMU_PER_DEGREE = 60000;

declare module "../generated/shape.js" {
  interface Shape {
    /**
     * 旋转角度（`p:spPr > a:xfrm @rot`）。
     * 单位为度（0–360）。内部存储为 60000 分之 1 度整数。
     * xfrm / rot 不存在时 getter 返 undefined；setter 自动创建 xfrm。
     * setter undefined 删除 `rot` 属性。
     */
    rotationDegrees: number | undefined;

    /**
     * 水平翻转（`p:spPr > a:xfrm @flipH`）。
     * xfrm / flipH 不存在时 getter 返 undefined；setter 自动创建 xfrm。
     * setter undefined 删除 `flipH` 属性。
     */
    flipHorizontal: boolean | undefined;

    /**
     * 垂直翻转（`p:spPr > a:xfrm @flipV`）。
     * xfrm / flipV 不存在时 getter 返 undefined；setter 自动创建 xfrm。
     * setter undefined 删除 `flipV` 属性。
     */
    flipVertical: boolean | undefined;
  }
}

/** 从 Shape 拿到 p:spPr，createIfMissing=true 时不存在则创建并插在 nvSpPr 之后。 */
function getSpPr(sp: Shape, createIfMissing: true): ShapeProperties;
function getSpPr(sp: Shape, createIfMissing: false): ShapeProperties | undefined;
function getSpPr(sp: Shape, createIfMissing: boolean): ShapeProperties | undefined {
  let spPr = sp.firstChild(ShapeProperties);
  if (spPr === undefined) {
    if (!createIfMissing) return undefined;
    spPr = new ShapeProperties();
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    if (nvSpPr !== undefined) {
      const kids = sp.children.toArray();
      const idx = kids.indexOf(nvSpPr);
      const next = kids[idx + 1];
      if (next !== undefined) sp.children.insertBefore(spPr, next);
      else sp.appendChild(spPr);
    } else {
      sp.appendChild(spPr);
    }
  }
  return spPr;
}

/** 从 spPr 拿到 a:xfrm，createIfMissing=true 时不存在则插在 spPr 第一个子位置。 */
function getXfrm(spPr: ShapeProperties, createIfMissing: true): Transform2D;
function getXfrm(spPr: ShapeProperties, createIfMissing: false): Transform2D | undefined;
function getXfrm(spPr: ShapeProperties, createIfMissing: boolean): Transform2D | undefined {
  let xfrm = spPr.firstChild(Transform2D);
  if (xfrm === undefined) {
    if (!createIfMissing) return undefined;
    xfrm = new Transform2D();
    const first = spPr.children.at(0);
    if (first === undefined) spPr.appendChild(xfrm);
    else spPr.children.insertBefore(xfrm, first);
  }
  return xfrm;
}

Object.defineProperty(Shape.prototype, "rotationDegrees", {
  configurable: false,
  enumerable: false,
  get(this: Shape): number | undefined {
    const spPr = getSpPr(this, false);
    if (spPr === undefined) return undefined;
    const xfrm = getXfrm(spPr, false);
    if (xfrm === undefined) return undefined;
    const rot = xfrm.rotation?.value;
    if (rot === undefined) return undefined;
    return rot / EMU_PER_DEGREE;
  },
  set(this: Shape, value: number | undefined): void {
    if (value === undefined) {
      const spPr = getSpPr(this, false);
      if (spPr === undefined) return;
      const xfrm = getXfrm(spPr, false);
      if (xfrm === undefined) return;
      xfrm.rotation = undefined;
      return;
    }
    const spPr = getSpPr(this, true);
    const xfrm = getXfrm(spPr, true);
    xfrm.rotation = new Int32Value(Math.round(value * EMU_PER_DEGREE));
  },
});

Object.defineProperty(Shape.prototype, "flipHorizontal", {
  configurable: false,
  enumerable: false,
  get(this: Shape): boolean | undefined {
    const spPr = getSpPr(this, false);
    if (spPr === undefined) return undefined;
    const xfrm = getXfrm(spPr, false);
    if (xfrm === undefined) return undefined;
    const v = xfrm.horizontalFlip?.value;
    if (v === undefined) return undefined;
    return v;
  },
  set(this: Shape, value: boolean | undefined): void {
    if (value === undefined) {
      const spPr = getSpPr(this, false);
      if (spPr === undefined) return;
      const xfrm = getXfrm(spPr, false);
      if (xfrm === undefined) return;
      xfrm.horizontalFlip = undefined;
      return;
    }
    const spPr = getSpPr(this, true);
    const xfrm = getXfrm(spPr, true);
    xfrm.horizontalFlip = new BooleanValue(value);
  },
});

Object.defineProperty(Shape.prototype, "flipVertical", {
  configurable: false,
  enumerable: false,
  get(this: Shape): boolean | undefined {
    const spPr = getSpPr(this, false);
    if (spPr === undefined) return undefined;
    const xfrm = getXfrm(spPr, false);
    if (xfrm === undefined) return undefined;
    const v = xfrm.verticalFlip?.value;
    if (v === undefined) return undefined;
    return v;
  },
  set(this: Shape, value: boolean | undefined): void {
    if (value === undefined) {
      const spPr = getSpPr(this, false);
      if (spPr === undefined) return;
      const xfrm = getXfrm(spPr, false);
      if (xfrm === undefined) return;
      xfrm.verticalFlip = undefined;
      return;
    }
    const spPr = getSpPr(this, true);
    const xfrm = getXfrm(spPr, true);
    xfrm.verticalFlip = new BooleanValue(value);
  },
});
