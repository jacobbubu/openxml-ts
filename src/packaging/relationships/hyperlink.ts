/**
 * Hyperlink Relationship 的便捷构造。
 *
 * Office 文档中绝大多数外部链接都用这一个 type，单独包一层降低误用概率。
 */

import { OpenXmlPackageError } from "../errors.js";
import type { CreateRelationshipInput } from "../interfaces/relationship.js";

export const HYPERLINK_RELATIONSHIP_TYPE =
  "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink";

export interface CreateHyperlinkInput {
  readonly target: string;
  readonly id?: string;
}

/**
 * 构造一条 hyperlink relationship 的 input 对象。
 * 调用方继续传给 `RelationshipCollection.create(...)` 即可。
 *
 * 注意：URI 形态最低限度的校验：不能为空、不能仅空白。具体协议白名单留给上层应用。
 */
export function createHyperlinkInput(input: CreateHyperlinkInput): CreateRelationshipInput {
  if (input.target.trim().length === 0) {
    throw new OpenXmlPackageError({
      code: "RELATIONSHIP_TARGET_INVALID",
      message: "Hyperlink target must not be empty or whitespace",
    });
  }
  return {
    type: HYPERLINK_RELATIONSHIP_TYPE,
    target: input.target,
    targetMode: "external",
    ...(input.id !== undefined ? { id: input.id } : {}),
  };
}
