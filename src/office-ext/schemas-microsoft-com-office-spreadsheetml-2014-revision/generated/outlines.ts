// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.Outlines

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Outlines Class.
 *
 * Element: `xr:outlines` */
export class Outlines extends OpenXmlCompositeElement {
  override readonly localName = "outlines" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** isRow (:isRow) */
  isRow: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isRow": this.isRow = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isRow !== undefined) out.push(["isRow", this.isRow.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.isRow, { attribute: ":isRow", elementClass: "Outlines" });
  }
}
