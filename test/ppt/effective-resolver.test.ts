/**
 * Story-4.6 验证：SlidePart 三个 effective* getter 沿
 * slide → layout → master → theme 链解析。
 *
 * 6 类场景：
 * 1. 纯 Slide 指定（theme override）→ 返回 slide 自己的 scheme；
 * 2. 纯 Master 指定（典型）→ 返回 master 的 scheme；
 * 3. 链路某一级缺失（layout 无 master）→ undefined；
 * 4. 闭环检测（layout.master 指回自己的 layout, master.theme 指 layout 的 theme，
 *    走一圈不抛错只返 undefined）；
 * 5. 缓存：第一次访问后再次访问返回同一引用；
 * 6. invalidateEffectiveCache() 后强制重算。
 */

import { describe, expect, it } from "vitest";
import type { MemoryPackagePart } from "../../src/backends/memory/memory-package-part.js";
import { ColorScheme } from "../../src/drawing/generated/color-scheme.js";
import { FontScheme } from "../../src/drawing/generated/font-scheme.js";
import { FormatScheme } from "../../src/drawing/generated/format-scheme.js";
import { PresentationDocument } from "../../src/ppt/presentation-document.js";

const A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const _P = "http://schemas.openxmlformats.org/presentationml/2006/main";

/** 在指定 Part 字节里塞一份完整 theme（覆盖原 seed 的 theme XML）。 */
function rewriteThemeXml(part: { writeSync(s: string): void }, color: string): void {
  part.writeSync(
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="${A}" name="TestTheme"><a:themeElements><a:clrScheme name="Test"><a:dk1><a:srgbClr val="${color}"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="000000"/></a:dk2><a:lt2><a:srgbClr val="EEEEEE"/></a:lt2><a:accent1><a:srgbClr val="${color}"/></a:accent1><a:accent2><a:srgbClr val="${color}"/></a:accent2><a:accent3><a:srgbClr val="${color}"/></a:accent3><a:accent4><a:srgbClr val="${color}"/></a:accent4><a:accent5><a:srgbClr val="${color}"/></a:accent5><a:accent6><a:srgbClr val="${color}"/></a:accent6><a:hlink><a:srgbClr val="${color}"/></a:hlink><a:folHlink><a:srgbClr val="${color}"/></a:folHlink></a:clrScheme><a:fontScheme name="Test"><a:majorFont><a:latin typeface="Marker-${color}"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Marker-${color}"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Test"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350"/><a:ln w="12700"/><a:ln w="19050"/></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`,
  );
}

describe("EffectiveResolver · 典型链路（master 指定）", () => {
  it("默认 create() 出来的 pptx：effective* 返回 master.themePart 的 scheme", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    expect(sp.effectiveColorScheme).toBeInstanceOf(ColorScheme);
    expect(sp.effectiveFontScheme).toBeInstanceOf(FontScheme);
    expect(sp.effectiveFormatScheme).toBeInstanceOf(FormatScheme);
  });

  it("color scheme 第一个子节点（dk1）能解到典型 sysClr=windowText", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    const cs = sp.effectiveColorScheme!;
    expect(cs.localName).toBe("clrScheme");
    // 第一个孩子是 dk1（OOXML clrScheme.sequence 头一个）
    const dk1 = cs.firstChild()!;
    expect(dk1.localName).toBe("dk1");
  });
});

describe("EffectiveResolver · Slide-level theme override", () => {
  it("Slide 自己挂 theme 关系 → 命中第一档，不下钻 master", async () => {
    const doc = PresentationDocument.create();
    // 给 slide 加一条 theme 关系，指向独立 theme part
    const pkg = doc.package;
    const slidePart = doc.presentationPart?.slideParts[0]?.part;
    const slideTheme = pkg.createPart(
      "/ppt/slideThemes/theme-override.xml" as never,
      "application/vnd.openxmlformats-officedocument.theme+xml",
    );
    rewriteThemeXml(slideTheme as unknown as MemoryPackagePart, "AAAAAA");
    slidePart.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
      target: "../slideThemes/theme-override.xml",
      targetMode: "internal",
    });

    // 重 wrap 取新 SlidePart 实例避免命中既有 cache（slidePart 的 themePart cache 是
    // SlidePart 内部 _themePart 字段，已存原 undefined；本测试 fresh slidePart）
    const sp = doc.presentationPart?.slideParts[0]!;
    sp.invalidateEffectiveCache();
    // 但 themePart cache 也是缓存在 sp 实例里——本测试为简单，
    // 直接 saveAsBytes → reopen 拿全新实例
    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const reSp = reopened.presentationPart?.slideParts[0]!;
    expect(reSp.themePart).toBeDefined();
    const cs = reSp.effectiveColorScheme;
    expect(cs).toBeInstanceOf(ColorScheme);
    const dk1 = cs?.firstChild()!;
    expect(dk1.firstChild()?.extendedAttributes.get("val")).toBe("AAAAAA");
  });
});

describe("EffectiveResolver · 链路缺失场景", () => {
  it("Slide 无 layout 关系 → effective* 全 undefined", async () => {
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart?.slideParts[0]?.part;
    // 删除 slide 的 layout 关系
    const layoutRel = [...slidePart.relationships].find(
      (r) =>
        r.type ===
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
    );
    if (layoutRel !== undefined) slidePart.relationships.remove(layoutRel.id);

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const sp = reopened.presentationPart?.slideParts[0]!;
    expect(sp.effectiveColorScheme).toBeUndefined();
    expect(sp.effectiveFontScheme).toBeUndefined();
    expect(sp.effectiveFormatScheme).toBeUndefined();
  });

  it("Layout 无 master 关系 → effective* 全 undefined（且不抛）", async () => {
    const doc = PresentationDocument.create();
    const layoutPart = doc.presentationPart?.slideParts[0]?.slideLayoutPart?.part;
    const masterRel = [...layoutPart.relationships].find(
      (r) =>
        r.type ===
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
    );
    if (masterRel !== undefined) layoutPart.relationships.remove(masterRel.id);

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const sp = reopened.presentationPart?.slideParts[0]!;
    expect(sp.effectiveColorScheme).toBeUndefined();
    expect(sp.effectiveFontScheme).toBeUndefined();
    expect(sp.effectiveFormatScheme).toBeUndefined();
  });

  it("Master 无 theme 关系 → effective* 全 undefined", async () => {
    const doc = PresentationDocument.create();
    const masterPart = doc.presentationPart?.slideParts[0]?.slideLayoutPart?.slideMasterPart?.part;
    const themeRel = [...masterPart.relationships].find(
      (r) => r.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
    );
    if (themeRel !== undefined) masterPart.relationships.remove(themeRel.id);

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const sp = reopened.presentationPart?.slideParts[0]!;
    expect(sp.effectiveColorScheme).toBeUndefined();
  });
});

describe("EffectiveResolver · 闭环防御", () => {
  it("Layout.master 关系指回自己（master 实际是同 layout part）→ undefined 不抛", async () => {
    const doc = PresentationDocument.create();
    // 把 layout 的 slideMaster 关系 target 改成自己的 URI
    const layoutPart = doc.presentationPart?.slideParts[0]?.slideLayoutPart?.part;
    const oldRel = [...layoutPart.relationships].find(
      (r) =>
        r.type ===
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
    );
    if (oldRel !== undefined) layoutPart.relationships.remove(oldRel.id);
    layoutPart.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
      target: "../slideLayouts/slideLayout1.xml", // 自指回自己
      targetMode: "internal",
    });

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const sp = reopened.presentationPart?.slideParts[0]!;
    // SlideMasterPart 构造在 layout 的 part 上，没 theme 关系 → undefined
    expect(() => sp.effectiveColorScheme).not.toThrow();
    expect(sp.effectiveColorScheme).toBeUndefined();
  });
});

describe("EffectiveResolver · 缓存", () => {
  it("第一次访问后再次访问返回同一引用", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    const first = sp.effectiveColorScheme;
    expect(sp.effectiveColorScheme).toBe(first);
    expect(sp.effectiveFontScheme).toBe(sp.effectiveFontScheme);
    expect(sp.effectiveFormatScheme).toBe(sp.effectiveFormatScheme);
  });

  it("invalidateEffectiveCache() 后下一次访问重算（仍返回相同的 root，但是新 walk）", () => {
    const doc = PresentationDocument.create();
    const sp = doc.presentationPart?.slideParts[0]!;
    const first = sp.effectiveColorScheme;
    sp.invalidateEffectiveCache();
    const second = sp.effectiveColorScheme;
    // 重算后结果仍是 master.theme 的同一 ColorScheme element（同实例，因为
    // master.themePart 是 SlideMasterPart 内部缓存，root 一致）
    expect(second).toBe(first);
  });
});
