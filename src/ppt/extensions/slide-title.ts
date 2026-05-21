// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-37：PPT `Slide.title` 访问器 mixin。
 *
 * 找到 slide 里 `<p:sp>` 且其 `<p:nvSpPr><p:nvPr><p:ph type="title"|"ctrTitle">`
 * 的 placeholder shape，读 / 写它的 `<p:txBody>` 内单段 Run 单 Text。
 *
 * - getter：找到返展平文本；找不到返 undefined
 * - setter：找不到抛错（不自动创建占位符，layout 决定）
 * - setter undefined 或 空串 → 把 txBody 段落清空但保留 shape
 *
 * 副作用：通过 `openxml-ts/ppt` 入口加载。
 */

import {
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlUnknownElement,
} from "../../element/index.js";
import { Slide } from "../generated/slide.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

declare module "../generated/slide.js" {
  interface Slide {
    /**
     * 标题占位符（`<p:ph type="title">` / `"ctrTitle"`）的文本。
     * 找不到标题占位符 → undefined。setter 找不到时抛错。
     */
    title: string | undefined;
  }
}

Object.defineProperty(Slide.prototype, "title", {
  configurable: false,
  enumerable: false,
  get(this: Slide): string | undefined {
    const sp = findTitleShape(this);
    if (sp === undefined) return undefined;
    return collectShapeText(sp);
  },
  set(this: Slide, value: string | undefined): void {
    const sp = findTitleShape(this);
    if (sp === undefined) {
      throw new Error(
        "Slide.title setter: title placeholder not found (slide layout has no title)",
      );
    }
    replaceShapeText(sp, value ?? "");
  },
});

function findTitleShape(slide: Slide): OpenXmlCompositeElement | undefined {
  for (const sp of slide.descendants()) {
    if (sp.localName !== "sp" || !(sp instanceof OpenXmlCompositeElement)) continue;
    for (const ph of sp.descendants()) {
      if (ph.localName !== "ph") continue;
      // typed PlaceholderShape 用 .type 字段；OpenXmlUnknownElement 用 extendedAttributes。
      const typed = (ph as unknown as { type?: { toString(): string } | undefined }).type;
      const t = typed?.toString() ?? ph.extendedAttributes.get("type");
      if (t === "title" || t === "ctrTitle") return sp;
    }
  }
  return undefined;
}

function collectShapeText(sp: OpenXmlCompositeElement): string {
  const lines: string[] = [];
  for (const child of sp.descendants()) {
    if (child.localName === "p") {
      lines.push(collectParagraphText(child));
    }
  }
  return lines.join("\n");
}

function collectParagraphText(p: OpenXmlElement): string {
  if (!(p instanceof OpenXmlCompositeElement)) return "";
  let out = "";
  for (const node of p.descendants()) {
    if (node.localName === "t") {
      const txt = (node as { text?: string }).text;
      if (typeof txt === "string") out += txt;
    } else if (node.localName === "br") {
      out += "\n";
    }
  }
  return out;
}

function replaceShapeText(sp: OpenXmlCompositeElement, text: string): void {
  let txBody: OpenXmlCompositeElement | undefined;
  for (const c of sp.children) {
    if (c.localName === "txBody" && c instanceof OpenXmlCompositeElement) {
      txBody = c;
      break;
    }
  }
  if (txBody === undefined) {
    txBody = makeUnknown("p", "txBody", NS_P);
    txBody.appendChild(makeUnknown("a", "bodyPr", NS_A));
    txBody.appendChild(makeUnknown("a", "lstStyle", NS_A));
    sp.appendChild(txBody);
  }
  for (const c of txBody.children.toArray()) {
    if (c.localName === "p") txBody.children.remove(c);
  }
  txBody.appendChild(buildParagraph(text));
}

function buildParagraph(text: string): OpenXmlCompositeElement {
  const p = makeUnknown("a", "p", NS_A);
  if (text.length > 0) {
    const r = makeUnknown("a", "r", NS_A);
    r.appendChild(makeUnknown("a", "rPr", NS_A));
    const t = makeUnknown("a", "t", NS_A);
    (t as { text?: string }).text = text;
    r.appendChild(t);
    p.appendChild(r);
  }
  return p;
}

function makeUnknown(
  prefix: string,
  localName: string,
  namespaceUri: string,
): OpenXmlCompositeElement {
  return new OpenXmlUnknownElement(prefix, localName, namespaceUri);
}
