// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Word 文本访问器（Story-11.1）的共享内部工具。
 *
 * 提供：
 * - `collectRunText(root)`：按文档顺序展平 `<w:t>` / `<w:tab>` / `<w:br>` 三类
 *   内联内容为单一字符串，`<w:tab>` → `\t`，`<w:br>` → `\n`。RunProperties
 *   / ParagraphProperties / Drawing 等内联非文本子树会被跳过（因为它们不直接
 *   包含 Text/TabChar/Break）。
 * - `applyRunText(parent, value)`：把字符串解析回 Text/TabChar/Break 节点序列，
 *   挂到 `parent.children` 末尾。`\n` → `<w:br/>`，`\t` → `<w:tab/>`，其余串作为
 *   `<w:t xml:space="preserve">…</w:t>`。
 *
 * 不做任何样式 / 格式合并；仅做内联文本展平与回写。给 Paragraph.text /
 * Run.text 两个 mixin 共用。
 */

import type { OpenXmlCompositeElement } from "../../element/index.js";
import { Break } from "../generated/break.js";
import { TabChar } from "../generated/tab-char.js";
import { Text } from "../generated/text.js";

/**
 * 按文档顺序遍历 `root` 下所有后代，把 Text / TabChar / Break 展平成字符串。
 * `root` 自身不参与产出。
 */
export function collectRunText(root: OpenXmlCompositeElement): string {
  let buf = "";
  for (const node of root.descendants()) {
    if (node instanceof Text) {
      if (node.text !== undefined) buf += node.text;
    } else if (node instanceof TabChar) {
      buf += "\t";
    } else if (node instanceof Break) {
      buf += "\n";
    }
  }
  return buf;
}

/**
 * 移除 `parent.children` 里所有「内联文本类」直接子元素（Text / TabChar / Break），
 * 然后把 `value` 解析回去。RunProperties / Drawing / 注释引用等其它直接子保留。
 *
 * Setter 语义：替换内联文本内容，不动 rPr / pPr / Drawing 等结构性子节点。
 */
export function applyRunText(parent: OpenXmlCompositeElement, value: string): void {
  for (const child of parent.children.toArray()) {
    if (child instanceof Text || child instanceof TabChar || child instanceof Break) {
      parent.children.remove(child);
    }
  }
  for (const token of tokenizeRunText(value)) {
    if (token.kind === "text") {
      const t = new Text();
      t.text = token.text;
      if (needsXmlSpacePreserve(token.text)) t.extendedAttributes.set("xml:space", "preserve");
      parent.appendChild(t);
    } else if (token.kind === "tab") {
      parent.appendChild(new TabChar());
    } else {
      parent.appendChild(new Break());
    }
  }
}

type RunToken = { kind: "text"; text: string } | { kind: "tab" } | { kind: "br" };

function* tokenizeRunText(value: string): Generator<RunToken> {
  let buf = "";
  for (const ch of value) {
    if (ch === "\n") {
      if (buf.length > 0) {
        yield { kind: "text", text: buf };
        buf = "";
      }
      yield { kind: "br" };
    } else if (ch === "\t") {
      if (buf.length > 0) {
        yield { kind: "text", text: buf };
        buf = "";
      }
      yield { kind: "tab" };
    } else {
      buf += ch;
    }
  }
  if (buf.length > 0) yield { kind: "text", text: buf };
}

function needsXmlSpacePreserve(text: string): boolean {
  return text.length === 0
    ? false
    : text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
