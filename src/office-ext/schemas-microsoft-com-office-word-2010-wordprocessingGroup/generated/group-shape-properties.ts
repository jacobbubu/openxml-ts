// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingGroup.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingGroup.GroupShapeProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the GroupShapeProperties Class.
 *
 * Element: `wpg:grpSpPr` */
export class GroupShapeProperties extends OpenXmlCompositeElement {
  override readonly localName = "grpSpPr" as const;
  override readonly prefix = "wpg" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Black and White Mode (:bwMode) */
  blackWhiteMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bwMode": this.blackWhiteMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blackWhiteMode !== undefined) out.push(["bwMode", this.blackWhiteMode.toString()]);
    return out;
  }

}
