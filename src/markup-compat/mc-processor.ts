/**
 * Markup Compatibility (MC) 协商处理器。
 *
 * 实现 ISO/IEC 29500 Part 3 §10 规范的 MC 处理语义，镜像
 * .NET DocumentFormat.OpenXml SDK 的 MarkupCompatibilityProcessMode 行为。
 *
 * 处理内容：
 *  - `mc:AlternateContent` / `mc:Choice` / `mc:Fallback` — 按目标版本选择分支
 *  - `mc:Ignorable` — 可忽略的命名空间前缀（整个元素及其属性被删除）
 *  - `mc:ProcessContent` — 被忽略元素的子节点提升到父级
 *  - `mc:MustUnderstand` — 不理解则抛错
 *  - `mc:PreserveElements` / `mc:PreserveAttributes` — 排除忽略
 *
 * MC 属性本身（mc:Ignorable 等）在处理完成后被移除。
 */

import type { OpenXmlElementList } from "../element/element-list.js";
import { OpenXmlCompositeElement, type OpenXmlElement } from "../element/element.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import { type FileFormatVersions, isNamespaceUnderstood } from "./file-format-versions.js";

/** MC 命名空间 URI。 */
const MC_NS = "http://schemas.openxmlformats.org/markup-compatibility/2006";

/** MC 处理模式，镜像 .NET MarkupCompatibilityProcessMode。 */
export type McProcessMode = "NoProcess" | "ProcessAllParts" | "ProcessLoadedPartsOnly";

/** MC 处理设置，镜像 .NET MarkupCompatibilityProcessSettings。 */
export interface MarkupCompatibilityProcessSettings {
  /** 处理模式；默认 `"NoProcess"` 保持现有行为。 */
  readonly processMode: McProcessMode;
  /** 目标格式版本——决定哪些命名空间被「理解」。 */
  readonly targetFileFormatVersions: FileFormatVersions;
}

/** mc:MustUnderstand 违例时抛出的错误。 */
export class MarkupCompatibilityError extends Error {
  override readonly name = "MarkupCompatibilityError";
  readonly namespaceUri: string;

  constructor(namespaceUri: string) {
    super(`mc:MustUnderstand: namespace "${namespaceUri}" is not understood by the target version`);
    this.namespaceUri = namespaceUri;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// 内部辅助
// ────────────────────────────────────────────────────────────────────────────

/** 解析空格分隔的前缀列表为数组。 */
function parsePrefixList(value: string): string[] {
  return value
    .trim()
    .split(/\s+/)
    .filter((s) => s.length > 0);
}

/** 从元素的 extendedAttributes 读取 MC 属性值（本地名，mc: 前缀）。 */
function getMcAttr(el: OpenXmlElement, localName: string): string | undefined {
  // MC 属性形如 `mc:Ignorable`
  const key = `mc:${localName}`;
  return el.extendedAttributes.get(key);
}

/** 删除元素上的 MC 属性（处理后清理）。 */
function removeMcAttrs(el: OpenXmlElement): void {
  const MC_ATTR_NAMES = [
    "mc:Ignorable",
    "mc:MustUnderstand",
    "mc:ProcessContent",
    "mc:PreserveElements",
    "mc:PreserveAttributes",
  ];
  for (const key of MC_ATTR_NAMES) {
    el.extendedAttributes.delete(key);
  }
}

/**
 * 构建 prefix → namespaceUri 映射，从元素的 extendedAttributes 中收集所有 `xmlns:*`。
 */
function collectNsMap(el: OpenXmlElement): Map<string, string> {
  const map = new Map<string, string>();
  for (const [k, v] of el.extendedAttributes) {
    if (k.startsWith("xmlns:")) {
      map.set(k.slice(6), v);
    } else if (k === "xmlns") {
      map.set("", v);
    }
  }
  return map;
}

/**
 * 解析前缀列表，利用当前作用域 nsMap 将前缀转换为 URI 数组。
 * 前缀不在作用域内时保留前缀字符串（表示未知，会导致后续不理解）。
 */
function prefixesToUris(prefixes: string[], nsMap: Map<string, string>): string[] {
  return prefixes.map((p) => nsMap.get(p) ?? `__unknown__:${p}`);
}

// ────────────────────────────────────────────────────────────────────────────
// MC 处理上下文
// ────────────────────────────────────────────────────────────────────────────

interface McContext {
  /** 当前元素作用域内的 ignorable 前缀 → URI */
  ignorable: Set<string>;
  /** processContent (ns URI → Set<localName | '*'>) — 匹配时提升子节点 */
  processContent: Map<string, Set<string>>;
  /** preserveElements (ns URI → Set<localName | '*'>) — 排除忽略 */
  preserveElements: Map<string, Set<string>>;
  /** preserveAttributes (ns URI → Set<localName | '*'>) */
  preserveAttributes: Map<string, Set<string>>;
  /** 当前作用域 prefix → URI 映射（用于 prefix 解析）*/
  nsMap: Map<string, string>;
}

function emptyContext(): McContext {
  return {
    ignorable: new Set(),
    processContent: new Map(),
    preserveElements: new Map(),
    preserveAttributes: new Map(),
    nsMap: new Map(),
  };
}

/**
 * 解析 mc:PreserveElements / mc:PreserveAttributes 值。
 * 格式：`prefix:localName prefix:* …`
 */
function parsePreserveList(value: string, nsMap: Map<string, string>): Map<string, Set<string>> {
  const result = new Map<string, Set<string>>();
  for (const token of parsePrefixList(value)) {
    const colon = token.indexOf(":");
    if (colon === -1) continue;
    const prefix = token.slice(0, colon);
    const localName = token.slice(colon + 1);
    const uri = nsMap.get(prefix) ?? `__unknown__:${prefix}`;
    let set = result.get(uri);
    if (set === undefined) {
      set = new Set();
      result.set(uri, set);
    }
    set.add(localName);
  }
  return result;
}

/** 合并两个 preserve map。 */
function mergePreserve(
  parent: Map<string, Set<string>>,
  local: Map<string, Set<string>>,
): Map<string, Set<string>> {
  if (local.size === 0) return parent;
  const merged = new Map(parent);
  for (const [uri, names] of local) {
    const existing = merged.get(uri);
    if (existing === undefined) {
      merged.set(uri, new Set(names));
    } else {
      for (const n of names) existing.add(n);
    }
  }
  return merged;
}

/** 检查某元素是否被 preserveElements 保护（不应被忽略）。 */
function isPreserved(el: OpenXmlElement, preserve: Map<string, Set<string>>): boolean {
  const set = preserve.get(el.namespaceUri);
  if (set === undefined) return false;
  return set.has("*") || set.has(el.localName);
}

// ────────────────────────────────────────────────────────────────────────────
// 主处理函数
// ────────────────────────────────────────────────────────────────────────────

/**
 * 处理 `mc:AlternateContent` 元素，返回选中分支的子节点列表（已处理）。
 * 若无匹配 Choice 且无 Fallback，返回空数组。
 */
function processAlternateContent(
  el: OpenXmlUnknownElement,
  target: FileFormatVersions,
  ctx: McContext,
): OpenXmlElement[] {
  const choices: OpenXmlUnknownElement[] = [];
  let fallback: OpenXmlUnknownElement | undefined;

  for (const child of el.children) {
    if (!(child instanceof OpenXmlUnknownElement)) continue;
    if (child.namespaceUri !== MC_NS) continue;
    if (child.localName === "Choice") {
      choices.push(child);
    } else if (child.localName === "Fallback") {
      fallback = child;
    }
  }

  // 尝试每个 Choice
  for (const choice of choices) {
    const requiresAttr =
      choice.extendedAttributes.get("Requires") ?? choice.extendedAttributes.get("mc:Requires");
    if (requiresAttr === undefined) {
      // 无 Requires 属性的 Choice 视为无条件匹配（规范 §10.1.2）
      return processChildren(choice, target, ctx);
    }
    const prefixes = parsePrefixList(requiresAttr);
    const uris = prefixesToUris(prefixes, ctx.nsMap);
    const allUnderstood = uris.every((uri) => isNamespaceUnderstood(uri, target));
    if (allUnderstood) {
      return processChildren(choice, target, ctx);
    }
  }

  // 无匹配 Choice → 用 Fallback
  if (fallback !== undefined) {
    return processChildren(fallback, target, ctx);
  }

  return [];
}

/**
 * 递归处理复合元素的子节点列表，返回处理后保留的子节点数组。
 * 注意：返回的节点已从原父节点移除（parent=undefined）。
 */
function processChildren(
  parent: OpenXmlCompositeElement,
  target: FileFormatVersions,
  parentCtx: McContext,
): OpenXmlElement[] {
  const result: OpenXmlElement[] = [];
  const snapshot = parent.children.toArray();

  for (const child of snapshot) {
    const processed = processElement(child, target, parentCtx);
    result.push(...processed);
  }
  return result;
}

/**
 * 处理单个元素，返回替换它的节点列表（0 = 删除，1 = 保留/替换，N = 展开）。
 */
function processElement(
  el: OpenXmlElement,
  target: FileFormatVersions,
  ctx: McContext,
): OpenXmlElement[] {
  // ── 构建当前元素的作用域 context ─────────────────────────────────────────
  const localNsMap = collectNsMap(el);
  const mergedNsMap = localNsMap.size === 0 ? ctx.nsMap : new Map([...ctx.nsMap, ...localNsMap]);

  // 解析本元素声明的 MC 属性
  const ignorableStr = getMcAttr(el, "Ignorable");
  const mustUnderstandStr = getMcAttr(el, "MustUnderstand");
  const processContentStr = getMcAttr(el, "ProcessContent");
  const preserveElemsStr = getMcAttr(el, "PreserveElements");
  const preserveAttrsStr = getMcAttr(el, "PreserveAttributes");

  // mc:MustUnderstand — 不理解则立即抛错
  if (mustUnderstandStr !== undefined) {
    const prefixes = parsePrefixList(mustUnderstandStr);
    const uris = prefixesToUris(prefixes, mergedNsMap);
    for (const uri of uris) {
      if (!isNamespaceUnderstood(uri, target)) {
        throw new MarkupCompatibilityError(uri);
      }
    }
  }

  // 构建新的 ignorable / processContent / preserve sets（继承 + 本层追加）
  // MC 规范：若目标版本「理解」某命名空间，则该命名空间不应被忽略，
  // 即使文档将其声明在 mc:Ignorable 中（仅告知不理解该 ns 的处理器可忽略它）。
  const newIgnorable = new Set(ctx.ignorable);
  if (ignorableStr !== undefined) {
    for (const prefix of parsePrefixList(ignorableStr)) {
      const uri = mergedNsMap.get(prefix) ?? `__unknown__:${prefix}`;
      if (!isNamespaceUnderstood(uri, target)) {
        newIgnorable.add(uri);
      }
    }
  }

  const newProcessContent = mergePreserve(
    ctx.processContent,
    processContentStr !== undefined ? parsePreserveList(processContentStr, mergedNsMap) : new Map(),
  );

  const newPreserveElements = mergePreserve(
    ctx.preserveElements,
    preserveElemsStr !== undefined ? parsePreserveList(preserveElemsStr, mergedNsMap) : new Map(),
  );

  const newPreserveAttributes = mergePreserve(
    ctx.preserveAttributes,
    preserveAttrsStr !== undefined ? parsePreserveList(preserveAttrsStr, mergedNsMap) : new Map(),
  );

  const childCtx: McContext = {
    ignorable: newIgnorable,
    processContent: newProcessContent,
    preserveElements: newPreserveElements,
    preserveAttributes: newPreserveAttributes,
    nsMap: mergedNsMap,
  };

  // ── mc:AlternateContent 特殊处理 ─────────────────────────────────────────
  if (el.namespaceUri === MC_NS && el.localName === "AlternateContent") {
    if (!(el instanceof OpenXmlUnknownElement)) return [el];
    const chosen = processAlternateContent(el, target, childCtx);
    // 断开原父节点
    if (el.parent !== undefined) el.parent.remove(el);
    return chosen;
  }

  // ── 忽略判定 ─────────────────────────────────────────────────────────────
  const isIgnorableNs = newIgnorable.has(el.namespaceUri);
  const preserved = isPreserved(el, newPreserveElements);

  if (isIgnorableNs && !preserved) {
    // 从父节点移除
    if (el.parent !== undefined) el.parent.remove(el);

    // mc:ProcessContent — 提升子节点（按 ns URI + localName 或 * 匹配）
    if (isPreserved(el, newProcessContent) && el instanceof OpenXmlCompositeElement) {
      return processChildren(el, target, childCtx);
    }
    return [];
  }

  // ── 保留元素，但仍需处理其子节点 + 清理 MC 属性 ────────────────────────
  removeMcAttrs(el);

  // 清理 ignorable 命名空间上的属性（非 preserve）
  cleanIgnorableAttributes(el, newIgnorable, newPreserveAttributes, mergedNsMap);

  if (el instanceof OpenXmlCompositeElement) {
    const snapshot = el.children.toArray();
    for (const child of snapshot) {
      const replacements = processElement(child, target, childCtx);
      if (replacements.length === 1 && replacements[0] === child) {
        // 未变化，保持原位
        continue;
      }
      // 替换：先移除原 child，再在同位置插入替换节点
      const idx = indexOf(el.children, child);
      el.children.remove(child);
      for (let i = 0; i < replacements.length; i++) {
        const rep = replacements[i];
        if (rep === undefined) continue;
        // 已被其他地方移除 parent，直接 append（insertBefore 需兄弟节点存在）
        appendAtIndex(el, rep, idx + i, el.children.toArray());
      }
    }
  }

  return [el];
}

/** 找到 child 在 list 中的索引。 */
function indexOf(list: OpenXmlElementList, child: OpenXmlElement): number {
  let i = 0;
  for (const item of list) {
    if (item === child) return i;
    i++;
  }
  return -1;
}

/** 在 parent 的 children 中，在 index 处插入 child（通过 insertBefore 或 append）。 */
function appendAtIndex(
  parent: OpenXmlCompositeElement,
  child: OpenXmlElement,
  index: number,
  currentChildren: OpenXmlElement[],
): void {
  // 先确保 child 没有旧父
  if (child.parent !== undefined && child.parent !== parent) {
    child.parent.remove(child);
  }
  const sibling = currentChildren[index];
  if (sibling !== undefined && sibling.parent === parent) {
    parent.insertBefore(child, sibling);
  } else {
    parent.appendChild(child);
  }
}

/**
 * 清理元素上属于 ignorable 命名空间的属性（非 preserve 的）。
 * MC 属性（mc:*）已由 removeMcAttrs 删除；此处处理其他命名空间属性如 `x14:foo="…"`。
 * nsMap 为继承的命名空间映射，用于解析属性前缀。
 */
function cleanIgnorableAttributes(
  el: OpenXmlElement,
  ignorable: Set<string>,
  preserveAttrs: Map<string, Set<string>>,
  nsMap: Map<string, string>,
): void {
  const toRemove: string[] = [];

  // 合并继承 nsMap 与本元素声明的命名空间（本元素优先）
  const localNsMap = collectNsMap(el);
  const effectiveNsMap = localNsMap.size === 0 ? nsMap : new Map([...nsMap, ...localNsMap]);

  for (const [key] of el.extendedAttributes) {
    if (key.startsWith("xmlns")) continue; // 保留命名空间声明
    const colon = key.indexOf(":");
    if (colon === -1) continue; // 无前缀属性不属于任何命名空间
    const prefix = key.slice(0, colon);
    const localName = key.slice(colon + 1);
    const uri = effectiveNsMap.get(prefix);
    if (uri === undefined) continue; // 无法解析前缀
    if (!ignorable.has(uri)) continue; // 不是 ignorable 命名空间
    // 检查是否 preserved
    const preserved = preserveAttrs.get(uri);
    if (preserved !== undefined && (preserved.has("*") || preserved.has(localName))) continue;
    toRemove.push(key);
  }
  for (const key of toRemove) {
    el.extendedAttributes.delete(key);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// 公共 API
// ────────────────────────────────────────────────────────────────────────────

/**
 * 对已反序列化的元素树执行 MC 协商处理（纯树变换，原地修改）。
 *
 * @param root - 元素树根节点
 * @param settings - MC 处理设置
 * @returns 处理后的根节点（AlternateContent 替换可能改变根，但通常不会）
 * @throws {MarkupCompatibilityError} 遇到不理解的 mc:MustUnderstand 命名空间时
 */
export function processMarkupCompatibility(
  root: OpenXmlElement,
  settings: MarkupCompatibilityProcessSettings,
): OpenXmlElement {
  if (settings.processMode === "NoProcess") return root;

  const ctx = emptyContext();
  // 为根节点收集 nsMap
  ctx.nsMap.clear();
  for (const [k, v] of collectNsMap(root)) {
    ctx.nsMap.set(k, v);
  }

  const results = processElement(root, settings.targetFileFormatVersions, ctx);
  // 通常 root 就是 results[0]；若 root 本身是 AlternateContent 则可能不同
  return results[0] ?? root;
}
