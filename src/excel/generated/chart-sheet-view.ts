// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ChartSheetView

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Chart Sheet View.
 *
 * Element: `x:sheetView` */
export class ChartSheetView extends OpenXmlCompositeElement {
  override readonly localName = "sheetView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Sheet Tab Selected (:tabSelected) */
  tabSelected: BooleanValue | undefined;

  /** Window Zoom Scale (:zoomScale) */
  zoomScale: UInt32Value | undefined;

  /** Workbook View Id (:workbookViewId) */
  workbookViewId: UInt32Value | undefined;

  /** Zoom To Fit (:zoomToFit) */
  zoomToFit: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "tabSelected": this.tabSelected = BooleanValue.parse(value); return;
      case "zoomScale": this.zoomScale = UInt32Value.parse(value); return;
      case "workbookViewId": this.workbookViewId = UInt32Value.parse(value); return;
      case "zoomToFit": this.zoomToFit = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.tabSelected !== undefined) out.push(["tabSelected", this.tabSelected.toString()]);
    if (this.zoomScale !== undefined) out.push(["zoomScale", this.zoomScale.toString()]);
    if (this.workbookViewId !== undefined) out.push(["workbookViewId", this.workbookViewId.toString()]);
    if (this.zoomToFit !== undefined) out.push(["zoomToFit", this.zoomToFit.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.workbookViewId, { attribute: ":workbookViewId", elementClass: "ChartSheetView" });
  }
}
