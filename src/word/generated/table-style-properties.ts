// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableStyleProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Style Conditional Table Formatting Properties.
 *
 * Element: `w:tblStylePr` */
export class TableStyleProperties extends OpenXmlCompositeElement {
  override readonly localName = "tblStylePr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Style Conditional Formatting Type (w:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: "w:type", elementClass: "TableStyleProperties" });
  }
}
