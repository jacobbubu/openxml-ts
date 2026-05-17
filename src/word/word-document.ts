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
import { ElementRegistry, OpenXmlCompositeElement, type OpenXmlElement } from "../element/index.js";
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
import { relationshipTypeMatches } from "../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../parts/relationship-uri.js";
import { registerWordprocessingElements } from "./generated/_registry.js";
import { Body } from "./generated/body.js";
import { Document } from "./generated/document.js";
import {
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
