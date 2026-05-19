// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.QueryTableRefresh

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the QueryTableRefresh Class.
 *
 * Element: `x:queryTableRefresh` */
export class QueryTableRefresh extends OpenXmlCompositeElement {
  override readonly localName = "queryTableRefresh" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Preserve Sort and Filter Layout (:preserveSortFilterLayout) */
  preserveSortFilterLayout: BooleanValue | undefined;

  /** Next Field Id Wrapped (:fieldIdWrapped) */
  fieldIdWrapped: BooleanValue | undefined;

  /** Headers In Last Refresh (:headersInLastRefresh) */
  headersInLastRefresh: BooleanValue | undefined;

  /** Minimum Refresh Version (:minimumVersion) */
  minimumVersion: StringValue | undefined;

  /** Next field id (:nextId) */
  nextId: UInt32Value | undefined;

  /** Columns Left (:unboundColumnsLeft) */
  unboundColumnsLeft: UInt32Value | undefined;

  /** Columns Right (:unboundColumnsRight) */
  unboundColumnsRight: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "preserveSortFilterLayout": this.preserveSortFilterLayout = BooleanValue.parse(value); return;
      case "fieldIdWrapped": this.fieldIdWrapped = BooleanValue.parse(value); return;
      case "headersInLastRefresh": this.headersInLastRefresh = BooleanValue.parse(value); return;
      case "minimumVersion": this.minimumVersion = StringValue.parse(value); return;
      case "nextId": this.nextId = UInt32Value.parse(value); return;
      case "unboundColumnsLeft": this.unboundColumnsLeft = UInt32Value.parse(value); return;
      case "unboundColumnsRight": this.unboundColumnsRight = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preserveSortFilterLayout !== undefined) out.push(["preserveSortFilterLayout", this.preserveSortFilterLayout.toString()]);
    if (this.fieldIdWrapped !== undefined) out.push(["fieldIdWrapped", this.fieldIdWrapped.toString()]);
    if (this.headersInLastRefresh !== undefined) out.push(["headersInLastRefresh", this.headersInLastRefresh.toString()]);
    if (this.minimumVersion !== undefined) out.push(["minimumVersion", this.minimumVersion.toString()]);
    if (this.nextId !== undefined) out.push(["nextId", this.nextId.toString()]);
    if (this.unboundColumnsLeft !== undefined) out.push(["unboundColumnsLeft", this.unboundColumnsLeft.toString()]);
    if (this.unboundColumnsRight !== undefined) out.push(["unboundColumnsRight", this.unboundColumnsRight.toString()]);
    return out;
  }

}
