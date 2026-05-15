/**
 * Flat OPC 序列化器。
 *
 * 输出形态固定（与 Microsoft Word "Word XML Document" 导出一致）：
 *
 * - XML 声明 + 可选 `<?mso-application progid="..."?>` PI（默认不输出）；
 * - 根元素 `<pkg:package xmlns:pkg="...">`；
 * - 第一份 part 总是 `[Content_Types].xml`，第二份（如果有）是 `_rels/.rels`；
 * - 每个应用 Part 紧跟它自己的 `_rels/<basename>.rels`（如有）；
 * - XML 内容包在 `<pkg:xmlData>` 中（原样嵌入，不重复 XML 声明）；
 * - 二进制内容 base64 编码包在 `<pkg:binaryData>` 中。
 */

import type { MemoryPackagePart } from "../../backends/memory/memory-package-part.js";
import type { MemoryOpenXmlPackage } from "../../backends/memory/memory-package.js";
import { xmlEscapeAttr } from "../xml/escape.js";
import { bytesToBase64 } from "./base64.js";
import { FLAT_OPC_NS } from "./flat-opc-parser.js";

const CONTENT_TYPES_NAME = "/[Content_Types].xml";
const CONTENT_TYPES_CT = "application/vnd.openxmlformats-package.content-types+xml";
const PACKAGE_RELS_NAME = "/_rels/.rels";
const RELS_CT = "application/vnd.openxmlformats-package.relationships+xml";

export interface FlatOpcWriteOptions {
  /**
   * 添加 `<?mso-application progid="..."?>` 处理指令，让 Office 客户端在双击时
   * 知道该用哪个应用打开。`"Word.Document"` / `"Excel.Sheet"` / `"PowerPoint.Show"`。
   */
  readonly progId?: string;
}

export function packageToFlatOpc(
  pkg: MemoryOpenXmlPackage,
  options: FlatOpcWriteOptions = {},
): string {
  const out: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  if (options.progId !== undefined && options.progId.length > 0) {
    out.push(`<?mso-application progid="${xmlEscapeAttr(options.progId)}"?>`);
  }
  out.push(`<pkg:package xmlns:pkg="${FLAT_OPC_NS}">`);

  // 1) Content-Types：内嵌的 Types XML 已包含完整命名空间；但要剥掉 <?xml ?> 头
  const ctXml = stripXmlDecl(pkg.contentTypes.serialize());
  out.push(buildXmlPart(CONTENT_TYPES_NAME, CONTENT_TYPES_CT, ctXml));

  // 2) 包级 .rels
  if (pkg.relationships.count > 0) {
    const relsXml = stripXmlDecl(pkg.relationships.serializeXml());
    out.push(buildXmlPart(PACKAGE_RELS_NAME, RELS_CT, relsXml));
  }

  // 3) 各 Part + 其 .rels
  for (const uri of pkg.partOrderSnapshot()) {
    const part = pkg.getPart(uri) as MemoryPackagePart;
    out.push(buildPart(part));
    if (part.relationships.count > 0) {
      const relsXml = stripXmlDecl(part.relationships.serializeXml());
      const relsName = relsNameFor(uri);
      out.push(buildXmlPart(relsName, RELS_CT, relsXml));
    }
  }

  out.push("</pkg:package>");
  return out.join("");
}

function buildPart(part: MemoryPackagePart): string {
  const content = part.snapshot();
  if (isXmlContentType(part.contentType)) {
    const inner = new TextDecoder("utf-8").decode(content);
    const stripped = stripXmlDecl(inner);
    return buildXmlPart(part.uri, part.contentType, stripped);
  }
  return buildBinaryPart(part.uri, part.contentType, content);
}

function buildXmlPart(name: string, contentType: string, innerXml: string): string {
  return `<pkg:part pkg:name="${xmlEscapeAttr(name)}" pkg:contentType="${xmlEscapeAttr(contentType)}"><pkg:xmlData>${innerXml}</pkg:xmlData></pkg:part>`;
}

function buildBinaryPart(name: string, contentType: string, bytes: Uint8Array): string {
  const b64 = bytesToBase64(bytes);
  return `<pkg:part pkg:name="${xmlEscapeAttr(name)}" pkg:contentType="${xmlEscapeAttr(contentType)}"><pkg:binaryData>${b64}</pkg:binaryData></pkg:part>`;
}

export function isXmlContentType(ct: string): boolean {
  const lower = ct.toLowerCase();
  if (lower === "application/xml" || lower === "text/xml") return true;
  return lower.endsWith("+xml");
}

function stripXmlDecl(xml: string): string {
  return xml.replace(/^\s*<\?xml\b[^?]*\?>/, "");
}

function relsNameFor(uri: string): string {
  // /word/document.xml → /word/_rels/document.xml.rels
  const lastSlash = uri.lastIndexOf("/");
  if (lastSlash === -1) return `_rels/${uri}.rels`;
  const dir = uri.slice(0, lastSlash);
  const file = uri.slice(lastSlash + 1);
  return `${dir}/_rels/${file}.rels`;
}
