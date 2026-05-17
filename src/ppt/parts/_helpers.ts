/**
 * ppt typed Parts 内部共用：从 part-level 关系表里解析单个 / 多个 typed Part 实例。
 *
 * `resolveSinglePart`：单个目标（如 SlidePart.slideLayoutPart）；命中第一条匹配
 * type 的关系即返回，没命中返回 undefined。
 * `resolveManyParts`：多目标（如 SlideMasterPart.slideLayoutParts）；按关系遍历
 * 顺序返回数组。
 *
 * 两个 helper 都不缓存——缓存语义由各 typed Part 持有（lazy + 同实例返回）。
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";

export interface PartCtor<T> {
  new (part: IPackagePart, registry: ElementRegistry, pkg: IPackage): T;
  readonly relationshipType: string;
}

export interface SimplePartCtor<T> {
  new (part: IPackagePart, registry: ElementRegistry): T;
  readonly relationshipType: string;
}

export function resolveSinglePart<T>(
  source: IPackagePart,
  pkg: IPackage,
  registry: ElementRegistry,
  Ctor: PartCtor<T> | SimplePartCtor<T>,
): T | undefined {
  for (const rel of source.relationships) {
    if (rel.type !== Ctor.relationshipType || rel.targetMode !== "internal") continue;
    const targetUri = resolveRelativePartUri(source.uri, rel.target);
    if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
    return constructPart(Ctor, pkg.getPart(targetUri), registry, pkg);
  }
  return undefined;
}

export function resolveManyParts<T>(
  source: IPackagePart,
  pkg: IPackage,
  registry: ElementRegistry,
  Ctor: PartCtor<T> | SimplePartCtor<T>,
): T[] {
  const out: T[] = [];
  for (const rel of source.relationships) {
    if (rel.type !== Ctor.relationshipType || rel.targetMode !== "internal") continue;
    const targetUri = resolveRelativePartUri(source.uri, rel.target);
    if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
    out.push(constructPart(Ctor, pkg.getPart(targetUri), registry, pkg));
  }
  return out;
}

function constructPart<T>(
  Ctor: PartCtor<T> | SimplePartCtor<T>,
  part: IPackagePart,
  registry: ElementRegistry,
  pkg: IPackage,
): T {
  // 3-arg ctor 接受 pkg；2-arg 忽略它。运行期长度区分（不影响类型）。
  if (Ctor.length >= 3) {
    return new (Ctor as PartCtor<T>)(part, registry, pkg);
  }
  return new (Ctor as SimplePartCtor<T>)(part, registry);
}
