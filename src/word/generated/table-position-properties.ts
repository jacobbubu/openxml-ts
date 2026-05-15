// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TablePositionProperties

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the TablePositionProperties Class.
 *
 * Element: `w:tblpPr` */
export class TablePositionProperties extends OpenXmlLeafElement {
  override readonly localName = "tblpPr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Distance From Left of Table to Text (w:leftFromText) */
  leftFromText: StringValue | undefined;

  /** (Distance From Right of Table to Text (w:rightFromText) */
  rightFromText: StringValue | undefined;

  /** Distance From Top of Table to Text (w:topFromText) */
  topFromText: StringValue | undefined;

  /** Distance From Bottom of Table to Text (w:bottomFromText) */
  bottomFromText: StringValue | undefined;

  /** Table Vertical Anchor (w:vertAnchor) */
  verticalAnchor: StringValue | undefined;

  /** Table Horizontal Anchor (w:horzAnchor) */
  horizontalAnchor: StringValue | undefined;

  /** Relative Horizontal Alignment From Anchor (w:tblpXSpec) */
  tablePositionXAlignment: StringValue | undefined;

  /** Absolute Horizontal Distance From Anchor (w:tblpX) */
  tablePositionX: Int32Value | undefined;

  /** Relative Vertical Alignment from Anchor (w:tblpYSpec) */
  tablePositionYAlignment: StringValue | undefined;

  /** Absolute Vertical Distance From Anchor (w:tblpY) */
  tablePositionY: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:leftFromText": this.leftFromText = StringValue.parse(value); return;
      case "w:rightFromText": this.rightFromText = StringValue.parse(value); return;
      case "w:topFromText": this.topFromText = StringValue.parse(value); return;
      case "w:bottomFromText": this.bottomFromText = StringValue.parse(value); return;
      case "w:vertAnchor": this.verticalAnchor = StringValue.parse(value); return;
      case "w:horzAnchor": this.horizontalAnchor = StringValue.parse(value); return;
      case "w:tblpXSpec": this.tablePositionXAlignment = StringValue.parse(value); return;
      case "w:tblpX": this.tablePositionX = Int32Value.parse(value); return;
      case "w:tblpYSpec": this.tablePositionYAlignment = StringValue.parse(value); return;
      case "w:tblpY": this.tablePositionY = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.leftFromText !== undefined) out.push(["w:leftFromText", this.leftFromText.toString()]);
    if (this.rightFromText !== undefined) out.push(["w:rightFromText", this.rightFromText.toString()]);
    if (this.topFromText !== undefined) out.push(["w:topFromText", this.topFromText.toString()]);
    if (this.bottomFromText !== undefined) out.push(["w:bottomFromText", this.bottomFromText.toString()]);
    if (this.verticalAnchor !== undefined) out.push(["w:vertAnchor", this.verticalAnchor.toString()]);
    if (this.horizontalAnchor !== undefined) out.push(["w:horzAnchor", this.horizontalAnchor.toString()]);
    if (this.tablePositionXAlignment !== undefined) out.push(["w:tblpXSpec", this.tablePositionXAlignment.toString()]);
    if (this.tablePositionX !== undefined) out.push(["w:tblpX", this.tablePositionX.toString()]);
    if (this.tablePositionYAlignment !== undefined) out.push(["w:tblpYSpec", this.tablePositionYAlignment.toString()]);
    if (this.tablePositionY !== undefined) out.push(["w:tblpY", this.tablePositionY.toString()]);
    return out;
  }
}
