/**
 * DataPart 引用关系类（Reference Relationships）。
 *
 * 对位 .NET `DocumentFormat.OpenXml.Packaging`:
 *   - `VideoReferenceRelationship`
 *   - `AudioReferenceRelationship`
 *   - `MediaReferenceRelationship`
 *
 * 这三个类表示从 Part（如 SlidePart、MainDocumentPart）到 MediaDataPart 的
 * **包内引用关系**（targetMode="internal"）。
 *
 * 与外部 URL 超链接（targetMode="external"）不同：
 * - 目标是包内的 MediaDataPart（二进制 Data Part）；
 * - 关系写入拥有方 Part 的 `.rels` 文件；
 * - 关系类型 URI 按 OOXML / Microsoft Office 规范固定。
 *
 * 用法：通常不直接 new——走对应 facade 的
 * `addVideoReferenceRelationship(mediaPart)` / `addAudioReferenceRelationship(mediaPart)` 方法。
 */

import type { IPackageRelationship } from "../packaging/interfaces/relationship.js";
import type { MediaDataPart } from "./media-data-part.js";

// ─── VideoReferenceRelationship ───────────────────────────────────────────────

/**
 * 对位 .NET `VideoReferenceRelationship`。
 *
 * 关系类型：`http://schemas.openxmlformats.org/officeDocument/2006/relationships/video`
 */
export class VideoReferenceRelationship {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video";

  /** 关系 id（来自底层 `IPackageRelationship.id`）。 */
  readonly id: string;
  /** 目标 MediaDataPart。 */
  readonly mediaPart: MediaDataPart;

  constructor(mediaPart: MediaDataPart, rel: IPackageRelationship) {
    this.mediaPart = mediaPart;
    this.id = rel.id;
  }
}

// ─── AudioReferenceRelationship ───────────────────────────────────────────────

/**
 * 对位 .NET `AudioReferenceRelationship`。
 *
 * 关系类型：`http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio`
 */
export class AudioReferenceRelationship {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio";

  /** 关系 id（来自底层 `IPackageRelationship.id`）。 */
  readonly id: string;
  /** 目标 MediaDataPart。 */
  readonly mediaPart: MediaDataPart;

  constructor(mediaPart: MediaDataPart, rel: IPackageRelationship) {
    this.mediaPart = mediaPart;
    this.id = rel.id;
  }
}

// ─── MediaReferenceRelationship ───────────────────────────────────────────────

/**
 * 对位 .NET `MediaReferenceRelationship`。
 *
 * 关系类型：`http://schemas.microsoft.com/office/2007/relationships/media`
 *
 * 注意：这是 Microsoft Office 私有命名空间（非 OOXML 标准），与 Video/Audio 的
 * `openxmlformats.org` 命名空间不同。
 */
export class MediaReferenceRelationship {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/media";

  /** 关系 id（来自底层 `IPackageRelationship.id`）。 */
  readonly id: string;
  /** 目标 MediaDataPart。 */
  readonly mediaPart: MediaDataPart;

  constructor(mediaPart: MediaDataPart, rel: IPackageRelationship) {
    this.mediaPart = mediaPart;
    this.id = rel.id;
  }
}
