// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_main.json
// @see DocumentFormat.OpenXml.Drawing2012Main.ObjectProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ObjectProperties Class.
 *
 * Element: `a15:objectPr` */
export class ObjectProperties extends OpenXmlLeafElement {
  override readonly localName = "objectPr" as const;
  override readonly prefix = "a15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/main" as const;


  /** objectId (:objectId) */
  id: StringValue | undefined;

  /** isActiveX (:isActiveX) */
  isActiveX: BooleanValue | undefined;

  /** linkType (:linkType) */
  linkType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "objectId": this.id = StringValue.parse(value); return;
      case "isActiveX": this.isActiveX = BooleanValue.parse(value); return;
      case "linkType": this.linkType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["objectId", this.id.toString()]);
    if (this.isActiveX !== undefined) out.push(["isActiveX", this.isActiveX.toString()]);
    if (this.linkType !== undefined) out.push(["linkType", this.linkType.toString()]);
    return out;
  }

}
