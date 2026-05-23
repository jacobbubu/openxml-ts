// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.GroupCommand

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the GroupCommand Class.
 *
 * Element: `oac:grpCmd` */
export class GroupCommand extends OpenXmlCompositeElement {
  override readonly localName = "grpCmd" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** verId (:verId) */
  verId: UInt32Value | undefined;

  /** preventRegroup (:preventRegroup) */
  preventRegroup: BooleanValue | undefined;

  /** grpId (:grpId) */
  grpId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "verId": this.verId = UInt32Value.parse(value); return;
      case "preventRegroup": this.preventRegroup = BooleanValue.parse(value); return;
      case "grpId": this.grpId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.verId !== undefined) out.push(["verId", this.verId.toString()]);
    if (this.preventRegroup !== undefined) out.push(["preventRegroup", this.preventRegroup.toString()]);
    if (this.grpId !== undefined) out.push(["grpId", this.grpId.toString()]);
    return out;
  }

}
