/**
 * 把一棵 OpenXmlElement 树转成稳定的结构化 JSON 快照。
 *
 * 用途：Story-2.8 element-tree golden 对比；序列化稳定（属性按字典序、
 * children 按出现顺序）。
 */

import { OpenXmlCompositeElement, type OpenXmlElement } from "../../src/index.js";

export interface ElementSnapshot {
  readonly qname: string;
  readonly className: string;
  readonly namespaceUri?: string;
  readonly typedAttributes?: Record<string, string>;
  readonly extendedAttributes?: Record<string, string>;
  readonly text?: string;
  readonly children?: ElementSnapshot[];
}

const RESERVED_KEYS = new Set([
  "parent",
  "children",
  "extendedAttributes",
  "text",
  "localName",
  "prefix",
  "namespaceUri",
]);

export function snapshotElement(el: OpenXmlElement): ElementSnapshot {
  const snap: {
    qname: string;
    className: string;
    namespaceUri?: string;
    typedAttributes?: Record<string, string>;
    extendedAttributes?: Record<string, string>;
    text?: string;
    children?: ElementSnapshot[];
  } = {
    qname: el.qualifiedName,
    className: el.constructor.name,
  };
  if (el.namespaceUri.length > 0) snap.namespaceUri = el.namespaceUri;

  // 抓 typed 属性：codegen 生成的字段保留 mutable 引用到 StringValue / EnumValue / 等
  const typed: Record<string, string> = {};
  for (const [key, value] of Object.entries(el)) {
    if (RESERVED_KEYS.has(key)) continue;
    if (value === undefined || value === null) continue;
    if (typeof value === "object" && "toString" in (value as object)) {
      const s = String(value);
      if (s !== "[object Object]") typed[key] = s;
    }
  }
  const typedKeys = Object.keys(typed).sort();
  if (typedKeys.length > 0) {
    snap.typedAttributes = Object.fromEntries(typedKeys.map((k) => [k, typed[k] as string]));
  }

  // 扩展属性（含 xmlns:* 与未知属性）
  if (el.extendedAttributes.size > 0) {
    const sorted = [...el.extendedAttributes.entries()].sort(([a], [b]) => a.localeCompare(b));
    snap.extendedAttributes = Object.fromEntries(sorted);
  }

  // Text（Leaf 或 UnknownElement 的 mixed content）
  const text = (el as { text?: string }).text;
  if (text !== undefined) snap.text = text;

  // Children
  if (el instanceof OpenXmlCompositeElement && el.children.count > 0) {
    snap.children = [...el.children].map((c) => snapshotElement(c));
  }

  return snap;
}
