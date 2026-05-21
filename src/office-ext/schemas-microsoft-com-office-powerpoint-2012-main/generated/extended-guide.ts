// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json
// @see DocumentFormat.OpenXml.Powerpoint2012Main.ExtendedGuide

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ExtendedGuide Class.
 *
 * Element: `p15:guide` */
export class ExtendedGuide extends OpenXmlCompositeElement {
  override readonly localName = "guide" as const;
  override readonly prefix = "p15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2012/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** orient (:orient) */
  orientation: StringValue | undefined;

  /** pos (:pos) */
  position: Int32Value | undefined;

  /** userDrawn (:userDrawn) */
  isUserDrawn: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "orient": this.orientation = StringValue.parse(value); return;
      case "pos": this.position = Int32Value.parse(value); return;
      case "userDrawn": this.isUserDrawn = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.orientation !== undefined) out.push(["orient", this.orientation.toString()]);
    if (this.position !== undefined) out.push(["pos", this.position.toString()]);
    if (this.isUserDrawn !== undefined) out.push(["userDrawn", this.isUserDrawn.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "ExtendedGuide" });
  }
}
