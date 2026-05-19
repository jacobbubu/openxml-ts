// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.RgbColorModelHex

import {
  HexBinaryValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** RGB Color Model - Hex Variant.
 *
 * Element: `a:srgbClr` */
export class RgbColorModelHex extends OpenXmlCompositeElement {
  override readonly localName = "srgbClr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Value (:val) */
  val: HexBinaryValue | undefined;

  /** legacySpreadsheetColorIndex (a14:legacySpreadsheetColorIndex) */
  legacySpreadsheetColorIndex: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = HexBinaryValue.parse(value); return;
      case "a14:legacySpreadsheetColorIndex": this.legacySpreadsheetColorIndex = Int32Value.parse(value); assertNumber(this.legacySpreadsheetColorIndex, { min: 0, max: 80 }, { attribute: "a14:legacySpreadsheetColorIndex", elementClass: "RgbColorModelHex" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.legacySpreadsheetColorIndex !== undefined) out.push(["a14:legacySpreadsheetColorIndex", this.legacySpreadsheetColorIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "RgbColorModelHex" });
  }
}
