// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json
// @see DocumentFormat.OpenXml.2003InkML.ActiveArea

import {
  DecimalValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ActiveArea Class.
 *
 * Element: `inkml:activeArea` */
export class ActiveArea extends OpenXmlLeafElement {
  override readonly localName = "activeArea" as const;
  override readonly prefix = "inkml" as const;
  override readonly namespaceUri = "http://www.w3.org/2003/InkML" as const;


  /** size (:size) */
  size: StringValue | undefined;

  /** height (:height) */
  height: DecimalValue | undefined;

  /** width (:width) */
  width: DecimalValue | undefined;

  /** units (:units) */
  units: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "size": this.size = StringValue.parse(value); return;
      case "height": this.height = DecimalValue.parse(value); return;
      case "width": this.width = DecimalValue.parse(value); return;
      case "units": this.units = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    if (this.height !== undefined) out.push(["height", this.height.toString()]);
    if (this.width !== undefined) out.push(["width", this.width.toString()]);
    if (this.units !== undefined) out.push(["units", this.units.toString()]);
    return out;
  }

}
