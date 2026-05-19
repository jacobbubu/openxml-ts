// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MdxSet

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Set MDX Metadata.
 *
 * Element: `x:ms` */
export class MdxSet extends OpenXmlCompositeElement {
  override readonly localName = "ms" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Set Definition Index (:ns) */
  setDefinitionIndex: UInt32Value | undefined;

  /** Sort By Member Index Count (:c) */
  memberIndexCount: UInt32Value | undefined;

  /** Set Sort Order (:o) */
  sortingOrder: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ns": this.setDefinitionIndex = UInt32Value.parse(value); return;
      case "c": this.memberIndexCount = UInt32Value.parse(value); return;
      case "o": this.sortingOrder = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.setDefinitionIndex !== undefined) out.push(["ns", this.setDefinitionIndex.toString()]);
    if (this.memberIndexCount !== undefined) out.push(["c", this.memberIndexCount.toString()]);
    if (this.sortingOrder !== undefined) out.push(["o", this.sortingOrder.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.setDefinitionIndex, { attribute: ":ns", elementClass: "MdxSet" });
  }
}
