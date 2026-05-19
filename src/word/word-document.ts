/**
 * `WordprocessingDocument` —— Word 文档的强类型门面。
 *
 * 与 .NET `DocumentFormat.OpenXml.Packaging.WordprocessingDocument` 同名同位，
 * 但实现上**包装一个 OPC 包**（HAS-A）而不是直接继承——v0.1.0 OPC 内核已经把
 * `OpenXmlPackage` 抽象 + Memory/Zip 具体类绑死，再插一层继承会污染 backend
 * 选择。HAS-A 让我们对 ZIP / Memory / Flat OPC 任一形态的包都能套上 Word 门面。
 *
 * 使用模式：
 * ```ts
 * await using doc = await WordprocessingDocument.openAsync("./contract.docx");
 * const body = doc.mainDocumentPart!.document.body!;
 * for (const t of body.descendants(Text)) {
 *   if (t.text === "{{client}}") t.text = "Acme";
 * }
 * await doc.saveAsync();
 * ```
 */

import type { MemoryOpenXmlPackage } from "../backends/memory/memory-package.js";
import { writeFilePath } from "../backends/zip/source-reader.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  type OpenXmlElement,
  StringValue,
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
import { createHyperlinkInput } from "../packaging/relationships/hyperlink.js";
import { type AddImagePartOptions, type ImagePart, addImagePartTo } from "../parts/image-part.js";
import { relationshipTypeMatches } from "../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../parts/relationship-uri.js";
import { registerWordprocessingElements } from "./generated/_registry.js";
import { Body } from "./generated/body.js";
import { BookmarkStart } from "./generated/bookmark-start.js";
import { CommentRangeEnd } from "./generated/comment-range-end.js";
import { CommentRangeStart } from "./generated/comment-range-start.js";
import { CommentReference } from "./generated/comment-reference.js";
import { Comment } from "./generated/comment.js";
import { Document } from "./generated/document.js";
import { Paragraph } from "./generated/paragraph.js";
import { RunProperties } from "./generated/run-properties.js";
import { RunStyle } from "./generated/run-style.js";
import { Run } from "./generated/run.js";
import { Text } from "./generated/text.js";
import {
  CommentsPart,
  FontTablePart,
  MainDocumentPart,
  SettingsPart,
  StylesPart,
  ThemePart,
  type TypedXmlPart,
  WebSettingsPart,
} from "./parts/index.js";

/** Word 子系统共用的 typed element registry（包内自管，不污染全局）。 */
const wordRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerWordprocessingElements(r);
  return r;
})();

const DEFAULT_MAIN_DOC_URI = "/word/document.xml" as PartUri;
const WPNS_URI = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class WordprocessingDocument {
  /** 已加载的 typed Part 缓存——按 relationshipType 索引。 */
  private readonly typedParts = new Map<string, TypedXmlPart<OpenXmlElement>>();

  constructor(private readonly pkg: MemoryOpenXmlPackage) {
    pkg.registerDiagnosticsElementCounter(() => this.countLoadedElements());
  }

  /**
   * 走一遍已加载的 typed Part 缓存，统计 element 树规模 + Unknown 数。
   * 未访问过的 Part 不计——保留「只 typed-loaded 才计费」的语义。
   */
  private countLoadedElements(): { elementCount: number; unknownElementCount: number } {
    let elementCount = 0;
    let unknownElementCount = 0;
    for (const part of this.typedParts.values()) {
      if (!part.isLoaded) continue;
      const root = part.root;
      elementCount += 1;
      if (root instanceof OpenXmlUnknownElement) unknownElementCount += 1;
      if (root instanceof OpenXmlCompositeElement) {
        for (const _ of root.descendants()) elementCount += 1;
        for (const _ of root.descendants(OpenXmlUnknownElement)) unknownElementCount += 1;
      }
    }
    return { elementCount, unknownElementCount };
  }

  /** 底层 OPC 包句柄；需要 OPC 级操作（addPart/relationships/contentTypes）时用。 */
  get package(): IPackage {
    return this.pkg;
  }

  /**
   * 主文档 Part。包级关系中如无 officeDocument 关系则返回 `undefined`。
   * 多次访问返回同一 typed wrapper 实例。
   */
  get mainDocumentPart(): MainDocumentPart | undefined {
    return this.getOrLoadTypedPart(MainDocumentPart);
  }

  get stylesPart(): StylesPart | undefined {
    return this.getOrLoadTypedPartFromMain(StylesPart);
  }

  get settingsPart(): SettingsPart | undefined {
    return this.getOrLoadTypedPartFromMain(SettingsPart);
  }

  get themePart(): ThemePart | undefined {
    return this.getOrLoadTypedPartFromMain(ThemePart);
  }

  get fontTablePart(): FontTablePart | undefined {
    return this.getOrLoadTypedPartFromMain(FontTablePart);
  }

  get webSettingsPart(): WebSettingsPart | undefined {
    return this.getOrLoadTypedPartFromMain(WebSettingsPart);
  }

  /** Word 注释 Part（mainDocumentPart 的 part-level 关系）；不存在时返 undefined。 */
  get commentsPart(): CommentsPart | undefined {
    return this.getOrLoadTypedPartFromMain(CommentsPart);
  }

  /**
   * 返一个全文档唯一的注释 \`w:id\` 整数（Story-18.2，Epic-18）。
   * 扫 commentsPart 已有 \`<w:comment>\` 的最大 \`w:id\` + 1；commentsPart 不存在返 0。
   */
  nextCommentId(): number {
    const cp = this.commentsPart;
    if (cp === undefined) return 0;
    let maxId = -1;
    for (const c of cp.comments.descendants(Comment)) {
      const v = c.id?.toString();
      if (v === undefined) continue;
      const n = Number.parseInt(v, 10);
      if (Number.isFinite(n) && n > maxId) maxId = n;
    }
    return maxId + 1;
  }

  /**
   * 加一条注释到文档（Story-18.2，Epic-18）。
   *
   * 自动：
   *   1. 找 / 创建 CommentsPart（包级 \`/word/comments.xml\` + 主文档关系）；
   *   2. 把 \`<w:comment w:id="N" w:author=...>\` append 进 commentsPart 树；
   *   3. 返三个 markup 元素让调用方决定挂哪段——\`rangeStart\` / \`rangeEnd\`
   *      包围目标文字两侧，\`reference\` 是个独立 Run（自带 CommentReference
   *      字符样式 + \`<w:commentReference>\`），通常 append 到 rangeEnd 之后。
   *
   * @throws OpenXmlPackageError 当 author 为空 / 主文档 Part 缺失时
   */
  addComment(opts: {
    author: string;
    initials?: string;
    date?: Date | string;
    text: string;
  }): {
    commentId: number;
    rangeStart: CommentRangeStart;
    rangeEnd: CommentRangeEnd;
    reference: Run;
  } {
    if (opts.author.trim().length === 0) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "addComment: author must not be empty or whitespace",
      });
    }
    const main = this.mainDocumentPart;
    if (main === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addComment: mainDocumentPart is missing",
      });
    }

    // 1) 找 / 创 CommentsPart
    const cp = this.getOrCreateCommentsPart(main.part);

    // 2) 分配 id + 写 <w:comment>
    const commentId = this.nextCommentId();
    const commentEl = new Comment();
    commentEl.id = StringValue.parse(String(commentId));
    commentEl.author = StringValue.parse(opts.author);
    if (opts.initials !== undefined) commentEl.initials = StringValue.parse(opts.initials);
    const dateStr =
      opts.date instanceof Date
        ? opts.date.toISOString()
        : opts.date !== undefined
          ? opts.date
          : new Date().toISOString();
    commentEl.extendedAttributes.set("w:date", dateStr);
    // 评论体：单段单 Run 单 Text
    const cp_para = new Paragraph();
    const cp_run = new Run();
    const cp_text = new Text();
    cp_text.text = opts.text;
    if (opts.text.startsWith(" ") || opts.text.endsWith(" ") || /\s{2,}/.test(opts.text)) {
      cp_text.extendedAttributes.set("xml:space", "preserve");
    }
    cp_run.appendChild(cp_text);
    cp_para.appendChild(cp_run);
    commentEl.appendChild(cp_para);
    cp.comments.appendChild(commentEl);

    // 3) 主文档侧的 3 个 markup
    const rangeStart = new CommentRangeStart();
    rangeStart.extendedAttributes.set("w:id", String(commentId));
    const rangeEnd = new CommentRangeEnd();
    rangeEnd.extendedAttributes.set("w:id", String(commentId));
    const reference = new Run();
    const refRpr = new RunProperties();
    const refStyle = new RunStyle();
    refStyle.extendedAttributes.set("w:val", "CommentReference");
    refRpr.appendChild(refStyle);
    reference.appendChild(refRpr);
    const refMarker = new CommentReference();
    refMarker.extendedAttributes.set("w:id", String(commentId));
    reference.appendChild(refMarker);

    return { commentId, rangeStart, rangeEnd, reference };
  }

  // ─── Epic-18 内部 ────────────────────────────────────────────────────────────

  /** 找 / 创 CommentsPart——首次 addComment 调用走这里 bootstrap。 */
  private getOrCreateCommentsPart(mainDocPart: IPackagePart): CommentsPart {
    const cached = this.typedParts.get(CommentsPart.relationshipType) as CommentsPart | undefined;
    if (cached !== undefined) return cached;
    const existing = this.getOrLoadTypedPartFromMain(CommentsPart);
    if (existing !== undefined) return existing;
    // 不存在：分配 \`/word/comments.xml\` Part + 主文档关系
    const uri = "/word/comments.xml" as PartUri;
    const part = this.pkg.createPart(uri, CommentsPart.contentType);
    mainDocPart.relationships.create({
      type: CommentsPart.relationshipType,
      target: "comments.xml",
      targetMode: "internal",
    });
    const cp = new CommentsPart(part, wordRegistry);
    this.typedParts.set(CommentsPart.relationshipType, cp);
    return cp;
  }

  /**
   * 把字节添加到包里成为一个 ImagePart（Story-12.2，Epic-12）。
   *
   * 字节 → 写 `/word/media/imageN.<ext>` 二进制 Part，从 mainDocumentPart 加一条
   * `relationships/image` 关系；返新 `ImagePart` 包装 + 新分配的 `relId`。
   *
   * 调用方拿到 relId 后，用 `createImageRunForWord(relId, cxEmu, cyEmu)` 一行得到
   * 完整 `<w:drawing>` Run，append 到段落即可。
   *
   * @throws OpenXmlPackageError 当 contentType 没传且字节首部嗅探不出已知 MIME 时
   */
  addImagePart(
    bytes: Uint8Array,
    opts: AddImagePartOptions = {},
  ): { part: ImagePart; relId: string } {
    const main = this.mainDocumentPart;
    if (main === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addImagePart: mainDocumentPart is missing",
      });
    }
    return addImagePartTo(this.pkg, main.part, "/word/media", bytes, opts);
  }

  /**
   * 加一条超链接 relationship 到 mainDocumentPart（Story-15.2，Epic-15）。
   *
   * 给定外部 URL，写入 \`targetMode="external"\` 的 relationship，返新分配的 relId。
   * 调用方拿 relId 后用 \`createHyperlinkRun({ relId, text })\` 一行生成可挂的
   * `<w:hyperlink>` markup。
   *
   * @throws OpenXmlPackageError 当 \`url\` 为空 / 仅空白字符（code="RELATIONSHIP_TARGET_INVALID"）
   *   或 mainDocumentPart 缺失（code="PART_NOT_FOUND"）
   */
  /**
   * 返回一个全文档唯一的 \`w:id\` 整数——给 \`createBookmarkPair(name, id)\` 用
   * （Story-16.2，Epic-16）。
   *
   * 算法：扫 mainDocumentPart 元素树里所有现有 \`<w:bookmarkStart>\`，取 \`w:id\` 最大值 + 1。
   * 文档为空 / 没书签时返 0。
   */
  nextBookmarkId(): number {
    const main = this.mainDocumentPart;
    if (main === undefined) return 0;
    let maxId = -1;
    for (const bm of main.document.descendants(BookmarkStart)) {
      const v = bm.id?.toString();
      if (v === undefined) continue;
      const n = Number.parseInt(v, 10);
      if (Number.isFinite(n) && n > maxId) maxId = n;
    }
    return maxId + 1;
  }

  addHyperlinkRelationship(url: string, opts: { id?: string } = {}): { relId: string } {
    const main = this.mainDocumentPart;
    if (main === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addHyperlinkRelationship: mainDocumentPart is missing",
      });
    }
    const input = createHyperlinkInput({
      target: url,
      ...(opts.id !== undefined ? { id: opts.id } : {}),
    });
    const rel = main.part.relationships.create(input);
    return { relId: rel.id };
  }

  /**
   * 把所有已加载的 typed Part 序列化回 part bytes，再触发 OPC 包 saveAsync。
   *
   * 未访问过的 typed Part 不会被 flush（节省 IO 并保留原字节）。
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

  /** 从路径 / 字节流 / Blob / Stream 打开一份 docx。 */
  static async openAsync(
    source: ZipSource,
    options: OpenAsyncOptions = {},
  ): Promise<WordprocessingDocument> {
    const pkg = await openAsync(source, options);
    return new WordprocessingDocument(pkg);
  }

  /**
   * 创建一份最小可用的空白 docx：包含 `/word/document.xml` 主文档 Part +
   * 包级 officeDocument 关系 + Document/Body typed 根。
   *
   * 实现关键：直接 seed typed root（避免 sync `mainDocumentPart.document`
   * 与异步 writeAsync 的竞态）；flush 时统一序列化回 part bytes。
   */
  static create(): WordprocessingDocument {
    const inMemory = createInMemory();
    inMemory.createPart(DEFAULT_MAIN_DOC_URI, MainDocumentPart.contentType);
    inMemory.relationships.create({
      type: MainDocumentPart.relationshipType,
      target: "word/document.xml",
      targetMode: "internal",
    });
    const wpd = new WordprocessingDocument(inMemory as MemoryOpenXmlPackage);
    const main = wpd.mainDocumentPart;
    if (main !== undefined) {
      const docElem = new Document();
      docElem.extendedAttributes.set("xmlns:w", WPNS_URI);
      docElem.appendChild(new Body());
      main.document = docElem;
    }
    return wpd;
  }

  // ─── 内部 ─────────────────────────────────────────────────────────────────

  private flushAllTypedParts(): Promise<void> {
    const promises: Promise<void>[] = [];
    for (const part of this.typedParts.values()) {
      if (part.isLoaded) promises.push(part.flushAsync());
    }
    return Promise.all(promises).then(() => undefined);
  }

  /** 从包级关系中找指定 relationshipType 的 Part，并 wrap 为 typed。 */
  private getOrLoadTypedPart<T extends TypedXmlPart<OpenXmlElement>>(
    Ctor: TypedPartCtor<T>,
  ): T | undefined {
    const cached = this.typedParts.get(Ctor.relationshipType);
    if (cached !== undefined) return cached as T;
    const rel = findRelationship(this.pkg.relationships, Ctor.relationshipType);
    if (rel === undefined) return undefined;
    // 包级关系：base = 包根
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !this.pkg.hasPart(partUri)) return undefined;
    const part = this.pkg.getPart(partUri);
    const typed = new Ctor(part, wordRegistry);
    this.typedParts.set(Ctor.relationshipType, typed);
    return typed;
  }

  /** 从主文档 Part 的 part-level 关系中找指定 type 的 Part。 */
  private getOrLoadTypedPartFromMain<T extends TypedXmlPart<OpenXmlElement>>(
    Ctor: TypedPartCtor<T>,
  ): T | undefined {
    const cached = this.typedParts.get(Ctor.relationshipType);
    if (cached !== undefined) return cached as T;
    const main = this.mainDocumentPart;
    if (main === undefined) return undefined;
    const rel = findRelationship(main.part.relationships, Ctor.relationshipType);
    if (rel === undefined) return undefined;
    // Part 级关系：base = 主文档 Part 的 URI
    const partUri = resolveRelativePartUri(main.part.uri, rel.target);
    if (partUri === undefined || !this.pkg.hasPart(partUri)) return undefined;
    const part = this.pkg.getPart(partUri);
    const typed = new Ctor(part, wordRegistry);
    this.typedParts.set(Ctor.relationshipType, typed);
    return typed;
  }
}

interface TypedPartCtor<T extends TypedXmlPart<OpenXmlElement>> {
  new (part: IPackagePart, registry: ElementRegistry): T;
  readonly relationshipType: string;
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
