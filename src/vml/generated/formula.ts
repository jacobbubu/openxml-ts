// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.Formula

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Single Formula.
 *
 * Element: `v:f` */
export class Formula extends OpenXmlLeafElement {
  override readonly localName = "f" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Equation (:eqn) */
  equation: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "eqn": this.equation = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.equation !== undefined) out.push(["eqn", this.equation.toString()]);
    return out;
  }

}
