/**
 * Story-4.4 验证：补齐 5 个 typed Part 后的关系网络。
 *
 * 不依赖 PresentationDocument 门面（Story-4.5 落地）。直接把 typed Part 接到
 * MemoryOpenXmlPackage 上验证：
 * - SlideLayoutPart.slideMasterPart；
 * - SlideMasterPart.themePart + slideLayoutParts[]；
 * - NotesMasterPart.themePart；
 * - NotesSlidePart.slidePart（反向）。
 */

import { describe, expect, it } from "vitest";
import { registerDrawingElements } from "../../src/drawing/generated/_registry.js";
import { ElementRegistry } from "../../src/element/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import { ThemePart } from "../../src/parts/theme-part.js";
import { registerPresentationElements } from "../../src/ppt/generated/_registry.js";
import { NotesMaster } from "../../src/ppt/generated/notes-master.js";
import { SlideMaster } from "../../src/ppt/generated/slide-master.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import {
  NotesMasterPart,
  NotesSlidePart,
  SlideLayoutPart,
  SlideMasterPart,
  SlidePart,
} from "../../src/ppt/parts/index.js";

const PNS = "http://schemas.openxmlformats.org/presentationml/2006/main";
const ANS = "http://schemas.openxmlformats.org/drawingml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerPresentationElements(r);
  registerDrawingElements(r);
  // 同 Story-4.3：override `<p:sld>` 回 Slide（codegen 字母序最后一次 SlideListEntry 胜出）
  r.register(PNS, "sld", Slide);
  return r;
}

describe("SlideMasterPart · 静态常量 + typed root", () => {
  it("contentType / relationshipType 对齐 OPC", () => {
    expect(SlideMasterPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml",
    );
    expect(SlideMasterPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
    );
  });

  it("slideMaster 懒加载 → SlideMaster；重复访问同实例；set + flushAsync 写回", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/slideMasters/slideMaster1.xml" as PartUri,
      SlideMasterPart.contentType,
    );
    await part.writeAsync(`<p:sldMaster xmlns:p="${PNS}"/>`);
    const sm = new SlideMasterPart(part, makeRegistry(), pkg);
    expect(sm.slideMaster).toBeInstanceOf(SlideMaster);
    expect(sm.slideMaster).toBe(sm.slideMaster);

    const fresh = new SlideMaster();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    sm.slideMaster = fresh;
    await sm.flushAsync();
    expect(new TextDecoder().decode((part as { snapshot(): Uint8Array }).snapshot())).toContain(
      "sldMaster",
    );
  });
});

describe("SlideMasterPart · themePart + slideLayoutParts", () => {
  async function seedPkg(): Promise<{
    sm: SlideMasterPart;
    pkg: ReturnType<typeof createInMemory>;
  }> {
    const pkg = createInMemory();
    const masterPart = pkg.createPart(
      "/ppt/slideMasters/slideMaster1.xml" as PartUri,
      SlideMasterPart.contentType,
    );
    await masterPart.writeAsync(`<p:sldMaster xmlns:p="${PNS}"/>`);
    const themePart = pkg.createPart("/ppt/theme/theme1.xml" as PartUri, ThemePart.contentType);
    await themePart.writeAsync(`<a:theme xmlns:a="${ANS}"/>`);
    masterPart.relationships.create({
      id: "rId1",
      type: ThemePart.relationshipType,
      target: "../theme/theme1.xml",
      targetMode: "internal",
    });
    for (const name of ["layout1", "layout2"]) {
      const lp = pkg.createPart(
        `/ppt/slideLayouts/${name}.xml` as PartUri,
        SlideLayoutPart.contentType,
      );
      await lp.writeAsync(`<p:sldLayout xmlns:p="${PNS}"/>`);
      masterPart.relationships.create({
        id: `rId-${name}`,
        type: SlideLayoutPart.relationshipType,
        target: `../slideLayouts/${name}.xml`,
        targetMode: "internal",
      });
    }
    return { sm: new SlideMasterPart(masterPart, makeRegistry(), pkg), pkg };
  }

  it("themePart 解 part-level 关系；多次访问同实例", async () => {
    const { sm } = await seedPkg();
    const tp = sm.themePart;
    expect(tp).toBeInstanceOf(ThemePart);
    expect(sm.themePart).toBe(tp);
  });

  it("无 theme 关系 → undefined（缓存 null，二访同样 undefined）", async () => {
    const pkg = createInMemory();
    const masterPart = pkg.createPart(
      "/ppt/slideMasters/slideMaster1.xml" as PartUri,
      SlideMasterPart.contentType,
    );
    await masterPart.writeAsync(`<p:sldMaster xmlns:p="${PNS}"/>`);
    const sm = new SlideMasterPart(masterPart, makeRegistry(), pkg);
    expect(sm.themePart).toBeUndefined();
    expect(sm.themePart).toBeUndefined();
  });

  it("slideLayoutParts 按 part-level 关系顺序；多次访问同数组", async () => {
    const { sm } = await seedPkg();
    const layouts = sm.slideLayoutParts;
    expect(layouts).toHaveLength(2);
    expect(layouts.map((l) => l.part.uri)).toEqual([
      "/ppt/slideLayouts/layout1.xml",
      "/ppt/slideLayouts/layout2.xml",
    ]);
    expect(sm.slideLayoutParts).toBe(layouts);
  });

  it("master 无 layout 关系 → 空数组", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/slideMasters/slideMaster1.xml" as PartUri,
      SlideMasterPart.contentType,
    );
    await part.writeAsync(`<p:sldMaster xmlns:p="${PNS}"/>`);
    const sm = new SlideMasterPart(part, makeRegistry(), pkg);
    expect(sm.slideLayoutParts).toEqual([]);
  });
});

describe("SlideLayoutPart.slideMasterPart · part-level 关系", () => {
  it("解 single SlideMasterPart；缓存；缺关系 undefined", async () => {
    const pkg = createInMemory();
    const layoutPart = pkg.createPart(
      "/ppt/slideLayouts/slideLayout1.xml" as PartUri,
      SlideLayoutPart.contentType,
    );
    await layoutPart.writeAsync(`<p:sldLayout xmlns:p="${PNS}"/>`);
    const masterPart = pkg.createPart(
      "/ppt/slideMasters/slideMaster1.xml" as PartUri,
      SlideMasterPart.contentType,
    );
    await masterPart.writeAsync(`<p:sldMaster xmlns:p="${PNS}"/>`);
    layoutPart.relationships.create({
      id: "rId1",
      type: SlideMasterPart.relationshipType,
      target: "../slideMasters/slideMaster1.xml",
      targetMode: "internal",
    });

    const lp = new SlideLayoutPart(layoutPart, makeRegistry(), pkg);
    const sm = lp.slideMasterPart;
    expect(sm).toBeInstanceOf(SlideMasterPart);
    expect(lp.slideMasterPart).toBe(sm);

    const naked = pkg.createPart(
      "/ppt/slideLayouts/slideLayout2.xml" as PartUri,
      SlideLayoutPart.contentType,
    );
    await naked.writeAsync(`<p:sldLayout xmlns:p="${PNS}"/>`);
    const lp2 = new SlideLayoutPart(naked, makeRegistry(), pkg);
    expect(lp2.slideMasterPart).toBeUndefined();
    expect(lp2.slideMasterPart).toBeUndefined();
  });
});

describe("NotesMasterPart · 静态常量 + typed root + themePart", () => {
  it("contentType / relationshipType 对齐 OPC", () => {
    expect(NotesMasterPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml",
    );
    expect(NotesMasterPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster",
    );
  });

  it("notesMaster 懒加载 → NotesMaster；themePart 解关系；无关系 undefined", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/notesMasters/notesMaster1.xml" as PartUri,
      NotesMasterPart.contentType,
    );
    await part.writeAsync(`<p:notesMaster xmlns:p="${PNS}"/>`);
    const themePart = pkg.createPart("/ppt/theme/theme1.xml" as PartUri, ThemePart.contentType);
    await themePart.writeAsync(`<a:theme xmlns:a="${ANS}"/>`);
    part.relationships.create({
      id: "rId1",
      type: ThemePart.relationshipType,
      target: "../theme/theme1.xml",
      targetMode: "internal",
    });
    const nm = new NotesMasterPart(part, makeRegistry(), pkg);
    expect(nm.notesMaster).toBeInstanceOf(NotesMaster);
    expect(nm.notesMaster).toBe(nm.notesMaster);
    expect(nm.themePart).toBeInstanceOf(ThemePart);
    expect(nm.themePart).toBe(nm.themePart);

    // set + flush
    const fresh = new NotesMaster();
    fresh.extendedAttributes.set("xmlns:p", PNS);
    nm.notesMaster = fresh;
    await nm.flushAsync();
    expect(new TextDecoder().decode((part as { snapshot(): Uint8Array }).snapshot())).toContain(
      "notesMaster",
    );
  });

  it("无 theme 关系 → undefined", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(
      "/ppt/notesMasters/notesMaster1.xml" as PartUri,
      NotesMasterPart.contentType,
    );
    await part.writeAsync(`<p:notesMaster xmlns:p="${PNS}"/>`);
    const nm = new NotesMasterPart(part, makeRegistry(), pkg);
    expect(nm.themePart).toBeUndefined();
    expect(nm.themePart).toBeUndefined();
  });
});

describe("NotesSlidePart.slidePart · 反向关系", () => {
  it("解 single SlidePart；缓存；缺关系 undefined", async () => {
    const pkg = createInMemory();
    const slidePart = pkg.createPart("/ppt/slides/slide1.xml" as PartUri, SlidePart.contentType);
    await slidePart.writeAsync(`<p:sld xmlns:p="${PNS}"/>`);
    const notesPart = pkg.createPart(
      "/ppt/notesSlides/notesSlide1.xml" as PartUri,
      NotesSlidePart.contentType,
    );
    await notesPart.writeAsync(`<p:notes xmlns:p="${PNS}"/>`);
    notesPart.relationships.create({
      id: "rId1",
      type: SlidePart.relationshipType,
      target: "../slides/slide1.xml",
      targetMode: "internal",
    });

    const np = new NotesSlidePart(notesPart, makeRegistry(), pkg);
    const sp = np.slidePart;
    expect(sp).toBeInstanceOf(SlidePart);
    expect(np.slidePart).toBe(sp);

    const naked = pkg.createPart(
      "/ppt/notesSlides/notesSlide2.xml" as PartUri,
      NotesSlidePart.contentType,
    );
    await naked.writeAsync(`<p:notes xmlns:p="${PNS}"/>`);
    const np2 = new NotesSlidePart(naked, makeRegistry(), pkg);
    expect(np2.slidePart).toBeUndefined();
    expect(np2.slidePart).toBeUndefined();
  });
});
