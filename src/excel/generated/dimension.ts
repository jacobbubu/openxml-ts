// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Dimension

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** OLAP Dimension.
 *
 * Element: `x:dimension` */
export class Dimension extends OpenXmlLeafElement {
  override readonly localName = "dimension" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Measure (:measure) */
  measure: BooleanValue | undefined;

  /** Dimension Name (:name) */
  name: StringValue | undefined;

  /** Dimension Unique Name (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** Dimension Display Name (:caption) */
  caption: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "measure": this.measure = BooleanValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "caption": this.caption = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.measure !== undefined) out.push(["measure", this.measure.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.caption !== undefined) out.push(["caption", this.caption.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "Dimension" });
    assertRequired(this.uniqueName, { attribute: ":uniqueName", elementClass: "Dimension" });
    assertRequired(this.caption, { attribute: ":caption", elementClass: "Dimension" });
  }
}
