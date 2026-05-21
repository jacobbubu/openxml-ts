// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-52：PPT `Shape` 定位与尺寸访问器 mixin。
 *
 * 在 `Shape.prototype` 上挂两个属性：
 *
 *   shape.position — `p:spPr > a:xfrm > a:off`（x / y，EMU 单位）
 *   shape.size     — `p:spPr > a:xfrm > a:ext`（cx / cy，EMU 单位）
 *
 * - getter：节点不存在 → undefined
 * - setter value → 写入（若 spPr / xfrm 不存在则自动创建）
 * - setter undefined → 删除对应子元素（a:off 或 a:ext）
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import { Extents } from "../../drawing/generated/extents.js";
import { Offset } from "../../drawing/generated/offset.js";
import { Transform2D } from "../../drawing/generated/transform2-d.js";
import { Int64Value } from "../../element/index.js";
import { NonVisualShapeProperties } from "../generated/non-visual-shape-properties.js";
import { ShapeProperties } from "../generated/shape-properties.js";
import { Shape } from "../generated/shape.js";

/** 位置（EMU 单位）。 */
export interface ShapePosition {
  xEmu: number;
  yEmu: number;
}

/** 尺寸（EMU 单位）。 */
export interface ShapeSize {
  widthEmu: number;
  heightEmu: number;
}

declare module "../generated/shape.js" {
  interface Shape {
    /**
     * 形状位置（`p:spPr > a:xfrm > a:off`）。
     * EMU 单位（914400 = 1 英寸）。
     * spPr / xfrm 不存在时 getter 返 undefined；setter 自动创建。
     * setter undefined 删除 `a:off` 元素。
     */
    position: ShapePosition | undefined;

    /**
     * 形状尺寸（`p:spPr > a:xfrm > a:ext`）。
     * EMU 单位（914400 = 1 英寸）。
     * spPr / xfrm 不存在时 getter 返 undefined；setter 自动创建。
     * setter undefined 删除 `a:ext` 元素。
     */
    size: ShapeSize | undefined;
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
    // 插在 nvSpPr 之后（如有），否则 append
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

Object.defineProperty(Shape.prototype, "position", {
  configurable: false,
  enumerable: false,
  get(this: Shape): ShapePosition | undefined {
    const spPr = getSpPr(this, false);
    if (spPr === undefined) return undefined;
    const xfrm = getXfrm(spPr, false);
    if (xfrm === undefined) return undefined;
    const off = xfrm.firstChild(Offset);
    if (off === undefined) return undefined;
    const x = off.x?.value;
    const y = off.y?.value;
    if (x === undefined || y === undefined) return undefined;
    return { xEmu: Number(x), yEmu: Number(y) };
  },
  set(this: Shape, value: ShapePosition | undefined): void {
    if (value === undefined) {
      const spPr = getSpPr(this, false);
      if (spPr === undefined) return;
      const xfrm = getXfrm(spPr, false);
      if (xfrm === undefined) return;
      const off = xfrm.firstChild(Offset);
      if (off !== undefined) xfrm.children.remove(off);
      return;
    }
    const spPr = getSpPr(this, true);
    const xfrm = getXfrm(spPr, true);
    let off = xfrm.firstChild(Offset);
    if (off === undefined) {
      off = new Offset();
      const first = xfrm.children.at(0);
      if (first === undefined) xfrm.appendChild(off);
      else xfrm.children.insertBefore(off, first);
    }
    off.x = new Int64Value(BigInt(value.xEmu));
    off.y = new Int64Value(BigInt(value.yEmu));
  },
});

Object.defineProperty(Shape.prototype, "size", {
  configurable: false,
  enumerable: false,
  get(this: Shape): ShapeSize | undefined {
    const spPr = getSpPr(this, false);
    if (spPr === undefined) return undefined;
    const xfrm = getXfrm(spPr, false);
    if (xfrm === undefined) return undefined;
    const ext = xfrm.firstChild(Extents);
    if (ext === undefined) return undefined;
    const cx = ext.cx?.value;
    const cy = ext.cy?.value;
    if (cx === undefined || cy === undefined) return undefined;
    return { widthEmu: Number(cx), heightEmu: Number(cy) };
  },
  set(this: Shape, value: ShapeSize | undefined): void {
    if (value === undefined) {
      const spPr = getSpPr(this, false);
      if (spPr === undefined) return;
      const xfrm = getXfrm(spPr, false);
      if (xfrm === undefined) return;
      const ext = xfrm.firstChild(Extents);
      if (ext !== undefined) xfrm.children.remove(ext);
      return;
    }
    const spPr = getSpPr(this, true);
    const xfrm = getXfrm(spPr, true);
    let ext = xfrm.firstChild(Extents);
    if (ext === undefined) {
      ext = new Extents();
      // a:ext goes after a:off in schema order
      const off = xfrm.firstChild(Offset);
      if (off !== undefined) {
        const kids = xfrm.children.toArray();
        const idx = kids.indexOf(off);
        const next = kids[idx + 1];
        if (next !== undefined) xfrm.children.insertBefore(ext, next);
        else xfrm.appendChild(ext);
      } else {
        xfrm.appendChild(ext);
      }
    }
    ext.cx = new Int64Value(BigInt(value.widthEmu));
    ext.cy = new Int64Value(BigInt(value.heightEmu));
  },
});
