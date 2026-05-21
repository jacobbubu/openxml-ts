// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.Hyperlink

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Represents a hyperlink within a cell..
 *
 * Element: `xr:hyperlink` */
export class Hyperlink extends OpenXmlLeafElement {
  override readonly localName = "hyperlink" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  /** Location (:location) */
  location: StringValue | undefined;

  /** Tool Tip (:tooltip) */
  tooltip: StringValue | undefined;

  /** Display String (:display) */
  display: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ref": this.reference = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case "location": this.location = StringValue.parse(value); return;
      case "tooltip": this.tooltip = StringValue.parse(value); return;
      case "display": this.display = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.location !== undefined) out.push(["location", this.location.toString()]);
    if (this.tooltip !== undefined) out.push(["tooltip", this.tooltip.toString()]);
    if (this.display !== undefined) out.push(["display", this.display.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.reference, { attribute: ":ref", elementClass: "Hyperlink" });
  }
}
