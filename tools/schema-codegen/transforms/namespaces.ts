/**
 * Schema 命名空间 URI ↔ 标准 prefix 映射。
 *
 * 上游 `dotnet/Open-XML-SDK/data/typed/namespaces.json` 列出权威表；
 * 这里硬编码 Word/Excel/PPT 主 namespace 与常用 markup 兼容 namespace——
 * 满足 Epic-2/3/4 大部分 element 类生成场景；遇到陌生 prefix 走 lookup 失败链路。
 */

export interface NamespaceEntry {
  readonly uri: string;
  readonly prefix: string;
}

const WELL_KNOWN: readonly NamespaceEntry[] = [
  { uri: "http://schemas.openxmlformats.org/wordprocessingml/2006/main", prefix: "w" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/relationships", prefix: "r" },
  { uri: "http://schemas.openxmlformats.org/markup-compatibility/2006", prefix: "mc" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/main", prefix: "a" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", prefix: "wp" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/picture", prefix: "pic" },
  { uri: "http://schemas.openxmlformats.org/spreadsheetml/2006/main", prefix: "xl" },
  { uri: "http://schemas.openxmlformats.org/presentationml/2006/main", prefix: "p" },
  { uri: "urn:schemas-microsoft-com:vml", prefix: "v" },
  { uri: "urn:schemas-microsoft-com:office:office", prefix: "o" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/math", prefix: "m" },
  { uri: "http://schemas.openxmlformats.org/word/2010/wordml", prefix: "w14" },
  { uri: "http://schemas.microsoft.com/office/word/2012/wordml", prefix: "w15" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/chart", prefix: "c" },
];

export function prefixForUri(uri: string): string | undefined {
  return WELL_KNOWN.find((e) => e.uri === uri)?.prefix;
}

export function uriForPrefix(prefix: string): string | undefined {
  return WELL_KNOWN.find((e) => e.prefix === prefix)?.uri;
}
