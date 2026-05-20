// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_math.json
// @see DocumentFormat.OpenXml.Math.RightMargin

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Right Margin.
 *
 * Element: `m:rMargin` */
export class RightMargin extends OpenXmlLeafElement {
  override readonly localName = "rMargin" as const;
  override readonly prefix = "m" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/math" as const;


  /** Value (m:val) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "m:val": this.val = UInt32Value.parse(value); assertNumber(this.val, { max: 31680 }, { attribute: "m:val", elementClass: "RightMargin" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["m:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "m:val", elementClass: "RightMargin" });
  }
}
