// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_main.json
// @see DocumentFormat.OpenXml.Drawing2014Main.ColIdIdentifier

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ColIdIdentifier Class.
 *
 * Element: `a16:colId` */
export class ColIdIdentifier extends OpenXmlLeafElement {
  override readonly localName = "colId" as const;
  override readonly prefix = "a16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/main" as const;


  /** val (:val) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "ColIdIdentifier" });
  }
}
