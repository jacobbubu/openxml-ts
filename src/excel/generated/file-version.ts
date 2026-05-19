// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.FileVersion

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the FileVersion Class.
 *
 * Element: `x:fileVersion` */
export class FileVersion extends OpenXmlLeafElement {
  override readonly localName = "fileVersion" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Application Name (:appName) */
  applicationName: StringValue | undefined;

  /** Last Edited Version (:lastEdited) */
  lastEdited: StringValue | undefined;

  /** Lowest Edited Version (:lowestEdited) */
  lowestEdited: StringValue | undefined;

  /** Build Version (:rupBuild) */
  buildVersion: StringValue | undefined;

  /** Code Name (:codeName) */
  codeName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "appName": this.applicationName = StringValue.parse(value); return;
      case "lastEdited": this.lastEdited = StringValue.parse(value); return;
      case "lowestEdited": this.lowestEdited = StringValue.parse(value); return;
      case "rupBuild": this.buildVersion = StringValue.parse(value); return;
      case "codeName": this.codeName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.applicationName !== undefined) out.push(["appName", this.applicationName.toString()]);
    if (this.lastEdited !== undefined) out.push(["lastEdited", this.lastEdited.toString()]);
    if (this.lowestEdited !== undefined) out.push(["lowestEdited", this.lowestEdited.toString()]);
    if (this.buildVersion !== undefined) out.push(["rupBuild", this.buildVersion.toString()]);
    if (this.codeName !== undefined) out.push(["codeName", this.codeName.toString()]);
    return out;
  }

}
