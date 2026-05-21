// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_compatibility.json
// @see DocumentFormat.OpenXml.Drawing2010Compatibility.CompatibilityShape

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CompatibilityShape Class.
 *
 * Element: `com14:compatSp` */
export class CompatibilityShape extends OpenXmlLeafElement {
  override readonly localName = "compatSp" as const;
  override readonly prefix = "com14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/compatibility" as const;


  /** spid (:spid) */
  shapeId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "spid": this.shapeId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.shapeId !== undefined) out.push(["spid", this.shapeId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":spid", elementClass: "CompatibilityShape" });
  }
}
