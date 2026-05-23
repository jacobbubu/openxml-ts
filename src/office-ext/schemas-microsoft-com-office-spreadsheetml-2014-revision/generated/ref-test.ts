// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RefTest

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RefTest Class.
 *
 * Element: `xr:test` */
export class RefTest extends OpenXmlLeafElement {
  override readonly localName = "test" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** n (:n) */
  n: StringValue | undefined;

  /** ajt (:ajt) */
  ajt: StringValue | undefined;

  /** ajtx (:ajtx) */
  ajtx: StringValue | undefined;

  /** homeRef (:homeRef) */
  homeRef: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.n = StringValue.parse(value); return;
      case "ajt": this.ajt = StringValue.parse(value); return;
      case "ajtx": this.ajtx = StringValue.parse(value); return;
      case "homeRef": this.homeRef = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.n !== undefined) out.push(["n", this.n.toString()]);
    if (this.ajt !== undefined) out.push(["ajt", this.ajt.toString()]);
    if (this.ajtx !== undefined) out.push(["ajtx", this.ajtx.toString()]);
    if (this.homeRef !== undefined) out.push(["homeRef", this.homeRef.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.n, { attribute: ":n", elementClass: "RefTest" });
    assertRequired(this.ajt, { attribute: ":ajt", elementClass: "RefTest" });
  }
}
