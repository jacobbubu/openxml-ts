/**
 * Epic-63：Slide.hidden 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { BooleanValue } from "../../src/element/index.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** 构建一个空白 Slide */
function buildSlide(): Slide {
  return new Slide();
}

describe("Slide.hidden", () => {
  it("getter 默认返回 false（无 show 属性）", () => {
    const slide = buildSlide();
    expect(slide.hidden).toBe(false);
  });

  it("getter show=true 时返回 false（幻灯片可见）", () => {
    const slide = buildSlide();
    slide.show = new BooleanValue(true);
    expect(slide.hidden).toBe(false);
  });

  it("getter show=false 时返回 true（幻灯片隐藏）", () => {
    const slide = buildSlide();
    slide.show = new BooleanValue(false);
    expect(slide.hidden).toBe(true);
  });

  it('setter true → show 属性变为 false（即 show="0"）', () => {
    const slide = buildSlide();
    slide.hidden = true;
    expect(slide.show).toBeDefined();
    expect(slide.show!.value).toBe(false);
  });

  it("setter false → 删除 show 属性", () => {
    const slide = buildSlide();
    slide.hidden = true;
    slide.hidden = false;
    expect(slide.show).toBeUndefined();
  });

  it("setter false 对无 show 属性的 slide 无副作用", () => {
    const slide = buildSlide();
    expect(() => {
      slide.hidden = false;
    }).not.toThrow();
    expect(slide.show).toBeUndefined();
    expect(slide.hidden).toBe(false);
  });

  it("setter true / false 切换：getter 保持一致", () => {
    const slide = buildSlide();
    slide.hidden = true;
    expect(slide.hidden).toBe(true);
    slide.hidden = false;
    expect(slide.hidden).toBe(false);
    slide.hidden = true;
    expect(slide.hidden).toBe(true);
  });

  it("round-trip：save → reopen，hidden=true 保留", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    slide.hidden = true;

    const bytes = await doc.saveAsBytesAsync();
    await using reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    expect(reSlide.hidden).toBe(true);
  });

  it("round-trip：save → reopen，hidden=false（删除属性）保留", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    slide.hidden = true;
    slide.hidden = false;

    const bytes = await doc.saveAsBytesAsync();
    await using reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    expect(reSlide.hidden).toBe(false);
    expect(reSlide.show).toBeUndefined();
  });
});
