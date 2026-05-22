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

// ── FileFormatVersions 扩展函数（镜像 .NET FileFormatVersionExtensions） ──────

/** 所有已知的单版本值（单个位置位）。 */
const SINGLE_VERSION_VALUES: ReadonlySet<number> = new Set([
  FileFormatVersions.Office2007,
  FileFormatVersions.Office2010,
  FileFormatVersions.Office2013,
  FileFormatVersions.Office2016,
  FileFormatVersions.Office2019,
  FileFormatVersions.Office2021,
  FileFormatVersions.Microsoft365,
]);

/** 所有版本的 OR 组合（AllVersions 掩码）。 */
const ALL_VERSIONS_MASK =
  FileFormatVersions.Office2007 |
  FileFormatVersions.Office2010 |
  FileFormatVersions.Office2013 |
  FileFormatVersions.Office2016 |
  FileFormatVersions.Office2019 |
  FileFormatVersions.Office2021 |
  FileFormatVersions.Microsoft365;

/**
 * 是否为单一版本（恰好一个位置位）。
 * 镜像 .NET `FileFormatVersionExtensions.Any()`
 */
export function fileFormatVersionsAny(version: number): boolean {
  return SINGLE_VERSION_VALUES.has(version);
}

/**
 * 是否包含所有已知版本（ALL 掩码）。
 * 镜像 .NET `FileFormatVersionExtensions.All()`
 */
export function fileFormatVersionsAll(version: number): boolean {
  return (version & ALL_VERSIONS_MASK) === ALL_VERSIONS_MASK;
}

/**
 * 检查 `version` 是否 ≥ `minimum`（单版本间的版本顺序比较）。
 *
 * 要求：
 *  - `version` 可以是单个版本或多个版本的 OR 组合；当为组合时，只要其中任意
 *    一个单版本 ≥ minimum 即视为满足（对齐 .NET SDK 行为：组合版本测试时
 *    AtLeast 检查「是否包含至少一个满足条件的成员版本」）。
 *  - `minimum` 必须是单个有效版本值（非 None、非组合），否则抛 RangeError。
 *  - `version` 若含无效位（超出所有已知版本的联合掩码）则抛 RangeError。
 *
 * 镜像 .NET `FileFormatVersionExtensions.AtLeast()`
 */
export function fileFormatVersionsAtLeast(version: number, minimum: number): boolean {
  if (!SINGLE_VERSION_VALUES.has(minimum)) {
    throw new RangeError(`minimum must be a single valid FileFormatVersions value; got ${minimum}`);
  }
  // 检查 version 是否含超出已知掩码的位（无效位）
  if ((version & ~ALL_VERSIONS_MASK) !== 0) {
    throw new RangeError(`version contains unknown FileFormatVersions bits; got ${version}`);
  }
  if (version === FileFormatVersions.None) return false;
  // 对 version 中每个单版本位检测是否 >= minimum
  for (const v of SINGLE_VERSION_VALUES) {
    if ((version & v) !== 0 && v >= minimum) return true;
  }
  return false;
}

/**
 * 返回「minimum 版本及之后所有版本」的组合掩码。
 *
 * 要求：`version` 必须是单个有效版本值，否则抛 RangeError。
 * 镜像 .NET `FileFormatVersionExtensions.AndLater()`
 */
export function fileFormatVersionsAndLater(version: number): number {
  if (!SINGLE_VERSION_VALUES.has(version)) {
    throw new RangeError(
      `version must be a single valid FileFormatVersions value for andLater; got ${version}`,
    ); // biome-ignore format: long message
  }
  let mask = 0;
  for (const v of SINGLE_VERSION_VALUES) {
    if (v >= version) mask |= v;
  }
  return mask;
}
