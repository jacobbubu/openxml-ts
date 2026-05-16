// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.DatabaseProperties

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the DatabaseProperties Class.
 *
 * Element: `x:dbPr` */
export class DatabaseProperties extends OpenXmlLeafElement {
  override readonly localName = "dbPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Connection String (:connection) */
  connection: StringValue | undefined;

  /** Command Text (:command) */
  command: StringValue | undefined;

  /** Command Text (:serverCommand) */
  serverCommand: StringValue | undefined;

  /** OLE DB Command Type (:commandType) */
  commandType: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":connection": this.connection = StringValue.parse(value); return;
      case ":command": this.command = StringValue.parse(value); return;
      case ":serverCommand": this.serverCommand = StringValue.parse(value); return;
      case ":commandType": this.commandType = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.connection !== undefined) out.push([":connection", this.connection.toString()]);
    if (this.command !== undefined) out.push([":command", this.command.toString()]);
    if (this.serverCommand !== undefined) out.push([":serverCommand", this.serverCommand.toString()]);
    if (this.commandType !== undefined) out.push([":commandType", this.commandType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.connection, { attribute: ":connection", elementClass: "DatabaseProperties" });
  }
}
