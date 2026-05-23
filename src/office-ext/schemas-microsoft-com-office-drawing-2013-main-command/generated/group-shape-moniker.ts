// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.GroupShapeMoniker

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the GroupShapeMoniker Class.
 *
 * Element: `oac:grpSpMk` */
export class GroupShapeMoniker extends OpenXmlLeafElement {
  override readonly localName = "grpSpMk" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;


  /** id (:id) */
  id: UInt32Value | undefined;

  /** creationId (:creationId) */
  creationId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "creationId": this.creationId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.creationId !== undefined) out.push(["creationId", this.creationId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "GroupShapeMoniker" });
  }
}
