// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_math.json
// @see DocumentFormat.OpenXml.Math.Break

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Break.
 *
 * Element: `m:brk` */
export class Break extends OpenXmlLeafElement {
  override readonly localName = "brk" as const;
  override readonly prefix = "m" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/math" as const;


  /** Index of Operator to Align To (m:alnAt) */
  alignAt: StringValue | undefined;

  /** Index of Operator to Align To (m:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "m:alnAt": this.alignAt = StringValue.parse(value); return;
      case "m:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.alignAt !== undefined) out.push(["m:alnAt", this.alignAt.toString()]);
    if (this.val !== undefined) out.push(["m:val", this.val.toString()]);
    return out;
  }

}
