/**
 * Story-4.6：沿 slide → layout → master → theme 链解析有效 scheme。
 *
 * 算法：
 * 1. 顺序遍历每一档 typed Part（slide / layout / master），看它是否「直接挂着」
 *    一份 ThemePart——常见模板只有 master 这一档真挂，slide / layout 走 theme
 *    override 是 OOXML 罕见特性；
 * 2. 命中第一份 ThemePart 后，从其 root `<a:theme>` 找 `<a:themeElements>` 子，
 *    再按 scheme 类型取出对应 child；
 * 3. 走过的 ThemePart URI 加入 visited set，链路深度上限 4：超过任一条件即返回
 *    undefined（异常 fixture / 闭环数据下不抛错）。
 *
 * 当前实现走 typed Part 树的 firstChild(Class) 类型窄化，DrawingML registry
 * 必须由门面（PresentationDocument）先 register 完成；TypedXmlPart 缓存语义
 * 让重复访问开销极低（O(1) 内部缓存）。
 *
 * ADR-023：effective* getter 挂在 typed Part 层而非 generated element 上。
 */

import { ColorScheme } from "../drawing/generated/color-scheme.js";
import { FontScheme } from "../drawing/generated/font-scheme.js";
import { FormatScheme } from "../drawing/generated/format-scheme.js";
import { Theme } from "../drawing/generated/theme.js";
import { ThemeElements } from "../drawing/generated/theme-elements.js";
import { OpenXmlCompositeElement, type OpenXmlElement } from "../element/index.js";
import type { ThemePart } from "../parts/theme-part.js";
import type { SlidePart } from "./parts/slide-part.js";

/** 链路深度上限——4 = slide + layout + master + 一档兜底。 */
const MAX_CHAIN_DEPTH = 4;

export function resolveEffectiveColorScheme(sp: SlidePart): ColorScheme | undefined {
  return resolveScheme(sp, ColorScheme);
}

export function resolveEffectiveFontScheme(sp: SlidePart): FontScheme | undefined {
  return resolveScheme(sp, FontScheme);
}

export function resolveEffectiveFormatScheme(sp: SlidePart): FormatScheme | undefined {
  return resolveScheme(sp, FormatScheme);
}

/** 对 ColorScheme / FontScheme / FormatScheme 通用的链式查找。 */
function resolveScheme<T extends OpenXmlElement>(
  sp: SlidePart,
  ChildCtor: new () => T,
): T | undefined {
  const visited = new Set<string>();
  let depth = 0;

  const tryTheme = (themePart: ThemePart | undefined): T | undefined => {
    if (themePart === undefined) return undefined;
    const uri = themePart.part.uri;
    if (visited.has(uri)) return undefined; // 闭环防御
    visited.add(uri);
    const theme = themePart.theme;
    if (!(theme instanceof Theme)) return undefined; // 解成 OpenXmlUnknownElement 时跳
    const themeElements = theme.firstChild(ThemeElements);
    if (themeElements === undefined) return undefined;
    return themeElements.firstChild(ChildCtor);
  };

  // 1. Slide-level theme override（罕见）
  depth += 1;
  const slideTheme = tryTheme(sp.themePart);
  if (slideTheme !== undefined) return slideTheme;

  // 2. Layout-level theme override（罕见）
  depth += 1;
  if (depth > MAX_CHAIN_DEPTH) return undefined;
  const layout = sp.slideLayoutPart;
  if (layout === undefined) return undefined;
  const layoutTheme = tryTheme(layout.themePart);
  if (layoutTheme !== undefined) return layoutTheme;

  // 3. Master-level theme（典型路径）
  depth += 1;
  if (depth > MAX_CHAIN_DEPTH) return undefined;
  const master = layout.slideMasterPart;
  if (master === undefined) return undefined;
  return tryTheme(master.themePart);
}

/** 类型守卫工具：让外部代码不直接依赖 OpenXmlCompositeElement。 */
export function isComposite(el: OpenXmlElement): el is OpenXmlCompositeElement {
  return el instanceof OpenXmlCompositeElement;
}
