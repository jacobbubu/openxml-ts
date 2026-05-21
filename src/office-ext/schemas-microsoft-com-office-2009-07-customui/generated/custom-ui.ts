// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.CustomUI

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the CustomUI Class.
 *
 * Element: `mso14:customUI` */
export class CustomUI extends OpenXmlCompositeElement {
  override readonly localName = "customUI" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** onLoad (:onLoad) */
  onLoad: StringValue | undefined;

  /** loadImage (:loadImage) */
  loadImage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "onLoad": this.onLoad = StringValue.parse(value); assertString(this.onLoad, { maxLength: 1024, minLength: 1 }, { attribute: ":onLoad", elementClass: "CustomUI" }); return;
      case "loadImage": this.loadImage = StringValue.parse(value); assertString(this.loadImage, { maxLength: 1024, minLength: 1 }, { attribute: ":loadImage", elementClass: "CustomUI" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.onLoad !== undefined) out.push(["onLoad", this.onLoad.toString()]);
    if (this.loadImage !== undefined) out.push(["loadImage", this.loadImage.toString()]);
    return out;
  }

}
