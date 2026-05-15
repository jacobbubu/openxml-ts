/**
 * OPC 范围内的最小 XML 转义/反转义工具。
 *
 * - 写入：text 节点只转义 `&`、`<`、`>`；属性额外转义 `"`。统一使用双引号包属性。
 * - 读取：识别 5 个标准命名实体 + 数字实体（十进制与十六进制）。其它命名实体一律拒绝
 *   （我们禁用 DTD，OPC 用例也用不到），抛 `BACKEND_ERROR`。
 */

import { OpenXmlPackageError } from "../errors.js";

export function xmlEscapeText(input: string): string {
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "&") out += "&amp;";
    else if (ch === "<") out += "&lt;";
    else if (ch === ">") out += "&gt;";
    else out += ch;
  }
  return out;
}

export function xmlEscapeAttr(input: string): string {
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "&") out += "&amp;";
    else if (ch === "<") out += "&lt;";
    else if (ch === ">") out += "&gt;";
    else if (ch === '"') out += "&quot;";
    else out += ch;
  }
  return out;
}

const NAMED_ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

export function xmlUnescape(input: string): string {
  if (input.indexOf("&") === -1) return input;
  let out = "";
  let i = 0;
  while (i < input.length) {
    const ch = input[i] as string;
    if (ch !== "&") {
      out += ch;
      i += 1;
      continue;
    }
    const semi = input.indexOf(";", i + 1);
    if (semi === -1) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Unterminated entity reference at offset ${i}`,
      });
    }
    const ref = input.slice(i + 1, semi);
    out += resolveEntity(ref, i);
    i = semi + 1;
  }
  return out;
}

function resolveEntity(ref: string, offset: number): string {
  if (ref.length === 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Empty entity reference at offset ${offset}`,
    });
  }
  if (ref.charCodeAt(0) === 0x23 /* '#' */) {
    const isHex = ref.length > 1 && (ref[1] === "x" || ref[1] === "X");
    const digits = isHex ? ref.slice(2) : ref.slice(1);
    if (digits.length === 0 || !/^[0-9a-fA-F]+$/.test(digits)) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Invalid numeric entity reference "&${ref};"`,
      });
    }
    const code = Number.parseInt(digits, isHex ? 16 : 10);
    if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Out-of-range numeric entity "&${ref};"`,
      });
    }
    return String.fromCodePoint(code);
  }
  const resolved = NAMED_ENTITIES[ref];
  if (resolved === undefined) {
    // 拒绝未知命名实体——我们禁用 DTD/外部实体（NFR-4 / ADR-003）。
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `Unknown entity reference "&${ref};" — DTDs and external entities are not supported`,
    });
  }
  return resolved;
}
