/**
 * Epic-56：Picture.crop 裁剪访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  OpenXmlCompositeElement,
  OpenXmlUnknownElement,
  serialize,
} from "../../src/element/index.js";
import { createImagePictureForPpt, getPictureCrop, setPictureCrop } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";

/** 构造一个最小 p:pic（含 p:blipFill）。 */
function buildPic(): OpenXmlUnknownElement {
  return createImagePictureForPpt("rId1", { xEmu: 0, yEmu: 0 }, { cxEmu: 914400, cyEmu: 685800 });
}

describe("getPictureCrop — getter", () => {
  it("srcRect 不存在时返回 undefined", () => {
    const pic = buildPic();
    expect(getPictureCrop(pic)).toBeUndefined();
  });

  it("srcRect 存在时返回正确的 pct 值", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 10, topPct: 5, rightPct: 0, bottomPct: 5 });
    expect(getPictureCrop(pic)).toEqual({ leftPct: 10, topPct: 5, rightPct: 0, bottomPct: 5 });
  });

  it("属性全为 0 时返回全零对象", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 0, topPct: 0, rightPct: 0, bottomPct: 0 });
    expect(getPictureCrop(pic)).toEqual({ leftPct: 0, topPct: 0, rightPct: 0, bottomPct: 0 });
  });

  it("小数百分比 round-trip 正确（0.5% → 500 → 0.5%）", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 0.5, topPct: 1.5, rightPct: 2.5, bottomPct: 0.1 });
    const crop = getPictureCrop(pic);
    expect(crop?.leftPct).toBeCloseTo(0.5);
    expect(crop?.topPct).toBeCloseTo(1.5);
    expect(crop?.rightPct).toBeCloseTo(2.5);
    expect(crop?.bottomPct).toBeCloseTo(0.1);
  });
});

describe("setPictureCrop — setter", () => {
  it("设置裁剪后 XML 中包含 a:srcRect 和正确属性", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 10, topPct: 5, rightPct: 0, bottomPct: 5 });
    const xml = serialize(pic);
    expect(xml).toContain("<a:srcRect");
    expect(xml).toContain('l="10000"');
    expect(xml).toContain('t="5000"');
    expect(xml).toContain('r="0"');
    expect(xml).toContain('b="5000"');
  });

  it("二次 set 覆盖旧值", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 10, topPct: 10, rightPct: 10, bottomPct: 10 });
    setPictureCrop(pic, { leftPct: 20, topPct: 0, rightPct: 5, bottomPct: 3 });
    expect(getPictureCrop(pic)).toEqual({ leftPct: 20, topPct: 0, rightPct: 5, bottomPct: 3 });
  });

  it("setter undefined 删除 srcRect，getter 随后返回 undefined", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 10, topPct: 5, rightPct: 0, bottomPct: 5 });
    expect(getPictureCrop(pic)).toBeDefined();
    setPictureCrop(pic, undefined);
    expect(getPictureCrop(pic)).toBeUndefined();
  });

  it("undefined setter 在 srcRect 不存在时静默（不抛错）", () => {
    const pic = buildPic();
    expect(() => setPictureCrop(pic, undefined)).not.toThrow();
  });

  it("srcRect 插在 a:stretch 之前（符合 OOXML schema 顺序）", () => {
    const pic = buildPic();
    setPictureCrop(pic, { leftPct: 5, topPct: 5, rightPct: 5, bottomPct: 5 });
    const xml = serialize(pic);
    const srcRectIdx = xml.indexOf("<a:srcRect");
    const stretchIdx = xml.indexOf("<a:stretch");
    expect(srcRectIdx).toBeGreaterThan(-1);
    expect(stretchIdx).toBeGreaterThan(-1);
    expect(srcRectIdx).toBeLessThan(stretchIdx);
  });

  it("无 blipFill 的裸 p:pic 也能正确创建并设置 srcRect", () => {
    // 测试从一个无 blipFill 的 pic 开始
    const pic = new OpenXmlUnknownElement("p", "pic", NS_P);
    expect(() =>
      setPictureCrop(pic, { leftPct: 10, topPct: 0, rightPct: 0, bottomPct: 0 }),
    ).not.toThrow();
    expect(getPictureCrop(pic)).toEqual({ leftPct: 10, topPct: 0, rightPct: 0, bottomPct: 0 });
  });
});

describe("round-trip via PresentationDocument", () => {
  it("save → reopen 后 srcRect 属性保留在 XML 中", async () => {
    const { PresentationDocument } = await import("../../src/ppt/index.js");
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart?.slideParts[0];
    if (slidePart === undefined) throw new Error("no slide part");

    const { relId } = doc.addImagePart(0, new Uint8Array([137, 80, 78, 71]));
    const pic = createImagePictureForPpt(
      relId,
      { xEmu: 0, yEmu: 0 },
      { cxEmu: 914400, cyEmu: 685800 },
    );
    setPictureCrop(pic, { leftPct: 10, topPct: 5, rightPct: 0, bottomPct: 5 });

    const slide = slidePart.slide;
    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("no spTree");
    spTree.appendChild(pic);

    const bytes = await doc.saveAsBytesAsync();
    const { ZipReader, BlobReader, TextWriter } = await import("@zip.js/zip.js");
    const reader = new ZipReader(new BlobReader(new Blob([bytes])));
    const entries = await reader.getEntries();
    let slideXml = "";
    for (const entry of entries) {
      if (entry.filename.match(/ppt\/slides\/slide\d+\.xml/)) {
        slideXml = (await entry.getData?.(new TextWriter())) ?? "";
        break;
      }
    }
    await reader.close();

    expect(slideXml).toContain("<a:srcRect");
    expect(slideXml).toContain('l="10000"');
    expect(slideXml).toContain('t="5000"');
    expect(slideXml).toContain('b="5000"');
  });
});
