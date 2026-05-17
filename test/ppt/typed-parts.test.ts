/**
 * Story-4.3 验证：PresentationPart + SlidePart 两个核心 typed Part，以及配套的
 * SlideLayoutPart / NotesSlidePart 最小骨架（Story-4.4 扩充）。
 *
 * 测试主轴：
 * - static `contentType` / `relationshipType` 常量对齐 OPC；
 * - typed root 懒加载 + 重复访问同实例；
 * - `PresentationPart.slideParts` 按 `<p:sldIdLst>` 顺序而非关系顺序（ADR-024）；
 * - `SlidePart.slideLayoutPart` / `.notesSlidePart` 解 part-level 关系，缺失时 undefined。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry } from "../../src/element/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import { registerDrawingElements } from "../../src/drawing/generated/_registry.js";
import { NotesSlide } from "../../src/ppt/generated/notes-slide.js";
import { Presentation } from "../../src/ppt/generated/presentation.js";
import { SlideLayout } from "../../src/ppt/generated/slide-layout.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { registerPresentationElements } from "../../src/ppt/generated/_registry.js";
import {
  NotesSlidePart,
  PresentationPart,
  SlideLayoutPart,
  SlidePart,
} from "../../src/ppt/parts/index.js";

const PNS = "http://schemas.openxmlformats.org/presentationml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerPresentationElements(r);
  registerDrawingElements(r);
  // codegen 按字母序最后一次写入胜出：`<p:sld>` 默认会解成 SlideListEntry。
  // 在 typed-Parts 场景下（slide.xml 根）我们要的是 Slide；Story-4.5 facade
  // 同样做这层 override。
  r.register(PNS, "sld", Slide);
  return r;
}

describe("PresentationPart · 静态常量 + typed root", () => {
  it("contentType / relationshipType 对齐 OPC", () => {
    expect(PresentationPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml",
    );
    expect(PresentationPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    );
  });

  it("presentation 懒加载 → Presentation 实例；重复访问同一引用", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await part.writeAsync(
      `<p:presentation xmlns:p="${PNS}"><p:sldIdLst/></p:presentation>`,
    );

    const pp = new PresentationPart(part, makeRegistry(), pkg);
    expect(pp.presentation).toBeInstanceOf(Presentation);
    expect(pp.presentation).toBe(pp.presentation);
  });

  it("set presentation + flushAsync 把当前 typed root 写回字节", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await part.writeAsync(`<p:presentation xmlns:p="${PNS}"/>`);

    const pp = new PresentationPart(part, makeRegistry(), pkg);
    const fresh = new Presentation();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    pp.presentation = fresh;
    await pp.flushAsync();
    const bytes = (part as { snapshot(): Uint8Array }).snapshot();
    expect(new TextDecoder().decode(bytes)).toContain("presentation");
  });
});

describe("PresentationPart.slideParts · 按 <p:sldIdLst> 顺序解 SlidePart", () => {
  /**
   * 构造一个 in-memory pkg：
   * - /ppt/presentation.xml 含 sldIdLst 引用 rId-c, rId-a, rId-b（故意非升序）
   * - /ppt/slides/{a,b,c}.xml 都是空 slide
   * - presentation 的 part-level 关系：rId-a→a.xml, rId-b→b.xml, rId-c→c.xml
   * 期望 slideParts 顺序：c.xml, a.xml, b.xml（跟 sldIdLst 一致，而非 rels 顺序）
   */
  async function seedPkg(): Promise<{
    pp: PresentationPart;
    pkg: ReturnType<typeof createInMemory>;
  }> {
    const pkg = createInMemory();
    const pp = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await pp.writeAsync(
      `<p:presentation xmlns:p="${PNS}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldIdLst><p:sldId id="256" r:id="rId-c"/><p:sldId id="257" r:id="rId-a"/><p:sldId id="258" r:id="rId-b"/></p:sldIdLst></p:presentation>`,
    );

    for (const name of ["a", "b", "c"]) {
      const sp = pkg.createPart(`/ppt/slides/${name}.xml` as PartUri, SlidePart.contentType);
      await sp.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
      pp.relationships.create({
        id: `rId-${name}`,
        type: SlidePart.relationshipType,
        target: `slides/${name}.xml`,
        targetMode: "internal",
      });
    }

    return { pp: new PresentationPart(pp, makeRegistry(), pkg), pkg };
  }

  it("slideParts 顺序按 sldIdLst 而非关系顺序", async () => {
    const { pp } = await seedPkg();
    const uris = pp.slideParts.map((s) => s.part.uri);
    expect(uris).toEqual([
      "/ppt/slides/c.xml",
      "/ppt/slides/a.xml",
      "/ppt/slides/b.xml",
    ]);
  });

  it("slideParts 多次访问返回同一数组引用（缓存）", async () => {
    const { pp } = await seedPkg();
    const first = pp.slideParts;
    expect(pp.slideParts).toBe(first);
    expect(first.length).toBe(3);
  });

  it("无 sldIdLst → 返回空数组（不抛）", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await part.writeAsync(`<p:presentation xmlns:p="${PNS}"/>`);
    const pp = new PresentationPart(part, makeRegistry(), pkg);
    expect(pp.slideParts).toEqual([]);
  });

  it("sldId.r:id 在关系表查不到 → 跳过，剩余照常解", async () => {
    const pkg = createInMemory();
    const pp = pkg.createPart("/ppt/presentation.xml" as PartUri, PresentationPart.contentType);
    await pp.writeAsync(
      `<p:presentation xmlns:p="${PNS}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldIdLst><p:sldId id="256" r:id="rId-bogus"/><p:sldId id="257" r:id="rId-x"/></p:sldIdLst></p:presentation>`,
    );
    const sp = pkg.createPart("/ppt/slides/x.xml" as PartUri, SlidePart.contentType);
    await sp.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    pp.relationships.create({
      id: "rId-x",
      type: SlidePart.relationshipType,
      target: "slides/x.xml",
      targetMode: "internal",
    });
    const part = new PresentationPart(pp, makeRegistry(), pkg);
    expect(part.slideParts.map((s) => s.part.uri)).toEqual(["/ppt/slides/x.xml"]);
  });
});

describe("SlidePart · 静态常量 + typed root + part-level 关系", () => {
  it("contentType / relationshipType 对齐 OPC", () => {
    expect(SlidePart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml",
    );
    expect(SlidePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
    );
  });

  it("slide 懒加载 → Slide 实例；重复访问同实例", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await part.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const sp = new SlidePart(part, makeRegistry(), pkg);
    expect(sp.slide).toBeInstanceOf(Slide);
    expect(sp.slide).toBe(sp.slide);
  });

  it("set slide + flushAsync 写回", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await part.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const sp = new SlidePart(part, makeRegistry(), pkg);
    const fresh = new Slide();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    sp.slide = fresh;
    await sp.flushAsync();
    const bytes = (part as { snapshot(): Uint8Array }).snapshot();
    expect(new TextDecoder().decode(bytes)).toContain("sld");
  });

  it("slideLayoutPart 解 part-level 关系；多次访问同实例；无关系返回 undefined", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart(
      "/ppt/slides/slide1.xml" as PartUri,
      SlidePart.contentType,
    );
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const layoutPart = pkg.createPart(
      "/ppt/slideLayouts/slideLayout1.xml" as PartUri,
      SlideLayoutPart.contentType,
    );
    await layoutPart.writeAsync(`<p:sldLayout xmlns:p="${PNS}"/>`);
    slidePart.relationships.create({
      id: "rId1",
      type: SlideLayoutPart.relationshipType,
      target: "../slideLayouts/slideLayout1.xml",
      targetMode: "internal",
    });

    const sp = new SlidePart(slidePart, makeRegistry(), pkg);
    const lp = sp.slideLayoutPart;
    expect(lp).toBeInstanceOf(SlideLayoutPart);
    expect(lp?.slideLayout).toBeInstanceOf(SlideLayout);
    // 第二次返回同实例（缓存）
    expect(sp.slideLayoutPart).toBe(lp);

    // 没关系的另一个 slide
    const naked = pkg.createPart("/ppt/slides/slide2.xml" as PartUri, SlidePart.contentType);
    await naked.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const sp2 = new SlidePart(naked, makeRegistry(), pkg);
    expect(sp2.slideLayoutPart).toBeUndefined();
    // 缓存 null 不会重复解析（再次访问同样 undefined）
    expect(sp2.slideLayoutPart).toBeUndefined();
  });

  it("notesSlidePart 解 part-level 关系；缺失 part target 时也 undefined", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart(
      "/ppt/slides/slide1.xml" as PartUri,
      SlidePart.contentType,
    );
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const notesPart = pkg.createPart(
      "/ppt/notesSlides/notesSlide1.xml" as PartUri,
      NotesSlidePart.contentType,
    );
    await notesPart.writeAsync(`<p:notes xmlns:p="${PNS}"/>`);
    slidePart.relationships.create({
      id: "rId2",
      type: NotesSlidePart.relationshipType,
      target: "../notesSlides/notesSlide1.xml",
      targetMode: "internal",
    });

    const sp = new SlidePart(slidePart, makeRegistry(), pkg);
    const ns = sp.notesSlidePart;
    expect(ns).toBeInstanceOf(NotesSlidePart);
    expect(ns?.notesSlide).toBeInstanceOf(NotesSlide);
    expect(sp.notesSlidePart).toBe(ns);

    // 指向不存在的 part —— 关系存在但 target 无对应 Part，返回 undefined
    const broken = pkg.createPart("/ppt/slides/slide2.xml" as PartUri, SlidePart.contentType);
    await broken.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    broken.relationships.create({
      id: "rId3",
      type: NotesSlidePart.relationshipType,
      target: "../notesSlides/missing.xml",
      targetMode: "internal",
    });
    const sp2 = new SlidePart(broken, makeRegistry(), pkg);
    expect(sp2.notesSlidePart).toBeUndefined();
  });
});

describe("SlideLayoutPart / NotesSlidePart · 最小骨架", () => {
  it("SlideLayoutPart 静态常量 + typed root", async () => {
    expect(SlideLayoutPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml",
    );
    expect(SlideLayoutPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
    );

    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/slideLayouts/slideLayout1.xml" as PartUri,
      SlideLayoutPart.contentType,
    );
    await part.writeAsync(`<p:sldLayout xmlns:p="${PNS}"/>`);
    const lp = new SlideLayoutPart(part, makeRegistry());
    expect(lp.slideLayout).toBeInstanceOf(SlideLayout);

    const fresh = new SlideLayout();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    lp.slideLayout = fresh;
    await lp.flushAsync();
    expect(new TextDecoder().decode((part as { snapshot(): Uint8Array }).snapshot())).toContain(
      "sldLayout",
    );
  });

  it("NotesSlidePart 静态常量 + typed root", async () => {
    expect(NotesSlidePart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml",
    );
    expect(NotesSlidePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide",
    );

    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/notesSlides/notesSlide1.xml" as PartUri,
      NotesSlidePart.contentType,
    );
    await part.writeAsync(`<p:notes xmlns:p="${PNS}"/>`);
    const np = new NotesSlidePart(part, makeRegistry());
    expect(np.notesSlide).toBeInstanceOf(NotesSlide);

    const fresh = new NotesSlide();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    np.notesSlide = fresh;
    await np.flushAsync();
    expect(new TextDecoder().decode((part as { snapshot(): Uint8Array }).snapshot())).toContain(
      "notes",
    );
  });
});
