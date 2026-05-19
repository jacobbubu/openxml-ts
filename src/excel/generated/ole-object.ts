// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.OleObject

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** OLE Object.
 *
 * Element: `x:oleObject` */
export class OleObject extends OpenXmlCompositeElement {
  override readonly localName = "oleObject" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** OLE ProgId (:progId) */
  progId: StringValue | undefined;

  /** Data or View Aspect (:dvAspect) */
  dataOrViewAspect: StringValue | undefined;

  /** OLE Link Moniker (:link) */
  link: StringValue | undefined;

  /** OLE Update (:oleUpdate) */
  oleUpdate: StringValue | undefined;

  /** Auto Load (:autoLoad) */
  autoLoad: BooleanValue | undefined;

  /** Shape Id (:shapeId) */
  shapeId: UInt32Value | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "progId": this.progId = StringValue.parse(value); return;
      case "dvAspect": this.dataOrViewAspect = StringValue.parse(value); return;
      case "link": this.link = StringValue.parse(value); return;
      case "oleUpdate": this.oleUpdate = StringValue.parse(value); return;
      case "autoLoad": this.autoLoad = BooleanValue.parse(value); return;
      case "shapeId": this.shapeId = UInt32Value.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.progId !== undefined) out.push(["progId", this.progId.toString()]);
    if (this.dataOrViewAspect !== undefined) out.push(["dvAspect", this.dataOrViewAspect.toString()]);
    if (this.link !== undefined) out.push(["link", this.link.toString()]);
    if (this.oleUpdate !== undefined) out.push(["oleUpdate", this.oleUpdate.toString()]);
    if (this.autoLoad !== undefined) out.push(["autoLoad", this.autoLoad.toString()]);
    if (this.shapeId !== undefined) out.push(["shapeId", this.shapeId.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeId, { attribute: ":shapeId", elementClass: "OleObject" });
  }
}
