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
  // Epic-76: remaining extension namespaces
  { uri: "http://schemas.microsoft.com/ink/2010/main", prefix: "msink" },
  { uri: "http://schemas.microsoft.com/office/2006/01/customui", prefix: "mso" },
  { uri: "http://schemas.microsoft.com/office/2006/activeX", prefix: "ax" },
  { uri: "http://schemas.microsoft.com/office/2006/coverPageProps", prefix: "cppr" },
  {
    uri: "http://schemas.microsoft.com/office/2006/customDocumentInformationPanel",
    prefix: "cdip",
  },
  { uri: "http://schemas.microsoft.com/office/2006/metadata/contentType", prefix: "ct" },
  { uri: "http://schemas.microsoft.com/office/2006/metadata/customXsn", prefix: "ntns" },
  { uri: "http://schemas.microsoft.com/office/2006/metadata/longProperties", prefix: "lp" },
  {
    uri: "http://schemas.microsoft.com/office/2006/metadata/properties/metaAttributes",
    prefix: "ma",
  },
  { uri: "http://schemas.microsoft.com/office/2009/07/customui", prefix: "mso14" },
  { uri: "http://schemas.microsoft.com/office/2019/extlst", prefix: "oel" },
  { uri: "http://schemas.microsoft.com/office/2020/mipLabelMetadata", prefix: "clbl" },
  { uri: "http://schemas.microsoft.com/office/drawing/2007/8/2/chart", prefix: "c082" },
  { uri: "http://schemas.microsoft.com/office/drawing/2008/diagram", prefix: "dgm08" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/chartDrawing", prefix: "a14cdr" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/compatibility", prefix: "com14" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/diagram", prefix: "dgm14" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/picture", prefix: "pic14" },
  { uri: "http://schemas.microsoft.com/office/drawing/2010/slicer", prefix: "sle" },
  { uri: "http://schemas.microsoft.com/office/drawing/2012/chart", prefix: "c15" },
  { uri: "http://schemas.microsoft.com/office/drawing/2012/chartStyle", prefix: "cs" },
  { uri: "http://schemas.microsoft.com/office/drawing/2012/main", prefix: "a15" },
  { uri: "http://schemas.microsoft.com/office/drawing/2012/timeslicer", prefix: "tsle" },
  { uri: "http://schemas.microsoft.com/office/drawing/2013/main/command", prefix: "ahyp13" },
  { uri: "http://schemas.microsoft.com/office/drawing/2014/chart", prefix: "c16" },
  { uri: "http://schemas.microsoft.com/office/drawing/2014/chart/ac", prefix: "c16ac" },
  { uri: "http://schemas.microsoft.com/office/drawing/2014/main", prefix: "a16" },
  { uri: "http://schemas.microsoft.com/office/drawing/2016/11/diagram", prefix: "dgm1611" },
  { uri: "http://schemas.microsoft.com/office/drawing/2016/11/main", prefix: "a1611" },
  { uri: "http://schemas.microsoft.com/office/drawing/2016/12/diagram", prefix: "dgm1612" },
  { uri: "http://schemas.microsoft.com/office/drawing/2016/SVG/main", prefix: "asvg" },
  { uri: "http://schemas.microsoft.com/office/drawing/2017/03/chart", prefix: "c16r3" },
  { uri: "http://schemas.microsoft.com/office/drawing/2017/decorative", prefix: "adec" },
  { uri: "http://schemas.microsoft.com/office/drawing/2017/model3d", prefix: "am3d" },
  { uri: "http://schemas.microsoft.com/office/drawing/2018/animation", prefix: "aanim" },
  { uri: "http://schemas.microsoft.com/office/drawing/2018/animation/model3d", prefix: "am3danim" },
  { uri: "http://schemas.microsoft.com/office/drawing/2018/hyperlinkcolor", prefix: "ahyp" },
  { uri: "http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", prefix: "ask" },
  { uri: "http://schemas.microsoft.com/office/drawing/2020/classificationShape", prefix: "aclsh" },
  { uri: "http://schemas.microsoft.com/office/drawing/2021/livefeed", prefix: "alf" },
  { uri: "http://schemas.microsoft.com/office/drawing/2021/oembed", prefix: "aoe" },
  { uri: "http://schemas.microsoft.com/office/drawing/2021/scriptlink", prefix: "asl" },
  { uri: "http://schemas.microsoft.com/office/drawing/2022/imageformula", prefix: "aif" },
  { uri: "http://schemas.microsoft.com/office/excel/2006/main", prefix: "xne" },
  { uri: "http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", prefix: "xdr14" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2012/main", prefix: "p15" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2012/roamingSettings", prefix: "pRoam" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2013/main/command", prefix: "pc" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2015/main", prefix: "p16" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2017/10/main", prefix: "p1710" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2017/3/main", prefix: "p173" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2018/4/main", prefix: "p184" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2018/8/main", prefix: "p188" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2019/12/main", prefix: "p1912" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2019/9/main/command", prefix: "pc2" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2020/02/main", prefix: "p2002" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2021/06/main", prefix: "p2106" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2022/03/main", prefix: "p2203" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2022/08/main", prefix: "p2208" },
  { uri: "http://schemas.microsoft.com/office/powerpoint/2023/02/main", prefix: "p2302" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac", prefix: "x15ac" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2011/1/ac", prefix: "x12ac" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2014/11/main", prefix: "x16" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2014/revision", prefix: "xr" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2016/pivotdefaultlayout",
    prefix: "xpdl",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray", prefix: "xda" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", prefix: "xlrd" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2", prefix: "xlrd2" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2018/calcfeatures", prefix: "xcalcf" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
    prefix: "xltc",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2019/extlinksprops", prefix: "xxlnp" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", prefix: "xnsv" },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2020/pivotNov2020", prefix: "xpn20" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2020/richdatawebimage",
    prefix: "xlrdwi",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2020/richvaluerefresh",
    prefix: "xlrvr",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2020/threadedcomments2",
    prefix: "xltc2",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2021/extlinks2021", prefix: "xxl21" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag",
    prefix: "xfpb",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2022/pivotRichData", prefix: "xprd" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo",
    prefix: "xpvi",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2022/richvaluerel", prefix: "xlrvrel" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2023/dataSourceVersioning",
    prefix: "xdsv",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2023/externalCodeService",
    prefix: "xlecs",
  },
  { uri: "http://schemas.microsoft.com/office/spreadsheetml/2023/msForms", prefix: "xlmsf" },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation",
    prefix: "xlpcalc",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2024/pivotAutoRefresh",
    prefix: "xlpar",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2024/pivotDynamicArrays",
    prefix: "xlpda",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2024/workbookCompatibilityVersion",
    prefix: "xlwcv",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2025/externalCodeService2",
    prefix: "xlecs2",
  },
  {
    uri: "http://schemas.microsoft.com/office/spreadsheetml/2025/pivotDataSource",
    prefix: "xlpds",
  },
  { uri: "http://schemas.microsoft.com/office/tasks/2019/documenttasks", prefix: "oel19" },
  { uri: "http://schemas.microsoft.com/office/thememl/2012/main", prefix: "thm15" },
  { uri: "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11", prefix: "wetp" },
  { uri: "http://schemas.microsoft.com/office/webextensions/webextension/2010/11", prefix: "we" },
  { uri: "http://schemas.microsoft.com/office/word/2006/wordml", prefix: "wne" },
  { uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", prefix: "wpc" },
  { uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", prefix: "wp14" },
  { uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", prefix: "wpg" },
  { uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape", prefix: "wps" },
  { uri: "http://schemas.microsoft.com/office/word/2012/wordml", prefix: "w15" },
  { uri: "http://schemas.microsoft.com/office/word/2012/wordprocessingDrawing", prefix: "wp15" },
  { uri: "http://schemas.microsoft.com/office/word/2015/wordml/symex", prefix: "w16se" },
  { uri: "http://schemas.microsoft.com/office/word/2016/wordml/cid", prefix: "w16cid" },
  { uri: "http://schemas.microsoft.com/office/word/2018/wordml", prefix: "w16cur" },
  { uri: "http://schemas.microsoft.com/office/word/2018/wordml/cex", prefix: "w16cex" },
  { uri: "http://schemas.microsoft.com/office/word/2020/oembed", prefix: "woe" },
  { uri: "http://schemas.openxmlformats.org/officeDocument/2006/characteristics", prefix: "ac" },
  { uri: "http://www.w3.org/2003/04/emma", prefix: "emma" },
  { uri: "http://www.w3.org/2003/InkML", prefix: "inkml" },
];

export function prefixForUri(uri: string): string | undefined {
  return WELL_KNOWN.find((e) => e.uri === uri)?.prefix;
}

export function uriForPrefix(prefix: string): string | undefined {
  return WELL_KNOWN.find((e) => e.prefix === prefix)?.uri;
}
