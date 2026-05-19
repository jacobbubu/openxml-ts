/**
 * Epic-51：getSpeakerNotes / setSpeakerNotes 自由函数集成测试。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  NotesSlidePart,
  PresentationDocument,
  getSpeakerNotes,
  setSpeakerNotes,
} from "../../src/ppt/index.js";

describe("getSpeakerNotes / setSpeakerNotes（Epic-51）", () => {
  it("首次写入 bootstrap NotesSlidePart 并可读回", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    expect(slide0.notesSlidePart).toBeUndefined();

    setSpeakerNotes(slide0.slide, doc, "Hello speaker");
    expect(slide0.notesSlidePart).toBeInstanceOf(NotesSlidePart);
    expect(getSpeakerNotes(slide0.slide, doc)).toBe("Hello speaker");
  });

  it("无注释时返回 undefined", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    expect(getSpeakerNotes(slide0.slide, doc)).toBeUndefined();
  });

  it("覆盖写入替换原文本", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    setSpeakerNotes(slide0.slide, doc, "first");
    setSpeakerNotes(slide0.slide, doc, "second");
    expect(getSpeakerNotes(slide0.slide, doc)).toBe("second");
  });

  it("setSpeakerNotes(undefined) 清空注释", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    setSpeakerNotes(slide0.slide, doc, "to be cleared");
    setSpeakerNotes(slide0.slide, doc, undefined);
    // 清空后文本为空 → getSpeakerNotes 返回 undefined
    expect(getSpeakerNotes(slide0.slide, doc)).toBeUndefined();
  });

  it("setSpeakerNotes(空串) 清空注释", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    setSpeakerNotes(slide0.slide, doc, "non-empty");
    setSpeakerNotes(slide0.slide, doc, "");
    expect(getSpeakerNotes(slide0.slide, doc)).toBeUndefined();
  });

  it("save → reopen 后注释保留（round-trip）", async () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart?.slideParts[0]!;
    setSpeakerNotes(slide0.slide, doc, "Persisted via slide ref");
    const bytes = await doc.saveAsBytesAsync();

    const reopened = await PresentationDocument.openAsync(bytes);
    const reSp = reopened.presentationPart?.slideParts[0]!;
    expect(getSpeakerNotes(reSp.slide, reopened)).toBe("Persisted via slide ref");
    expect(reSp.notesSlidePart).toBeInstanceOf(NotesSlidePart);
  });

  it("slide 不在该 doc 时抛 OpenXmlPackageError", () => {
    const doc1 = PresentationDocument.create();
    const doc2 = PresentationDocument.create();
    // biome-ignore lint/style/noNonNullAssertion: test helper
    const slide0Doc1 = doc1.presentationPart!.slideParts[0]!.slide;

    expect(() => getSpeakerNotes(slide0Doc1, doc2)).toThrow(OpenXmlPackageError);
    expect(() => setSpeakerNotes(slide0Doc1, doc2, "x")).toThrow(OpenXmlPackageError);
  });

  it("多张 slide 各自独立存注释", () => {
    const doc = PresentationDocument.create();
    const pp = doc.presentationPart!;

    // 添加第二张 slide（利用已有 SlidePart 索引 API）
    doc.setSlideNotes(0, "notes for slide 1");

    const slide0 = pp.slideParts[0]!;
    expect(getSpeakerNotes(slide0.slide, doc)).toBe("notes for slide 1");
  });
});
