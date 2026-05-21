// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-56：DrawingML Picture 图片裁剪访问器。
 *
 * `createImagePictureForPpt` 返回的 `p:pic` 是 `OpenXmlUnknownElement`，
 * 其子树结构：
 *
 * ```xml
 * <p:pic>
 *   <p:blipFill>
 *     <a:blip r:embed="rId1"/>
 *     <a:srcRect l="10000" t="5000" r="0" b="5000"/>   ← 裁剪节点
 *     <a:stretch><a:fillRect/></a:stretch>
 *   </p:blipFill>
 *   ...
 * </p:pic>
 * ```
 *
 * pct（0–100）↔ OOXML 1000 分之 1%（即 1% = 1000）。
 */

import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../element/index.js";

const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";

/** 裁剪百分比（0–100）。 */
export interface PictureCrop {
  /** 左侧裁剪百分比（0–100）。 */
  leftPct: number;
  /** 顶部裁剪百分比（0–100）。 */
  topPct: number;
  /** 右侧裁剪百分比（0–100）。 */
  rightPct: number;
  /** 底部裁剪百分比（0–100）。 */
  bottomPct: number;
}

/** pct → OOXML 1000 分之 1% 整数。 */
function pctToOoxml(pct: number): number {
  return Math.round(pct * 1000);
}

/** OOXML 1000 分之 1% → pct。 */
function ooxmlToPct(raw: number): number {
  return raw / 1000;
}

/**
 * 在 `p:pic` 元素的 `p:blipFill` 下找到（或创建）`a:srcRect`。
 *
 * @param pic  `createImagePictureForPpt` 返回的 `p:pic` 元素。
 * @param createIfMissing  true → blipFill / srcRect 不存在时自动创建。
 */
function getSrcRect(pic: OpenXmlUnknownElement, createIfMissing: true): OpenXmlUnknownElement;
function getSrcRect(
  pic: OpenXmlUnknownElement,
  createIfMissing: false,
): OpenXmlUnknownElement | undefined;
function getSrcRect(
  pic: OpenXmlUnknownElement,
  createIfMissing: boolean,
): OpenXmlUnknownElement | undefined {
  // 找 p:blipFill
  let blipFill: OpenXmlUnknownElement | undefined;
  for (const child of pic.children) {
    if (
      child instanceof OpenXmlUnknownElement &&
      child.localName === "blipFill" &&
      child.namespaceUri === NS_P
    ) {
      blipFill = child;
      break;
    }
  }
  if (blipFill === undefined) {
    if (!createIfMissing) return undefined;
    blipFill = new OpenXmlUnknownElement("p", "blipFill", NS_P);
    pic.appendChild(blipFill);
  }

  // 找 a:srcRect
  let srcRect: OpenXmlUnknownElement | undefined;
  for (const child of blipFill.children) {
    if (
      child instanceof OpenXmlUnknownElement &&
      child.localName === "srcRect" &&
      child.namespaceUri === NS_A
    ) {
      srcRect = child;
      break;
    }
  }
  if (srcRect === undefined) {
    if (!createIfMissing) return undefined;
    srcRect = new OpenXmlUnknownElement("a", "srcRect", NS_A);
    // srcRect 按 OOXML schema 顺序应在 blip 之后、stretch 之前。
    // 找到第一个 a:stretch，插在它之前；否则 append。
    let stretchNode: OpenXmlUnknownElement | undefined;
    for (const child of blipFill.children) {
      if (
        child instanceof OpenXmlUnknownElement &&
        child.localName === "stretch" &&
        child.namespaceUri === NS_A
      ) {
        stretchNode = child;
        break;
      }
    }
    if (stretchNode !== undefined) {
      blipFill.children.insertBefore(srcRect, stretchNode);
    } else {
      blipFill.appendChild(srcRect);
    }
  }

  return srcRect;
}

/**
 * 读取 `p:pic` 上的裁剪设置。
 *
 * @param pic  `createImagePictureForPpt` 返回的 `p:pic` 元素。
 * @returns 裁剪百分比对象，或 `undefined`（`a:srcRect` 不存在时）。
 */
export function getPictureCrop(pic: OpenXmlUnknownElement): PictureCrop | undefined {
  const srcRect = getSrcRect(pic, false);
  if (srcRect === undefined) return undefined;

  const lStr = srcRect.extendedAttributes.get("l");
  const tStr = srcRect.extendedAttributes.get("t");
  const rStr = srcRect.extendedAttributes.get("r");
  const bStr = srcRect.extendedAttributes.get("b");

  // 任何属性缺失时视为 0
  const leftPct = lStr !== undefined ? ooxmlToPct(Number(lStr)) : 0;
  const topPct = tStr !== undefined ? ooxmlToPct(Number(tStr)) : 0;
  const rightPct = rStr !== undefined ? ooxmlToPct(Number(rStr)) : 0;
  const bottomPct = bStr !== undefined ? ooxmlToPct(Number(bStr)) : 0;

  return { leftPct, topPct, rightPct, bottomPct };
}

/**
 * 设置 `p:pic` 上的裁剪。
 *
 * @param pic    `createImagePictureForPpt` 返回的 `p:pic` 元素。
 * @param crop   裁剪百分比对象，或 `undefined`（删除 `a:srcRect`）。
 */
export function setPictureCrop(pic: OpenXmlUnknownElement, crop: PictureCrop | undefined): void {
  if (crop === undefined) {
    // 删除 srcRect
    const srcRect = getSrcRect(pic, false);
    if (srcRect === undefined) return;
    const parent = srcRect.parent;
    if (parent instanceof OpenXmlCompositeElement) {
      parent.children.remove(srcRect);
    }
    return;
  }

  const srcRect = getSrcRect(pic, true);
  srcRect.extendedAttributes.set("l", String(pctToOoxml(crop.leftPct)));
  srcRect.extendedAttributes.set("t", String(pctToOoxml(crop.topPct)));
  srcRect.extendedAttributes.set("r", String(pctToOoxml(crop.rightPct)));
  srcRect.extendedAttributes.set("b", String(pctToOoxml(crop.bottomPct)));
}
