import { OpenXmlPackageError } from "../errors.js";
import type {
  CreateRelationshipInput,
  IPackageRelationship,
  IRelationshipCollection,
} from "../interfaces/relationship.js";
import type { PartUri } from "../interfaces/types.js";

/**
 * 与 backend 无关的关系集合实现。Memory / Zip / Flat 三个 backend 都直接复用本类。
 *
 * - 内部使用 `Map<id, IPackageRelationship>` 保插入顺序；
 * - rId 生成：从 `rId1` 起递增，跳过任何已占用的 id（与 .NET PackageRelationship
 *   的实际可观察行为一致，精确算法在 Story-1.4 还会被对照测试校准）。
 */
export class RelationshipCollection implements IRelationshipCollection {
  private readonly relationships = new Map<string, IPackageRelationship>();
  private readonly sourceUri: PartUri | "/";
  private nextIdHint = 1;

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
    return rel;
  }

  remove(id: string): void {
    this.relationships.delete(id);
  }

  /**
   * 由 backend 在做级联清理时调用（外部 Part 被删除 → 删掉所有指向它的内部关系）。
   * 不暴露到公共接口。
   */
  removeInternalTargetsOf(partUri: PartUri): void {
    for (const [id, rel] of this.relationships) {
      if (rel.targetMode === "internal" && rel.target === partUri) {
        this.relationships.delete(id);
      }
    }
  }

  [Symbol.iterator](): IterableIterator<IPackageRelationship> {
    return this.relationships.values();
  }

  private generateUniqueId(): string {
    // 找最小未占用 N，使生成的 id 在「插入新条目即数 N」语义下保持紧凑递增。
    let n = this.nextIdHint;
    let candidate = `rId${n}`;
    while (this.relationships.has(candidate)) {
      n += 1;
      candidate = `rId${n}`;
    }
    this.nextIdHint = n + 1;
    return candidate;
  }
}
