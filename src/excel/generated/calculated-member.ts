// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CalculatedMember

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Calculated Member.
 *
 * Element: `x:calculatedMember` */
export class CalculatedMember extends OpenXmlCompositeElement {
  override readonly localName = "calculatedMember" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** mdx (:mdx) */
  mdx: StringValue | undefined;

  /** memberName (:memberName) */
  memberName: StringValue | undefined;

  /** hierarchy (:hierarchy) */
  hierarchy: StringValue | undefined;

  /** parent (:parent) */
  parentName: StringValue | undefined;

  /** solveOrder (:solveOrder) */
  solveOrder: Int32Value | undefined;

  /** set (:set) */
  set: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "mdx": this.mdx = StringValue.parse(value); return;
      case "memberName": this.memberName = StringValue.parse(value); return;
      case "hierarchy": this.hierarchy = StringValue.parse(value); return;
      case "parent": this.parentName = StringValue.parse(value); return;
      case "solveOrder": this.solveOrder = Int32Value.parse(value); return;
      case "set": this.set = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.mdx !== undefined) out.push(["mdx", this.mdx.toString()]);
    if (this.memberName !== undefined) out.push(["memberName", this.memberName.toString()]);
    if (this.hierarchy !== undefined) out.push(["hierarchy", this.hierarchy.toString()]);
    if (this.parentName !== undefined) out.push(["parent", this.parentName.toString()]);
    if (this.solveOrder !== undefined) out.push(["solveOrder", this.solveOrder.toString()]);
    if (this.set !== undefined) out.push(["set", this.set.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "CalculatedMember" });
    assertRequired(this.mdx, { attribute: ":mdx", elementClass: "CalculatedMember" });
  }
}
