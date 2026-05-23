// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.StateBasedHeader

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the StateBasedHeader Class.
 *
 * Element: `xr:hdr` */
export class StateBasedHeader extends OpenXmlCompositeElement {
  override readonly localName = "hdr" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uid (:uid) */
  uid: StringValue | undefined;

  /** eft (:eft) */
  eft: StringValue | undefined;

  /** eftx (:eftx) */
  eftx: StringValue | undefined;

  /** seft (:seft) */
  seft: StringValue | undefined;

  /** seftx (:seftx) */
  seftx: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uid": this.uid = StringValue.parse(value); return;
      case "eft": this.eft = StringValue.parse(value); return;
      case "eftx": this.eftx = StringValue.parse(value); return;
      case "seft": this.seft = StringValue.parse(value); return;
      case "seftx": this.seftx = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uid !== undefined) out.push(["uid", this.uid.toString()]);
    if (this.eft !== undefined) out.push(["eft", this.eft.toString()]);
    if (this.eftx !== undefined) out.push(["eftx", this.eftx.toString()]);
    if (this.seft !== undefined) out.push(["seft", this.seft.toString()]);
    if (this.seftx !== undefined) out.push(["seftx", this.seftx.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uid, { attribute: ":uid", elementClass: "StateBasedHeader" });
    assertRequired(this.eft, { attribute: ":eft", elementClass: "StateBasedHeader" });
  }
}
