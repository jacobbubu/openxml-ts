// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_math.json
// @see DocumentFormat.OpenXml.Math.ZeroWidth

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Phantom Zero Width.
 *
 * Element: `m:zeroWid` */
export class ZeroWidth extends OpenXmlLeafElement {
  override readonly localName = "zeroWid" as const;
  override readonly prefix = "m" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/math" as const;


  /** value (m:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "m:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["m:val", this.val.toString()]);
    return out;
  }

}
