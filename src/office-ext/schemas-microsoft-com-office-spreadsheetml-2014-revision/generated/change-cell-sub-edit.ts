// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.ChangeCellSubEdit

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ChangeCellSubEdit Class.
 *
 * Element: `xr:ccse` */
export class ChangeCellSubEdit extends OpenXmlCompositeElement {
  override readonly localName = "ccse" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** r (:r) */
  r: StringValue | undefined;

  /** t (:t) */
  t: StringValue | undefined;

  /** x (:x) */
  x: StringValue | undefined;

  /** w (:w) */
  w: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.r = StringValue.parse(value); return;
      case "t": this.t = StringValue.parse(value); return;
      case "x": this.x = StringValue.parse(value); return;
      case "w": this.w = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.r !== undefined) out.push(["r", this.r.toString()]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.w !== undefined) out.push(["w", this.w.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.r, { attribute: ":r", elementClass: "ChangeCellSubEdit" });
  }
}
