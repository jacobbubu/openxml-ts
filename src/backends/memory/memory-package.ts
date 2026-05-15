import { ContentTypeManifest } from "../../packaging/content-types/index.js";
import { DisposalGuard } from "../../packaging/core/disposable.js";
import { OpenXmlPackage } from "../../packaging/core/open-xml-package.js";
import { assertPartUri } from "../../packaging/core/part-uri.js";
import { RelationshipCollection } from "../../packaging/core/relationship-collection.js";
import { debug } from "../../packaging/debug.js";
import { DiagnosticsRecorder, type PackageDiagnostics } from "../../packaging/diagnostics.js";
import { OpenXmlPackageError } from "../../packaging/errors.js";
import {
  type FlatOpcWriteOptions,
  packageToFlatOpc,
} from "../../packaging/flat-opc/flat-opc-writer.js";
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
  /**
   * 包的 ContentTypes 视图。createPart 自动把 contentType 注册为 Override；
   * deletePart 自动反向清除。Default 条目只能通过 openAsync（Story-1.5）从已有
   * ZIP 中读出，或者上层应用显式 `pkg.contentTypes.addDefault(...)`。
   */
  readonly contentTypes: ContentTypeManifest;

  /** ZIP 后端在初始化时记录原始 Part 顺序，用于 saveAsAsync 维持字节级稳定。 */
  protected readonly partOrder: PartUri[] = [];

  /** Backend 子类可以通过 protected 入口记录 warning（孤立 .rels 等）。 */
  protected readonly diagnosticsRecorder = new DiagnosticsRecorder();

  private readonly parts_ = new Map<PartUri, MemoryPackagePart>();
  private readonly guard = new DisposalGuard();

  constructor(options: MemoryPackageOptions = {}) {
    super();
    this.accessMode = options.accessMode ?? "readWrite";
    this.properties = new MemoryPackageProperties();
    this.relationships = new RelationshipCollection("/");
    this.contentTypes = new ContentTypeManifest();
  }

  /** 只读的诊断视图（PRD §NFR-5.1）。每次调用计算一次，避免与 mutation 不同步。 */
  get diagnostics(): PackageDiagnostics {
    return this.diagnosticsRecorder.snapshot(this);
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
    return this.insertPart(uri, contentType, compression);
  }

  /**
   * 内部插入路径——不做 accessMode 校验，供 backend 子类在 open 阶段从磁盘灌注 Part。
   * 公共调用方请用 {@link createPart}。
   */
  protected insertPart(
    uri: PartUri,
    contentType: string,
    compression: CompressionLevel = "normal",
    initialContent?: Uint8Array,
  ): MemoryPackagePart {
    this.guard.ensureOpen("insertPart");
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
        message: "insertPart requires a non-empty contentType",
      });
    }
    const part = new MemoryPackagePart(this, validated, contentType, compression, initialContent);
    this.parts_.set(validated, part);
    this.partOrder.push(validated);
    debug("memory", `insertPart ${validated} (${contentType})`);
    // 没有适配的 Default 时挂 Override；已存在 Override 则透传不重复添加
    if (
      !this.contentTypes.hasOverride(validated) &&
      this.contentTypes.resolveContentType(validated) !== contentType
    ) {
      this.contentTypes.addOverride(validated, contentType);
    }
    return part;
  }

  override deletePart(uri: PartUri): void {
    this.guard.ensureOpen("deletePart");
    this.assertWritable("deletePart");
    if (!this.parts_.has(uri)) return; // .NET 同款：不存在静默返回
    this.parts_.delete(uri);
    const orderIdx = this.partOrder.indexOf(uri);
    if (orderIdx !== -1) this.partOrder.splice(orderIdx, 1);
    this.contentTypes.removeOverride(uri);
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

  /**
   * 序列化为 Flat OPC（单文件 XML 容器）。等价于 .NET 的
   * `OpenXmlPackage.ToFlatOpcDocument()`。
   */
  toFlatOpc(options?: FlatOpcWriteOptions): string {
    return packageToFlatOpc(this, options);
  }

  /**
   * 返回 Part URI 在 ZIP / Flat OPC 中应当出现的顺序（open 时记录的原序 + 之后
   * createPart 的追加序）。提供给 backend writer 做字节级稳定输出，不应被外部 mutate。
   */
  partOrderSnapshot(): readonly PartUri[] {
    return this.partOrder.slice();
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
