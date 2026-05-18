/**
 * Story-16.1：Word 书签 markup 助手。
 *
 * 一对 `<w:bookmarkStart w:id="N" w:name="..."/>` + `<w:bookmarkEnd w:id="N"/>` 通常
 * 跨同一段落环绕一段 Run，让 hyperlink 的 `w:anchor="..."` 内链能精确定位到这段
 * 文字。两者用 `w:id` 配对，全文档唯一。`name` 长度 ≤ 40 chars（OOXML `xsd:ID`）。
 *
 * 调用方决定 start / end 挂在哪——通常都在同段落内，但也可以跨段（用以划出
 * 「一整节」作为一个书签）。
 *
 * id 配 \`WordprocessingDocument.nextBookmarkId()\` 全文档唯一自增。
 */

import { StringValue } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import { BookmarkEnd } from "./generated/bookmark-end.js";
import { BookmarkStart } from "./generated/bookmark-start.js";

const MAX_BOOKMARK_NAME_LENGTH = 40;

/**
 * 构造一对配对好 \`w:id\` 的 \`<w:bookmarkStart>\` / \`<w:bookmarkEnd>\`。
 *
 * @param name 书签名——hyperlink 内链 \`w:anchor\` 引用的就是这个名字。最长 40 chars。
 * @param id   全文档唯一的 \`w:id\`；省略时**调用方负责**自行分配（推荐走
 *   \`WordprocessingDocument.nextBookmarkId()\`）。
 * @throws OpenXmlPackageError 当 \`name\` 为空或超过 40 字符（code="BACKEND_ERROR"）
 */
export function createBookmarkPair(
  name: string,
  id = 0,
): { start: BookmarkStart; end: BookmarkEnd } {
  if (name.length === 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "createBookmarkPair: name must not be empty",
    });
  }
  if (name.length > MAX_BOOKMARK_NAME_LENGTH) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createBookmarkPair: name "${name}" exceeds ${MAX_BOOKMARK_NAME_LENGTH} chars`,
    });
  }
  const idStr = String(id);
  const start = new BookmarkStart();
  start.id = StringValue.parse(idStr);
  start.name = StringValue.parse(name);
  const end = new BookmarkEnd();
  // BookmarkEnd 的 codegen 没出 typed \`id\` 字段，走 extendedAttributes
  end.extendedAttributes.set("w:id", idStr);
  return { start, end };
}
