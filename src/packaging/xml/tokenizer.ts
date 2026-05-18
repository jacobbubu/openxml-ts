/**
 * 极小 OPC-范围 XML tokenizer。覆盖以下输入：
 *
 * - `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` 声明
 * - 开闭/自闭合元素 `<Foo Bar="x"/>`、`<Foo Bar='x'>...</Foo>`
 * - 元素间空白（不发射 text 事件）与元素内文本
 * - XML 注释 `<!-- ... -->`（跳过）
 *
 * 主动拒绝（NFR-4 / ADR-003）：
 * - DTD 声明 `<!DOCTYPE ...>`
 * - CDATA `<![CDATA[ ... ]]>`（OPC 用例不需要）
 * - 处理指令（除 `<?xml ?>` 外）
 * - 未知命名实体（见 escape.ts）
 * - 嵌套深度超过 `maxDepth`（默认 64）
 */

import { OpenXmlPackageError } from "../errors.js";
import { xmlUnescape } from "./escape.js";

/** XML 属性集合——按出现顺序的只读 Map（保字节级 diff 稳定）。 */
export type XmlAttributes = ReadonlyMap<string, string>;

/** Tokenizer 单次产出的事件类型——`decl` / `open` / `close` / `text`。 */
export type XmlToken =
  | { readonly kind: "decl"; readonly attrs: XmlAttributes }
  | {
      readonly kind: "open";
      readonly name: string;
      readonly attrs: XmlAttributes;
      readonly selfClosing: boolean;
    }
  | { readonly kind: "close"; readonly name: string }
  | { readonly kind: "text"; readonly value: string };

/** `tokenizeXml` 入参。`maxDepth` 超限抛 `OpenXmlPackageError(code="SECURITY_VIOLATION")`。 */
export interface TokenizeOptions {
  readonly maxDepth?: number;
}

const DEFAULT_MAX_DEPTH = 64;

/**
 * 流式 XML 词法分析器——按字符遍历源串发 token，零中间字符串拷贝。
 *
 * 不保留注释 / 处理指令 / CDATA 之外的特性；OOXML 文档实测只用到声明 + 元素 + 文本。
 * 限制由 `options.maxDepth` 守护（默认 64），用以挡 ZIP 炸弹的深嵌套变种。
 */
export function* tokenizeXml(src: string, options: TokenizeOptions = {}): Generator<XmlToken> {
  const maxDepth = options.maxDepth ?? DEFAULT_MAX_DEPTH;
  const len = src.length;
  let i = 0;
  let depth = 0;
  let sawDecl = false;
  let sawRoot = false;

  while (i < len) {
    const ch = src[i];
    if (ch !== "<") {
      // 元素外的字符——只允许空白
      const next = src.indexOf("<", i);
      const slice = src.slice(i, next === -1 ? len : next);
      if (depth === 0) {
        if (!isWhitespace(slice)) {
          throw failAt(i, "Unexpected text outside root element");
        }
      } else if (slice.length > 0) {
        // 元素内文本要全发——含纯空白（`<t xml:space="preserve"> </t>` 这类
        // SST/Run 字符串的合法 payload）。composite 消费者自行丢弃 inter-element
        // 缩进；leaf / Unknown 直接保留为 text，确保 roundtrip 字节稳定。
        yield { kind: "text", value: xmlUnescape(slice) };
      }
      i = next === -1 ? len : next;
      continue;
    }

    if (src.startsWith("<!--", i)) {
      const end = src.indexOf("-->", i + 4);
      if (end === -1) throw failAt(i, "Unterminated comment");
      i = end + 3;
      continue;
    }

    if (src.startsWith("<!DOCTYPE", i) || src.startsWith("<!ENTITY", i)) {
      throw new OpenXmlPackageError({
        code: "SECURITY_VIOLATION",
        message: "DTD / ENTITY declarations are not allowed",
      });
    }

    if (src.startsWith("<![CDATA[", i)) {
      throw failAt(i, "CDATA is not supported in OPC manifests");
    }

    if (src.startsWith("<?", i)) {
      const end = src.indexOf("?>", i + 2);
      if (end === -1) throw failAt(i, "Unterminated processing instruction");
      const head = src.slice(i + 2, end).trimStart();
      if (!head.startsWith("xml") || (head.length > 3 && !/\s/.test(head[3] ?? ""))) {
        throw failAt(i, "Only <?xml ... ?> processing instruction is allowed");
      }
      if (sawDecl) throw failAt(i, "Duplicate <?xml ?> declaration");
      if (sawRoot) throw failAt(i, "<?xml ?> declaration must precede the root element");
      sawDecl = true;
      const attrs = parseAttrs(head.slice(3), i);
      yield { kind: "decl", attrs };
      i = end + 2;
      continue;
    }

    if (src[i + 1] === "/") {
      const end = src.indexOf(">", i + 2);
      if (end === -1) throw failAt(i, "Unterminated close tag");
      const name = src.slice(i + 2, end).trim();
      if (!isName(name)) throw failAt(i, `Invalid close-tag name "${name}"`);
      depth -= 1;
      if (depth < 0) throw failAt(i, `Unbalanced close tag </${name}>`);
      yield { kind: "close", name };
      i = end + 1;
      continue;
    }

    // open tag (possibly self-closing)
    const end = findTagEnd(src, i + 1);
    if (end === -1) throw failAt(i, "Unterminated open tag");
    let body = src.slice(i + 1, end);
    const selfClosing = body.endsWith("/");
    if (selfClosing) body = body.slice(0, -1);
    const firstWs = firstWhitespaceIndex(body);
    const name = firstWs === -1 ? body : body.slice(0, firstWs);
    if (!isName(name)) throw failAt(i, `Invalid element name "${name}"`);
    const attrSrc = firstWs === -1 ? "" : body.slice(firstWs);
    const attrs = parseAttrs(attrSrc, i);
    sawRoot = true;
    if (!selfClosing) {
      depth += 1;
      if (depth > maxDepth) {
        throw new OpenXmlPackageError({
          code: "SECURITY_VIOLATION",
          message: `XML depth exceeded ${maxDepth}`,
        });
      }
    }
    yield { kind: "open", name, attrs, selfClosing };
    i = end + 1;
  }

  if (depth !== 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Unterminated element at end of input (depth=${depth})`,
    });
  }
}

function failAt(offset: number, message: string): OpenXmlPackageError {
  return new OpenXmlPackageError({
    code: "BACKEND_ERROR",
    message: `${message} at offset ${offset}`,
  });
}

function isWhitespace(s: string): boolean {
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    if (c !== 0x20 && c !== 0x09 && c !== 0x0a && c !== 0x0d) return false;
  }
  return true;
}

function isName(name: string): boolean {
  // 简化版 OPC 受控集合：[A-Za-z_][A-Za-z0-9._:-]*
  return /^[A-Za-z_][A-Za-z0-9._:-]*$/.test(name);
}

function findTagEnd(src: string, from: number): number {
  // 找到 `>`，跳过出现在引号内的 `>`
  let i = from;
  let quote: '"' | "'" | null = null;
  while (i < src.length) {
    const ch = src[i];
    if (quote !== null) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ">") {
      return i;
    }
    i += 1;
  }
  return -1;
}

function firstWhitespaceIndex(s: string): number {
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    if (c === 0x20 || c === 0x09 || c === 0x0a || c === 0x0d) return i;
  }
  return -1;
}

function parseAttrs(src: string, offsetForError: number): XmlAttributes {
  const map = new Map<string, string>();
  let i = 0;
  while (i < src.length) {
    while (i < src.length && /\s/.test(src[i] ?? "")) i += 1;
    if (i >= src.length) break;
    // name
    const nameStart = i;
    while (i < src.length) {
      const c = src.charCodeAt(i);
      if (c === 0x3d || c === 0x20 || c === 0x09 || c === 0x0a || c === 0x0d) break;
      i += 1;
    }
    const name = src.slice(nameStart, i);
    if (!isName(name)) {
      throw failAt(offsetForError, `Invalid attribute name "${name}"`);
    }
    while (i < src.length && /\s/.test(src[i] ?? "")) i += 1;
    if (src[i] !== "=") {
      throw failAt(offsetForError, `Attribute "${name}" missing '='`);
    }
    i += 1;
    while (i < src.length && /\s/.test(src[i] ?? "")) i += 1;
    const quote = src[i];
    if (quote !== '"' && quote !== "'") {
      throw failAt(offsetForError, `Attribute "${name}" value must be quoted`);
    }
    i += 1;
    const valStart = i;
    while (i < src.length && src[i] !== quote) i += 1;
    if (i >= src.length) {
      throw failAt(offsetForError, `Unterminated attribute "${name}"`);
    }
    const rawValue = src.slice(valStart, i);
    i += 1; // skip closing quote
    if (map.has(name)) {
      throw failAt(offsetForError, `Duplicate attribute "${name}"`);
    }
    map.set(name, xmlUnescape(rawValue));
  }
  return map;
}
