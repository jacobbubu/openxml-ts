/**
 * `[Content_Types].xml` 的解析与序列化。
 *
 * OPC 规范（ISO/IEC 29500-2 §10.1）：
 * - 根元素 `<Types>` 命名空间 `http://schemas.openxmlformats.org/package/2006/content-types`；
 * - 子元素只能是 `<Default Extension="..." ContentType="..."/>` 或
 *   `<Override PartName="/path" ContentType="..."/>`；
 * - 同一 Extension（大小写无关）只能定义一次；
 * - 同一 PartName（大小写无关）只能 Override 一次；
 * - 解析 Part 内容类型时：先匹配 Override，再按扩展名匹配 Default。
 *
 * 本实现保留插入顺序：序列化时先输出全部 Default 再输出全部 Override，
 * 各自内部保持加入顺序——便于字节级 diff。
 */

import { OpenXmlPackageError } from "../errors.js";
import { type PartUri, isPartUri } from "../interfaces/types.js";
import { XmlWriter, tokenizeXml } from "../xml/index.js";

/** `[Content_Types].xml` 的根命名空间。 */
export const CONTENT_TYPES_NS = "http://schemas.openxmlformats.org/package/2006/content-types";

/** `<Default Extension="..." ContentType="..."/>` 条目——同扩展名的 Part 自动应用此 MIME。 */
export interface DefaultEntry {
  readonly extension: string;
  readonly contentType: string;
}

/** `<Override PartName="..." ContentType="..."/>` 条目——为特定 Part URI 单独指定 MIME，优先级高于 Default。 */
export interface OverrideEntry {
  readonly partName: PartUri;
  readonly contentType: string;
}

/**
 * `[Content_Types].xml` 的内存视图——维护 Default + Override 列表，提供按 Part URI
 * 查 content-type 的能力（先 Override 再 Default，规则同 OPC §10.1.2.2）。
 */
export class ContentTypeManifest {
  private readonly defaultsMap = new Map<string, DefaultEntry>();
  private readonly overridesMap = new Map<string, OverrideEntry>();

  /** 加入或覆盖一条 Default（重复 Extension 抛错；如需替换请先 removeDefault）。 */
  addDefault(extension: string, contentType: string): void {
    const ext = normalizeExtension(extension);
    if (ext.length === 0) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "Default Extension must be non-empty",
      });
    }
    if (contentType.length === 0) {
      throw new OpenXmlPackageError({
        code: "CONTENT_TYPE_MISSING",
        message: `Default for ".${ext}" missing ContentType`,
      });
    }
    if (this.defaultsMap.has(ext)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Duplicate Default for extension ".${ext}"`,
      });
    }
    this.defaultsMap.set(ext, { extension: ext, contentType });
  }

  /** 加入或覆盖一条 Override（重复 PartName 抛错；如需替换请先 removeOverride）。 */
  addOverride(partName: PartUri, contentType: string): void {
    const key = partName.toLowerCase();
    if (contentType.length === 0) {
      throw new OpenXmlPackageError({
        code: "CONTENT_TYPE_MISSING",
        partUri: partName,
        message: "Override missing ContentType",
      });
    }
    if (this.overridesMap.has(key)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        partUri: partName,
        message: `Duplicate Override for "${partName}"`,
      });
    }
    this.overridesMap.set(key, { partName, contentType });
  }

  removeDefault(extension: string): boolean {
    return this.defaultsMap.delete(normalizeExtension(extension));
  }

  removeOverride(partName: PartUri): boolean {
    return this.overridesMap.delete(partName.toLowerCase());
  }

  hasOverride(partName: PartUri): boolean {
    return this.overridesMap.has(partName.toLowerCase());
  }

  hasDefault(extension: string): boolean {
    return this.defaultsMap.has(normalizeExtension(extension));
  }

  /** 解析给定 Part 的 ContentType。先 Override，后按扩展名 Default；未命中返回 undefined。 */
  resolveContentType(partUri: PartUri): string | undefined {
    const ov = this.overridesMap.get(partUri.toLowerCase());
    if (ov !== undefined) return ov.contentType;
    const dot = partUri.lastIndexOf(".");
    if (dot === -1 || dot === partUri.length - 1) return undefined;
    const ext = partUri.slice(dot + 1).toLowerCase();
    return this.defaultsMap.get(ext)?.contentType;
  }

  defaults(): Iterable<DefaultEntry> {
    return this.defaultsMap.values();
  }

  overrides(): Iterable<OverrideEntry> {
    return this.overridesMap.values();
  }

  get size(): number {
    return this.defaultsMap.size + this.overridesMap.size;
  }

  /**
   * 序列化为稳定 XML。Default 顺序 → Override 顺序均与插入顺序一致，便于 ZIP 字节级 diff。
   */
  serialize(): string {
    const w = new XmlWriter();
    w.declaration();
    w.open("Types", [["xmlns", CONTENT_TYPES_NS]]);
    for (const def of this.defaultsMap.values()) {
      w.empty("Default", [
        ["Extension", def.extension],
        ["ContentType", def.contentType],
      ]);
    }
    for (const ov of this.overridesMap.values()) {
      w.empty("Override", [
        ["PartName", ov.partName],
        ["ContentType", ov.contentType],
      ]);
    }
    w.close("Types");
    return w.toString();
  }

  /** 从 `[Content_Types].xml` 文本构造一个 manifest。 */
  static parse(xml: string): ContentTypeManifest {
    let sawRoot = false;
    let rootClosed = false;
    const manifest = new ContentTypeManifest();
    try {
      for (const token of tokenizeXml(xml)) {
        if (token.kind === "decl") continue;
        if (token.kind === "text") continue;
        if (token.kind === "open") {
          if (!sawRoot) {
            if (token.name !== "Types") {
              throw new OpenXmlPackageError({
                code: "MISSING_CONTENT_TYPES",
                message: `Expected root <Types>, got <${token.name}>`,
              });
            }
            const ns = token.attrs.get("xmlns");
            if (ns !== CONTENT_TYPES_NS) {
              throw new OpenXmlPackageError({
                code: "MISSING_CONTENT_TYPES",
                message: `<Types> must declare xmlns="${CONTENT_TYPES_NS}"`,
              });
            }
            sawRoot = true;
            if (token.selfClosing) rootClosed = true;
            continue;
          }
          if (rootClosed) {
            throw new OpenXmlPackageError({
              code: "MISSING_CONTENT_TYPES",
              message: "Content found after </Types>",
            });
          }
          if (token.name === "Default") {
            manifest.addDefault(
              requireAttr(token.attrs, "Extension", token.name),
              requireAttr(token.attrs, "ContentType", token.name),
            );
          } else if (token.name === "Override") {
            const partName = requireAttr(token.attrs, "PartName", token.name);
            if (!isPartUri(partName)) {
              throw new OpenXmlPackageError({
                code: "MISSING_CONTENT_TYPES",
                message: `Override PartName "${partName}" is not a valid OPC Part URI`,
              });
            }
            manifest.addOverride(partName, requireAttr(token.attrs, "ContentType", token.name));
          } else {
            throw new OpenXmlPackageError({
              code: "MISSING_CONTENT_TYPES",
              message: `Unexpected element <${token.name}> inside <Types>`,
            });
          }
          // Default/Override 必须自闭合；展开形式则等待 close
          continue;
        }
        if (token.kind === "close" && token.name === "Types") {
          rootClosed = true;
        }
        // 其余 close 是 Default/Override 的非自闭合形式，忽略
      }
    } catch (err) {
      if (err instanceof OpenXmlPackageError) {
        // 解析期的 BACKEND_ERROR / SECURITY_VIOLATION 等保留原 code；
        // 其它解析层语义性错误归类到 MISSING_CONTENT_TYPES
        throw err;
      }
      throw new OpenXmlPackageError({
        code: "MISSING_CONTENT_TYPES",
        message: `Failed to parse [Content_Types].xml: ${(err as Error).message}`,
        cause: err,
      });
    }
    if (!sawRoot) {
      throw new OpenXmlPackageError({
        code: "MISSING_CONTENT_TYPES",
        message: "Missing <Types> root element",
      });
    }
    if (!rootClosed) {
      throw new OpenXmlPackageError({
        code: "MISSING_CONTENT_TYPES",
        message: "Missing </Types>",
      });
    }
    return manifest;
  }
}

function normalizeExtension(extension: string): string {
  return extension.replace(/^\./, "").toLowerCase();
}

function requireAttr(attrs: ReadonlyMap<string, string>, name: string, context: string): string {
  const v = attrs.get(name);
  if (v === undefined) {
    throw new OpenXmlPackageError({
      code: "MISSING_CONTENT_TYPES",
      message: `<${context}> missing required "${name}" attribute`,
    });
  }
  return v;
}
