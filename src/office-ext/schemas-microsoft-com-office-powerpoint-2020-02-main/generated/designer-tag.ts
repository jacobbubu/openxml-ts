// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2020_02_main.json
// @see DocumentFormat.OpenXml.202002Main.DesignerTag

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the DesignerTag Class.
 *
 * Element: `p202:designTag` */
export class DesignerTag extends OpenXmlLeafElement {
  override readonly localName = "designTag" as const;
  override readonly prefix = "p202" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2020/02/main" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** val (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "DesignerTag" });
    assertRequired(this.val, { attribute: ":val", elementClass: "DesignerTag" });
  }
}
