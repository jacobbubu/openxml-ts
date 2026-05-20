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

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import type { MemoryOpenXmlPackage } from "../backends/memory/memory-package.js";
import { writeFilePath } from "../backends/zip/source-reader.js";
import { registerDrawingElements } from "../drawing/generated/_registry.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  type OpenXmlElement,
  StringValue,
  UInt32Value,
} from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import {
  type IPackage,
  type IPackageRelationship,
  type OpenAsyncOptions,
  ZipOpenXmlPackage,
  type ZipSource,
  createInMemory,
  openAsync,
  packageToZipBytes,
} from "../packaging/index.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { CoreProperties } from "../parts/core-properties.js";
import type { CustomFilePropertiesPart } from "../parts/custom-file-properties-part.js";
import type { ExtendedFilePropertiesPart } from "../parts/extended-file-properties-part.js";
import { getOrCreateCorePropertiesPart } from "../parts/get-or-create-core-properties.js";
import { getOrCreateCustomFilePropertiesPart } from "../parts/get-or-create-custom-file-properties.js";
import { getOrCreateExtendedFilePropertiesPart } from "../parts/get-or-create-extended-file-properties.js";
import { type AddImagePartOptions, type ImagePart, addImagePartTo } from "../parts/image-part.js";
import { relationshipTypeMatches } from "../parts/relationship-type-match.js";
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
import { SlideIdList } from "./generated/slide-id-list.js";
import { SlideId } from "./generated/slide-id.js";
import { Slide } from "./generated/slide.js";
import { NotesSlidePart } from "./parts/notes-slide-part.js";
import { PresentationPart } from "./parts/presentation-part.js";
import { SlideLayoutPart } from "./parts/slide-layout-part.js";
import { SlidePart } from "./parts/slide-part.js";

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
  /** Epic-29：CoreProperties 缓存。 */
  private _coreProperties: CoreProperties | undefined;
  /** Epic-72：ExtendedFilePropertiesPart 缓存。 */
  private _extendedFilePropertiesPart: ExtendedFilePropertiesPart | undefined;
  /** Epic-72：CustomFilePropertiesPart 缓存。 */
  private _customFilePropertiesPart: CustomFilePropertiesPart | undefined;

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
        if (layout?.isLoaded) tally(layout.root);
        const notes = sp.notesSlidePart;
        if (notes?.isLoaded) tally(notes.root);
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
   * 包级 CoreProperties 元数据（Epic-29）。\`doc.coreProperties.title = "…"\` 一行设置。
   */
  get coreProperties(): CoreProperties {
    if (this._coreProperties === undefined) {
      const cpPart = getOrCreateCorePropertiesPart(this.pkg, pptRegistry);
      this._coreProperties = new CoreProperties(cpPart.coreProperties);
      this.typedParts.set("__corePropertiesPart__", cpPart);
    }
    return this._coreProperties;
  }

  /**
   * 包级 ExtendedFileProperties 元数据（Epic-72）。
   * 懒 bootstrap：首次访问时找/创建 `/docProps/app.xml`。
   */
  get extendedFileProperties(): ExtendedFilePropertiesPart {
    if (this._extendedFilePropertiesPart === undefined) {
      this._extendedFilePropertiesPart = getOrCreateExtendedFilePropertiesPart(this.pkg);
      this.typedParts.set("__extendedFilePropertiesPart__", this._extendedFilePropertiesPart);
    }
    return this._extendedFilePropertiesPart;
  }

  /**
   * 包级 CustomFileProperties 元数据（Epic-72）。
   * 懒 bootstrap：首次访问时找/创建 `/docProps/custom.xml`。
   */
  get customFileProperties(): CustomFilePropertiesPart {
    if (this._customFilePropertiesPart === undefined) {
      this._customFilePropertiesPart = getOrCreateCustomFilePropertiesPart(this.pkg);
      this.typedParts.set("__customFilePropertiesPart__", this._customFilePropertiesPart);
    }
    return this._customFilePropertiesPart;
  }

  /**
   * 把字节添加到包里成为一个 ImagePart 并挂到指定 slide（Story-12.2，Epic-12）。
   *
   * 字节 → 写 `/ppt/media/imageN.<ext>`，从 slidePart 加 `relationships/image` 关系；
   * 返新 `ImagePart` 包装 + 新分配的 `relId`，调用方拿 relId 用
   * `createImagePictureForPpt(relId, ...)` 一行生成 `<p:pic>` 然后 append 到
   * `slide.commonSlideData.shapeTree`。
   *
   * @param slide 目标 SlidePart——slide 对象本身，或者下标（0-based）。
   * @throws OpenXmlPackageError 当 contentType 没传且字节首部嗅探不出已知 MIME、
   *   slide 不存在、presentationPart 不存在时
   */
  addImagePart(
    slide: SlidePart | number,
    bytes: Uint8Array,
    opts: AddImagePartOptions = {},
  ): { part: ImagePart; relId: string } {
    const pp = this.presentationPart;
    if (pp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addImagePart: presentationPart is missing",
      });
    }
    const slideParts = pp.slideParts;
    const slidePart =
      typeof slide === "number" ? slideParts[slide] : slideParts.find((sp) => sp === slide);
    if (slidePart === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message:
          typeof slide === "number"
            ? `addImagePart: slide index ${slide} out of range (total ${slideParts.length})`
            : "addImagePart: provided SlidePart is not in this presentation",
      });
    }
    return addImagePartTo(this.pkg, slidePart.part, "/ppt/media", bytes, opts);
  }

  /**
   * 设置 slide 的演讲者注释（Epic-27）。
   *
   * 自动 bootstrap NotesSlidePart（首次：分配 \`/ppt/notesSlides/notesSlideN.xml\`
   * + createPart + 从 slidePart 接 notesSlide 关系 + 写最小 \`<p:notes>\` 树）；
   * 然后把 body placeholder shape 的 \`<a:txBody>\` 替换成单段单 Run 单 \`<a:t>\`。
   *
   * @param slide SlidePart 或下标
   * @param text  注释文本（单段纯文本）
   */
  setSlideNotes(slide: SlidePart | number, text: string): void {
    const slidePart = this.resolveSlidePart(slide, "setSlideNotes");
    const notesPart = this.getOrCreateNotesSlidePart(slidePart);
    setNotesText(notesPart.notesSlide, text);
  }

  /**
   * 读 slide 的演讲者注释——展平 body placeholder shape 内所有 \`<a:t>\`；
   * 没 NotesSlidePart 或没注释时返空串。
   */
  getSlideNotes(slide: SlidePart | number): string {
    const slidePart = this.resolveSlidePart(slide, "getSlideNotes");
    const notesPart = slidePart.notesSlidePart;
    if (notesPart === undefined) return "";
    return getNotesText(notesPart.notesSlide);
  }

  /**
   * 追加一张空白幻灯片（Epic-55）。
   *
   * 步骤：
   * 1. 分配 `/ppt/slides/slideN.xml`（N 避开已有 Part）；
   * 2. 写 seed slide XML；
   * 3. PresentationPart → 新 SlidePart `relationships/slide` 关系；
   * 4. 新 SlidePart → SlideLayoutPart `relationships/slideLayout` 关系
   *    （默认复用 slide0 的 layout；可通过 `layoutPart` 参数指定）；
   * 5. 在 `<p:sldIdLst>` 末尾追加 `<p:sldId id="…" r:id="…"/>`，id = 现有最大值 + 1（≥ 256）；
   * 6. 更新 PresentationPart 内部 slideParts 缓存（若已初始化则 push）。
   *
   * @param options.layoutPart 指定版式 Part；省略时复用第一张幻灯片的 SlideLayoutPart。
   * @returns 新建的 SlidePart
   */
  addSlide(options?: { layoutPart?: SlideLayoutPart }): SlidePart {
    const pp = this.presentationPart;
    if (pp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addSlide: presentationPart is missing",
      });
    }

    // 1. 找到未被占用的 slideN.xml URI
    let n = 1;
    while (this.pkg.hasPart(`/ppt/slides/slide${n}.xml` as PartUri)) n += 1;
    const slideUri = `/ppt/slides/slide${n}.xml` as PartUri;

    // 2. 创建 Part + 写 seed XML
    const newPart = this.pkg.createPart(slideUri, SlidePart.contentType);
    (newPart as MemoryPackagePart).writeSync(seedSlideXml());

    // 3. 确定版式 Part
    const layoutPart = options?.layoutPart ?? pp.slideParts[0]?.slideLayoutPart;

    // 4. PresentationPart → 新 SlidePart 关系
    const slideRel = pp.part.relationships.create({
      type: SlidePart.relationshipType,
      target: `slides/slide${n}.xml`,
      targetMode: "internal",
    });

    // 5. 新 SlidePart → SlideLayoutPart 关系（相对 /ppt/slides/ 出发）
    if (layoutPart !== undefined) {
      const layoutFileName = (layoutPart.part.uri as string).split("/").pop() as string;
      newPart.relationships.create({
        type: SlideLayoutPart.relationshipType,
        target: `../slideLayouts/${layoutFileName}`,
        targetMode: "internal",
      });
    }

    // 6. 追加 <p:sldId> 到 <p:sldIdLst>
    const presentation = pp.presentation;
    let sldIdLst = presentation.firstChild(SlideIdList);
    if (sldIdLst === undefined) {
      sldIdLst = new SlideIdList();
      presentation.appendChild(sldIdLst);
    }

    let maxId = 255;
    for (const sldId of sldIdLst.elements(SlideId)) {
      const val = sldId.id?.value;
      if (val !== undefined && val > maxId) maxId = val;
    }

    const sldId = new SlideId();
    sldId.id = new UInt32Value(maxId + 1);
    sldId.relationshipId = new StringValue(slideRel.id);
    sldIdLst.appendChild(sldId);

    // 7. 构造 SlidePart wrapper + 若已缓存则 push 进去
    const newSlidePart = new SlidePart(newPart, pptRegistry, this.pkg);
    const ppPrivate = pp as unknown as { _slideParts: SlidePart[] | undefined };
    if (ppPrivate._slideParts !== undefined) {
      ppPrivate._slideParts.push(newSlidePart);
    }

    return newSlidePart;
  }

  /** 解析 slide 入参（SlidePart 或 0-based 下标）。 */
  private resolveSlidePart(slide: SlidePart | number, method: string): SlidePart {
    const pp = this.presentationPart;
    if (pp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: `${method}: presentationPart is missing`,
      });
    }
    const sps = pp.slideParts;
    const sp = typeof slide === "number" ? sps[slide] : sps.find((s) => s === slide);
    if (sp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message:
          typeof slide === "number"
            ? `${method}: slide index ${slide} out of range (total ${sps.length})`
            : `${method}: provided SlidePart is not in this presentation`,
      });
    }
    return sp;
  }

  /** 找/创 slide 的 NotesSlidePart。 */
  private getOrCreateNotesSlidePart(slidePart: SlidePart): NotesSlidePart {
    const existing = slidePart.notesSlidePart;
    if (existing !== undefined) return existing;

    // 分配 URI
    let n = 1;
    while (this.pkg.hasPart(`/ppt/notesSlides/notesSlide${n}.xml` as PartUri)) n += 1;
    const uri = `/ppt/notesSlides/notesSlide${n}.xml` as PartUri;
    const part = this.pkg.createPart(uri, NotesSlidePart.contentType);
    // 关系挂 slidePart（target 是 ../notesSlides/notesSlideN.xml；slide 在 /ppt/slides/）
    slidePart.part.relationships.create({
      type: NotesSlidePart.relationshipType,
      target: `../notesSlides/notesSlide${n}.xml`,
      targetMode: "internal",
    });
    const np = new NotesSlidePart(part, pptRegistry, this.pkg);
    // 写最小 <p:notes> 树
    seedNotesSlide(np.notesSlide);
    // SlidePart 内部缓存 notesSlidePart——访问 getter 会重读关系并返新实例；为
    // 让本次返的 typedPart 复用，强行注入到 slidePart 私有缓存
    (slidePart as unknown as { _notesSlidePart: NotesSlidePart | undefined })._notesSlidePart = np;
    return np;
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
    pkg.contentTypes.addDefault("rels", "application/vnd.openxmlformats-package.relationships+xml");
    pkg.contentTypes.addDefault("xml", "application/xml");

    // 1. 创建 5 个 Part（带 Override 注册 content-type）。
    const presentation = pkg.createPart(DEFAULT_PRESENTATION_URI, PresentationPart.contentType);
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
        if (layout?.isLoaded) promises.push(layout.flushAsync());
        const notes = sp.notesSlidePart;
        if (notes?.isLoaded) promises.push(notes.flushAsync());
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
    if (rel.targetMode !== "internal") continue;
    if (relationshipTypeMatches(rel.type, relationshipType)) return rel;
  }
  return undefined;
}

// ─── Epic-27 演讲者注释辅助 ─────────────────────────────────────────────────

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

/** 给新建的 NotesSlide root 写一份最小可用骨架（cSld > spTree > 注释 body shape）。 */
function seedNotesSlide(notes: OpenXmlElement): void {
  if (!(notes instanceof OpenXmlCompositeElement)) return;
  // 已经有 cSld 就跳过
  for (const c of notes.children) if (c.localName === "cSld") return;

  const cSld = u("p", "cSld", NS_P);
  const spTree = u("p", "spTree", NS_P);
  // 必需的 nvGrpSpPr / grpSpPr 骨架
  const nvGsp = u("p", "nvGrpSpPr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", "1");
  cNvPr.extendedAttributes.set("name", "");
  nvGsp.appendChild(cNvPr);
  nvGsp.appendChild(u("p", "cNvGrpSpPr", NS_P));
  nvGsp.appendChild(u("p", "nvPr", NS_P));
  spTree.appendChild(nvGsp);
  spTree.appendChild(u("p", "grpSpPr", NS_P));
  // body placeholder shape
  spTree.appendChild(buildNotesBodyShape(""));
  cSld.appendChild(spTree);
  notes.appendChild(cSld);
}

/** 在 NotesSlide 树里找 body placeholder shape；找不到就 append 一个新的并返回。 */
function ensureNotesBodyShape(notes: OpenXmlElement): OpenXmlCompositeElement {
  if (!(notes instanceof OpenXmlCompositeElement)) {
    throw new Error("ensureNotesBodyShape: notes root not composite");
  }
  for (const sp of notes.descendants()) {
    if (sp.localName !== "sp" || !(sp instanceof OpenXmlCompositeElement)) continue;
    // sp > nvSpPr > nvPr > ph[type="body"]
    for (const ph of sp.descendants()) {
      if (ph.localName === "ph" && ph.extendedAttributes.get("type") === "body") return sp;
    }
  }
  // 没找到——先确保 cSld/spTree，然后 append
  seedNotesSlide(notes); // 若结构有但缺 body，下面 append；若全无则 seed 一份
  // 找 spTree
  for (const node of notes.descendants()) {
    if (node.localName === "spTree" && node instanceof OpenXmlCompositeElement) {
      const sp = buildNotesBodyShape("");
      node.appendChild(sp);
      return sp;
    }
  }
  throw new Error("ensureNotesBodyShape: failed to find/create body shape");
}

function buildNotesBodyShape(initialText: string): OpenXmlCompositeElement {
  const sp = u("p", "sp", NS_P);
  const nvSpPr = u("p", "nvSpPr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", "2");
  cNvPr.extendedAttributes.set("name", "Notes Placeholder 1");
  nvSpPr.appendChild(cNvPr);
  const cNvSpPr = u("p", "cNvSpPr", NS_P);
  const spLocks = u("a", "spLocks", NS_A);
  spLocks.extendedAttributes.set("noGrp", "1");
  cNvSpPr.appendChild(spLocks);
  nvSpPr.appendChild(cNvSpPr);
  const nvPr = u("p", "nvPr", NS_P);
  const ph = u("p", "ph", NS_P);
  ph.extendedAttributes.set("type", "body");
  ph.extendedAttributes.set("idx", "1");
  nvPr.appendChild(ph);
  nvSpPr.appendChild(nvPr);
  sp.appendChild(nvSpPr);

  sp.appendChild(u("p", "spPr", NS_P));

  const txBody = u("p", "txBody", NS_P);
  txBody.appendChild(u("a", "bodyPr", NS_A));
  txBody.appendChild(u("a", "lstStyle", NS_A));
  txBody.appendChild(buildParagraphWithText(initialText));
  sp.appendChild(txBody);
  return sp;
}

function buildParagraphWithText(text: string): OpenXmlCompositeElement {
  const p = u("a", "p", NS_A);
  if (text.length > 0) {
    const r = u("a", "r", NS_A);
    r.appendChild(u("a", "rPr", NS_A));
    const t = u("a", "t", NS_A);
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
  }
  return p;
}

/** 替换 body placeholder shape 的 txBody 内 \`<a:p>\` 为单段单 Run 单 Text。 */
function setNotesText(notes: OpenXmlElement, text: string): void {
  const sp = ensureNotesBodyShape(notes);
  // 找 txBody
  let txBody: OpenXmlCompositeElement | undefined;
  for (const c of sp.children) {
    if (c.localName === "txBody" && c instanceof OpenXmlCompositeElement) txBody = c;
  }
  if (txBody === undefined) {
    txBody = u("p", "txBody", NS_P);
    txBody.appendChild(u("a", "bodyPr", NS_A));
    txBody.appendChild(u("a", "lstStyle", NS_A));
    sp.appendChild(txBody);
  }
  // 移除现有 \`<a:p>\`
  for (const c of txBody.children.toArray()) {
    if (c.localName === "p") txBody.children.remove(c);
  }
  txBody.appendChild(buildParagraphWithText(text));
}

/** 读 body placeholder shape 内的 \`<a:t>\` 拼成纯文本；找不到返空串。 */
function getNotesText(notes: OpenXmlElement): string {
  if (!(notes instanceof OpenXmlCompositeElement)) return "";
  for (const sp of notes.descendants()) {
    if (sp.localName !== "sp" || !(sp instanceof OpenXmlCompositeElement)) continue;
    let isBody = false;
    for (const ph of sp.descendants()) {
      if (ph.localName === "ph" && ph.extendedAttributes.get("type") === "body") {
        isBody = true;
        break;
      }
    }
    if (!isBody) continue;
    let buf = "";
    for (const n of sp.descendants()) {
      if (n.localName === "t" && "text" in n && typeof (n as { text?: string }).text === "string") {
        buf += (n as { text: string }).text;
      }
    }
    return buf;
  }
  return "";
}

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}
