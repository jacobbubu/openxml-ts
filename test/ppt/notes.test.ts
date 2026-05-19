/**
 * Epic-27：PPT setSlideNotes / getSlideNotes 集成测试。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import { NotesSlidePart, PresentationDocument } from "../../src/ppt/index.js";

describe("PresentationDocument.setSlideNotes / getSlideNotes（Epic-27）", () => {
  it("第一次调用 bootstrap NotesSlidePart + 接关系", () => {
    const doc = PresentationDocument.create();
    const slide0 = doc.presentationPart!.slideParts[0]!;
    expect(slide0.notesSlidePart).toBeUndefined();

    doc.setSlideNotes(0, "Speaker notes for slide 1");
    const np = slide0.notesSlidePart;
    expect(np).toBeInstanceOf(NotesSlidePart);
    expect(doc.getSlideNotes(0)).toBe("Speaker notes for slide 1");
  });

  it("覆盖第二次：替换文本", () => {
    const doc = PresentationDocument.create();
    doc.setSlideNotes(0, "first");
    doc.setSlideNotes(0, "second");
    expect(doc.getSlideNotes(0)).toBe("second");
  });

  it("接受 SlidePart 引用", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart!.slideParts[0]!;
    doc.setSlideNotes(sp, "by ref");
    expect(doc.getSlideNotes(sp)).toBe("by ref");
  });

  it("slide 越界抛 friendly 错", () => {
    const doc = PresentationDocument.create();
    expect(() => doc.setSlideNotes(9, "x")).toThrow(OpenXmlPackageError);
    expect(() => doc.setSlideNotes(9, "x")).toThrow(/out of range/);
  });

  it("getSlideNotes 没注释时返空串", () => {
    const doc = PresentationDocument.create();
    expect(doc.getSlideNotes(0)).toBe("");
  });

  it("save → reopen 后注释保留 + Part / 关系仍在", async () => {
    const doc = PresentationDocument.create();
    doc.setSlideNotes(0, "Persisted notes");
    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.getSlideNotes(0)).toBe("Persisted notes");
    const reSp = reopened.presentationPart!.slideParts[0]!;
    expect(reSp.notesSlidePart).toBeInstanceOf(NotesSlidePart);
  });
});
