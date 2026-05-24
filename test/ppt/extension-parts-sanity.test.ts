/**
 * Epic-120-follow sanity smoke：PresentationPart (8) + SlidePart (4) 扩展 typed Part getter。
 *
 * 验证契约：
 * - Single getter：part 不存在时返回 undefined（不抛）；二次访问同 undefined（缓存 null）
 * - Collection getter：part 不存在时返回空数组（不抛）
 * - static contentType / relationshipType 可访问且非空
 */

import { describe, expect, it } from "vitest";
import { registerDrawingElements } from "../../src/drawing/generated/_registry.js";
import { ElementRegistry } from "../../src/element/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import { registerPresentationElements } from "../../src/ppt/generated/_registry.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import {
  CommentAuthorsPart,
  HandoutMasterPart,
  PowerPointAuthorsPart,
  PowerPointCommentPart,
  PresentationPart,
  SlidePart,
  SlideSyncDataPart,
  TableStylesPart,
  ThemeOverridePart,
  UserDefinedTagsPart,
  VbaProjectPart,
  ViewPropertiesPart,
} from "../../src/ppt/parts/index.js";

const PNS = "http://schemas.openxmlformats.org/presentationml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerPresentationElements(r);
  registerDrawingElements(r);
  // override <p:sld> → Slide（codegen 字母序最后一次 SlideListEntry 胜出）
  r.register(PNS, "sld", Slide);
  return r;
}

/** 构造最小空演示文稿 pkg + PresentationPart（无任何扩展关系）。 */
async function makeEmptyPresentationPart(): Promise<PresentationPart> {
  const pkg = createInMemory();
  const part = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
  await part.writeAsync(`<p:presentation xmlns:p="${PNS}"><p:sldIdLst/></p:presentation>`);
  return new PresentationPart(part, makeRegistry(), pkg);
}

/** 构造最小空幻灯片 pkg + SlidePart（无任何扩展关系）。 */
async function makeEmptySlidePart(): Promise<SlidePart> {
  const pkg = createInMemory();
  const part = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
  await part.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
  return new SlidePart(part, makeRegistry(), pkg);
}

// ──────────────────────────────────────────────────────────────────────────────
// 静态常量可访问性
// ──────────────────────────────────────────────────────────────────────────────

describe("Epic-120 PPT 扩展 Part 静态常量", () => {
  const parts = [
    PowerPointAuthorsPart,
    CommentAuthorsPart,
    HandoutMasterPart,
    TableStylesPart,
    ViewPropertiesPart,
    UserDefinedTagsPart,
    VbaProjectPart,
    PowerPointCommentPart,
    SlideSyncDataPart,
    ThemeOverridePart,
  ] as const;

  for (const Ctor of parts) {
    it(`${Ctor.name} contentType / relationshipType 非空`, () => {
      expect(Ctor.contentType).toBeTruthy();
      expect(Ctor.relationshipType).toBeTruthy();
    });
  }
});

// ──────────────────────────────────────────────────────────────────────────────
// PresentationPart single getter：缺 Part → undefined（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("PresentationPart single getter 缺 Part → undefined", () => {
  it("powerPointAuthorsPart 无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.powerPointAuthorsPart).toBeUndefined();
    expect(pp.powerPointAuthorsPart).toBeUndefined();
  });

  it("commentAuthorsPart 无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.commentAuthorsPart).toBeUndefined();
    expect(pp.commentAuthorsPart).toBeUndefined();
  });

  it("handoutMasterPart 无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.handoutMasterPart).toBeUndefined();
    expect(pp.handoutMasterPart).toBeUndefined();
  });

  it("tableStylesPart 无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.tableStylesPart).toBeUndefined();
    expect(pp.tableStylesPart).toBeUndefined();
  });

  it("viewPropertiesPart 无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.viewPropertiesPart).toBeUndefined();
    expect(pp.viewPropertiesPart).toBeUndefined();
  });

  it("userDefinedTagsPart（PresentationPart）无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.userDefinedTagsPart).toBeUndefined();
    expect(pp.userDefinedTagsPart).toBeUndefined();
  });

  it("vbaProjectPart（PresentationPart）无关系 → undefined；二访同样", async () => {
    const pp = await makeEmptyPresentationPart();
    expect(pp.vbaProjectPart).toBeUndefined();
    expect(pp.vbaProjectPart).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// PresentationPart collection getter：缺 Part → 空数组（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("PresentationPart collection getter 缺 Part → 空数组", () => {
  it("powerPointCommentParts（PresentationPart）无关系 → 空数组", async () => {
    const pp = await makeEmptyPresentationPart();
    const parts = pp.powerPointCommentParts;
    expect(Array.isArray(parts)).toBe(true);
    expect(parts.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// PresentationPart 端到端：有真实关系时能解出实例
// ──────────────────────────────────────────────────────────────────────────────

describe("PresentationPart single getter 有关系 → 返回实例", () => {
  it("powerPointAuthorsPart 有关系 → 实例；二访同实例", async () => {
    const pkg = createInMemory();
    const pPart = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await pPart.writeAsync(`<p:presentation xmlns:p="${PNS}"><p:sldIdLst/></p:presentation>`);

    pkg.createPart("/ppt/authors.xml" as PartUri, PowerPointAuthorsPart.contentType);
    await pkg.getPart("/ppt/authors.xml" as PartUri).writeAsync("<root/>");
    pPart.relationships.create({
      type: PowerPointAuthorsPart.relationshipType,
      target: "authors.xml",
      targetMode: "internal",
    });

    const pp = new PresentationPart(pPart, makeRegistry(), pkg);
    const resolved = pp.powerPointAuthorsPart;
    expect(resolved).toBeInstanceOf(PowerPointAuthorsPart);
    expect(pp.powerPointAuthorsPart).toBe(resolved);
  });

  it("powerPointCommentParts（PresentationPart）有 2 个关系 → 长度 2；二访同数组", async () => {
    const pkg = createInMemory();
    const pPart = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await pPart.writeAsync(`<p:presentation xmlns:p="${PNS}"><p:sldIdLst/></p:presentation>`);

    for (const name of ["comment1", "comment2"]) {
      pkg.createPart(`/ppt/${name}.xml` as PartUri, PowerPointCommentPart.contentType);
      await pkg.getPart(`/ppt/${name}.xml` as PartUri).writeAsync("<root/>");
      pPart.relationships.create({
        type: PowerPointCommentPart.relationshipType,
        target: `${name}.xml`,
        targetMode: "internal",
      });
    }

    const pp = new PresentationPart(pPart, makeRegistry(), pkg);
    const parts = pp.powerPointCommentParts;
    expect(parts.length).toBe(2);
    expect(parts[0]).toBeInstanceOf(PowerPointCommentPart);
    expect(pp.powerPointCommentParts).toBe(parts);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// SlidePart single getter：缺 Part → undefined（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("SlidePart single getter 缺 Part → undefined", () => {
  it("slideSyncDataPart 无关系 → undefined；二访同样", async () => {
    const sp = await makeEmptySlidePart();
    expect(sp.slideSyncDataPart).toBeUndefined();
    expect(sp.slideSyncDataPart).toBeUndefined();
  });

  it("themeOverridePart 无关系 → undefined；二访同样", async () => {
    const sp = await makeEmptySlidePart();
    expect(sp.themeOverridePart).toBeUndefined();
    expect(sp.themeOverridePart).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// SlidePart collection getter：缺 Part → 空数组（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("SlidePart collection getter 缺 Part → 空数组", () => {
  it("powerPointCommentParts（SlidePart）无关系 → 空数组", async () => {
    const sp = await makeEmptySlidePart();
    const parts = sp.powerPointCommentParts;
    expect(Array.isArray(parts)).toBe(true);
    expect(parts.length).toBe(0);
  });

  it("userDefinedTagsParts（SlidePart）无关系 → 空数组", async () => {
    const sp = await makeEmptySlidePart();
    expect(sp.userDefinedTagsParts.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// SlidePart 端到端：有真实关系时能解出实例
// ──────────────────────────────────────────────────────────────────────────────

describe("SlidePart getter 有关系 → 返回实例", () => {
  it("slideSyncDataPart 有关系 → 实例；二访同实例", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);

    pkg.createPart("/ppt/slides/slideSync1.xml" as PartUri, SlideSyncDataPart.contentType);
    await pkg.getPart("/ppt/slides/slideSync1.xml" as PartUri).writeAsync("<root/>");
    slidePart.relationships.create({
      type: SlideSyncDataPart.relationshipType,
      target: "slideSync1.xml",
      targetMode: "internal",
    });

    const sp = new SlidePart(slidePart, makeRegistry(), pkg);
    const resolved = sp.slideSyncDataPart;
    expect(resolved).toBeInstanceOf(SlideSyncDataPart);
    expect(sp.slideSyncDataPart).toBe(resolved);
  });

  it("powerPointCommentParts（SlidePart）有 1 个关系 → 长度 1", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);

    pkg.createPart("/ppt/slides/comment1.xml" as PartUri, PowerPointCommentPart.contentType);
    await pkg.getPart("/ppt/slides/comment1.xml" as PartUri).writeAsync("<root/>");
    slidePart.relationships.create({
      type: PowerPointCommentPart.relationshipType,
      target: "comment1.xml",
      targetMode: "internal",
    });

    const sp = new SlidePart(slidePart, makeRegistry(), pkg);
    const parts = sp.powerPointCommentParts;
    expect(parts.length).toBe(1);
    expect(parts[0]).toBeInstanceOf(PowerPointCommentPart);
    expect(sp.powerPointCommentParts).toBe(parts);
  });

  it("userDefinedTagsParts（SlidePart）有 2 个关系 → 长度 2", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);

    for (const name of ["tags1", "tags2"]) {
      pkg.createPart(`/ppt/tags/${name}.xml` as PartUri, UserDefinedTagsPart.contentType);
      await pkg.getPart(`/ppt/tags/${name}.xml` as PartUri).writeAsync("<root/>");
      slidePart.relationships.create({
        type: UserDefinedTagsPart.relationshipType,
        target: `../tags/${name}.xml`,
        targetMode: "internal",
      });
    }

    const sp = new SlidePart(slidePart, makeRegistry(), pkg);
    const parts = sp.userDefinedTagsParts;
    expect(parts.length).toBe(2);
    expect(parts[0]).toBeInstanceOf(UserDefinedTagsPart);
    expect(sp.userDefinedTagsParts).toBe(parts);
  });
});
