// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.FieldListActiveTabTopLevelEntity

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the FieldListActiveTabTopLevelEntity Class.
 *
 * Element: `x15:activeTabTopLevelEntity` */
export class FieldListActiveTabTopLevelEntity extends OpenXmlLeafElement {
  override readonly localName = "activeTabTopLevelEntity" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** type (:type) */
  type: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "type": this.type = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "FieldListActiveTabTopLevelEntity" });
  }
}
