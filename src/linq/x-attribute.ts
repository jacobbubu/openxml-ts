/**
 * `XAttribute` —— 对位 .NET `System.Xml.Linq.XAttribute`。
 *
 * 表示 element 上的一个 attribute。本壳层只读，背后指向 OpenXmlElement 的
 * `extendedAttributes`（schema 标准属性也都打到 extendedAttributes 上序列化，
 * 我们的 LINQ 视图统一从那里读）。
 */

import type { XName } from "./x-name.js";

export class XAttribute {
  constructor(
    public readonly Name: XName,
    public readonly Value: string,
  ) {}

  toString(): string {
    return `${this.Name.toString()}="${this.Value}"`;
  }
}
