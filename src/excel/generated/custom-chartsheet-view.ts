// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CustomChartsheetView

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Custom Chart Sheet View.
 *
 * Element: `x:customSheetView` */
export class CustomChartsheetView extends OpenXmlCompositeElement {
  override readonly localName = "customSheetView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** GUID (:guid) */
  guid: StringValue | undefined;

  /** Print Scale (:scale) */
  scale: UInt32Value | undefined;

  /** Visible State (:state) */
  state: StringValue | undefined;

  /** Zoom To Fit (:zoomToFit) */
  zoomToFit: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":guid": this.guid = StringValue.parse(value); return;
      case ":scale": this.scale = UInt32Value.parse(value); return;
      case ":state": this.state = StringValue.parse(value); return;
      case ":zoomToFit": this.zoomToFit = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push([":guid", this.guid.toString()]);
    if (this.scale !== undefined) out.push([":scale", this.scale.toString()]);
    if (this.state !== undefined) out.push([":state", this.state.toString()]);
    if (this.zoomToFit !== undefined) out.push([":zoomToFit", this.zoomToFit.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "CustomChartsheetView" });
  }
}
