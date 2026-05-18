/**
 * Excel worksheet 的 drawing 容器 Part（part-level 关系 type 为 `.../drawing`）。
 *
 * 根元素是 `<xdr:wsDr>`（spreadsheetDrawing namespace）；内含若干 `<xdr:twoCellAnchor>`
 * / `<xdr:oneCellAnchor>` / `<xdr:absoluteAnchor>` 子，每个锚里挂一张图片 / shape /
 * chart 等。从 worksheet 通过 `<x:drawing r:id="..."/>` 引用本 Part；本 Part 再通过
 * part-level `relationships/image` 关系挂图片 ImagePart。
 *
 * 当前 codegen 没有 xdr namespace 的 typed 类（drawingml schema 只覆盖了 a:* main
 * 那一档），所以 root 用 OpenXmlUnknownElement 透传——读出来什么样、写回去就什么样，
 * 保 xlsx roundtrip 不破。Epic-13 的便捷 markup 助手负责构造锚节点。
 *
 * @see DocumentFormat.OpenXml.Packaging.DrawingsPart
 */

import type { ElementRegistry, OpenXmlElement } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";

const XDR_NS = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing";

export class DrawingPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.drawing+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, WsDrPlaceholder);
  }

  /** `<xdr:wsDr>` 根元素。 */
  get wsDr(): OpenXmlElement {
    return this.root;
  }

  set wsDr(value: OpenXmlElement) {
    this.root = value;
  }
}

/**
 * 给 TypedXmlPart 的 RootCtor 占位：新建场景下 root 是空 `<xdr:wsDr>` 带主流 ns 声明。
 * 三个 ns 一次性声明在根上，子锚节点不必再重复声明，bundle 字节更小。
 */
class WsDrPlaceholder extends OpenXmlUnknownElement {
  constructor() {
    super("xdr", "wsDr", XDR_NS);
    this.extendedAttributes.set("xmlns:xdr", XDR_NS);
    this.extendedAttributes.set("xmlns:a", "http://schemas.openxmlformats.org/drawingml/2006/main");
    this.extendedAttributes.set(
      "xmlns:r",
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    );
  }
}
