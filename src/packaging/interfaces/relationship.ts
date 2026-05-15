import type { PartUri, TargetMode } from "./types.js";

/**
 * 单条 OPC Relationship。
 *
 * Relationship 在 `_rels/<part>.rels` 或包级 `/_rels/.rels` 内被序列化为
 * `<Relationship Id="rId1" Type="..." Target="..." TargetMode="External"/>`。
 *
 * @see DocumentFormat.OpenXml.Packaging.IPackageRelationship
 */
export interface IPackageRelationship {
  /** 唯一 id（包级或 Part 级内唯一）。.NET 默认按 `rId1`、`rId2` 递增。 */
  readonly id: string;

  /** Relationship type 命名空间 URI。例如 word document 主关系是 `http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument`。 */
  readonly type: string;

  /** 关系归属的源——拥有此关系的 Part URI，或包根 `/`。 */
  readonly sourceUri: PartUri | "/";

  /** 目标的解释方式：包内 Part 或外部 URI。 */
  readonly targetMode: TargetMode;

  /**
   * 目标 URI 字符串。
   *
   * - 当 {@link targetMode} === `"internal"`：必须能解析为合法 {@link PartUri}（相对路径会按 OPC §9.3 解算为绝对 PartUri）。
   * - 当 {@link targetMode} === `"external"`：任意 URI 字符串。
   */
  readonly target: string;
}

/**
 * 创建一条新关系时的入参；id 省略则由实现按 .NET 同算法生成。
 */
export interface CreateRelationshipInput {
  readonly type: string;
  readonly target: string;
  readonly targetMode: TargetMode;
  readonly id?: string;
}

/**
 * 一个 Part（或包根）下的关系集合。
 *
 * 迭代顺序：与底层 `.rels` 文件中的出现顺序一致；新增的关系追加到末尾。
 *
 * @see DocumentFormat.OpenXml.Packaging.IRelationshipCollection
 */
export interface IRelationshipCollection extends Iterable<IPackageRelationship> {
  /** 当前集合包含的关系数量。 */
  readonly count: number;

  /** 是否存在指定 id 的关系。 */
  has(id: string): boolean;

  /**
   * 按 id 获取关系；不存在时抛 `OpenXmlPackageError({ code: "PART_NOT_FOUND" })`。
   * 实现端可以视情况换成 `RELATIONSHIP_ID_CONFLICT` 等更精确的 code，
   * 但本接口语义只保证「找不到就抛」。
   */
  get(id: string): IPackageRelationship;

  /**
   * 新建关系。id 若给出且已存在则抛 `RELATIONSHIP_ID_CONFLICT`；
   * 未给出则按确定性算法生成不冲突 id。
   */
  create(input: CreateRelationshipInput): IPackageRelationship;

  /** 按 id 删除。不存在时静默返回（同 .NET）。 */
  remove(id: string): void;
}
