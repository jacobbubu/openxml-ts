/**
 * `PresentationDocument` —— PowerPoint 文档的强类型门面（Story-4.5 / Architecture §3）。
 *
 * 与 .NET `DocumentFormat.OpenXml.Packaging.PresentationDocument` 同名同位，
 * 但实现上**包装一个 OPC 包**（HAS-A，ADR-022），与 `WordprocessingDocument` /
 * `SpreadsheetDocument` 完全对称。
 *
 * 使用模式：
 * ```ts
 * await using doc = await PresentationDocument.openAsync("./deck.pptx");
 * const slides = doc.presentationPart!.slideParts;
 * for (const sp of slides) console.log(sp.slide.localName);
 * await doc.saveAsync();
 * ```
 */

import { registerDrawingElements } from "../drawing/generated/_registry.js";
import type { MemoryOpenXmlPackage } from "../backends/memory/memory-package.js";
import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import { writeFilePath } from "../backends/zip/source-reader.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  type OpenXmlElement,
} from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import {
  type IPackage,
  type IPackagePart,
  type IPackageRelationship,
  type OpenAsyncOptions,
  ZipOpenXmlPackage,
  type ZipSource,
  createInMemory,
  openAsync,
  packageToZipBytes,
} from "../packaging/index.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { resolveRelativePartUri } from "../parts/relationship-uri.js";
import { ThemePart } from "../parts/theme-part.js";
import type { TypedXmlPart } from "../parts/typed-xml-part.js";
import {
  seedPresentationXml,
  seedSlideLayoutXml,
  seedSlideMasterXml,
  seedSlideXml,
  seedThemeXml,
} from "./create-seed.js";
import { registerPresentationElements } from "./generated/_registry.js";
import { Background } from "./generated/background.js";
import { Slide } from "./generated/slide.js";
import { PresentationPart } from "./parts/presentation-part.js";

const DEFAULT_PRESENTATION_URI = "/ppt/presentation.xml" as PartUri;
const DEFAULT_SLIDE_URI = "/ppt/slides/slide1.xml" as PartUri;
const DEFAULT_SLIDE_LAYOUT_URI = "/ppt/slideLayouts/slideLayout1.xml" as PartUri;
const DEFAULT_SLIDE_MASTER_URI = "/ppt/slideMasters/slideMaster1.xml" as PartUri;
const DEFAULT_THEME_URI = "/ppt/theme/theme1.xml" as PartUri;

const PNS_REGISTRY = "http://schemas.openxmlformats.org/presentationml/2006/main";

/** ppt 子系统共用的 typed element registry（presentation + drawing 联合）。 */
const pptRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerPresentationElements(r);
  registerDrawingElements(r);
  // codegen 字母序最后一次注册胜出，对若干 (ns, localName) 二义性元素的 canonical
  // 选择不利；按 .NET SDK 默认 + slideMaster.xml 使用场景显式 override：
  // - `<p:sld>`（slide.xml 根）→ Slide，而非 SlideListEntry / OutlineViewSlideListEntry；
  // - `<p:bg>`（slideMaster.xml 内）→ Background composite，而非 BackgroundAnimation leaf
  //   （后者只在 timing 子树用，但 codegen 字母序让它后写入胜出，撞坏 master 解析）。
  r.register(PNS_REGISTRY, "sld", Slide);
  r.register(PNS_REGISTRY, "bg", Background);
  return r;
})();

export class PresentationDocument {
  /** 已加载的 typed Part 缓存——按 relationshipType 索引。 */
  private readonly typedParts = new Map<string, TypedXmlPart<OpenXmlElement>>();

  constructor(private readonly pkg: MemoryOpenXmlPackage) {
    pkg.registerDiagnosticsElementCounter(() => this.countLoadedElements());
  }

  /** 走一遍已加载 typed Part 缓存，统计 element 树规模 + Unknown 数。 */
  private countLoadedElements(): { elementCount: number; unknownElementCount: number } {
    let elementCount = 0;
    let unknownElementCount = 0;
    const tally = (root: OpenXmlElement): void => {
      elementCount += 1;
      if (root instanceof OpenXmlUnknownElement) unknownElementCount += 1;
      if (root instanceof OpenXmlCompositeElement) {
        for (const _ of root.descendants()) elementCount += 1;
        for (const _ of root.descendants(OpenXmlUnknownElement)) unknownElementCount += 1;
      }
    };
    for (const part of this.typedParts.values()) {
      if (!part.isLoaded) continue;
      tally(part.root);
    }
    const pp = this.typedParts.get(PresentationPart.relationshipType) as
      | PresentationPart
      | undefined;
    if (pp !== undefined) {
      for (const sp of pp.slideParts) {
        if (sp.isLoaded) tally(sp.root);
        const layout = sp.slideLayoutPart;
        if (layout !== undefined && layout.isLoaded) tally(layout.root);
        const notes = sp.notesSlidePart;
        if (notes !== undefined && notes.isLoaded) tally(notes.root);
      }
    }
    return { elementCount, unknownElementCount };
  }

  /** 底层 OPC 包句柄。 */
  get package(): IPackage {
    return this.pkg;
  }

  /**
   * 演示文稿 Part。包级关系中无 officeDocument 关系则 undefined。
   * 多次访问返回同一 typed wrapper。
   */
  get presentationPart(): PresentationPart | undefined {
    return this.getOrLoadPresentationPart();
  }

  /**
   * 把所有已加载 typed Part 序列化回 part bytes，再触发 OPC 包 saveAsync。
   * 未访问过的 typed Part 不会被 flush。
   */
  async saveAsync(): Promise<void> {
    await this.flushAllTypedParts();
    if (this.pkg instanceof ZipOpenXmlPackage) {
      await this.pkg.saveAsync();
      return;
    }
    throw new OpenXmlPackageError({
      code: "UNSUPPORTED_OPERATION",
      message:
        "saveAsync requires an open-from-path source; use saveAsAsync(path) or saveAsBytesAsync() instead",
    });
  }

  async saveAsBytesAsync(): Promise<Uint8Array> {
    await this.flushAllTypedParts();
    return packageToZipBytes(this.pkg);
  }

  async saveAsAsync(targetPath: string): Promise<void> {
    await this.flushAllTypedParts();
    if (this.pkg instanceof ZipOpenXmlPackage) {
      await this.pkg.saveAsAsync(targetPath);
      return;
    }
    const bytes = await packageToZipBytes(this.pkg);
    await writeFilePath(targetPath, bytes);
  }

  async dispose(): Promise<void> {
    await this.pkg.dispose();
  }

  [Symbol.asyncDispose](): Promise<void> {
    return this.dispose();
  }

  // ─── 静态工厂 ───────────────────────────────────────────────────────────────

  /** 从路径 / 字节流 / Blob / Stream 打开一份 pptx。 */
  static async openAsync(
    source: ZipSource,
    options: OpenAsyncOptions = {},
  ): Promise<PresentationDocument> {
    const pkg = await openAsync(source, options);
    return new PresentationDocument(pkg);
  }

  /**
   * 创建最小可用空白 pptx：
   * - 1 张 Slide + 1 个 Layout（blank）+ 1 个 Master + 1 个 Theme；
   * - `[Content_Types].xml` 含 Default rels + xml + Override 全部 Part；
   * - 包级 officeDocument 关系 + Presentation 的 part-level 关系（slide + slideMaster + theme）+
   *   Slide → Layout，Master → Theme + Layout，Layout → Master 全部 part-level 关系。
   *
   * 实现走「seed XML 写入 part bytes」路线：typed Part 在首次访问时懒反序列化，
   * 用户改完 typed 树后 flushAllTypedParts 会用 typed root 覆写 bytes。
   */
  static create(): PresentationDocument {
    const pkg = createInMemory() as MemoryOpenXmlPackage;

    // 0. `[Content_Types].xml` 必备的两条 Default —— 同 Excel #43，缺它们 Office Desktop
    // 拒解 .rels content-type，整个包当损坏。
    pkg.contentTypes.addDefault(
      "rels",
      "application/vnd.openxmlformats-package.relationships+xml",
    );
    pkg.contentTypes.addDefault("xml", "application/xml");

    // 1. 创建 5 个 Part（带 Override 注册 content-type）。
    const presentation = pkg.createPart(
      DEFAULT_PRESENTATION_URI,
      PresentationPart.contentType,
    );
    const slide = pkg.createPart(
      DEFAULT_SLIDE_URI,
      "application/vnd.openxmlformats-officedocument.presentationml.slide+xml",
    );
    const slideLayout = pkg.createPart(
      DEFAULT_SLIDE_LAYOUT_URI,
      "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml",
    );
    const slideMaster = pkg.createPart(
      DEFAULT_SLIDE_MASTER_URI,
      "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml",
    );
    const theme = pkg.createPart(DEFAULT_THEME_URI, ThemePart.contentType);

    // 2. 包级关系：officeDocument → presentation。
    pkg.relationships.create({
      type: PresentationPart.relationshipType,
      target: "ppt/presentation.xml",
      targetMode: "internal",
    });

    // 3. presentation 的 part-level 关系：slideMaster + slide + theme。
    const slideMasterRel = presentation.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
      target: "slideMasters/slideMaster1.xml",
      targetMode: "internal",
    });
    const slideRel = presentation.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide",
      target: "slides/slide1.xml",
      targetMode: "internal",
    });
    presentation.relationships.create({
      type: ThemePart.relationshipType,
      target: "theme/theme1.xml",
      targetMode: "internal",
    });

    // 4. slide → layout 关系（PowerPoint 通过这条解出 slide 用的版式）。
    slide.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
      target: "../slideLayouts/slideLayout1.xml",
      targetMode: "internal",
    });

    // 5. layout → master（effective 继承中间层）。
    const layoutToMasterRel = slideLayout.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster",
      target: "../slideMasters/slideMaster1.xml",
      targetMode: "internal",
    });
    void layoutToMasterRel;

    // 6. master → layout + theme（双向，layout 在 master 的 sldLayoutIdLst 里挂着）。
    const masterToLayoutRel = slideMaster.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout",
      target: "../slideLayouts/slideLayout1.xml",
      targetMode: "internal",
    });
    slideMaster.relationships.create({
      type: ThemePart.relationshipType,
      target: "../theme/theme1.xml",
      targetMode: "internal",
    });

    // 7. 同步写入 seed XML：sync `create()` + async writeAsync 会因 microtask 隔阂
    // 让首次 typed root 访问读到空字节；走 MemoryPackagePart.writeSync 立刻落地。
    (presentation as MemoryPackagePart).writeSync(
      seedPresentationXml({
        slideMasterRId: slideMasterRel.id,
        slideRId: slideRel.id,
      }),
    );
    (slide as MemoryPackagePart).writeSync(seedSlideXml());
    (slideLayout as MemoryPackagePart).writeSync(seedSlideLayoutXml());
    (slideMaster as MemoryPackagePart).writeSync(
      seedSlideMasterXml({ slideLayoutRId: masterToLayoutRel.id }),
    );
    (theme as MemoryPackagePart).writeSync(seedThemeXml());

    return new PresentationDocument(pkg);
  }

  // ─── 内部 ─────────────────────────────────────────────────────────────────

  private async flushAllTypedParts(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const part of this.typedParts.values()) {
      if (part.isLoaded) promises.push(part.flushAsync());
    }
    const pp = this.typedParts.get(PresentationPart.relationshipType) as
      | PresentationPart
      | undefined;
    if (pp !== undefined) {
      for (const sp of pp.slideParts) {
        if (sp.isLoaded) promises.push(sp.flushAsync());
        const layout = sp.slideLayoutPart;
        if (layout !== undefined && layout.isLoaded) promises.push(layout.flushAsync());
        const notes = sp.notesSlidePart;
        if (notes !== undefined && notes.isLoaded) promises.push(notes.flushAsync());
      }
    }
    await Promise.all(promises);
  }

  /** 加载（懒构造）presentation Part。 */
  private getOrLoadPresentationPart(): PresentationPart | undefined {
    const cached = this.typedParts.get(PresentationPart.relationshipType);
    if (cached !== undefined) return cached as PresentationPart;
    const rel = findRelationship(this.pkg.relationships, PresentationPart.relationshipType);
    if (rel === undefined) return undefined;
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !this.pkg.hasPart(partUri)) return undefined;
    const part = this.pkg.getPart(partUri);
    const pp = new PresentationPart(part, pptRegistry, this.pkg);
    this.typedParts.set(PresentationPart.relationshipType, pp);
    return pp;
  }
}

function findRelationship(
  collection: Iterable<IPackageRelationship>,
  relationshipType: string,
): IPackageRelationship | undefined {
  for (const rel of collection) {
    if (rel.type === relationshipType && rel.targetMode === "internal") return rel;
  }
  return undefined;
}
