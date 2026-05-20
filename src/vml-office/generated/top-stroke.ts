// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.TopStroke

import {
  DecimalValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Text Box Top Stroke.
 *
 * Element: `o:top` */
export class TopStroke extends OpenXmlLeafElement {
  override readonly localName = "top" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Stroke Toggle (:on) */
  on: StringValue | undefined;

  /** Stroke Weight (:weight) */
  weight: StringValue | undefined;

  /** Stroke Color (:color) */
  color: StringValue | undefined;

  /** Stroke Alternate Pattern Color (:color2) */
  color2: StringValue | undefined;

  /** Stroke Opacity (:opacity) */
  opacity: StringValue | undefined;

  /** Stroke Line Style (:linestyle) */
  lineStyle: StringValue | undefined;

  /** Miter Joint Limit (:miterlimit) */
  miterLimit: DecimalValue | undefined;

  /** Line End Join Style) (:joinstyle) */
  joinStyle: StringValue | undefined;

  /** Line End Cap (:endcap) */
  endCap: StringValue | undefined;

  /** Stroke Dash Pattern (:dashstyle) */
  dashStyle: StringValue | undefined;

  /** Inset Border From Path (:insetpen) */
  insetPen: StringValue | undefined;

  /** Stroke Image Style (:filltype) */
  fillType: StringValue | undefined;

  /** Stroke Image Location (:src) */
  source: StringValue | undefined;

  /** Stroke Image Aspect Ratio (:imageaspect) */
  imageAspect: StringValue | undefined;

  /** Stroke Image Size (:imagesize) */
  imageSize: StringValue | undefined;

  /** Stoke Image Alignment (:imagealignshape) */
  imageAlignShape: StringValue | undefined;

  /** Line Start Arrowhead (:startarrow) */
  startArrow: StringValue | undefined;

  /** Line Start Arrowhead Width (:startarrowwidth) */
  startArrowWidth: StringValue | undefined;

  /** Line Start Arrowhead Length (:startarrowlength) */
  startArrowLength: StringValue | undefined;

  /** Line End Arrowhead (:endarrow) */
  endArrow: StringValue | undefined;

  /** Line End Arrowhead Width (:endarrowwidth) */
  endArrowWidth: StringValue | undefined;

  /** Line End Arrowhead Length (:endarrowlength) */
  endArrowLength: StringValue | undefined;

  /** Original Image Reference (o:href) */
  href: StringValue | undefined;

  /** Alternate Image Reference (o:althref) */
  alternateImageReference: StringValue | undefined;

  /** Stroke Title (o:title) */
  title: StringValue | undefined;

  /** Force Dashed Outline (o:forcedash) */
  forceDash: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "weight": this.weight = StringValue.parse(value); return;
      case "color": this.color = StringValue.parse(value); return;
      case "color2": this.color2 = StringValue.parse(value); return;
      case "opacity": this.opacity = StringValue.parse(value); return;
      case "linestyle": this.lineStyle = StringValue.parse(value); return;
      case "miterlimit": this.miterLimit = DecimalValue.parse(value); return;
      case "joinstyle": this.joinStyle = StringValue.parse(value); return;
      case "endcap": this.endCap = StringValue.parse(value); return;
      case "dashstyle": this.dashStyle = StringValue.parse(value); return;
      case "insetpen": this.insetPen = StringValue.parse(value); return;
      case "filltype": this.fillType = StringValue.parse(value); return;
      case "src": this.source = StringValue.parse(value); return;
      case "imageaspect": this.imageAspect = StringValue.parse(value); return;
      case "imagesize": this.imageSize = StringValue.parse(value); return;
      case "imagealignshape": this.imageAlignShape = StringValue.parse(value); return;
      case "startarrow": this.startArrow = StringValue.parse(value); return;
      case "startarrowwidth": this.startArrowWidth = StringValue.parse(value); return;
      case "startarrowlength": this.startArrowLength = StringValue.parse(value); return;
      case "endarrow": this.endArrow = StringValue.parse(value); return;
      case "endarrowwidth": this.endArrowWidth = StringValue.parse(value); return;
      case "endarrowlength": this.endArrowLength = StringValue.parse(value); return;
      case "o:href": this.href = StringValue.parse(value); return;
      case "o:althref": this.alternateImageReference = StringValue.parse(value); return;
      case "o:title": this.title = StringValue.parse(value); return;
      case "o:forcedash": this.forceDash = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.weight !== undefined) out.push(["weight", this.weight.toString()]);
    if (this.color !== undefined) out.push(["color", this.color.toString()]);
    if (this.color2 !== undefined) out.push(["color2", this.color2.toString()]);
    if (this.opacity !== undefined) out.push(["opacity", this.opacity.toString()]);
    if (this.lineStyle !== undefined) out.push(["linestyle", this.lineStyle.toString()]);
    if (this.miterLimit !== undefined) out.push(["miterlimit", this.miterLimit.toString()]);
    if (this.joinStyle !== undefined) out.push(["joinstyle", this.joinStyle.toString()]);
    if (this.endCap !== undefined) out.push(["endcap", this.endCap.toString()]);
    if (this.dashStyle !== undefined) out.push(["dashstyle", this.dashStyle.toString()]);
    if (this.insetPen !== undefined) out.push(["insetpen", this.insetPen.toString()]);
    if (this.fillType !== undefined) out.push(["filltype", this.fillType.toString()]);
    if (this.source !== undefined) out.push(["src", this.source.toString()]);
    if (this.imageAspect !== undefined) out.push(["imageaspect", this.imageAspect.toString()]);
    if (this.imageSize !== undefined) out.push(["imagesize", this.imageSize.toString()]);
    if (this.imageAlignShape !== undefined) out.push(["imagealignshape", this.imageAlignShape.toString()]);
    if (this.startArrow !== undefined) out.push(["startarrow", this.startArrow.toString()]);
    if (this.startArrowWidth !== undefined) out.push(["startarrowwidth", this.startArrowWidth.toString()]);
    if (this.startArrowLength !== undefined) out.push(["startarrowlength", this.startArrowLength.toString()]);
    if (this.endArrow !== undefined) out.push(["endarrow", this.endArrow.toString()]);
    if (this.endArrowWidth !== undefined) out.push(["endarrowwidth", this.endArrowWidth.toString()]);
    if (this.endArrowLength !== undefined) out.push(["endarrowlength", this.endArrowLength.toString()]);
    if (this.href !== undefined) out.push(["o:href", this.href.toString()]);
    if (this.alternateImageReference !== undefined) out.push(["o:althref", this.alternateImageReference.toString()]);
    if (this.title !== undefined) out.push(["o:title", this.title.toString()]);
    if (this.forceDash !== undefined) out.push(["o:forcedash", this.forceDash.toString()]);
    return out;
  }

}
