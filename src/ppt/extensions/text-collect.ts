// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-24：DrawingML 文本访问器共享内部工具。
 *
 * 与 Word 的 text-collect 对称——但绑 \`a:t\` (drawing Text) / \`a:r\` (drawing Run) /
 * \`a:br\` (drawing Break) / \`a:p\` (drawing Paragraph) 这套 DrawingML 类。
 *
 * - \`collectAText(root)\`：按文档顺序展平所有 \`<a:t>\`；遇到 \`<a:br>\` 插 \\n。
 *   Paragraph 边界**不**自动加 \\n（调用方决定）——给 Slide / Shape 用时合适。
 * - \`collectParagraphText(p)\`：单段落用——节点内 Text + \`<a:br>\` 按位置展平。
 * - \`applyARunText(run, value)\`：替换 Run 内的 \`<a:t>\` / \`<a:br>\` 为 value（其它
 *   子节点如 rPr 保留）。
 */

import { Break } from "../../drawing/generated/break.js";
import { Paragraph } from "../../drawing/generated/paragraph.js";
import { Text } from "../../drawing/generated/text.js";
import type { OpenXmlCompositeElement, OpenXmlElement } from "../../element/index.js";

/**
 * 展平 \`root\` 下所有 \`<a:t>\` 内容；遇 \`<a:br>\` 插 \\n；段落与段落之间也插 \\n。
 *
 * `root` 自身不参与产出。
 */
export function collectAText(root: OpenXmlCompositeElement): string {
  let buf = "";
  let firstInParagraph = true;
  let lastWasParagraphBoundary = false;

  for (const node of root.descendants()) {
    if (node instanceof Paragraph) {
      if (!firstInParagraph) {
        buf += "\n";
        lastWasParagraphBoundary = true;
      }
      firstInParagraph = false;
      continue;
    }
    if (node instanceof Text) {
      if (node.text !== undefined) {
        buf += node.text;
        lastWasParagraphBoundary = false;
      }
    } else if (node instanceof Break) {
      if (!lastWasParagraphBoundary) {
        buf += "\n";
        lastWasParagraphBoundary = true;
      }
    }
  }
  return buf;
}

/**
 * 段落内展平：忽略段落分界（不会插段落级 \\n），但 \`<a:br>\` 仍插 \\n。
 * 用于单个 \`<a:p>\` 的 \`.text\` getter。
 */
export function collectParagraphText(p: OpenXmlCompositeElement): string {
  let buf = "";
  for (const node of p.descendants()) {
    if (node instanceof Text) {
      if (node.text !== undefined) buf += node.text;
    } else if (node instanceof Break) {
      buf += "\n";
    }
  }
  return buf;
}

/**
 * 替换 \`<a:r>\` 内的 \`<a:t>\` / \`<a:br>\` 为 \`value\`。其它子（rPr 等）保留。
 *
 * \`\\n\` 拆出 \`<a:br>\`；其它字串作为 \`<a:t>\`，前后空格自动 \`xml:space="preserve"\`。
 */
export function applyARunText(run: OpenXmlCompositeElement, value: string): void {
  for (const child of run.children.toArray() as OpenXmlElement[]) {
    if (child instanceof Text || child instanceof Break) run.children.remove(child);
  }
  for (const token of tokenize(value)) {
    if (token.kind === "text") {
      const t = new Text();
      t.text = token.text;
      if (needsXmlSpacePreserve(token.text)) t.extendedAttributes.set("xml:space", "preserve");
      run.appendChild(t);
    } else {
      run.appendChild(new Break());
    }
  }
}

type Token = { kind: "text"; text: string } | { kind: "br" };

function* tokenize(value: string): Generator<Token> {
  let buf = "";
  for (const ch of value) {
    if (ch === "\n") {
      if (buf.length > 0) {
        yield { kind: "text", text: buf };
        buf = "";
      }
      yield { kind: "br" };
    } else {
      buf += ch;
    }
  }
  if (buf.length > 0) yield { kind: "text", text: buf };
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
