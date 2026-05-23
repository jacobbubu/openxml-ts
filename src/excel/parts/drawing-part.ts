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
 * Epic-66：通过 part-level `relationships/chart` 关系暴露 `chartParts`，可选传入
 * `IPackage` 包句柄以解析 Part URI。
 *
 * @see DocumentFormat.OpenXml.Packaging.DrawingsPart
 */

import type { ElementRegistry, OpenXmlElement } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import type { PartUri } from "../../packaging/interfaces/types.js";
import { ChartPart } from "../../parts/chart-part.js";
import { WebExtensionPart } from "../../parts/generated/web-extension-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";

const XDR_NS = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing";

export class DrawingPart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.drawing+xml";

  /** 已解析的 ChartPart 缓存——首次访问后冻结。 */
  private _chartParts: ChartPart[] | undefined;
  /** 已解析的 WebExtensionPart 缓存——首次访问后冻结。 */
  private _webExtensionParts: WebExtensionPart[] | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg?: IPackage,
  ) {
    super(part, registry, WsDrPlaceholder);
  }

  /** `<xdr:wsDr>` 根元素。 */
  get wsDr(): OpenXmlElement {
    return this.root;
  }

  set wsDr(value: OpenXmlElement) {
    this.root = value;
  }

  /**
   * 本 DrawingPart 通过 part-level 关系引用的所有 ChartPart（Epic-66）。
   * 需要传入 `pkg` 构造参数才能解析 Part URI；未传时返回空数组。
   */
  get chartParts(): readonly ChartPart[] {
    if (this._chartParts !== undefined) return this._chartParts;
    const out: ChartPart[] = [];
    if (this.pkg !== undefined) {
      for (const rel of this.part.relationships) {
        if (rel.targetMode !== "internal") continue;
        if (!relationshipTypeMatches(rel.type, ChartPart.relationshipType)) continue;
        const targetUri = resolveRelativePartUri(this.part.uri, rel.target) as PartUri | undefined;
        if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
        out.push(new ChartPart(this.pkg.getPart(targetUri)));
      }
    }
    this._chartParts = out;
    return out;
  }

  /**
   * 本 DrawingPart 通过 part-level 关系引用的所有 WebExtensionPart。
   * 需要传入 `pkg` 构造参数才能解析 Part URI；未传时返回空数组。
   *
   * @see DocumentFormat.OpenXml.Packaging.DrawingsPart.WebExtensionParts
   */
  get webExtensionParts(): readonly WebExtensionPart[] {
    if (this._webExtensionParts !== undefined) return this._webExtensionParts;
    const out: WebExtensionPart[] = [];
    if (this.pkg !== undefined) {
      for (const rel of this.part.relationships) {
        if (rel.targetMode !== "internal") continue;
        if (!relationshipTypeMatches(rel.type, WebExtensionPart.relationshipType)) continue;
        const targetUri = resolveRelativePartUri(this.part.uri, rel.target) as PartUri | undefined;
        if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
        const p = new WebExtensionPart(this.pkg.getPart(targetUri), this.registry);
        if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
        out.push(p);
      }
    }
    this._webExtensionParts = out;
    return out;
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
