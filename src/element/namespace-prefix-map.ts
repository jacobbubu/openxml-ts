/**
 * OOXML well-known prefix → namespace URI 映射表。
 *
 * 覆盖 ECMA-376 Transitional（Office Open XML）所有常用命名空间前缀。
 * 序列化器（xml-serialize）用此表在 root element 补全 `xmlns:` 声明；
 * Schematron evaluator 也复用此表做 qname 解析。
 *
 * Epic-98: 从 schematron/evaluator.ts 中提取，成为公共模块。
 */

/**
 * 所有已知的 OOXML namespace prefix → URI 映射。
 *
 * 顺序约定：标准 ECMA-376 命名空间在前，Microsoft 私有扩展在后。
 */
export const KNOWN_PREFIX_TO_URI: Readonly<Record<string, string>> = {
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  pic: "http://schemas.openxmlformats.org/drawingml/2006/picture",
  x: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  v: "urn:schemas-microsoft-com:vml",
  o: "urn:schemas-microsoft-com:office:office",
  xvml: "urn:schemas-microsoft-com:office:excel",
  w10: "urn:schemas-microsoft-com:office:word",
  pvml: "urn:schemas-microsoft-com:office:powerpoint",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
  xdr: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  cdr: "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
  ap: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  op: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  b: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
  ds: "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
  sl: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
  lc: "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
  comp: "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
  dgm: "http://schemas.openxmlformats.org/drawingml/2006/diagram",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  x14: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  p14: "http://schemas.microsoft.com/office/powerpoint/2010/main",
  a14: "http://schemas.microsoft.com/office/drawing/2010/main",
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  wetp: "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11",
  ovml: "urn:schemas-microsoft-com:office:powerpoint",
  emma: "http://www.w3.org/2003/04/emma",
  mso14: "http://schemas.microsoft.com/office/2009/07/customui",
  p15: "http://schemas.microsoft.com/office/powerpoint/2012/main",
  thm15: "http://schemas.microsoft.com/office/thememl/2012/main",
  we: "http://schemas.microsoft.com/office/webextensions/webextension/2010/11",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml/custom-b",
  sl2: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
};
