// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableCellLeftMargin

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Table Cell Left Margin Default.
 *
 * Element: `w:left` */
export class TableCellLeftMargin extends OpenXmlLeafElement {
  override readonly localName = "left" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** w (w:w) */
  width: StringValue | undefined;

  /** type (w:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:w": this.width = StringValue.parse(value); return;
      case "w:type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w:w", this.width.toString()]);
    if (this.type !== undefined) out.push(["w:type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.width, { attribute: "w:w", elementClass: "TableCellLeftMargin" });
    assertRequired(this.type, { attribute: "w:type", elementClass: "TableCellLeftMargin" });
  }
}
