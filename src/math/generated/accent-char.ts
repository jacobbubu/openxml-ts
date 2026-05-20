// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_officeDocument_2006_math.json
// @see DocumentFormat.OpenXml.Math.AccentChar

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Accent Character.
 *
 * Element: `m:chr` */
export class AccentChar extends OpenXmlLeafElement {
  override readonly localName = "chr" as const;
  override readonly prefix = "m" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/officeDocument/2006/math" as const;


  /** value (m:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "m:val": this.val = StringValue.parse(value); assertString(this.val, { maxLength: 1 }, { attribute: "m:val", elementClass: "AccentChar" }); return;
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
    assertRequired(this.val, { attribute: "m:val", elementClass: "AccentChar" });
  }
}
