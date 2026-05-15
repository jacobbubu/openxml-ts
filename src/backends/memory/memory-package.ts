import { DisposalGuard } from "../../packaging/core/disposable.js";
import { OpenXmlPackage } from "../../packaging/core/open-xml-package.js";
import { assertPartUri } from "../../packaging/core/part-uri.js";
import { RelationshipCollection } from "../../packaging/core/relationship-collection.js";
import { OpenXmlPackageError } from "../../packaging/errors.js";
import type { AccessMode, CompressionLevel, PartUri } from "../../packaging/interfaces/types.js";
import { MemoryPackagePart } from "./memory-package-part.js";
import { MemoryPackageProperties } from "./memory-package-properties.js";

export interface MemoryPackageOptions {
  /** 访问模式，默认 `"readWrite"`。 */
  readonly accessMode?: AccessMode;
}

/**
 * 内存 backend 的 `OpenXmlPackage` 具体实现。
 *
 * 当前 Story（1.2）范围：
 * - 完整的 Part CRUD；
 * - 关系（包级 + Part 级）；
 * - Properties；
 * - 资源生命周期（dispose 幂等）。
 *
 * 不在范围内（留给后续 Story）：
 * - Content-Types 实际 XML 解析（Story-1.3）；
 * - ZIP 字节流读写（Story-1.5/1.6）；
 * - Flat OPC 互转（Story-1.7）。
 */
export class MemoryOpenXmlPackage extends OpenXmlPackage {
  override readonly accessMode: AccessMode;
  override readonly properties: MemoryPackageProperties;
  override readonly relationships: RelationshipCollection;

  private readonly parts_ = new Map<PartUri, MemoryPackagePart>();
  private readonly guard = new DisposalGuard();

  constructor(options: MemoryPackageOptions = {}) {
    super();
    this.accessMode = options.accessMode ?? "readWrite";
    this.properties = new MemoryPackageProperties();
    this.relationships = new RelationshipCollection("/");
  }

  override parts(): Iterable<MemoryPackagePart> {
    this.guard.ensureOpen("Iterating parts");
    return this.parts_.values();
  }

  override hasPart(uri: PartUri): boolean {
    this.guard.ensureOpen("hasPart");
    return this.parts_.has(uri);
  }

  override getPart(uri: PartUri): MemoryPackagePart {
    this.guard.ensureOpen("getPart");
    const part = this.parts_.get(uri);
    if (part === undefined) {
      throw new OpenXmlPackageError({ code: "PART_NOT_FOUND", partUri: uri });
    }
    return part;
  }

  override createPart(
    uri: PartUri,
    contentType: string,
    compression: CompressionLevel = "normal",
  ): MemoryPackagePart {
    this.guard.ensureOpen("createPart");
    this.assertWritable("createPart");
    const validated = assertPartUri(uri);
    if (this.parts_.has(validated)) {
      throw new OpenXmlPackageError({
        code: "PART_ALREADY_EXISTS",
        partUri: validated,
      });
    }
    if (contentType.length === 0) {
      throw new OpenXmlPackageError({
        code: "CONTENT_TYPE_MISSING",
        partUri: validated,
        message: "createPart requires a non-empty contentType",
      });
    }
    const part = new MemoryPackagePart(this, validated, contentType, compression);
    this.parts_.set(validated, part);
    return part;
  }

  override deletePart(uri: PartUri): void {
    this.guard.ensureOpen("deletePart");
    this.assertWritable("deletePart");
    if (!this.parts_.has(uri)) return; // .NET 同款：不存在静默返回
    this.parts_.delete(uri);
    // 级联清掉包级 + 所有 Part 级关系中指向该 Part 的内部关系
    this.relationships.removeInternalTargetsOf(uri);
    for (const other of this.parts_.values()) {
      other.relationships.removeInternalTargetsOf(uri);
    }
  }

  override async saveAsync(): Promise<void> {
    this.guard.ensureOpen("saveAsync");
    this.assertWritable("saveAsync");
    // 内存 backend：no-op（所有 mutation 立即生效）。
  }

  override async dispose(): Promise<void> {
    if (!this.guard.markDisposed()) return;
    // 内存 backend 没有外部句柄需要释放；这里只清空状态以便 GC 友好。
    this.parts_.clear();
  }

  override [Symbol.dispose](): void {
    if (!this.guard.markDisposed()) return;
    this.parts_.clear();
  }

  override [Symbol.asyncDispose](): Promise<void> {
    return this.dispose();
  }

  private assertWritable(op: string): void {
    if (this.accessMode === "read") {
      throw new OpenXmlPackageError({
        code: "UNSUPPORTED_OPERATION",
        message: `${op} is not allowed on a read-only package`,
      });
    }
  }
}
