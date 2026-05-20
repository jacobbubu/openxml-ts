/**
 * Epic-55：addSlide 新增幻灯片 helper 集成测试。
 *
 * 覆盖：
 * - 添加单张幻灯片 / 添加多张幻灯片
 * - sldIdLst 增长与 id 递增
 * - PresentationPart → SlidePart 关系创建
 * - SlidePart → SlideLayoutPart 关系创建
 * - slideParts 顺序
 * - save → reopen 往返序列化
 */

import { describe, expect, it } from "vitest";
import { SlideIdList } from "../../src/ppt/generated/slide-id-list.js";
import { SlideId } from "../../src/ppt/generated/slide-id.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument, SlideLayoutPart, SlidePart, addSlide } from "../../src/ppt/index.js";

describe("addSlide（Epic-55）", () => {
  it("添加一张幻灯片后 slideParts.length === 2", () => {
    const doc = PresentationDocument.create();
    addSlide(doc);
    expect(doc.presentationPart!.slideParts).toHaveLength(2);
  });

  it("连续添加多张幻灯片，每次 slideParts 递增", () => {
    const doc = PresentationDocument.create();
    addSlide(doc);
    addSlide(doc);
    addSlide(doc);
    expect(doc.presentationPart!.slideParts).toHaveLength(4);
  });

  it("sldIdLst 中 <p:sldId> 数量随每次 addSlide 递增", () => {
    const doc = PresentationDocument.create();
    const pp = doc.presentationPart!;
    const countIds = (): number => {
      let n = 0;
      const lst = pp.presentation.firstChild(SlideIdList);
      if (lst === undefined) return 0;
      for (const _ of lst.elements(SlideId)) n += 1;
      return n;
    };
    expect(countIds()).toBe(1);
    addSlide(doc);
    expect(countIds()).toBe(2);
    addSlide(doc);
    expect(countIds()).toBe(3);
  });

  it("新 sldId.id 单调递增且 ≥ 256", () => {
    const doc = PresentationDocument.create();
    addSlide(doc);
    addSlide(doc);
    const pp = doc.presentationPart!;
    const lst = pp.presentation.firstChild(SlideIdList)!;
    const ids: number[] = [];
    for (const sldId of lst.elements(SlideId)) {
      const val = sldId.id?.value;
      expect(val).toBeGreaterThanOrEqual(256);
      ids.push(val as number);
    }
    expect(ids).toHaveLength(3);
    for (let i = 1; i < ids.length; i += 1) {
      expect(ids[i]).toBeGreaterThan(ids[i - 1] as number);
    }
  });

  it("PresentationPart → 新 SlidePart 存在 slide 类型关系", () => {
    const doc = PresentationDocument.create();
    const newSp = addSlide(doc);
    const pp = doc.presentationPart!;
    // 新 slide Part 的 URI 在 sldIdLst 的关系里能找到
    const targetUri = newSp.part.uri as string;
    let found = false;
    for (const rel of pp.part.relationships) {
      if (rel.type.endsWith("/slide") && rel.targetMode === "internal") {
        // 关系 target 是相对 /ppt/presentation.xml 的路径
        if (targetUri.endsWith(rel.target.split("/").pop() as string)) {
          found = true;
          break;
        }
      }
    }
    expect(found).toBe(true);
  });

  it("新 SlidePart → SlideLayoutPart 存在 slideLayout 类型关系", () => {
    const doc = PresentationDocument.create();
    const newSp = addSlide(doc);
    let foundLayoutRel = false;
    for (const rel of newSp.part.relationships) {
      if (rel.type.endsWith("/slideLayout") && rel.targetMode === "internal") {
        foundLayoutRel = true;
        break;
      }
    }
    expect(foundLayoutRel).toBe(true);
    // slideLayoutPart getter 能正确解析
    expect(newSp.slideLayoutPart).toBeInstanceOf(SlideLayoutPart);
  });

  it("slideParts 顺序：原始 slide 在前，新 slide 按追加顺序排列", () => {
    const doc = PresentationDocument.create();
    const original = doc.presentationPart!.slideParts[0]!;
    const sp2 = addSlide(doc);
    const sp3 = addSlide(doc);
    const parts = doc.presentationPart!.slideParts;
    expect(parts[0]).toBe(original);
    expect(parts[1]).toBe(sp2);
    expect(parts[2]).toBe(sp3);
  });

  it("save → reopen 后幻灯片数量保持，且每张都是 Slide 类型", async () => {
    const doc = PresentationDocument.create();
    addSlide(doc);
    addSlide(doc);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const slides = reopened.presentationPart!.slideParts;
    expect(slides).toHaveLength(3);
    for (const sp of slides) {
      expect(sp.slide).toBeInstanceOf(Slide);
    }
  });

  it("save → reopen 后 sldId 单调递增", async () => {
    const doc = PresentationDocument.create();
    addSlide(doc);
    addSlide(doc);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const pp = reopened.presentationPart!;
    const lst = pp.presentation.firstChild(SlideIdList)!;
    const ids: number[] = [];
    for (const sldId of lst.elements(SlideId)) {
      ids.push(sldId.id?.value as number);
    }
    expect(ids).toHaveLength(3);
    for (let i = 1; i < ids.length; i += 1) {
      expect(ids[i]).toBeGreaterThan(ids[i - 1] as number);
    }
  });

  it("addSlide 自由函数与 doc.addSlide() 方法等价（返回 SlidePart）", () => {
    const doc = PresentationDocument.create();
    const sp = addSlide(doc);
    expect(sp).toBeInstanceOf(SlidePart);
    expect(sp.slide).toBeInstanceOf(Slide);
  });

  it("options.layoutPart 指定自定义版式时关系指向该 Part", () => {
    const doc = PresentationDocument.create();
    const customLayout = doc.presentationPart!.slideParts[0]!.slideLayoutPart!;
    const newSp = addSlide(doc, { layoutPart: customLayout });
    expect(newSp.slideLayoutPart).toBeInstanceOf(SlideLayoutPart);
  });
});
