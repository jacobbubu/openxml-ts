// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SheetProtection

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Sheet Protection.
 *
 * Element: `x:sheetProtection` */
export class SheetProtection extends OpenXmlLeafElement {
  override readonly localName = "sheetProtection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Password (:password) */
  password: HexBinaryValue | undefined;

  /** Cryptographic Algorithm Name (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** Password Hash Value (:hashValue) */
  hashValue: StringValue | undefined;

  /** Salt Value for Password Verifier (:saltValue) */
  saltValue: StringValue | undefined;

  /** Iterations to Run Hashing Algorithm (:spinCount) */
  spinCount: UInt32Value | undefined;

  /** Sheet Locked (:sheet) */
  sheet: BooleanValue | undefined;

  /** Objects Locked (:objects) */
  objects: BooleanValue | undefined;

  /** Scenarios Locked (:scenarios) */
  scenarios: BooleanValue | undefined;

  /** Format Cells Locked (:formatCells) */
  formatCells: BooleanValue | undefined;

  /** Format Columns Locked (:formatColumns) */
  formatColumns: BooleanValue | undefined;

  /** Format Rows Locked (:formatRows) */
  formatRows: BooleanValue | undefined;

  /** Insert Columns Locked (:insertColumns) */
  insertColumns: BooleanValue | undefined;

  /** Insert Rows Locked (:insertRows) */
  insertRows: BooleanValue | undefined;

  /** Insert Hyperlinks Locked (:insertHyperlinks) */
  insertHyperlinks: BooleanValue | undefined;

  /** Delete Columns Locked (:deleteColumns) */
  deleteColumns: BooleanValue | undefined;

  /** Delete Rows Locked (:deleteRows) */
  deleteRows: BooleanValue | undefined;

  /** Select Locked Cells Locked (:selectLockedCells) */
  selectLockedCells: BooleanValue | undefined;

  /** Sort Locked (:sort) */
  sort: BooleanValue | undefined;

  /** AutoFilter Locked (:autoFilter) */
  autoFilter: BooleanValue | undefined;

  /** Pivot Tables Locked (:pivotTables) */
  pivotTables: BooleanValue | undefined;

  /** Select Unlocked Cells Locked (:selectUnlockedCells) */
  selectUnlockedCells: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "password": this.password = HexBinaryValue.parse(value); return;
      case "algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "hashValue": this.hashValue = StringValue.parse(value); return;
      case "saltValue": this.saltValue = StringValue.parse(value); return;
      case "spinCount": this.spinCount = UInt32Value.parse(value); return;
      case "sheet": this.sheet = BooleanValue.parse(value); return;
      case "objects": this.objects = BooleanValue.parse(value); return;
      case "scenarios": this.scenarios = BooleanValue.parse(value); return;
      case "formatCells": this.formatCells = BooleanValue.parse(value); return;
      case "formatColumns": this.formatColumns = BooleanValue.parse(value); return;
      case "formatRows": this.formatRows = BooleanValue.parse(value); return;
      case "insertColumns": this.insertColumns = BooleanValue.parse(value); return;
      case "insertRows": this.insertRows = BooleanValue.parse(value); return;
      case "insertHyperlinks": this.insertHyperlinks = BooleanValue.parse(value); return;
      case "deleteColumns": this.deleteColumns = BooleanValue.parse(value); return;
      case "deleteRows": this.deleteRows = BooleanValue.parse(value); return;
      case "selectLockedCells": this.selectLockedCells = BooleanValue.parse(value); return;
      case "sort": this.sort = BooleanValue.parse(value); return;
      case "autoFilter": this.autoFilter = BooleanValue.parse(value); return;
      case "pivotTables": this.pivotTables = BooleanValue.parse(value); return;
      case "selectUnlockedCells": this.selectUnlockedCells = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.password !== undefined) out.push(["password", this.password.toString()]);
    if (this.algorithmName !== undefined) out.push(["algorithmName", this.algorithmName.toString()]);
    if (this.hashValue !== undefined) out.push(["hashValue", this.hashValue.toString()]);
    if (this.saltValue !== undefined) out.push(["saltValue", this.saltValue.toString()]);
    if (this.spinCount !== undefined) out.push(["spinCount", this.spinCount.toString()]);
    if (this.sheet !== undefined) out.push(["sheet", this.sheet.toString()]);
    if (this.objects !== undefined) out.push(["objects", this.objects.toString()]);
    if (this.scenarios !== undefined) out.push(["scenarios", this.scenarios.toString()]);
    if (this.formatCells !== undefined) out.push(["formatCells", this.formatCells.toString()]);
    if (this.formatColumns !== undefined) out.push(["formatColumns", this.formatColumns.toString()]);
    if (this.formatRows !== undefined) out.push(["formatRows", this.formatRows.toString()]);
    if (this.insertColumns !== undefined) out.push(["insertColumns", this.insertColumns.toString()]);
    if (this.insertRows !== undefined) out.push(["insertRows", this.insertRows.toString()]);
    if (this.insertHyperlinks !== undefined) out.push(["insertHyperlinks", this.insertHyperlinks.toString()]);
    if (this.deleteColumns !== undefined) out.push(["deleteColumns", this.deleteColumns.toString()]);
    if (this.deleteRows !== undefined) out.push(["deleteRows", this.deleteRows.toString()]);
    if (this.selectLockedCells !== undefined) out.push(["selectLockedCells", this.selectLockedCells.toString()]);
    if (this.sort !== undefined) out.push(["sort", this.sort.toString()]);
    if (this.autoFilter !== undefined) out.push(["autoFilter", this.autoFilter.toString()]);
    if (this.pivotTables !== undefined) out.push(["pivotTables", this.pivotTables.toString()]);
    if (this.selectUnlockedCells !== undefined) out.push(["selectUnlockedCells", this.selectUnlockedCells.toString()]);
    return out;
  }

}
