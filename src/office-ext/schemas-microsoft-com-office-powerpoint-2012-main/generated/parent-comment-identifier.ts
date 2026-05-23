// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json
// @see DocumentFormat.OpenXml.Powerpoint2012Main.ParentCommentIdentifier

import {
  OpenXmlLeafElement,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the ParentCommentIdentifier Class.
 *
 * Element: `p15:parentCm` */
export class ParentCommentIdentifier extends OpenXmlLeafElement {
  override readonly localName = "parentCm" as const;
  override readonly prefix = "p15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2012/main" as const;


  /** authorId (:authorId) */
  authorId: UInt32Value | undefined;

  /** idx (:idx) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "authorId": this.authorId = UInt32Value.parse(value); return;
      case "idx": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.authorId !== undefined) out.push(["authorId", this.authorId.toString()]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    return out;
  }

}
