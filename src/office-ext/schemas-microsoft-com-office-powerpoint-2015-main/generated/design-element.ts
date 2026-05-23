// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2015_main.json
// @see DocumentFormat.OpenXml.Powerpoint2015Main.DesignElement

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the DesignElement Class.
 *
 * Element: `p16:designElem` */
export class DesignElement extends OpenXmlLeafElement {
  override readonly localName = "designElem" as const;
  override readonly prefix = "p16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2015/main" as const;


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
