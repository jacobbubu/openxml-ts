/**
 * `XName` —— 对位 .NET `System.Xml.Linq.XName`。
 *
 * 表示一个限定名 `(namespaceUri, localName)`。常用 `XName.Get(ns, name)` 工厂
 * 或 `XName.Get("{uri}name")`（expanded name 字符串形式）。
 *
 * 实例 intern：同 `(ns, localName)` 多次 Get 返回同一对象。
 */

import { XNamespace } from "./x-namespace.js";

const cache = new Map<string, XName>();

function keyOf(ns: string, localName: string): string {
  return `${ns}|${localName}`;
}

export class XName {
  private constructor(
    public readonly NamespaceName: string,
    public readonly LocalName: string,
  ) {}

  /** 所属 XNamespace（懒查 intern 表）。 */
  get Namespace(): XNamespace {
    return XNamespace.Get(this.NamespaceName);
  }

  /**
   * 工厂：
   * - `Get(localName)` —— 仅 localName，命名空间空；
   * - `Get(ns, localName)` —— 显式命名空间；
   * - `Get("{ns}localName")` —— expanded name 字符串解析（.NET 同款）。
   */
  static Get(localName: string): XName;
  static Get(namespace: string | XNamespace, localName: string): XName;
  static Get(arg1: string | XNamespace, arg2?: string): XName {
    let ns: string;
    let local: string;
    if (arg2 === undefined) {
      const s = String(arg1);
      if (s.startsWith("{")) {
        const end = s.indexOf("}");
        if (end === -1) throw new Error(`XName.Get: malformed expanded name "${s}"`);
        ns = s.slice(1, end);
        local = s.slice(end + 1);
      } else {
        ns = "";
        local = s;
      }
    } else {
      ns = typeof arg1 === "string" ? arg1 : arg1.NamespaceName;
      local = arg2;
    }
    const key = keyOf(ns, local);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;
    const name = new XName(ns, local);
    cache.set(key, name);
    return name;
  }

  /** Expanded name 形式：`{ns}localName`（ns 空时仅 localName）。 */
  toString(): string {
    return this.NamespaceName.length === 0
      ? this.LocalName
      : `{${this.NamespaceName}}${this.LocalName}`;
  }

  /** 与 .NET 一致：XName 是值型相等（按 ns + localName 比对）。 */
  Equals(other: XName | undefined): boolean {
    if (other === undefined) return false;
    return this.NamespaceName === other.NamespaceName && this.LocalName === other.LocalName;
  }
}
