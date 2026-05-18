/**
 * Flat OPC 解析器。
 *
 * Flat OPC 格式（Microsoft 单文件 XML 容器，对应源 SDK `FlatOpcExtensions`）：
 *
 * ```xml
 * <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
 * <?mso-application progid="Word.Document"?>
 * <pkg:package xmlns:pkg="http://schemas.microsoft.com/office/2006/xmlPackage">
 *   <pkg:part pkg:name="/[Content_Types].xml" pkg:contentType="...">
 *     <pkg:xmlData><Types xmlns="...">...</Types></pkg:xmlData>
 *   </pkg:part>
 *   <pkg:part pkg:name="/word/media/img.png" pkg:contentType="image/png">
 *     <pkg:binaryData>...base64...</pkg:binaryData>
 *   </pkg:part>
 *   ...
 * </pkg:package>
 * ```
 *
 * 因为 `<pkg:xmlData>` 内部直接嵌套任意 XML，我们绕过通用 tokenizer，
 * 用「文本扫描 + 配对」的方式定位每个 `<pkg:part>` 与其 body，再把内嵌内容
 * 按原样拿出来（XML 部分保持字节级原样，binary 部分 base64 解码）。
 *
 * 安全：
 * - 禁 DTD / ENTITY 声明（出现即 SECURITY_VIOLATION）；
 * - 拒绝 `pkg:` 以外的备选命名空间前缀（精简实现，与 Microsoft 输出一致）。
 */

import { OpenXmlPackageError } from "../errors.js";
import { type PartUri, isPartUri } from "../interfaces/types.js";
import { base64ToBytes } from "./base64.js";

/** Flat OPC（单文件 .xml 形式的 OOXML 包装）根命名空间。 */
export const FLAT_OPC_NS = "http://schemas.microsoft.com/office/2006/xmlPackage";

/** 解析后的单个 `<pkg:part>`——Part URI、content-type 与原字节流。 */
export interface FlatOpcEntry {
  readonly name: PartUri;
  readonly contentType: string;
  readonly content: Uint8Array;
}

/** `parseFlatOpc` 的返回——含按出现顺序排列的 Part 数组。 */
export interface ParsedFlatOpc {
  readonly entries: FlatOpcEntry[];
}

const PART_OPEN_RE = /<pkg:part\b([^>]*?)(\/)?>/g;
const PART_CLOSE = "</pkg:part>";
const XML_DATA_OPEN_RE = /<pkg:xmlData\b[^>]*?>/;
const XML_DATA_CLOSE = "</pkg:xmlData>";
const BINARY_DATA_OPEN_RE = /<pkg:binaryData\b[^>]*?>/;
const BINARY_DATA_CLOSE = "</pkg:binaryData>";

/**
 * 解析一份 Flat OPC XML 字符串到 {@link ParsedFlatOpc}。
 *
 * 禁用 DTD / 外部实体（OOXML 安全要求）；遇到任一种立即抛 `BACKEND_ERROR`。
 */
export function parseFlatOpc(xml: string): ParsedFlatOpc {
  rejectDtdOrEntity(xml);
  const packageBody = extractPackageBody(xml);
  const entries: FlatOpcEntry[] = [];

  PART_OPEN_RE.lastIndex = 0;
  for (;;) {
    const m = PART_OPEN_RE.exec(packageBody);
    if (m === null) break;
    const attrSrc = m[1] ?? "";
    const isSelfClose = m[2] === "/";
    const attrs = parsePartAttrs(attrSrc);
    const name = requireAttr(attrs, "pkg:name");
    if (!isPartUri(name)) {
      throw new OpenXmlPackageError({
        code: "INVALID_PART_URI",
        message: `Flat OPC part name "${name}" is not a valid OPC Part URI`,
      });
    }
    const contentType = requireAttr(attrs, "pkg:contentType");

    if (isSelfClose) {
      entries.push({ name, contentType, content: new Uint8Array(0) });
      continue;
    }

    const bodyStart = PART_OPEN_RE.lastIndex;
    const bodyEnd = findClose(packageBody, PART_CLOSE, bodyStart);
    if (bodyEnd === -1) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        partUri: name,
        message: "Unterminated <pkg:part>",
      });
    }
    const partBody = packageBody.slice(bodyStart, bodyEnd);
    const content = extractPartContent(partBody, name);
    entries.push({ name, contentType, content });
    PART_OPEN_RE.lastIndex = bodyEnd + PART_CLOSE.length;
  }

  if (entries.length === 0) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Flat OPC package contains no <pkg:part> entries",
    });
  }
  return { entries };
}

function rejectDtdOrEntity(xml: string): void {
  if (/<!DOCTYPE\b|<!ENTITY\b/.test(xml)) {
    throw new OpenXmlPackageError({
      code: "SECURITY_VIOLATION",
      message: "DTD / ENTITY declarations are not allowed in Flat OPC",
    });
  }
}

function extractPackageBody(xml: string): string {
  // 找 `<pkg:package>` 开标签
  const open = xml.match(/<pkg:package\b([^>]*?)>/);
  if (open === null || open.index === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Flat OPC missing <pkg:package> root element",
    });
  }
  const headAttrs = parsePartAttrs(open[1] ?? "");
  const xmlnsPkg = headAttrs["xmlns:pkg"];
  if (xmlnsPkg !== FLAT_OPC_NS) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `<pkg:package> must declare xmlns:pkg="${FLAT_OPC_NS}"`,
    });
  }
  const bodyStart = open.index + open[0].length;
  const closeIdx = xml.indexOf("</pkg:package>", bodyStart);
  if (closeIdx === -1) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: "Flat OPC missing </pkg:package>",
    });
  }
  return xml.slice(bodyStart, closeIdx);
}

function extractPartContent(partBody: string, name: PartUri): Uint8Array {
  // 优先 xmlData
  const xmlOpen = partBody.match(XML_DATA_OPEN_RE);
  if (xmlOpen !== null && xmlOpen.index !== undefined) {
    const contentStart = xmlOpen.index + xmlOpen[0].length;
    const contentEnd = partBody.indexOf(XML_DATA_CLOSE, contentStart);
    if (contentEnd === -1) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        partUri: name,
        message: "Unterminated <pkg:xmlData>",
      });
    }
    const inner = partBody.slice(contentStart, contentEnd).trim();
    return new TextEncoder().encode(inner);
  }
  // 再试 binaryData
  const binOpen = partBody.match(BINARY_DATA_OPEN_RE);
  if (binOpen !== null && binOpen.index !== undefined) {
    const contentStart = binOpen.index + binOpen[0].length;
    const contentEnd = partBody.indexOf(BINARY_DATA_CLOSE, contentStart);
    if (contentEnd === -1) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        partUri: name,
        message: "Unterminated <pkg:binaryData>",
      });
    }
    const b64 = partBody.slice(contentStart, contentEnd);
    try {
      return base64ToBytes(b64);
    } catch (err) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        partUri: name,
        message: `Failed to decode base64 in <pkg:binaryData>: ${(err as Error).message}`,
        cause: err,
      });
    }
  }
  // 既无 xmlData 也无 binaryData → 视为空 Part
  return new Uint8Array(0);
}

function findClose(haystack: string, needle: string, from: number): number {
  return haystack.indexOf(needle, from);
}

function parsePartAttrs(src: string): Record<string, string> {
  const out: Record<string, string> = {};
  // 简化 attr 解析：name="value" / name='value'
  const re = /([A-Za-z_][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)')/g;
  for (;;) {
    const m = re.exec(src);
    if (m === null) break;
    const key = m[1] ?? "";
    const value = m[3] ?? m[4] ?? "";
    out[key] = decodeEntities(value);
  }
  return out;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function requireAttr(attrs: Record<string, string>, key: string): string {
  const v = attrs[key];
  if (v === undefined) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `<pkg:part> missing required attribute "${key}"`,
    });
  }
  return v;
}
