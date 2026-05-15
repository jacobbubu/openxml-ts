// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.StatusText

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Associated Status Text.
 *
 * Element: `w:statusText` */
export class StatusText extends OpenXmlLeafElement {
  override readonly localName = "statusText" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Status Text Type (w:type) */
  type: StringValue | undefined;

  /** Status Text Value (w:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:type": this.type = StringValue.parse(value); return;
      case "w:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    return out;
  }
}
