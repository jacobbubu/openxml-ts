/**
 * Story-22.3：Word 列表段落 markup 助手。
 *
 * 给定 \`numId\`（来自 \`WordprocessingDocument.addNumberingDefinition\`）+
 * 级别 + 文本，返完整带 \`<w:numPr>\` 的 Paragraph：
 *
 * ```xml
 * <w:p>
 *   <w:pPr>
 *     <w:numPr>
 *       <w:ilvl w:val="0"/>
 *       <w:numId w:val="1"/>
 *     </w:numPr>
 *   </w:pPr>
 *   <w:r><w:t>list item</w:t></w:r>
 * </w:p>
 * ```
 */

import { Int32Value } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import { NumberingId } from "./generated/numbering-id.js";
import { NumberingLevelReference } from "./generated/numbering-level-reference.js";
import { NumberingProperties } from "./generated/numbering-properties.js";
import { ParagraphProperties } from "./generated/paragraph-properties.js";
import { Paragraph } from "./generated/paragraph.js";
import { Run } from "./generated/run.js";
import { Text } from "./generated/text.js";

/**
 * 构造一个挂着 \`<w:numPr>\` 的列表段落。
 *
 * @param numId 取自 \`WordprocessingDocument.addNumberingDefinition().numId\`
 * @param level 缩进级别，0-based（0..8 对应 OOXML 9 级 ilvl）
 * @param text  段落文本
 *
 * @throws OpenXmlPackageError 当 level < 0 / ≥ 9（code="BACKEND_ERROR"）
 */
export function createListParagraph(numId: number, level: number, text: string): Paragraph {
  if (!Number.isInteger(level) || level < 0 || level > 8) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createListParagraph: level must be integer 0..8, got ${level}`,
    });
  }

  const p = new Paragraph();
  const pPr = new ParagraphProperties();
  const numPr = new NumberingProperties();
  const ilvl = new NumberingLevelReference();
  ilvl.val = Int32Value.parse(String(level));
  numPr.appendChild(ilvl);
  const num = new NumberingId();
  // NumberingId 没出 typed \`val\` 字段，走 extendedAttributes
  num.extendedAttributes.set("w:val", String(numId));
  numPr.appendChild(num);
  pPr.appendChild(numPr);
  p.appendChild(pPr);

  const r = new Run();
  const t = new Text();
  t.text = text;
  if (needsXmlSpacePreserve(text)) t.extendedAttributes.set("xml:space", "preserve");
  r.appendChild(t);
  p.appendChild(r);

  return p;
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
