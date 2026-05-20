/**
 * Epic-59：Slide.transition 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { ColorMapOverride } from "../../src/ppt/generated/color-map-override.js";
import { CommonSlideData } from "../../src/ppt/generated/common-slide-data.js";
import { FadeTransition } from "../../src/ppt/generated/fade-transition.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { Transition } from "../../src/ppt/generated/transition.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** 构建一个有 cSld + clrMapOvr 的基础 slide */
function buildSlide(): Slide {
  const slide = new Slide();
  slide.appendChild(new CommonSlideData());
  slide.appendChild(new ColorMapOverride());
  return slide;
}

describe("Slide.transition", () => {
  it("getter 无 transition 返回 undefined", () => {
    const slide = buildSlide();
    expect(slide.transition).toBeUndefined();
  });

  it("getter 空 Slide 返回 undefined", () => {
    const slide = new Slide();
    expect(slide.transition).toBeUndefined();
  });

  it("setter fade 效果，getter 读取一致", () => {
    const slide = buildSlide();
    slide.transition = { effect: "fade", speed: "med", advanceOnClick: true };
    expect(slide.transition).toEqual({ effect: "fade", speed: "med", advanceOnClick: true });
  });

  it("setter push 效果", () => {
    const slide = buildSlide();
    slide.transition = { effect: "push", speed: "fast" };
    const t = slide.transition;
    expect(t?.effect).toBe("push");
    expect(t?.speed).toBe("fast");
  });

  it("setter cut 效果", () => {
    const slide = buildSlide();
    slide.transition = { effect: "cut" };
    expect(slide.transition?.effect).toBe("cut");
  });

  it("setter wipe 效果", () => {
    const slide = buildSlide();
    slide.transition = { effect: "wipe", speed: "slow" };
    const t = slide.transition;
    expect(t?.effect).toBe("wipe");
    expect(t?.speed).toBe("slow");
  });

  it("setter split 效果", () => {
    const slide = buildSlide();
    slide.transition = { effect: "split" };
    expect(slide.transition?.effect).toBe("split");
  });

  it("setter dissolve 效果", () => {
    const slide = buildSlide();
    slide.transition = { effect: "dissolve" };
    expect(slide.transition?.effect).toBe("dissolve");
  });

  it("setter advanceAfterTimeMs", () => {
    const slide = buildSlide();
    slide.transition = { effect: "fade", advanceAfterTimeMs: 3000 };
    expect(slide.transition?.advanceAfterTimeMs).toBe(3000);
  });

  it("setter advanceOnClick false", () => {
    const slide = buildSlide();
    slide.transition = { effect: "cut", advanceOnClick: false };
    expect(slide.transition?.advanceOnClick).toBe(false);
  });

  it("更新效果：fade → push", () => {
    const slide = buildSlide();
    slide.transition = { effect: "fade" };
    slide.transition = { effect: "push" };
    expect(slide.transition?.effect).toBe("push");
    // fade 子元素已被移除
    const trans = slide.firstChild(Transition)!;
    expect(trans.firstChild(FadeTransition)).toBeUndefined();
  });

  it("setter undefined 删除 <p:transition>", () => {
    const slide = buildSlide();
    slide.transition = { effect: "fade" };
    expect(slide.transition).toBeDefined();
    slide.transition = undefined;
    expect(slide.transition).toBeUndefined();
    expect(slide.firstChild(Transition)).toBeUndefined();
  });

  it("setter undefined 对无 transition 的 slide 无副作用", () => {
    const slide = buildSlide();
    expect(() => {
      slide.transition = undefined;
    }).not.toThrow();
    expect(slide.transition).toBeUndefined();
  });

  it("<p:transition> 位于 <p:clrMapOvr> 之后", () => {
    const slide = buildSlide();
    slide.transition = { effect: "fade" };
    const localNames = [...slide.children].map((c) => c.localName);
    const clrIdx = localNames.indexOf("clrMapOvr");
    const transIdx = localNames.indexOf("transition");
    expect(clrIdx).toBeGreaterThanOrEqual(0);
    expect(transIdx).toBeGreaterThanOrEqual(0);
    expect(transIdx).toBeGreaterThan(clrIdx);
  });

  it("round-trip：save → reopen，transition 保留", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    slide.transition = {
      effect: "fade",
      speed: "med",
      advanceOnClick: true,
      advanceAfterTimeMs: 2000,
    };

    const bytes = await doc.saveAsBytesAsync();
    await using reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    expect(reSlide.transition).toEqual({
      effect: "fade",
      speed: "med",
      advanceOnClick: true,
      advanceAfterTimeMs: 2000,
    });
  });
});
