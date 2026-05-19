// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.NewCell

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** New Cell Data.
 *
 * Element: `x:nc` */
export class NewCell extends OpenXmlCompositeElement {
  override readonly localName = "nc" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference (:r) */
  cellReference: StringValue | undefined;

  /** Style Index (:s) */
  styleIndex: UInt32Value | undefined;

  /** Cell Data Type (:t) */
  dataType: StringValue | undefined;

  /** Cell Metadata Index (:cm) */
  cellMetaIndex: UInt32Value | undefined;

  /** Value Metadata Index (:vm) */
  valueMetaIndex: UInt32Value | undefined;

  /** Show Phonetic (:ph) */
  showPhonetic: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.cellReference = StringValue.parse(value); return;
      case "s": this.styleIndex = UInt32Value.parse(value); return;
      case "t": this.dataType = StringValue.parse(value); return;
      case "cm": this.cellMetaIndex = UInt32Value.parse(value); return;
      case "vm": this.valueMetaIndex = UInt32Value.parse(value); return;
      case "ph": this.showPhonetic = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cellReference !== undefined) out.push(["r", this.cellReference.toString()]);
    if (this.styleIndex !== undefined) out.push(["s", this.styleIndex.toString()]);
    if (this.dataType !== undefined) out.push(["t", this.dataType.toString()]);
    if (this.cellMetaIndex !== undefined) out.push(["cm", this.cellMetaIndex.toString()]);
    if (this.valueMetaIndex !== undefined) out.push(["vm", this.valueMetaIndex.toString()]);
    if (this.showPhonetic !== undefined) out.push(["ph", this.showPhonetic.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cellReference, { attribute: ":r", elementClass: "NewCell" });
  }
}
