// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ColorFilter

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Color Filter Criteria.
 *
 * Element: `x:colorFilter` */
export class ColorFilter extends OpenXmlLeafElement {
  override readonly localName = "colorFilter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Differential Format Record Id (:dxfId) */
  formatId: UInt32Value | undefined;

  /** Filter By Cell Color (:cellColor) */
  cellColor: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":dxfId": this.formatId = UInt32Value.parse(value); return;
      case ":cellColor": this.cellColor = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formatId !== undefined) out.push([":dxfId", this.formatId.toString()]);
    if (this.cellColor !== undefined) out.push([":cellColor", this.cellColor.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.formatId, { attribute: ":dxfId", elementClass: "ColorFilter" });
  }
}
