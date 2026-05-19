// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Map

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** XML Mapping Properties.
 *
 * Element: `x:Map` */
export class Map extends OpenXmlCompositeElement {
  override readonly localName = "Map" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** XML Mapping ID (:ID) */
  iD: UInt32Value | undefined;

  /** XML Mapping Name (:Name) */
  name: StringValue | undefined;

  /** Root Element Name (:RootElement) */
  rootElement: StringValue | undefined;

  /** Schema Name (:SchemaID) */
  schemaId: StringValue | undefined;

  /** Show Validation Errors (:ShowImportExportValidationErrors) */
  showImportExportErrors: BooleanValue | undefined;

  /** AutoFit Table on Refresh (:AutoFit) */
  autoFit: BooleanValue | undefined;

  /** Append Data to Table (:Append) */
  appendData: BooleanValue | undefined;

  /** Preserve AutoFilter State (:PreserveSortAFLayout) */
  preserveAutoFilterState: BooleanValue | undefined;

  /** Preserve Cell Formatting (:PreserveFormat) */
  preserveFormat: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ID": this.iD = UInt32Value.parse(value); return;
      case "Name": this.name = StringValue.parse(value); return;
      case "RootElement": this.rootElement = StringValue.parse(value); return;
      case "SchemaID": this.schemaId = StringValue.parse(value); return;
      case "ShowImportExportValidationErrors": this.showImportExportErrors = BooleanValue.parse(value); return;
      case "AutoFit": this.autoFit = BooleanValue.parse(value); return;
      case "Append": this.appendData = BooleanValue.parse(value); return;
      case "PreserveSortAFLayout": this.preserveAutoFilterState = BooleanValue.parse(value); return;
      case "PreserveFormat": this.preserveFormat = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.iD !== undefined) out.push(["ID", this.iD.toString()]);
    if (this.name !== undefined) out.push(["Name", this.name.toString()]);
    if (this.rootElement !== undefined) out.push(["RootElement", this.rootElement.toString()]);
    if (this.schemaId !== undefined) out.push(["SchemaID", this.schemaId.toString()]);
    if (this.showImportExportErrors !== undefined) out.push(["ShowImportExportValidationErrors", this.showImportExportErrors.toString()]);
    if (this.autoFit !== undefined) out.push(["AutoFit", this.autoFit.toString()]);
    if (this.appendData !== undefined) out.push(["Append", this.appendData.toString()]);
    if (this.preserveAutoFilterState !== undefined) out.push(["PreserveSortAFLayout", this.preserveAutoFilterState.toString()]);
    if (this.preserveFormat !== undefined) out.push(["PreserveFormat", this.preserveFormat.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.iD, { attribute: ":ID", elementClass: "Map" });
    assertRequired(this.name, { attribute: ":Name", elementClass: "Map" });
    assertRequired(this.rootElement, { attribute: ":RootElement", elementClass: "Map" });
    assertRequired(this.schemaId, { attribute: ":SchemaID", elementClass: "Map" });
    assertRequired(this.showImportExportErrors, { attribute: ":ShowImportExportValidationErrors", elementClass: "Map" });
    assertRequired(this.autoFit, { attribute: ":AutoFit", elementClass: "Map" });
    assertRequired(this.appendData, { attribute: ":Append", elementClass: "Map" });
    assertRequired(this.preserveAutoFilterState, { attribute: ":PreserveSortAFLayout", elementClass: "Map" });
    assertRequired(this.preserveFormat, { attribute: ":PreserveFormat", elementClass: "Map" });
  }
}
