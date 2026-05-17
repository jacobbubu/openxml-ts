/**
 * `openxml-ts/linq` —— LINQ to XML 兼容层（Epic-5）。
 *
 * 把 .NET `System.Xml.Linq` 同名 type 映射到 openxml-ts 现有 element 树之上：
 *
 * ```ts
 * import { XElement, XName, XNamespace } from "openxml-ts/linq";
 *
 * const W = XNamespace.Get("http://schemas.openxmlformats.org/wordprocessingml/2006/main");
 * const xml = new XElement(doc.mainDocumentPart!.document);
 * for (const p of xml.Descendants(W.GetName("p"))) {
 *   console.log(p.Value);
 * }
 * ```
 *
 * 子 entry / size-limit 守护：Story-5.x 整个 Epic 结束前 root entry 不暴露 LINQ
 * 类型，避免拉大 bundle。
 */

export { Enumerable } from "./enumerable.js";
export { XAttribute } from "./x-attribute.js";
export { XElement } from "./x-element.js";
export { XName } from "./x-name.js";
export { XNamespace } from "./x-namespace.js";
