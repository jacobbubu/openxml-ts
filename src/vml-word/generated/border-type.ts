// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_word.json
// @see DocumentFormat.OpenXml.VmlWord.BorderType

import {
  IntegerValue,
  OpenXmlLeafElement,
  StringValue,
  TrueFalseValue,
} from "../../element/index.js";

/** Defines the BorderType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class BorderType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Border Style (:type) */
  type: StringValue | undefined;

  /** Border Width (:width) */
  width: IntegerValue | undefined;

  /** Border shadow (:shadow) */
  shadow: TrueFalseValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "width": this.width = IntegerValue.parse(value); return;
      case "shadow": this.shadow = TrueFalseValue.parse(value); return;
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
