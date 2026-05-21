/**
 * ST_UniversalMeasure 解析与单位换算（Epic-92）。
 *
 * OOXML Strict 文档将度量值写成 `<number><unit>` 形式（如 `467.50pt`、`2.54cm`），
 * 而 Transitional 写原始整数（twips/EMU）。本模块把 Universal Measure 字符串转换为
 * twips，使 `Int32Value` / `UInt32Value` 能在 Strict 文档中正确解析测量属性。
 *
 * 支持的单位（ISO/IEC 29500-1 §22.9.2.15）：
 *   mm | cm | in | pt | pc | pi
 *
 * Twips 换算（1 twip = 1/20 pt）：
 *   pt → ×20
 *   in → ×1440  (1 in = 72 pt = 1440 twips)
 *   cm → ×1440/2.54
 *   mm → ×1440/25.4
 *   pc → ×240   (1 pc = 12 pt = 240 twips)
 *   pi → ×240   (OOXML pica 与 pc 同义)
 *
 * 参考：.NET SDK §14.11.6 / ISO/IEC 29500-4；XmlConvertingReader 仅处理命名空间，
 * 度量值转换依靠上层（StrictTranslateAttribute）或 parse 端直接接受。
 */

/** 匹配 ST_UniversalMeasure：可选负号、整数或小数部分、单位后缀。 */
const UNIVERSAL_MEASURE_RE = /^(-?\d+(?:\.\d+)?)(mm|cm|in|pt|pc|pi)$/;

/**
 * 将 ST_UniversalMeasure 字符串转换为 twips（四舍五入到整数）。
 *
 * 若输入不符合格式则返回 `undefined`，不抛错。
 */
export function parseUniversalMeasureToTwips(input: string): number | undefined {
  const m = UNIVERSAL_MEASURE_RE.exec(input.trim());
  if (m === null) return undefined;

  const value = Number.parseFloat(m[1] as string);
  const unit = m[2] as string;

  let twips: number;
  switch (unit) {
    case "pt":
      twips = value * 20;
      break;
    case "in":
      twips = value * 1440;
      break;
    case "cm":
      twips = value * (1440 / 2.54);
      break;
    case "mm":
      twips = value * (1440 / 25.4);
      break;
    case "pc":
    case "pi":
      twips = value * 240;
      break;
    default:
      return undefined;
  }

  return Math.round(twips);
}
