/**
 * Epic-64：Word 脚注 helper。
 *
 * `addFootnote(doc, opts)` 一行完成：
 *   1. 找 / 创 FootnotesPart（首次自动填充 separator / continuationSeparator 特殊脚注）；
 *   2. 分配 id（max + 1，从 1 起；或使用调用方显式传入的 id）；
 *   3. 向 FootnotesPart 追加 `<w:footnote w:id="N" w:type="normal">` 条目；
 *   4. 返回一个包含 `<w:footnoteReference w:id="N"/>` 的 Run——调用方把 Run append
 *      到目标 Paragraph 里即可。
 *
 * `getFootnoteText(doc, id)` 读取指定 id 的脚注纯文本。
 */

import { StringValue } from "../element/index.js";
import { FootnoteReferenceMark } from "./generated/footnote-reference-mark.js";
import { FootnoteReference } from "./generated/footnote-reference.js";
import { Footnote } from "./generated/footnote.js";
import { Paragraph } from "./generated/paragraph.js";
import { RunProperties } from "./generated/run-properties.js";
import { RunStyle } from "./generated/run-style.js";
import { Run } from "./generated/run.js";
import { Text } from "./generated/text.js";
import type { FootnotesPart } from "./parts/footnotes-part.js";
import type { WordprocessingDocument } from "./word-document.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

/** `addFootnote` 入参。 */
export interface FootnoteOptions {
  /** 脚注正文（纯文本）。 */
  readonly text: string;
  /**
   * 显式指定脚注 id。不传则自动分配（当前最大 id + 1，最小为 1）。
   * 通常不需要手动指定——自动分配可保证唯一性。
   */
  readonly id?: number;
}

/** `addFootnote` 返回值。 */
export interface AddFootnoteResult {
  /** 含 `<w:footnoteReference>` 的 Run——调用方 `paragraph.appendChild(reference)` 即可。 */
  readonly reference: Run;
  /** 已分配的脚注 id。 */
  readonly footnoteId: number;
}

/**
 * 向文档追加一条脚注，返回内联引用 Run。
 *
 * @throws {OpenXmlPackageError} 当 mainDocumentPart 缺失（code="PART_NOT_FOUND"）
 */
export function addFootnote(doc: WordprocessingDocument, opts: FootnoteOptions): AddFootnoteResult {
  // 1) 找 / 创 FootnotesPart（包含 bootstrap separator 逻辑）
  const fp = getOrCreateBootstrappedFootnotesPart(doc);

  // 2) 分配 id
  const footnoteId = opts.id !== undefined ? opts.id : nextFootnoteId(fp);

  // 3) 追加 <w:footnote w:id="N" w:type="normal">
  const footnoteEl = buildFootnoteElement(footnoteId, opts.text);
  fp.footnotes.appendChild(footnoteEl);

  // 4) 构建内联 Run（含 FootnoteReference + 上标样式）
  const reference = buildReferenceRun(footnoteId);

  return { reference, footnoteId };
}

/**
 * 读取指定 id 脚注的纯文本（拼接所有 Text 子孙的 text）。
 * 找不到时返 undefined。
 */
export function getFootnoteText(doc: WordprocessingDocument, id: number): string | undefined {
  const fp = doc.footnotesPart;
  if (fp === undefined) return undefined;

  for (const fn of fp.footnotes.descendants(Footnote)) {
    const fnId = fn.id?.toString();
    if (fnId === undefined) continue;
    if (Number.parseInt(fnId, 10) !== id) continue;
    let text = "";
    for (const t of fn.descendants(Text)) {
      text += t.text ?? "";
    }
    return text;
  }
  return undefined;
}

// ─── 内部辅助 ─────────────────────────────────────────────────────────────────

/**
 * 找 / 创 FootnotesPart，首次创建时填充 separator / continuationSeparator 特殊脚注。
 */
function getOrCreateBootstrappedFootnotesPart(doc: WordprocessingDocument): FootnotesPart {
  const existing = doc.footnotesPart;
  if (existing !== undefined) return existing;

  // getOrCreateFootnotesPart 负责 createPart + 主文档关系 + typedParts 缓存
  const fp = doc.getOrCreateFootnotesPart();

  // 注入 xmlns:w（FootnotesPlaceholder 已注入，此处保险起见再确认）
  fp.footnotes.extendedAttributes.set("xmlns:w", WPNS);

  // 预置 separator（id=-1）
  const sep = new Footnote();
  sep.type = StringValue.parse("separator");
  sep.id = StringValue.parse("-1");
  const sepPara = new Paragraph();
  const sepRun = new Run();
  sepRun.appendChild(new FootnoteReferenceMark());
  sepPara.appendChild(sepRun);
  sep.appendChild(sepPara);
  fp.footnotes.appendChild(sep);

  // 预置 continuationSeparator（id=0）
  const contSep = new Footnote();
  contSep.type = StringValue.parse("continuationSeparator");
  contSep.id = StringValue.parse("0");
  const contPara = new Paragraph();
  const contRun = new Run();
  contRun.appendChild(new FootnoteReferenceMark());
  contPara.appendChild(contRun);
  contSep.appendChild(contPara);
  fp.footnotes.appendChild(contSep);

  return fp;
}

/** 计算下一个用户脚注 id（跳过 -1 / 0 特殊脚注，最小值 1）。 */
function nextFootnoteId(fp: FootnotesPart): number {
  let max = 0; // 保证至少返 1
  for (const fn of fp.footnotes.descendants(Footnote)) {
    const v = fn.id?.toString();
    if (v === undefined) continue;
    const n = Number.parseInt(v, 10);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return max + 1;
}

/** 构建 `<w:footnote w:id="N" w:type="normal">` 条目。 */
function buildFootnoteElement(id: number, text: string): Footnote {
  const fn = new Footnote();
  fn.type = StringValue.parse("normal");
  fn.id = StringValue.parse(String(id));

  const p = new Paragraph();
  const r = new Run();

  // 脚注内通常有上标引用标记 <w:footnoteRef/>
  r.appendChild(new FootnoteReferenceMark());

  const t = new Text();
  t.text = text;
  if (needsXmlSpacePreserve(text)) {
    t.extendedAttributes.set("xml:space", "preserve");
  }
  r.appendChild(t);
  p.appendChild(r);
  fn.appendChild(p);
  return fn;
}

/** 构建正文内联 Run，包含 `<w:footnoteReference w:id="N"/>` 和上标样式。 */
function buildReferenceRun(id: number): Run {
  const r = new Run();

  // 上标样式（Word 内置 "FootnoteReference" 字符样式）
  const rPr = new RunProperties();
  const rStyle = new RunStyle();
  rStyle.extendedAttributes.set("w:val", "FootnoteReference");
  rPr.appendChild(rStyle);
  r.appendChild(rPr);

  const ref = new FootnoteReference();
  ref.id = StringValue.parse(String(id));
  r.appendChild(ref);

  return r;
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
