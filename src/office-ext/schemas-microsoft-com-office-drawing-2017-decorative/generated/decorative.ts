// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_decorative.json
// @see DocumentFormat.OpenXml.Drawing2017Decorative.Decorative

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the Decorative Class.
 *
 * Element: `adec:decorative` */
export class Decorative extends OpenXmlLeafElement {
  override readonly localName = "decorative" as const;
  override readonly prefix = "adec" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/decorative" as const;


  /** val (:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
