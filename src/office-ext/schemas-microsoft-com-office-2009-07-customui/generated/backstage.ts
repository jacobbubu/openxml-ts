// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.Backstage

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the Backstage Class.
 *
 * Element: `mso14:backstage` */
export class Backstage extends OpenXmlCompositeElement {
  override readonly localName = "backstage" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** onShow (:onShow) */
  onShow: StringValue | undefined;

  /** onHide (:onHide) */
  onHide: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "onShow": this.onShow = StringValue.parse(value); assertString(this.onShow, { maxLength: 1024, minLength: 1 }, { attribute: ":onShow", elementClass: "Backstage" }); return;
      case "onHide": this.onHide = StringValue.parse(value); assertString(this.onHide, { maxLength: 1024, minLength: 1 }, { attribute: ":onHide", elementClass: "Backstage" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.onShow !== undefined) out.push(["onShow", this.onShow.toString()]);
    if (this.onHide !== undefined) out.push(["onHide", this.onHide.toString()]);
    return out;
  }

}
