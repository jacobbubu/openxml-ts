// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata.Key

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Key Class.
 *
 * Element: `xlrd:k` */
export class Key extends OpenXmlLeafElement {
  override readonly localName = "k" as const;
  override readonly prefix = "xlrd" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" as const;


  /** n (:n) */
  n: StringValue | undefined;

  /** t (:t) */
  t: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.n = StringValue.parse(value); return;
      case "t": this.t = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.n !== undefined) out.push(["n", this.n.toString()]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.n, { attribute: ":n", elementClass: "Key" });
  }
}
