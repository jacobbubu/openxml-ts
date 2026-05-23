// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.LayoutContainer

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the LayoutContainer Class.
 *
 * Element: `mso14:layoutContainer` */
export class LayoutContainer extends OpenXmlCompositeElement {
  override readonly localName = "layoutContainer" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  qualifiedId: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** align (:align) */
  align: StringValue | undefined;

  /** expand (:expand) */
  expand: StringValue | undefined;

  /** layoutChildren (:layoutChildren) */
  layoutChildren: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "LayoutContainer" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "LayoutContainer" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "LayoutContainer" }); return;
      case "align": this.align = StringValue.parse(value); return;
      case "expand": this.expand = StringValue.parse(value); return;
      case "layoutChildren": this.layoutChildren = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.align !== undefined) out.push(["align", this.align.toString()]);
    if (this.expand !== undefined) out.push(["expand", this.expand.toString()]);
    if (this.layoutChildren !== undefined) out.push(["layoutChildren", this.layoutChildren.toString()]);
    return out;
  }

}
