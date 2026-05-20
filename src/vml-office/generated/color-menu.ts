// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.ColorMenu

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** UI Default Colors.
 *
 * Element: `o:colormenu` */
export class ColorMenu extends OpenXmlLeafElement {
  override readonly localName = "colormenu" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Default stroke color (:strokecolor) */
  strokeColor: StringValue | undefined;

  /** Default fill color (:fillcolor) */
  fillColor: StringValue | undefined;

  /** Default shadow color (:shadowcolor) */
  shadowColor: StringValue | undefined;

  /** Default extrusion color (:extrusioncolor) */
  extrusionColor: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "strokecolor": this.strokeColor = StringValue.parse(value); return;
      case "fillcolor": this.fillColor = StringValue.parse(value); return;
      case "shadowcolor": this.shadowColor = StringValue.parse(value); return;
      case "extrusioncolor": this.extrusionColor = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.strokeColor !== undefined) out.push(["strokecolor", this.strokeColor.toString()]);
    if (this.fillColor !== undefined) out.push(["fillcolor", this.fillColor.toString()]);
    if (this.shadowColor !== undefined) out.push(["shadowcolor", this.shadowColor.toString()]);
    if (this.extrusionColor !== undefined) out.push(["extrusioncolor", this.extrusionColor.toString()]);
    return out;
  }

}
