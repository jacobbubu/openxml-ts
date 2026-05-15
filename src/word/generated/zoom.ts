// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Zoom

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Magnification Setting.
 *
 * Element: `w:zoom` */
export class Zoom extends OpenXmlLeafElement {
  override readonly localName = "zoom" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Zoom Type (w:val) */
  val: StringValue | undefined;

  /** Zoom Percentage (w:percent) */
  percent: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:percent": this.percent = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.percent !== undefined) out.push(["w:percent", this.percent.toString()]);
    return out;
  }
}
