// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.PageMargins

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Page Margins.
 *
 * Element: `c:pageMargins` */
export class PageMargins extends OpenXmlLeafElement {
  override readonly localName = "pageMargins" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;


  /** Left (:l) */
  left: StringValue | undefined;

  /** Right (:r) */
  right: StringValue | undefined;

  /** Top (:t) */
  top: StringValue | undefined;

  /** Bottom (:b) */
  bottom: StringValue | undefined;

  /** Header (:header) */
  header: StringValue | undefined;

  /** Footer (:footer) */
  footer: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "l": this.left = StringValue.parse(value); return;
      case "r": this.right = StringValue.parse(value); return;
      case "t": this.top = StringValue.parse(value); return;
      case "b": this.bottom = StringValue.parse(value); return;
      case "header": this.header = StringValue.parse(value); return;
      case "footer": this.footer = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push(["l", this.left.toString()]);
    if (this.right !== undefined) out.push(["r", this.right.toString()]);
    if (this.top !== undefined) out.push(["t", this.top.toString()]);
    if (this.bottom !== undefined) out.push(["b", this.bottom.toString()]);
    if (this.header !== undefined) out.push(["header", this.header.toString()]);
    if (this.footer !== undefined) out.push(["footer", this.footer.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.left, { attribute: ":l", elementClass: "PageMargins" });
    assertRequired(this.right, { attribute: ":r", elementClass: "PageMargins" });
    assertRequired(this.top, { attribute: ":t", elementClass: "PageMargins" });
    assertRequired(this.bottom, { attribute: ":b", elementClass: "PageMargins" });
    assertRequired(this.header, { attribute: ":header", elementClass: "PageMargins" });
    assertRequired(this.footer, { attribute: ":footer", elementClass: "PageMargins" });
  }
}
