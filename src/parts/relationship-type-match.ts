/**
 * Relationship type 匹配——Epic-8 Strict ↔ Transitional 兼容。
 *
 * `IPackageRelationship.type` 字面字符串。同一关系（如 officeDocument）在
 * Transitional 与 Strict 下 URI 不同（`/2006/relationships/...` 与
 * `/relationships/...`）。本 helper 让 typed Part 查找时两种 URI 都命中。
 *
 * **未来形态**：如果 Strict 文件多了，可以在打开包时把 relationships 字面
 * 规范化到 Transitional，省去运行时双查。目前直接走双查。
 */

import { strictToTransitional, transitionalToStrict } from "../element/strict-namespace-map.js";

/** 两个 relationship type URI 是否等价（含 Strict ↔ Transitional 互译）。 */
export function relationshipTypeMatches(actual: string, expected: string): boolean {
  if (actual === expected) return true;
  if (strictToTransitional(actual) === expected) return true;
  if (transitionalToStrict(actual) === expected) return true;
  return false;
}
