/**
 * OpenXmlElement 树 → XML 字符串。
 *
 * 调用 {@link OpenXmlElement.writeTo}（各子类负责自身序列化逻辑）。本模块是 thin
 * 包装层——拼装 XML 声明 + 元素树字节流。
 *
 * Epic-98: 序列化前走一遍子树，收集所有用到的 namespace prefix（元素 prefix 与
 * attribute qname 中的 prefix），计算缺失的 `xmlns:<prefix>` 声明，并在序列化
 * root element 的开标签时注入这些声明——不修改元素树本身。
 */

import { XmlWriter } from "../packaging/xml/index.js";
import { OpenXmlCompositeElement, type OpenXmlElement } from "./element.js";
import { KNOWN_PREFIX_TO_URI } from "./namespace-prefix-map.js";

export interface SerializeOptions {
  /** 是否输出 `<?xml ... ?>` 声明。默认 `true`。 */
  readonly withDeclaration?: boolean;
}

export function serialize(element: OpenXmlElement, options: SerializeOptions = {}): string {
  // Epic-98: 计算 root element 缺失的 xmlns 声明（不修改 element 树）
  const extraXmlns = computeExtraXmlns(element);

  const writer = new XmlWriter();
  if (options.withDeclaration !== false) writer.declaration();

  if (extraXmlns.length === 0) {
    // 无需注入——走原有路径
    element.writeTo(writer);
  } else {
    // 需要注入：用 InjectingXmlWriter 包装，仅对第一个元素 open/empty 调用注入额外属性
    const injecting = new InjectingXmlWriter(writer, extraXmlns);
    element.writeTo(injecting);
  }

  return writer.toString();
}

// ---------------------------------------------------------------------------
// Namespace declaration pre-pass（Epic-98）
// ---------------------------------------------------------------------------

/**
 * 计算 `root` 子树中所有用到的 namespace prefix，返回尚未在 `root` 上声明的
 * `xmlns:<prefix>` 额外属性列表。不修改任何元素。
 */
function computeExtraXmlns(root: OpenXmlElement): Array<[string, string]> {
  // 1. 已在 root.extendedAttributes 声明的前缀集合
  const alreadyDeclared = new Set<string>();
  for (const key of root.extendedAttributes.keys()) {
    if (key === "xmlns") {
      alreadyDeclared.add("");
    } else if (key.startsWith("xmlns:")) {
      alreadyDeclared.add(key.slice(6));
    }
  }

  // 2. 遍历整棵子树收集所有用到的前缀
  const needed = new Set<string>();
  collectUsedPrefixes(root, needed);

  // 3. 过滤掉已声明的，解析 URI，生成额外 xmlns 列表
  const extra: Array<[string, string]> = [];
  for (const prefix of needed) {
    if (alreadyDeclared.has(prefix)) continue;
    const uri = KNOWN_PREFIX_TO_URI[prefix];
    if (uri === undefined) continue; // 未知 prefix，不猜
    extra.push([`xmlns:${prefix}`, uri]);
    alreadyDeclared.add(prefix); // 防止重复
  }
  return extra;
}

/**
 * DFS 遍历 `element` 及其子孙，把所有需要 xmlns 声明的前缀加入 `out`。
 */
function collectUsedPrefixes(element: OpenXmlElement, out: Set<string>): void {
  // 元素自身的 prefix
  addPrefix(element.prefix, out);

  // 元素的属性 qname 中的 prefix（通过 any 调用 protected collectAttributes——
  // protected 仅是 TS 编译期约束，运行时方法完全可访问；此处是框架内部实现，
  // 语义等价于 friend-class 访问）
  // biome-ignore lint/suspicious/noExplicitAny: internal friend-class access to protected method
  const attrs = (element as any).collectAttributes() as Array<[string, string]>;
  for (const [qname] of attrs) {
    // 跳过 xmlns 声明本身
    if (qname === "xmlns" || qname.startsWith("xmlns:")) continue;
    const colon = qname.indexOf(":");
    if (colon > 0) {
      addPrefix(qname.slice(0, colon), out);
    }
  }

  // 递归子节点
  if (element instanceof OpenXmlCompositeElement) {
    for (const child of element.children) {
      collectUsedPrefixes(child, out);
    }
  }
}

function addPrefix(prefix: string, out: Set<string>): void {
  if (prefix.length === 0) return;
  if (prefix === "xmlns" || prefix === "xml") return;
  out.add(prefix);
}

// ---------------------------------------------------------------------------
// InjectingXmlWriter（Epic-98）
// ---------------------------------------------------------------------------

/**
 * XmlWriter ラッパー——最初の `open` または `empty` 呼び出し時だけ追加の属性を注入する。
 * root element の開始タグに `xmlns:prefix` を差し込んで、あとは全て委譲する。
 *
 * XmlWriter wrapper that injects `extraAttrs` into the very first `open` or
 * `empty` call, then delegates all subsequent calls unchanged to the inner writer.
 * This avoids mutating the element tree.
 */
class InjectingXmlWriter extends XmlWriter {
  private readonly inner: XmlWriter;
  private readonly extraAttrs: Array<[string, string]>;
  private injected = false;

  constructor(inner: XmlWriter, extraAttrs: Array<[string, string]>) {
    // We never use InjectingXmlWriter's own parts buffer; every method
    // immediately forwards to `inner`. The super() call is required by JS.
    super();
    this.inner = inner;
    this.extraAttrs = extraAttrs;
  }

  override declaration(): this {
    this.inner.declaration();
    return this;
  }

  override empty(name: string, attrs?: Iterable<readonly [string, string | undefined]>): this {
    if (!this.injected) {
      this.injected = true;
      this.inner.empty(name, this.mergeAttrs(attrs));
    } else {
      this.inner.empty(name, attrs);
    }
    return this;
  }

  override open(name: string, attrs?: Iterable<readonly [string, string | undefined]>): this {
    if (!this.injected) {
      this.injected = true;
      this.inner.open(name, this.mergeAttrs(attrs));
    } else {
      this.inner.open(name, attrs);
    }
    return this;
  }

  override close(name: string): this {
    this.inner.close(name);
    return this;
  }

  override text(value: string): this {
    this.inner.text(value);
    return this;
  }

  override raw(snippet: string): this {
    this.inner.raw(snippet);
    return this;
  }

  override toString(): string {
    return this.inner.toString();
  }

  private mergeAttrs(
    attrs?: Iterable<readonly [string, string | undefined]>,
  ): Array<readonly [string, string | undefined]> {
    const merged: Array<readonly [string, string | undefined]> = [];
    if (attrs !== undefined) {
      for (const pair of attrs) merged.push(pair);
    }
    for (const [k, v] of this.extraAttrs) {
      merged.push([k, v]);
    }
    return merged;
  }
}
