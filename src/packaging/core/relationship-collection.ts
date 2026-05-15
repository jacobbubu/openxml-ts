import { OpenXmlPackageError } from "../errors.js";
import type {
  CreateRelationshipInput,
  IPackageRelationship,
  IRelationshipCollection,
} from "../interfaces/relationship.js";
import type { PartUri } from "../interfaces/types.js";
import {
  parseRelationshipsXml,
  serializeRelationshipsXml,
} from "../relationships/relationships-xml.js";

/**
 * 与 backend 无关的关系集合实现。Memory / Zip / Flat 三个 backend 都直接复用本类。
 *
 * - 内部使用 `Map<id, IPackageRelationship>` 保插入顺序；
 * - rId 生成：以一个单调递增计数器维护，规则为 `next = max(existing rIdN) + 1`，与
 *   .NET `System.IO.Packaging.PackageRelationship` 可观察行为一致——不回填 gap、
 *   序列化顺序与生成顺序一致（Story-1.4 校准）。
 */
export class RelationshipCollection implements IRelationshipCollection {
  private readonly relationships = new Map<string, IPackageRelationship>();
  private readonly sourceUri: PartUri | "/";
  /** 下一个自动生成的 rId 编号，单调递增；不回填 gap。 */
  private nextIdCounter = 1;

  constructor(sourceUri: PartUri | "/") {
    this.sourceUri = sourceUri;
  }

  get count(): number {
    return this.relationships.size;
  }

  has(id: string): boolean {
    return this.relationships.has(id);
  }

  get(id: string): IPackageRelationship {
    const r = this.relationships.get(id);
    if (r === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        relationshipId: id,
        message: `Relationship "${id}" not found on ${this.sourceUri}`,
      });
    }
    return r;
  }

  create(input: CreateRelationshipInput): IPackageRelationship {
    const id = input.id ?? this.generateUniqueId();
    if (this.relationships.has(id)) {
      throw new OpenXmlPackageError({
        code: "RELATIONSHIP_ID_CONFLICT",
        relationshipId: id,
      });
    }
    if (input.targetMode === "internal" && input.target.length === 0) {
      throw new OpenXmlPackageError({
        code: "RELATIONSHIP_TARGET_INVALID",
        relationshipId: id,
        message: "Internal relationship target must not be empty",
      });
    }
    const rel: IPackageRelationship = {
      id,
      type: input.type,
      sourceUri: this.sourceUri,
      target: input.target,
      targetMode: input.targetMode,
    };
    this.relationships.set(id, rel);
    this.bumpCounterPast(id);
    return rel;
  }

  remove(id: string): void {
    this.relationships.delete(id);
  }

  /** 序列化为标准 `_rels/*.rels` XML。 */
  serializeXml(): string {
    return serializeRelationshipsXml(this);
  }

  /**
   * 从 `.rels` 文本恢复成集合。`sourceUri` 由调用方决定（包级用 `"/"`，Part 级用 PartUri）。
   * 顺序保留；rId 计数器自动 bump 到 max+1。
   */
  static fromXml(sourceUri: PartUri | "/", xml: string): RelationshipCollection {
    const collection = new RelationshipCollection(sourceUri);
    for (const parsed of parseRelationshipsXml(xml)) {
      collection.create({
        id: parsed.id,
        type: parsed.type,
        target: parsed.target,
        targetMode: parsed.targetMode,
      });
    }
    return collection;
  }

  /**
   * 由 backend 在做级联清理时调用（外部 Part 被删除 → 删掉所有指向它的内部关系）。
   * 不暴露到公共接口。
   *
   * 匹配规则：因为 OPC 内部关系 target 既可能是绝对（`/word/document.xml`）也可能是
   * 相对包根（`word/document.xml`），这里两种形式都视作命中。
   */
  removeInternalTargetsOf(partUri: PartUri): void {
    const stripped = partUri.startsWith("/") ? partUri.slice(1) : partUri;
    for (const [id, rel] of this.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (rel.target === partUri || rel.target === stripped) {
        this.relationships.delete(id);
      }
    }
  }

  [Symbol.iterator](): IterableIterator<IPackageRelationship> {
    return this.relationships.values();
  }

  private generateUniqueId(): string {
    // .NET PackageRelationship: 持有内部计数器，自动 id 永远 > max(existing)，不回填 gap。
    while (this.relationships.has(`rId${this.nextIdCounter}`)) {
      this.nextIdCounter += 1;
    }
    const id = `rId${this.nextIdCounter}`;
    this.nextIdCounter += 1;
    return id;
  }

  /** 若 `id` 形如 `rIdN`，把计数器抬到 max(N+1, current)——保证后续自动 id 不撞 gap。 */
  private bumpCounterPast(id: string): void {
    if (!id.startsWith("rId")) return;
    const numPart = id.slice(3);
    if (!/^[1-9]\d*$/.test(numPart)) return;
    const n = Number.parseInt(numPart, 10);
    if (n >= this.nextIdCounter) {
      this.nextIdCounter = n + 1;
    }
  }
}
