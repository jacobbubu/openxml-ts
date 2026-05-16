// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ExternalCell

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** External Cell Data.
 *
 * Element: `x:cell` */
export class ExternalCell extends OpenXmlCompositeElement {
  override readonly localName = "cell" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference (:r) */
  cellReference: StringValue | undefined;

  /** Type (:t) */
  dataType: StringValue | undefined;

  /** Value Metadata (:vm) */
  valueMetaIndex: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":r": this.cellReference = StringValue.parse(value); return;
      case ":t": this.dataType = StringValue.parse(value); return;
      case ":vm": this.valueMetaIndex = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellReference !== undefined) out.push([":r", this.cellReference.toString()]);
    if (this.dataType !== undefined) out.push([":t", this.dataType.toString()]);
    if (this.valueMetaIndex !== undefined) out.push([":vm", this.valueMetaIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "ExternalCell" });
  }
}
