// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_main.json
// @see DocumentFormat.OpenXml.Drawing2012Main.NonVisualGroupProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the NonVisualGroupProperties Class.
 *
 * Element: `a15:nonVisualGroupProps` */
export class NonVisualGroupProperties extends OpenXmlLeafElement {
  override readonly localName = "nonVisualGroupProps" as const;
  override readonly prefix = "a15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/main" as const;


  /** isLegacyGroup (:isLegacyGroup) */
  isLegacyGroup: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isLegacyGroup": this.isLegacyGroup = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isLegacyGroup !== undefined) out.push(["isLegacyGroup", this.isLegacyGroup.toString()]);
    return out;
  }

}
