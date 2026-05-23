// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.ShowGridlinesHeadings

import {
  BooleanValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ShowGridlinesHeadings Class.
 *
 * Element: `xr:showGridlinesHeadings` */
export class ShowGridlinesHeadings extends OpenXmlLeafElement {
  override readonly localName = "showGridlinesHeadings" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** showGridLines (:showGridLines) */
  showGridLines: BooleanValue | undefined;

  /** showRowCol (:showRowCol) */
  showRowCol: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "showGridLines": this.showGridLines = BooleanValue.parse(value); return;
      case "showRowCol": this.showRowCol = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.showGridLines !== undefined) out.push(["showGridLines", this.showGridLines.toString()]);
    if (this.showRowCol !== undefined) out.push(["showRowCol", this.showRowCol.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.showGridLines, { attribute: ":showGridLines", elementClass: "ShowGridlinesHeadings" });
    assertRequired(this.showRowCol, { attribute: ":showRowCol", elementClass: "ShowGridlinesHeadings" });
  }
}
