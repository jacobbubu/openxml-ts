/**
 * ZIP 后端的 OpenXmlPackage。直接继承 MemoryOpenXmlPackage —— 包内状态依旧是内存
 * Map，只是额外承担两个职责：
 *
 * - 接受 `parseZipBytes` 的输出来初始化（contentTypes / parts / relationships）；
 * - 把当前状态序列化回 ZIP（`saveAsync` 回写到 open 路径；`saveAsAsync(target)` 写到新路径；
 *   `saveAsBytesAsync()` 拿到 Uint8Array）。
 */

import type { RelationshipCollection } from "../../packaging/core/relationship-collection.js";
import { OpenXmlPackageError } from "../../packaging/errors.js";
import type { AccessMode } from "../../packaging/interfaces/types.js";
import { MemoryOpenXmlPackage } from "../memory/memory-package.js";
import { writeFilePath } from "./source-reader.js";
import type { ParsedZipPackage } from "./zip-reader.js";
import { packageToZipBytes } from "./zip-writer.js";

export interface ZipPackageOptions {
  readonly accessMode?: AccessMode;
  /** open 来源的描述（仅 string 路径会被记忆，用于 saveAsync 默认回写）。 */
  readonly originPath?: string;
}

export class ZipOpenXmlPackage extends MemoryOpenXmlPackage {
  /** open 时的源路径（如有），saveAsync 默认回写到这里。 */
  private originPath: string | undefined;

  constructor(parsed: ParsedZipPackage, options: ZipPackageOptions = {}) {
    super(options.accessMode !== undefined ? { accessMode: options.accessMode } : {});
    this.originPath = options.originPath;

    // 1) ContentTypes：把解析出的 manifest 整体拷贝到本实例
    for (const def of parsed.contentTypes.defaults()) {
      this.contentTypes.addDefault(def.extension, def.contentType);
    }
    for (const ov of parsed.contentTypes.overrides()) {
      this.contentTypes.addOverride(ov.partName, ov.contentType);
    }

    // 2) Parts：按原序灌注；用 insertPart 绕过 accessMode 校验，以支持 read-only 模式打开
    for (const uri of parsed.partOrder) {
      const parsedPart = parsed.parts.get(uri);
      if (parsedPart === undefined) continue;
      const part = this.insertPartInternal(parsedPart.uri, parsedPart.contentType);
      void part.writeAsync(parsedPart.content);
    }

    // 3) 包级关系：替换默认空集合（用 fromXml 路径已校验）
    for (const rel of parsed.packageRelationships) {
      this.relationships.create({
        id: rel.id,
        type: rel.type,
        target: rel.target,
        targetMode: rel.targetMode,
      });
    }

    // 4) Part 级关系：把每条 rel 挂回 owner 的集合
    for (const [ownerUri, rels] of parsed.partRelationships) {
      const owner = this.getPart(ownerUri);
      // owner.relationships 是 RelationshipCollection 实例（内存 backend 保证）
      const col = owner.relationships as RelationshipCollection;
      for (const rel of rels) {
        col.create({
          id: rel.id,
          type: rel.type,
          target: rel.target,
          targetMode: rel.targetMode,
        });
      }
    }

    // 5) 把解析期警告灌进 diagnostics
    for (const warning of parsed.warnings) {
      this.diagnosticsRecorder.warn(warning);
    }
  }

  /**
   * 暴露父类的 protected `insertPart`，供本类构造期灌注。
   *
   * 用 thin wrapper 而不是直接 call `this.insertPart`，是为了把 TypeScript
   * `protected` 边界守在构造期内、不外泄到运行时。
   */
  private insertPartInternal(uri: Parameters<typeof this.insertPart>[0], contentType: string) {
    return this.insertPart(uri, contentType);
  }

  /** 序列化当前状态为 ZIP 字节流。 */
  async saveAsBytesAsync(): Promise<Uint8Array> {
    if (this.accessMode === "read") {
      throw new OpenXmlPackageError({
        code: "UNSUPPORTED_OPERATION",
        message: "saveAsBytesAsync is not allowed on a read-only package",
      });
    }
    return packageToZipBytes(this);
  }

  /**
   * 序列化为浏览器可直接下载的 Blob（三端兼容）。
   *
   * MIME type 自动从主文档 Part 的 content-type 推断。如果推断失败，
   * 回退到通用的 OPC 包 MIME。Node 18+ 也原生支持 Blob。
   *
   * @example
   * const blob = await doc.toBlob();
   * const url = URL.createObjectURL(blob);
   * const a = document.createElement("a");
   * a.href = url; a.download = "out.docx"; a.click();
   * URL.revokeObjectURL(url);
   */
  async toBlob(): Promise<Blob> {
    const bytes = await this.saveAsBytesAsync();
    // Try to detect MIME from the main document part
    let mime = "application/vnd.openxmlformats-officedocument";
    for (const part of this.parts()) {
      const ct = part.contentType;
      if (ct.includes("wordprocessingml")) {
        mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
        break;
      }
      if (ct.includes("spreadsheetml")) {
        mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml";
        break;
      }
      if (ct.includes("presentationml")) {
        mime = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
        break;
      }
    }
    return new Blob([bytes], { type: mime });
  }

  /** 写到原 open 路径；若 open 时不是路径则抛 UNSUPPORTED_OPERATION。 */
  override async saveAsync(): Promise<void> {
    if (this.originPath === undefined) {
      throw new OpenXmlPackageError({
        code: "UNSUPPORTED_OPERATION",
        message:
          "saveAsync requires a path-based source. Use saveAsAsync(path) or saveAsBytesAsync().",
      });
    }
    const bytes = await this.saveAsBytesAsync();
    await writeFilePath(this.originPath, bytes);
  }

  /** 写到指定路径，并把后续 saveAsync 的默认目标更新为该路径。 */
  async saveAsAsync(targetPath: string): Promise<void> {
    if (targetPath.length === 0) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: "saveAsAsync requires a non-empty target path",
      });
    }
    const bytes = await this.saveAsBytesAsync();
    await writeFilePath(targetPath, bytes);
    this.originPath = targetPath;
  }
}
