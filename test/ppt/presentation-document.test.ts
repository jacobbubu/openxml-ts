/**
 * Story-4.5 验证：PresentationDocument 强类型门面 + create() 工厂。
 *
 * 覆盖：
 * - openAsync / saveAsBytesAsync / saveAsAsync / dispose / asyncDispose
 * - create() 最小可用空白 pptx → save → reopen 三轮等价
 * - typed Part 多次访问同实例（缓存）
 * - SlidePart.slideLayoutPart → SlideLayoutPart 解析
 * - SlideMasterPart.themePart + slideLayoutParts 联动
 * - PackageDiagnostics elementCounter 注册：未触碰 = 0；触碰后 > 0
 * - 不破坏 v0.3.0 公共 API：doc.package 仍是 IPackage
 */

import { describe, expect, it } from "vitest";
import { NotesSlide } from "../../src/ppt/generated/notes-slide.js";
import { Presentation } from "../../src/ppt/generated/presentation.js";
import { SlideLayout } from "../../src/ppt/generated/slide-layout.js";
import { SlideMaster } from "../../src/ppt/generated/slide-master.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

describe("PresentationDocument · create() 最小可用空白 pptx", () => {
  it("create + saveAsBytes + openAsync 三轮等价", async () => {
    const doc = PresentationDocument.create();
    expect(doc.presentationPart).toBeDefined();
    expect(doc.presentationPart?.slideParts).toHaveLength(1);

    const out = await doc.saveAsBytesAsync();
    expect(out.byteLength).toBeGreaterThan(0);

    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.presentationPart).toBeDefined();
    expect(reopened.presentationPart?.slideParts).toHaveLength(1);
    const sp = reopened.presentationPart?.slideParts[0]!;
    expect(sp.slide).toBeInstanceOf(Slide);

    // 再写一轮（第二轮）确保稳定
    const out2 = await reopened.saveAsBytesAsync();
    const third = await PresentationDocument.openAsync(out2);
    expect(third.presentationPart?.slideParts).toHaveLength(1);
  });

  it("Slide → SlideLayout 关系完整，能解到默认 blank layout", async () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    const layout = sp.slideLayoutPart;
    expect(layout).toBeDefined();
    expect(layout?.slideLayout).toBeInstanceOf(SlideLayout);
  });

  it("Layout → Master + Master → Theme 关系完整", async () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    const master = sp.slideLayoutPart?.slideMasterPart;
    expect(master).toBeDefined();
    expect(master?.slideMaster).toBeInstanceOf(SlideMaster);
    const theme = master?.themePart;
    expect(theme).toBeDefined();
    expect(theme?.theme.localName).toBe("theme");
  });

  it("Master 的 slideLayoutParts 列表 ≥ 1", async () => {
    const doc = PresentationDocument.create();
    const master = doc.presentationPart?.slideParts[0]?.slideLayoutPart?.slideMasterPart!;
    expect(master.slideLayoutParts.length).toBeGreaterThanOrEqual(1);
  });

  it("save → reopen 后 presentation root 是 Presentation 类", async () => {
    const doc = PresentationDocument.create();
    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.presentationPart?.presentation).toBeInstanceOf(Presentation);
  });
});

describe("PresentationDocument · typed Part 缓存", () => {
  it("presentationPart 多次访问返回同一实例", () => {
    const doc = PresentationDocument.create();
    expect(doc.presentationPart).toBe(doc.presentationPart);
  });

  it("slide.slideLayoutPart 多次访问同实例（NotesSlidePart 缺关系 → undefined）", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    expect(sp.slideLayoutPart).toBe(sp.slideLayoutPart);
    // create() 默认没造 notesSlide
    expect(sp.notesSlidePart).toBeUndefined();
  });
});

describe("PresentationDocument · PackageDiagnostics elementCounter", () => {
  it("未触碰任何 typed Part 时 elementCount = 0", async () => {
    const doc = PresentationDocument.create();
    const fresh = await PresentationDocument.openAsync(await doc.saveAsBytesAsync());
    expect(fresh.package.diagnostics.elementCount).toBe(0);
  });

  it("触碰 presentationPart + slideParts 后 elementCount > 0", async () => {
    const doc = PresentationDocument.create();
    const fresh = await PresentationDocument.openAsync(await doc.saveAsBytesAsync());
    void fresh.presentationPart;
    for (const sp of fresh.presentationPart!.slideParts) void sp.slide;
    expect(fresh.package.diagnostics.elementCount).toBeGreaterThan(0);
    expect(fresh.package.diagnostics.unknownElementCount).toBe(0);
  });
});

describe("PresentationDocument · 用户对 typed 树的修改在 save 后保留", () => {
  it("修改 slide 后 saveAsBytes → reopen 还能读到修改", async () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    sp.slide.extendedAttributes.set("p:hello", "world");

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const reSp = reopened.presentationPart?.slideParts[0]!;
    expect(reSp.slide.extendedAttributes.get("p:hello")).toBe("world");
  });
});

describe("PresentationDocument · 不破坏 v0.3.0 公共 API", () => {
  it("doc.package 仍是 IPackage，可读 parts/relationships", async () => {
    const doc = PresentationDocument.create();
    expect([...doc.package.parts()].length).toBeGreaterThan(0);
    expect(doc.package.relationships.count).toBeGreaterThan(0);
  });

  it("await using dispose 流", async () => {
    let bytes: Uint8Array;
    {
      await using doc = PresentationDocument.create();
      bytes = await doc.saveAsBytesAsync();
    }
    expect(bytes.byteLength).toBeGreaterThan(0);
  });

  it("空 IPackage（无 officeDocument 关系）→ presentationPart undefined", async () => {
    // 用 openAsync(empty bytes) 不行（会抛 INVALID_ZIP）；用 createInMemory pkg 直接 wrap
    const empty = PresentationDocument.create();
    // 删掉包级关系模拟「无 officeDocument」
    const rels = [...empty.package.relationships];
    for (const r of rels) empty.package.relationships.remove(r.id);
    // 重新 wrap
    const wrapped = await PresentationDocument.openAsync(await empty.saveAsBytesAsync());
    expect(wrapped.presentationPart).toBeUndefined();
  });
});

describe("PresentationDocument · NotesSlide 链路（可选，create 默认不造）", () => {
  it("NotesSlide 类引用可用（不抛 ReferenceError）", () => {
    // smoke：generated NotesSlide 类在子系统 entry 链路里可达。
    expect(NotesSlide.name).toBe("NotesSlide");
  });
});
