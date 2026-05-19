// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TupleSet

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** OLAP Set.
 *
 * Element: `x:set` */
export class TupleSet extends OpenXmlCompositeElement {
  override readonly localName = "set" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Number of Tuples (:count) */
  count: UInt32Value | undefined;

  /** Maximum Rank Requested (:maxRank) */
  maxRank: Int32Value | undefined;

  /** MDX Set Definition (:setDefinition) */
  setDefinition: StringValue | undefined;

  /** Set Sort Order (:sortType) */
  sortType: StringValue | undefined;

  /** Query Failed (:queryFailed) */
  queryFailed: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "count": this.count = UInt32Value.parse(value); return;
      case "maxRank": this.maxRank = Int32Value.parse(value); return;
      case "setDefinition": this.setDefinition = StringValue.parse(value); return;
      case "sortType": this.sortType = StringValue.parse(value); return;
      case "queryFailed": this.queryFailed = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.maxRank !== undefined) out.push(["maxRank", this.maxRank.toString()]);
    if (this.setDefinition !== undefined) out.push(["setDefinition", this.setDefinition.toString()]);
    if (this.sortType !== undefined) out.push(["sortType", this.sortType.toString()]);
    if (this.queryFailed !== undefined) out.push(["queryFailed", this.queryFailed.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.maxRank, { attribute: ":maxRank", elementClass: "TupleSet" });
    assertRequired(this.setDefinition, { attribute: ":setDefinition", elementClass: "TupleSet" });
  }
}
