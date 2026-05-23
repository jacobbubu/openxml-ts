// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2022_imageformula.json
// @see DocumentFormat.OpenXml.Drawing2022Imageformula.ImageFormula

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ImageFormula Class.
 *
 * Element: `aif:imageFormula` */
export class ImageFormula extends OpenXmlLeafElement {
  override readonly localName = "imageFormula" as const;
  override readonly prefix = "aif" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2022/imageformula" as const;


  /** formula (:formula) */
  formula: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "formula": this.formula = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formula !== undefined) out.push(["formula", this.formula.toString()]);
    return out;
  }

}
