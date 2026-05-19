// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PageMargins

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Page Margins.
 *
 * Element: `x:pageMargins` */
export class PageMargins extends OpenXmlLeafElement {
  override readonly localName = "pageMargins" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Left Page Margin (:left) */
  left: StringValue | undefined;

  /** Right Page Margin (:right) */
  right: StringValue | undefined;

  /** Top Page Margin (:top) */
  top: StringValue | undefined;

  /** Bottom Page Margin (:bottom) */
  bottom: StringValue | undefined;

  /** Header Page Margin (:header) */
  header: StringValue | undefined;

  /** Footer Page Margin (:footer) */
  footer: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "left": this.left = StringValue.parse(value); return;
      case "right": this.right = StringValue.parse(value); return;
      case "top": this.top = StringValue.parse(value); return;
      case "bottom": this.bottom = StringValue.parse(value); return;
      case "header": this.header = StringValue.parse(value); return;
      case "footer": this.footer = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push(["left", this.left.toString()]);
    if (this.right !== undefined) out.push(["right", this.right.toString()]);
    if (this.top !== undefined) out.push(["top", this.top.toString()]);
    if (this.bottom !== undefined) out.push(["bottom", this.bottom.toString()]);
    if (this.header !== undefined) out.push(["header", this.header.toString()]);
    if (this.footer !== undefined) out.push(["footer", this.footer.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.left, { attribute: ":left", elementClass: "PageMargins" });
    assertRequired(this.right, { attribute: ":right", elementClass: "PageMargins" });
    assertRequired(this.top, { attribute: ":top", elementClass: "PageMargins" });
    assertRequired(this.bottom, { attribute: ":bottom", elementClass: "PageMargins" });
    assertRequired(this.header, { attribute: ":header", elementClass: "PageMargins" });
    assertRequired(this.footer, { attribute: ":footer", elementClass: "PageMargins" });
  }
}
