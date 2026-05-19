/**
 * Epic-47：Slide.backgroundColorHex 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlUnknownElement } from "../../src/element/index.js";
import { BackgroundProperties } from "../../src/ppt/generated/background-properties.js";
import { Background } from "../../src/ppt/generated/background.js";
import { CommonSlideData } from "../../src/ppt/generated/common-slide-data.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

/** 构建一个有 cSld + spTree 的基础 slide */
function buildSlideWithSpTree(): Slide {
  const slide = new Slide();
  const cSld = new CommonSlideData();
  const spTree = u("p", "spTree", NS_P);
  cSld.appendChild(spTree);
  slide.appendChild(cSld);
  return slide;
}

describe("Slide.backgroundColorHex", () => {
  it("getter 无 bg 返回 undefined", () => {
    const slide = buildSlideWithSpTree();
    expect(slide.backgroundColorHex).toBeUndefined();
  });

  it("getter 空 Slide 返回 undefined", () => {
    const slide = new Slide();
    expect(slide.backgroundColorHex).toBeUndefined();
  });

  it("setter 写入颜色后 getter 读取一致", () => {
    const slide = buildSlideWithSpTree();
    slide.backgroundColorHex = "FFFF00";
    expect(slide.backgroundColorHex).toBe("FFFF00");
  });

  it("setter 更新颜色", () => {
    const slide = buildSlideWithSpTree();
    slide.backgroundColorHex = "FF0000";
    slide.backgroundColorHex = "00FF00";
    expect(slide.backgroundColorHex).toBe("00FF00");
  });

  it("setter undefined 删除 <p:bg>", () => {
    const slide = buildSlideWithSpTree();
    slide.backgroundColorHex = "AABBCC";
    expect(slide.backgroundColorHex).toBe("AABBCC");
    slide.backgroundColorHex = undefined;
    expect(slide.backgroundColorHex).toBeUndefined();
    // 确认 bg 节点已移除
    const cSld = slide.firstChild(CommonSlideData)!;
    expect(cSld.firstChild(Background)).toBeUndefined();
  });

  it("setter undefined 对无 bg 的 slide 无副作用", () => {
    const slide = buildSlideWithSpTree();
    expect(() => {
      slide.backgroundColorHex = undefined;
    }).not.toThrow();
    expect(slide.backgroundColorHex).toBeUndefined();
  });

  it("<p:bg> 位于 <p:spTree> 之前（schema 顺序）", () => {
    const slide = buildSlideWithSpTree();
    slide.backgroundColorHex = "123456";
    const cSld = slide.firstChild(CommonSlideData)!;
    const childLocalNames = [...cSld.children].map((c) => c.localName);
    const bgIdx = childLocalNames.indexOf("bg");
    const spTreeIdx = childLocalNames.indexOf("spTree");
    expect(bgIdx).toBeGreaterThanOrEqual(0);
    expect(spTreeIdx).toBeGreaterThanOrEqual(0);
    expect(bgIdx).toBeLessThan(spTreeIdx);
  });

  it("getter 已有 bgPr 但无 solidFill 返回 undefined", () => {
    const slide = buildSlideWithSpTree();
    const cSld = slide.firstChild(CommonSlideData)!;
    const bg = new Background();
    const bgPr = new BackgroundProperties();
    bg.appendChild(bgPr);
    // 插在 spTree 前
    const spTree = cSld.children.at(0)!;
    cSld.children.insertBefore(bg, spTree);
    expect(slide.backgroundColorHex).toBeUndefined();
  });

  it("round-trip：通过 PresentationDocument save → reopen，backgroundColorHex 保留", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    slide.backgroundColorHex = "FF5500";

    const bytes = await doc.saveAsBytesAsync();
    await using reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    expect(reSlide.backgroundColorHex).toBe("FF5500");
  });
});
