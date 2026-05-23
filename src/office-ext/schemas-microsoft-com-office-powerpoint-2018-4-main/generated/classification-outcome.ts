// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_4_main.json
// @see DocumentFormat.OpenXml.20184Main.ClassificationOutcome

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ClassificationOutcome Class.
 *
 * Element: `p184:classification` */
export class ClassificationOutcome extends OpenXmlLeafElement {
  override readonly localName = "classification" as const;
  override readonly prefix = "p184" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2018/4/main" as const;


  /** val (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = StringValue.parse(value); return;
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
