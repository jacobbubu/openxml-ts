// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Diagram

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** VML Diagram.
 *
 * Element: `o:diagram` */
export class Diagram extends OpenXmlCompositeElement {
  override readonly localName = "diagram" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Diagram Style Options (:dgmstyle) */
  style: StringValue | undefined;

  /** Diagram Automatic Format (:autoformat) */
  autoFormat: StringValue | undefined;

  /** Diagram Reverse Direction (:reverse) */
  reverse: StringValue | undefined;

  /** Diagram Automatic Layout (:autolayout) */
  autoLayout: StringValue | undefined;

  /** Diagram Layout X Scale (:dgmscalex) */
  scaleX: StringValue | undefined;

  /** Diagram Layout Y Scale (:dgmscaley) */
  scaleY: StringValue | undefined;

  /** Diagram Font Size (:dgmfontsize) */
  fontSize: StringValue | undefined;

  /** Diagram Layout Extents (:constrainbounds) */
  constrainBounds: StringValue | undefined;

  /** Diagram Base Font Size (:dgmbasetextscale) */
  baseTextScale: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "dgmstyle": this.style = StringValue.parse(value); return;
      case "autoformat": this.autoFormat = StringValue.parse(value); return;
      case "reverse": this.reverse = StringValue.parse(value); return;
      case "autolayout": this.autoLayout = StringValue.parse(value); return;
      case "dgmscalex": this.scaleX = StringValue.parse(value); return;
      case "dgmscaley": this.scaleY = StringValue.parse(value); return;
      case "dgmfontsize": this.fontSize = StringValue.parse(value); return;
      case "constrainbounds": this.constrainBounds = StringValue.parse(value); return;
      case "dgmbasetextscale": this.baseTextScale = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.style !== undefined) out.push(["dgmstyle", this.style.toString()]);
    if (this.autoFormat !== undefined) out.push(["autoformat", this.autoFormat.toString()]);
    if (this.reverse !== undefined) out.push(["reverse", this.reverse.toString()]);
    if (this.autoLayout !== undefined) out.push(["autolayout", this.autoLayout.toString()]);
    if (this.scaleX !== undefined) out.push(["dgmscalex", this.scaleX.toString()]);
    if (this.scaleY !== undefined) out.push(["dgmscaley", this.scaleY.toString()]);
    if (this.fontSize !== undefined) out.push(["dgmfontsize", this.fontSize.toString()]);
    if (this.constrainBounds !== undefined) out.push(["constrainbounds", this.constrainBounds.toString()]);
    if (this.baseTextScale !== undefined) out.push(["dgmbasetextscale", this.baseTextScale.toString()]);
    return out;
  }

}
