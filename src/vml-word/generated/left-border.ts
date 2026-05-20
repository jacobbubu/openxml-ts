// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_word.json
// @see DocumentFormat.OpenXml.VmlWord.LeftBorder

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Left Border.
 *
 * Element: `w10:borderleft` */
export class LeftBorder extends OpenXmlLeafElement {
  override readonly localName = "borderleft" as const;
  override readonly prefix = "w10" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:word" as const;


  /** Border Style (:type) */
  type: StringValue | undefined;

  /** Border Width (:width) */
  width: StringValue | undefined;

  /** Border shadow (:shadow) */
  shadow: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "width": this.width = StringValue.parse(value); return;
      case "shadow": this.shadow = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.width !== undefined) out.push(["width", this.width.toString()]);
    if (this.shadow !== undefined) out.push(["shadow", this.shadow.toString()]);
    return out;
  }

}
