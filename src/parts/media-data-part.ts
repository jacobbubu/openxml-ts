/**
 * `MediaDataPart` —— 音频/视频二进制 Data Part。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Packaging.MediaDataPart`（继承自 `DataPart`）。
 * 在 TS 端继承自 {@link BinaryPart}，提供「拿字节 / 改字节」公共能力。
 *
 * 与 {@link ImagePart} 的区别：
 * - 存放于 `media/` 子目录（而非 `media/`），命名规则：`media<N>.<ext>`；
 * - 关系类型不固定——由引用方（VideoReferenceRelationship / AudioReferenceRelationship /
 *   MediaReferenceRelationship）的 type 字段决定；
 * - 内容类型由调用方显式指定（`video/mp4`、`audio/wav` 等）。
 *
 * 通常不直接 new——走 `addMediaDataPartTo(pkg, ownerPart, mediaDir, contentType, bytes?)` 工厂。
 *
 * @see BinaryPart 父类
 */

import type { MemoryPackagePart } from "../backends/memory/memory-package-part.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { BinaryPart } from "./binary-part.js";

export class MediaDataPart extends BinaryPart {}

// ─── MIME / extension tables ──────────────────────────────────────────────────

/**
 * 常见媒体 MIME ↔ 扩展名映射（对位 .NET MediaDataPartType 枚举）。
 * key = MIME，value = 扩展名（不含点）。
 */
export const MEDIA_MIME_TO_EXTENSION: Readonly<Record<string, string>> = {
  // Audio
  "audio/aiff": "aiff",
  "audio/midi": "mid",
  "audio/mpeg": "mp3",
  "audio/mpegurl": "m3u",
  "audio/wav": "wav",
  "audio/x-ms-wma": "wma",
  "audio/ogg": "ogg",
  // Video
  "video/x-ms-asf-plugin": "asx",
  "video/avi": "avi",
  "video/mpeg": "mpg",
  "video/x-ms-wmv": "wmv",
  "video/x-ms-wmx": "wmx",
  "video/x-ms-wvx": "wvx",
  "video/quicktime": "mov",
  "video/ogg": "ogg",
  "video/mp4": "mp4",
};

/** 给定 MIME 拿规范化扩展名（不含点）；不识别返回 undefined。 */
export function mediaExtensionForMime(mime: string): string | undefined {
  return MEDIA_MIME_TO_EXTENSION[mime.toLowerCase()];
}

// ─── addMediaDataPartTo 工厂 ──────────────────────────────────────────────────

/**
 * `addMediaDataPart` 入参。
 */
export interface AddMediaDataPartOptions {
  /**
   * Part 文件名（不含路径与扩展名）。省略时按 `media<N>` 递增分配。
   */
  readonly baseName?: string;
}

/**
 * 跨子系统共享的「加一个 MediaDataPart」实现。
 *
 * - `mediaDir`：媒体文件目录，结尾不带斜杠（如 `/word/media`、`/ppt/media`、`/xl/media`）；
 * - `ownerPart`：把关系挂到哪个 Part 的 part-level relationships 下；
 * - `contentType`：MIME（如 `video/mp4`、`audio/wav`）；
 * - `referenceRelationshipType`：关系类型 URI（来自 VideoReferenceRelationship.relationshipType 等）；
 * - `bytes`：可选的初始二进制内容；省略则创建空 Part，后续用 `part.writeAsync()` 写入。
 *
 * 返回 `{ part, relId }`：`part` 是 MediaDataPart，`relId` 是新分配的关系 id。
 */
export function addMediaDataPartTo(
  pkg: IPackage,
  ownerPart: IPackagePart,
  mediaDir: string,
  contentType: string,
  referenceRelationshipType: string,
  bytes?: Uint8Array,
  opts: AddMediaDataPartOptions = {},
): { part: MediaDataPart; relId: string } {
  const ext = mediaExtensionForMime(contentType) ?? "bin";
  const baseName = opts.baseName ?? nextMediaBaseName(pkg, mediaDir);
  const uri = `${mediaDir}/${baseName}.${ext}` as PartUri;
  const rawPart = pkg.createPart(uri, contentType);
  if (bytes !== undefined && bytes.byteLength > 0) {
    (rawPart as MemoryPackagePart).writeSync(bytes);
  }

  const rel = ownerPart.relationships.create({
    type: referenceRelationshipType,
    target: relativeTargetFrom(ownerPart.uri, uri),
    targetMode: "internal",
  });
  return { part: new MediaDataPart(rawPart), relId: rel.id };
}

/**
 * 扫 `mediaDir` 下已存在的 `media<n>.<ext>` Part 找到最大 n + 1。
 */
function nextMediaBaseName(pkg: IPackage, mediaDir: string): string {
  let maxIdx = 0;
  const prefix = `${mediaDir}/media`;
  for (const part of pkg.parts()) {
    const uri = part.uri as string;
    if (!uri.startsWith(prefix)) continue;
    const rest = uri.slice(prefix.length); // "1.mp4" / "12.wav"
    const match = /^(\d+)\./.exec(rest);
    if (match === null) continue;
    const idx = Number.parseInt(match[1] ?? "0", 10);
    if (Number.isFinite(idx) && idx > maxIdx) maxIdx = idx;
  }
  return `media${maxIdx + 1}`;
}

/**
 * 计算从 ownerUri 出发到 targetUri 的相对路径（与 image-part.ts 中同名函数完全相同逻辑）。
 */
function relativeTargetFrom(ownerUri: string, targetUri: string): string {
  const ownerDirs = ownerUri.split("/").slice(0, -1);
  const targetDirs = targetUri.split("/");
  let common = 0;
  while (
    common < ownerDirs.length - 1 &&
    common < targetDirs.length - 1 &&
    ownerDirs[common + 1] === targetDirs[common + 1]
  ) {
    common += 1;
  }
  const upCount = ownerDirs.length - 1 - common;
  const rest = targetDirs.slice(common + 1).join("/");
  return upCount === 0 ? rest : `${"../".repeat(upCount)}${rest}`;
}
