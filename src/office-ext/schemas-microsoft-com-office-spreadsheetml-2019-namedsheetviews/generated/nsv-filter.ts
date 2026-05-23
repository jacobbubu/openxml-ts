// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_namedsheetviews.json
// @see DocumentFormat.OpenXml.Spreadsheetml2019Namedsheetviews.NsvFilter

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the NsvFilter Class.
 *
 * Element: `xnsv:nsvFilter` */
export class NsvFilter extends OpenXmlCompositeElement {
  override readonly localName = "nsvFilter" as const;
  override readonly prefix = "xnsv" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** filterId (:filterId) */
  filterId: StringValue | undefined;

  /** ref (:ref) */
  ref: StringValue | undefined;

  /** tableId (:tableId) */
  tableId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "filterId": this.filterId = StringValue.parse(value); return;
      case "ref": this.ref = StringValue.parse(value); return;
      case "tableId": this.tableId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.filterId !== undefined) out.push(["filterId", this.filterId.toString()]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    if (this.tableId !== undefined) out.push(["tableId", this.tableId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.filterId, { attribute: ":filterId", elementClass: "NsvFilter" });
  }
}
