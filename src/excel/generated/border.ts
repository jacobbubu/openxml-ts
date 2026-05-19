// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Border

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Border Properties.
 *
 * Element: `x:border` */
export class Border extends OpenXmlCompositeElement {
  override readonly localName = "border" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Diagonal Up (:diagonalUp) */
  diagonalUp: BooleanValue | undefined;

  /** Diagonal Down (:diagonalDown) */
  diagonalDown: BooleanValue | undefined;

  /** Outline (:outline) */
  outline: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "diagonalUp": this.diagonalUp = BooleanValue.parse(value); return;
      case "diagonalDown": this.diagonalDown = BooleanValue.parse(value); return;
      case "outline": this.outline = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.diagonalUp !== undefined) out.push(["diagonalUp", this.diagonalUp.toString()]);
    if (this.diagonalDown !== undefined) out.push(["diagonalDown", this.diagonalDown.toString()]);
    if (this.outline !== undefined) out.push(["outline", this.outline.toString()]);
    return out;
  }

}
