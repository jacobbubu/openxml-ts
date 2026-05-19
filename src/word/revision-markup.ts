/**
 * Story-19.1：Word 修订追踪 markup 助手。
 *
 * 把「插入」/「删除」标记封到一行：
 *
 * - **插入**：\`<w:ins w:id="N" w:author=... w:date=...><w:r><w:t>text</w:t></w:r></w:ins>\`
 * - **删除**：\`<w:del w:id="N" w:author=... w:date=...><w:r><w:delText>text</w:delText></w:r></w:del>\`
 *   注意删除的文本必须用 \`<w:delText>\` 替代 \`<w:t>\`（Word 据此渲染为带删除线）。
 *
 * id 全文档唯一——配合 \`WordprocessingDocument.nextRevisionId()\` 自增分配。
 */

import { OpenXmlPackageError } from "../packaging/errors.js";
import { DeletedRun } from "./generated/deleted-run.js";
import { DeletedText } from "./generated/deleted-text.js";
import { InsertedRun } from "./generated/inserted-run.js";
import { Run } from "./generated/run.js";
import { Text } from "./generated/text.js";

export interface RevisionOptions {
  /** 修订作者，非空。 */
  readonly author: string;
  /** 全文档唯一 \`w:id\`；省略默认 0（建议走 \`WordprocessingDocument.nextRevisionId()\`）。 */
  readonly id?: number;
  /** ISO 时间戳或 Date 对象；省略时取 \`new Date().toISOString()\`。 */
  readonly date?: Date | string;
  /** 修订的文本内容。 */
  readonly text: string;
}

/**
 * 构造一个 \`<w:ins>\` 包一个 Run + \`<w:t>\` 的插入标记。
 *
 * @throws OpenXmlPackageError 当 author 为空（code="BACKEND_ERROR"）
 */
export function createInsertedRun(opts: RevisionOptions): InsertedRun {
  validateRevision(opts);
  const ins = new InsertedRun();
  applyRevisionAttrs(ins, opts);
  const r = new Run();
  const t = new Text();
  t.text = opts.text;
  if (needsXmlSpacePreserve(opts.text)) t.extendedAttributes.set("xml:space", "preserve");
  r.appendChild(t);
  ins.appendChild(r);
  return ins;
}

/**
 * 构造一个 \`<w:del>\` 包一个 Run + \`<w:delText>\` 的删除标记。
 *
 * @throws OpenXmlPackageError 当 author 为空（code="BACKEND_ERROR"）
 */
export function createDeletedRun(opts: RevisionOptions): DeletedRun {
  validateRevision(opts);
  const del = new DeletedRun();
  applyRevisionAttrs(del, opts);
  const r = new Run();
  const dt = new DeletedText();
  dt.text = opts.text;
  if (needsXmlSpacePreserve(opts.text)) dt.extendedAttributes.set("xml:space", "preserve");
  r.appendChild(dt);
  del.appendChild(r);
  return del;
}

function validateRevision(opts: RevisionOptions): void {
  if (opts.author.trim().length === 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "createInsertedRun/createDeletedRun: author must not be empty or whitespace",
    });
  }
}

function applyRevisionAttrs(el: InsertedRun | DeletedRun, opts: RevisionOptions): void {
  const id = opts.id ?? 0;
  el.extendedAttributes.set("w:id", String(id));
  el.extendedAttributes.set("w:author", opts.author);
  const dateStr =
    opts.date instanceof Date
      ? opts.date.toISOString()
      : opts.date !== undefined
        ? opts.date
        : new Date().toISOString();
  el.extendedAttributes.set("w:date", dateStr);
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
