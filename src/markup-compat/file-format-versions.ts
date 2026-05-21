/**
 * FileFormatVersions — 镜像 .NET DocumentFormat.OpenXml.FileFormatVersions 枚举。
 *
 * 每个版本对应 Office 发布年份；数值设计为位掩码（与 .NET SDK 对齐），
 * 可用按位 OR 组合多个版本表示「同时支持」。
 *
 * 命名空间 → 最低版本映射表来源：
 *   - Office 2007 (OOXML 1st ed.) 核心命名空间 — ISO/IEC 29500:2008
 *   - Office 2010 — OOXML 2nd ed. 新增命名空间 (w14, x14, p14, a14…)
 *   - Office 2013 — OOXML 3rd ed. 新增命名空间 (w15, x15, p15…)
 *   - Office 2016 — 新增命名空间 (w16, w16se, w16cex…)
 *   - Office 2019 — 新增命名空间 (w16cid, w16sdtdh…)
 *   - Office 2021 / Microsoft 365 — 最新命名空间
 *
 * 参考 Open-XML-SDK 源码 FileFormatVersions.cs 及 namespaces.json。
 */

/** Office 文件格式版本枚举（位掩码）。 */
export const FileFormatVersions = {
  /** Office 2007 / OOXML ISO 第一版 */
  Office2007: 1,
  /** Office 2010 */
  Office2010: 2,
  /** Office 2013 */
  Office2013: 4,
  /** Office 2016 */
  Office2016: 8,
  /** Office 2019 */
  Office2019: 16,
  /** Office 2021 */
  Office2021: 32,
  /** Microsoft 365 */
  Microsoft365: 64,
  /** 所有版本的组合（向后兼容用） */
  None: 0,
} as const;

export type FileFormatVersions = (typeof FileFormatVersions)[keyof typeof FileFormatVersions];

/**
 * 命名空间 URI → 最低 FileFormatVersions 映射。
 *
 * 规则：若某命名空间 URI 在此映射中，则对应版本及以上的"target"都「理解」该命名空间。
 * 不在映射中的 URI 被视为「未知/第三方」，不被任何版本理解。
 *
 * 数据来源（手工整理，参考 Open-XML-SDK FileFormatVersions.cs / namespaces.json）：
 */
export const NAMESPACE_VERSION_MAP: ReadonlyMap<string, FileFormatVersions> = new Map<
  string,
  FileFormatVersions
>([
  // ── Markup Compatibility 本身（所有版本均理解）──────────────────────────────
  ["http://schemas.openxmlformats.org/markup-compatibility/2006", FileFormatVersions.Office2007],

  // ── Office 2007 / OOXML 核心命名空间 ────────────────────────────────────────
  ["http://schemas.openxmlformats.org/wordprocessingml/2006/main", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/presentationml/2006/main", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/main", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/picture", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/chart", FileFormatVersions.Office2007],
  [
    "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
    FileFormatVersions.Office2007,
  ],
  ["http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/diagram", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/drawingml/2006/compatibility", FileFormatVersions.Office2007],
  ["http://schemas.openxmlformats.org/officeDocument/2006/math", FileFormatVersions.Office2007],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/sharedTypes",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/officeDocument/2006/customXmlDataProps",
    FileFormatVersions.Office2007,
  ],
  [
    "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    FileFormatVersions.Office2007,
  ],
  ["http://schemas.openxmlformats.org/schemaLibrary/2006/main", FileFormatVersions.Office2007],
  // VML
  ["urn:schemas-microsoft-com:vml", FileFormatVersions.Office2007],
  ["urn:schemas-microsoft-com:office:office", FileFormatVersions.Office2007],
  ["urn:schemas-microsoft-com:office:word", FileFormatVersions.Office2007],
  ["urn:schemas-microsoft-com:office:excel", FileFormatVersions.Office2007],
  ["urn:schemas-microsoft-com:office:powerpoint", FileFormatVersions.Office2007],

  // ── Office 2010 命名空间 ─────────────────────────────────────────────────────
  ["http://schemas.microsoft.com/office/word/2010/wordml", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/spreadsheetml/2010/11/main", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/powerpoint/2010/main", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/drawing/2010/main", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/drawing/2010/picture", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/spreadsheetml/2009/9/main", FileFormatVersions.Office2010],
  // cx / a14 / w14 / x14 / p14
  ["http://schemas.microsoft.com/office/drawing/2014/chartex", FileFormatVersions.Office2010],
  ["http://schemas.microsoft.com/office/drawing/2010/slicer", FileFormatVersions.Office2010],
  // w14
  [
    "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
    FileFormatVersions.Office2010,
  ],

  // ── Office 2013 命名空间 ─────────────────────────────────────────────────────
  ["http://schemas.microsoft.com/office/word/2012/wordml", FileFormatVersions.Office2013],
  ["http://schemas.microsoft.com/office/word/2015/wordml/symex", FileFormatVersions.Office2013],
  ["http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac", FileFormatVersions.Office2013],
  ["http://schemas.microsoft.com/office/powerpoint/2012/main", FileFormatVersions.Office2013],
  ["http://schemas.microsoft.com/office/drawing/2012/main", FileFormatVersions.Office2013],

  // ── Office 2016 命名空间 ─────────────────────────────────────────────────────
  ["http://schemas.microsoft.com/office/word/2016/wordml/cex", FileFormatVersions.Office2016],
  ["http://schemas.microsoft.com/office/word/2016/wordml/cid", FileFormatVersions.Office2016],
  [
    "http://schemas.microsoft.com/office/spreadsheetml/2016/revision2",
    FileFormatVersions.Office2016,
  ],
  [
    "http://schemas.microsoft.com/office/spreadsheetml/2016/revision3",
    FileFormatVersions.Office2016,
  ],

  // ── Office 2019 命名空间 ─────────────────────────────────────────────────────
  ["http://schemas.microsoft.com/office/word/2018/wordml/cex2", FileFormatVersions.Office2019],

  // ── Office 2021 / Microsoft 365 命名空间 ────────────────────────────────────
  [
    "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
    FileFormatVersions.Office2021,
  ],
]);

/**
 * 检查给定命名空间 URI 是否被目标版本「理解」。
 *
 * 规则：若命名空间在 NAMESPACE_VERSION_MAP 中，且最低版本 ≤ target，则理解；
 * 否则（未知命名空间或版本不够）不理解。
 */
export function isNamespaceUnderstood(namespaceUri: string, target: FileFormatVersions): boolean {
  if (target === FileFormatVersions.None) return false;
  const minVersion = NAMESPACE_VERSION_MAP.get(namespaceUri);
  if (minVersion === undefined) return false;
  // target 作为位掩码：Office2007=1, 2010=2, 2013=4 …
  // "understood" 当且仅当 target >= minVersion（数值比较即可，因为是单调递增编号）
  return target >= minVersion;
}
