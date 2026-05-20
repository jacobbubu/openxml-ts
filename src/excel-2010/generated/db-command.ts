// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.DbCommand

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the DbCommand Class.
 *
 * Element: `x15:dbCommand` */
export class DbCommand extends OpenXmlLeafElement {
  override readonly localName = "dbCommand" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** text (:text) */
  textAttr: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "text": this.textAttr = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.textAttr !== undefined) out.push(["text", this.textAttr.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.textAttr, { attribute: ":text", elementClass: "DbCommand" });
  }
}
