/**
 * ECMA-376 Strict（ISO 29500-1）↔ Transitional（Part 4）命名空间 URI 双向映射。
 *
 * Strict 把 namespace URI 改成 `http://purl.oclc.org/ooxml/...`，删掉 Transitional
 * 里的 `/2006`/年份段。多数 Office 文件用 Transitional，但少数（Office 2010+
 * 「OOXML Strict」另存为）走 Strict。
 *
 * 我们 codegen 与 typed Parts 全按 Transitional URI 注册；遇到 Strict 文件需要
 * 一层翻译。本模块只维护命名空间映射表 + 两个翻译函数；调用方（ElementRegistry
 * lookup / typed Part findRelationship）按需调用。
 *
 * 不在表里的 URI：
 * - microsoft.com 私有扩展（`x14ac` 等）—— 无 Strict 对应；
 * - `xmlns:mc` markup compatibility —— 同 URI 两端通用。
 */

/**
 * Strict → Transitional 单向映射。
 * 用法：调用 `strictToTransitional(uri)` 而不是直接读这张表，因为 URL 末尾斜杠
 * 等小差异要在函数里兜底归一化。
 */
const STRICT_TO_TRANSITIONAL: ReadonlyMap<string, string> = new Map([
  // 主体 schema
  [
    "http://purl.oclc.org/ooxml/wordprocessingml/main",
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  ],
  [
    "http://purl.oclc.org/ooxml/spreadsheetml/main",
    "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  ],
  [
    "http://purl.oclc.org/ooxml/presentationml/main",
    "http://schemas.openxmlformats.org/presentationml/2006/main",
  ],
  [
    "http://purl.oclc.org/ooxml/drawingml/main",
    "http://schemas.openxmlformats.org/drawingml/2006/main",
  ],
  // OPC relationships
  [
    "http://purl.oclc.org/ooxml/officeDocument/relationships",
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  ],
]);

/** Transitional → Strict 反向表，build-time 推导。 */
const TRANSITIONAL_TO_STRICT: ReadonlyMap<string, string> = (() => {
  const m = new Map<string, string>();
  for (const [strict, trans] of STRICT_TO_TRANSITIONAL) m.set(trans, strict);
  return m;
})();

/**
 * 把 Strict URI 翻成 Transitional 等价 URI；非 Strict / 未知 URI 原样返回。
 *
 * 支持「relationships 子类型」前缀匹配：
 * 例如 `http://purl.oclc.org/ooxml/officeDocument/relationships/slide` 会被翻成
 * `http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide`。
 */
export function strictToTransitional(uri: string): string {
  const direct = STRICT_TO_TRANSITIONAL.get(uri);
  if (direct !== undefined) return direct;
  for (const [strictPrefix, transPrefix] of STRICT_TO_TRANSITIONAL) {
    if (uri.startsWith(`${strictPrefix}/`)) {
      return transPrefix + uri.slice(strictPrefix.length);
    }
  }
  return uri;
}

/** 反向：把 Transitional URI 翻成 Strict 等价 URI；未知则原样返回。 */
export function transitionalToStrict(uri: string): string {
  const direct = TRANSITIONAL_TO_STRICT.get(uri);
  if (direct !== undefined) return direct;
  for (const [transPrefix, strictPrefix] of TRANSITIONAL_TO_STRICT) {
    if (uri.startsWith(`${transPrefix}/`)) {
      return strictPrefix + uri.slice(transPrefix.length);
    }
  }
  return uri;
}

/** 是否已知 Strict URI（含子类型前缀）。 */
export function isStrictUri(uri: string): boolean {
  if (STRICT_TO_TRANSITIONAL.has(uri)) return true;
  for (const strictPrefix of STRICT_TO_TRANSITIONAL.keys()) {
    if (uri.startsWith(`${strictPrefix}/`)) return true;
  }
  return false;
}
