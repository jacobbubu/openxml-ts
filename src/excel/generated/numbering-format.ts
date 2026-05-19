// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.NumberingFormat

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Number Formats.
 *
 * Element: `x:numFmt` */
export class NumberingFormat extends OpenXmlLeafElement {
  override readonly localName = "numFmt" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Number Format Id (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  /** Number Format Code (:formatCode) */
  formatCode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
      case "formatCode": this.formatCode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.numberFormatId !== undefined) out.push(["numFmtId", this.numberFormatId.toString()]);
    if (this.formatCode !== undefined) out.push(["formatCode", this.formatCode.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.numberFormatId, { attribute: ":numFmtId", elementClass: "NumberingFormat" });
    assertRequired(this.formatCode, { attribute: ":formatCode", elementClass: "NumberingFormat" });
  }
}
