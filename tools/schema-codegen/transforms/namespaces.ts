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
  { uri: "urn:schemas-microsoft-com:office:excel", prefix: "xvml" },
  { uri: "urn:schemas-microsoft-com:office:word", prefix: "w10" },
  { uri: "urn:schemas-microsoft-com:office:powerpoint", prefix: "pvml" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/math", prefix: "m" },
  { uri: "http://schemas.openxmlformats.org/word/2010/wordml", prefix: "w14" },
  { uri: "http://schemas.microsoft.com/office/word/2012/wordml", prefix: "w15" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/chart", prefix: "c" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", prefix: "xdr" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", prefix: "cdr" },
  {
    uri: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    prefix: "ap",
  },
  {
    uri: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
    prefix: "op",
  },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes", prefix: "vt" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography", prefix: "b" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/customXml", prefix: "ds" },
  { uri: "http://schemas.openxmlformats.org/schemaLibrary/2006/main", prefix: "sl" },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas", prefix: "lc" },
  {
    uri: "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
    prefix: "comp",
  },
  { uri: "http://schemas.openxmlformats.org/drawingml/2006/diagram", prefix: "dgm" },
  // Epic-75: Office extension namespaces
  { uri: "http://schemas.microsoft.com/office/drawing/2014/chartex", prefix: "cx" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main", prefix: "x14" },
  { uri: "http://schemas.microsoft.com/office/word/2010/wordml", prefix: "w14" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main", prefix: "x15" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2010/main", prefix: "p14" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/main", prefix: "a14" },
];

export function prefixForUri(uri: string): string | undefined {
  return WELL_KNOWN.find((e) => e.uri === uri)?.prefix;
}

export function uriForPrefix(prefix: string): string | undefined {
  return WELL_KNOWN.find((e) => e.prefix === prefix)?.uri;
}
