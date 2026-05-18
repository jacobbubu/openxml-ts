/**
 * `ImagePart` —— 图片二进制 Part。
 *
 * 处理 OOXML 文档里常见的 raster / vector 图片（png / jpeg / gif / bmp / tiff / svg）。
 * 关系类型固定为 `.../officeDocument/2006/relationships/image`；content-type 在构造时
 * 由调用方传入，因为同一个关系类型可以挂多种 MIME。
 *
 * 用法：通常不直接 new——走 `WordprocessingDocument.addImagePart(bytes)` /
 * `PresentationDocument.addImagePart(slide, bytes)` 之类的门面便捷方法。
 *
 * @see BinaryPart 父类
 */

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { BinaryPart } from "./binary-part.js";

export class ImagePart extends BinaryPart {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

  /** 调用方传入的 content-type（来自 ContentTypeManifest）。 */
  readonly contentTypeAtCreation: string;

  constructor(part: IPackagePart) {
    super(part);
    this.contentTypeAtCreation = part.contentType;
  }
}

/**
 * 常见图片扩展名 ↔ MIME。覆盖 ECMA-376-1 §15.2 列出的全部 raster 类型 + SVG。
 *
 * Excel / Word / PPT 三族通用——`[Content_Types].xml` 的 `<Default Extension=".." ContentType="..">` 走的就是这份。
 */
export const IMAGE_MIME_BY_EXTENSION: Readonly<Record<string, string>> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  bmp: "image/bmp",
  tif: "image/tiff",
  tiff: "image/tiff",
  svg: "image/svg+xml",
};

const EXTENSION_BY_MIME: Readonly<Record<string, string>> = (() => {
  const out: Record<string, string> = {};
  for (const [ext, mime] of Object.entries(IMAGE_MIME_BY_EXTENSION)) {
    // 同 MIME 多扩展名时优先「短的或更常用的」——jpeg/jpg 取 jpg；tiff/tif 取 tif
    if (out[mime] === undefined || ext.length < out[mime].length) out[mime] = ext;
  }
  return out;
})();

// ─── addImagePart 子系统共享实现 ─────────────────────────────────────────────

/**
 * `addImagePart` 入参——所有子系统门面方法共享。
 */
export interface AddImagePartOptions {
  /**
   * 图片 MIME。省略时按以下顺序尝试：
   * 1. 字节流首部 magic 嗅探（PNG/JPEG/GIF/BMP/TIFF/SVG）；
   * 2. 嗅探失败抛 `OpenXmlPackageError(code="BACKEND_ERROR")`，必须显式传 MIME。
   */
  readonly contentType?: string;
  /**
   * Part 文件名（不含路径与扩展名）。省略时按 `image<N>` 递增分配，N 是当前目录下
   * 已存在的 `image<idx>.<ext>` 最大 idx + 1。
   */
  readonly baseName?: string;
}

/**
 * 跨子系统共享的「加一个图片 Part」实现。
 *
 * - `mediaDir`：图片落到哪个目录前缀，结尾不带斜杠。Word 用 `/word/media`，
 *   PPT 用 `/ppt/media`，Excel 用 `/xl/media`；
 * - `ownerPart`：把 image 关系挂到哪个 Part 的 part-level relationships 下；
 *   Word 一般是 mainDocumentPart，PPT 一般是 slidePart。
 *
 * 返回 `{ part, relId }`：`part` 是已经写好字节的 ImagePart，`relId` 是 owner
 * 的关系集合里新分配的 id（用来填进 markup 的 `r:embed`）。
 */
export function addImagePartTo(
  pkg: IPackage,
  ownerPart: IPackagePart,
  mediaDir: string,
  bytes: Uint8Array,
  opts: AddImagePartOptions = {},
): { part: ImagePart; relId: string } {
  const contentType = opts.contentType ?? sniffImageMime(bytes);
  if (contentType === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message:
        "addImagePart: unable to detect image MIME from bytes; pass opts.contentType explicitly",
    });
  }
  const ext = extensionForMime(contentType);
  if (ext === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `addImagePart: unsupported image MIME "${contentType}"; supported: ${Object.values(
        IMAGE_MIME_BY_EXTENSION,
      )
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(", ")}`,
    });
  }
  const baseName = opts.baseName ?? nextImageBaseName(pkg, mediaDir);
  const uri = `${mediaDir}/${baseName}.${ext}` as PartUri;
  const part = pkg.createPart(uri, contentType);
  // 所有 backend 的 Part 都是 MemoryPackagePart 实例（含 ZIP backend，继承自 Memory）；
  // 同 TypedXmlPart.load 走的路径——用 sync writeSync 落 bytes 避免无谓 await。
  (part as MemoryPackagePart).writeSync(bytes);

  const rel = ownerPart.relationships.create({
    type: ImagePart.relationshipType,
    target: relativeTargetFrom(ownerPart.uri, uri),
    targetMode: "internal",
  });
  return { part: new ImagePart(part), relId: rel.id };
}

/**
 * 扫 `mediaDir` 下已存在的 `image<n>.<ext>` Part 找到最大 n + 1。
 *
 * 仅匹配 `image\d+\.[a-z]+`，名字带其它字符的 Part 不计入——避免和用户自定义
 * 命名的图片冲突。
 */
function nextImageBaseName(pkg: IPackage, mediaDir: string): string {
  let maxIdx = 0;
  const prefix = `${mediaDir}/image`;
  for (const part of pkg.parts()) {
    const uri = part.uri as string;
    if (!uri.startsWith(prefix)) continue;
    const rest = uri.slice(prefix.length); // "1.png" / "12.jpeg"
    const match = /^(\d+)\./.exec(rest);
    if (match === null) continue;
    const idx = Number.parseInt(match[1] ?? "0", 10);
    if (Number.isFinite(idx) && idx > maxIdx) maxIdx = idx;
  }
  return `image${maxIdx + 1}`;
}

/**
 * 计算「从 ownerUri 出发到 targetUri」的相对路径——`.rels` 文件里 Target 字段格式。
 *
 * 示例：`/word/document.xml` → `/word/media/image1.png` ⇒ `media/image1.png`
 *      `/ppt/slides/slide1.xml` → `/ppt/media/image1.png` ⇒ `../media/image1.png`
 */
function relativeTargetFrom(ownerUri: string, targetUri: string): string {
  const ownerDirs = ownerUri.split("/").slice(0, -1); // ["", "word"]
  const targetDirs = targetUri.split("/"); // ["", "word", "media", "image1.png"]
  // 找共同前缀深度
  let common = 0;
  while (
    common < ownerDirs.length - 1 &&
    common < targetDirs.length - 1 &&
    ownerDirs[common + 1] === targetDirs[common + 1]
  ) {
    common += 1;
  }
  // ownerDirs 剩余每层向上一级 ".."
  const upCount = ownerDirs.length - 1 - common;
  const rest = targetDirs.slice(common + 1).join("/");
  return upCount === 0 ? rest : `${"../".repeat(upCount)}${rest}`;
}

/** 给定扩展名（不含点，大小写无关）拿 MIME；不识别返回 undefined。 */
export function mimeForExtension(ext: string): string | undefined {
  return IMAGE_MIME_BY_EXTENSION[ext.toLowerCase()];
}

/** 给定 MIME 拿规范化扩展名（不含点）；不识别返回 undefined。 */
export function extensionForMime(mime: string): string | undefined {
  return EXTENSION_BY_MIME[mime.toLowerCase()];
}

/**
 * 从字节流首部 magic 嗅探 MIME；不识别返回 undefined。
 *
 * 覆盖 PNG / JPEG / GIF / BMP / TIFF (II/MM) / SVG（开头 `<svg` 或 `<?xml`）。
 * 用于 `addImagePart(bytes)` 没传 contentType 时兜底。
 */
export function sniffImageMime(bytes: Uint8Array): string | undefined {
  if (bytes.length < 4) return undefined;
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  }
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  // GIF: "GIF87a" / "GIF89a"
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return "image/gif";
  }
  // BMP: "BM"
  if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return "image/bmp";
  }
  // TIFF: II*\0 (little-endian) / MM\0* (big-endian)
  if (
    (bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x00) ||
    (bytes[0] === 0x4d && bytes[1] === 0x4d && bytes[2] === 0x00 && bytes[3] === 0x2a)
  ) {
    return "image/tiff";
  }
  // SVG: 检测 "<svg" 或 "<?xml" 开头（最长嗅探 256 字节）
  const headLen = Math.min(bytes.byteLength, 256);
  const head = new TextDecoder("utf-8", { fatal: false }).decode(bytes.subarray(0, headLen));
  if (/^\s*(<\?xml|<svg)/i.test(head)) return "image/svg+xml";
  return undefined;
}
