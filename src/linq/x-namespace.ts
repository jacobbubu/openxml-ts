/**
 * `XNamespace` —— 对位 .NET `System.Xml.Linq.XNamespace`。
 *
 * 表示一个 XML 命名空间 URI。常用工厂 `XNamespace.Get(uri)`；
 * `XNamespace.None` 是空命名空间。
 *
 * .NET 里 `XNamespace + "localName"` 用 `+` 运算符生成 XName，
 * TS 无运算符重载，改用 `.GetName(localName)` 等价方法或 `XName.Get(namespace, name)`。
 */

import { XName } from "./x-name.js";

const cache = new Map<string, XNamespace>();

export class XNamespace {
  /** 空命名空间——对位 .NET `XNamespace.None`。 */
  static readonly None: XNamespace = new XNamespace("");

  private constructor(public readonly NamespaceName: string) {}

  /** 工厂：按 URI 取唯一 instance（intern 同源 .NET）。 */
  static Get(uri: string): XNamespace {
    if (uri.length === 0) return XNamespace.None;
    const cached = cache.get(uri);
    if (cached !== undefined) return cached;
    const ns = new XNamespace(uri);
    cache.set(uri, ns);
    return ns;
  }

  /** 在本命名空间下取一个 XName。等价于 .NET 的 `ns + "name"`。 */
  GetName(localName: string): XName {
    return XName.Get(this.NamespaceName, localName);
  }

  toString(): string {
    return this.NamespaceName;
  }
}
