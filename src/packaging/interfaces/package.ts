import type { IPackagePart } from "./part.js";
import type { IPackageProperties } from "./properties.js";
import type { IRelationshipCollection } from "./relationship.js";
import type { AccessMode, CompressionLevel, PartUri } from "./types.js";

/**
 * OPC 包根抽象。所有文档族（Word / Excel / PPT）在 Epic-2+ 都以 `IPackage` 为容器。
 *
 * 对位 .NET 的 `IPackage` / `OpenXmlPackage`。本接口只规定**结构**与**生命周期**，
 * 具体后端（Memory / Zip / FlatOpc）由其它 Story 实现。
 *
 * @see DocumentFormat.OpenXml.Packaging.IPackage
 * @see DocumentFormat.OpenXml.Packaging.OpenXmlPackage
 */
export interface IPackage extends Disposable, AsyncDisposable {
  /** 访问模式。只读包写操作会抛 `UNSUPPORTED_OPERATION`。 */
  readonly accessMode: AccessMode;

  /** 核心属性视图（`docProps/core.xml`）。可读可写；mutate 后 `saveAsync` 持久化。 */
  readonly properties: IPackageProperties;

  /** 包级关系（`/_rels/.rels`）。 */
  readonly relationships: IRelationshipCollection;

  /**
   * 枚举所有 Part。顺序与 ZIP 中出现顺序一致；新加 Part 追加到末尾。
   *
   * 返回值是同步可迭代——OPC 元信息在 open 阶段加载完成，遍历不涉及 I/O。
   */
  parts(): Iterable<IPackagePart>;

  /**
   * 按 URI 查找 Part。
   *
   * - 命中返回 Part；
   * - 未命中抛 `OpenXmlPackageError({ code: "PART_NOT_FOUND", partUri })`。
   */
  getPart(uri: PartUri): IPackagePart;

  /** Part 是否存在。 */
  hasPart(uri: PartUri): boolean;

  /**
   * 新建 Part。若同 URI 已存在抛 `PART_ALREADY_EXISTS`。
   *
   * Content-Types 表会被实现端自动维护：先看 Override，再看 Default（按扩展名），
   * 都没有时按入参 `contentType` 注册为 Override。
   */
  createPart(uri: PartUri, contentType: string, compression?: CompressionLevel): IPackagePart;

  /**
   * 删除 Part。删除会级联清除指向该 Part 的所有 Relationship（包级 + 所有 Part 级）；
   * Content-Types 中孤立 Default 默认保留。
   *
   * 不存在时静默返回（与 .NET 行为一致）。
   */
  deletePart(uri: PartUri): void;

  /**
   * 把内存中的修改刷回 backend。
   *
   * - Memory backend 的 saveAsync 是 no-op；
   * - Zip backend 重写整个 ZIP；
   * - FlatOpc backend 重写整个 XML。
   *
   * 只读包（accessMode === "read"）调用 saveAsync 抛 `UNSUPPORTED_OPERATION`。
   */
  saveAsync(): Promise<void>;

  /**
   * 显式异步关闭——释放 backend 资源；如 `autoSave` 开启则先 `saveAsync`。
   *
   * `await using` 语法编译后等价于自动调用本方法。
   */
  dispose(): Promise<void>;

  /** ES2023 explicit-resource-management 同步钩子。 */
  [Symbol.dispose](): void;

  /** ES2023 explicit-resource-management 异步钩子。 */
  [Symbol.asyncDispose](): Promise<void>;
}
