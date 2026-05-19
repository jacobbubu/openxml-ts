// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionFormat

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Format.
 *
 * Element: `x:rfmt` */
export class RevisionFormat extends OpenXmlCompositeElement {
  override readonly localName = "rfmt" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

  /** Row or Column Formatting Change (:xfDxf) */
  rowOrColumnAffected: BooleanValue | undefined;

  /** Style (:s) */
  styleAffected: BooleanValue | undefined;

  /** Sequence Of References (:sqref) */
  sequenceOfReferences: StringValue | undefined;

  /** Start index (:start) */
  start: UInt32Value | undefined;

  /** Length (:length) */
  length: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sheetId": this.sheetId = UInt32Value.parse(value); return;
      case "xfDxf": this.rowOrColumnAffected = BooleanValue.parse(value); return;
      case "s": this.styleAffected = BooleanValue.parse(value); return;
      case "sqref": this.sequenceOfReferences = StringValue.parse(value); return;
      case "start": this.start = UInt32Value.parse(value); return;
      case "length": this.length = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetId !== undefined) out.push(["sheetId", this.sheetId.toString()]);
    if (this.rowOrColumnAffected !== undefined) out.push(["xfDxf", this.rowOrColumnAffected.toString()]);
    if (this.styleAffected !== undefined) out.push(["s", this.styleAffected.toString()]);
    if (this.sequenceOfReferences !== undefined) out.push(["sqref", this.sequenceOfReferences.toString()]);
    if (this.start !== undefined) out.push(["start", this.start.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "RevisionFormat" });
    assertRequired(this.sequenceOfReferences, { attribute: ":sqref", elementClass: "RevisionFormat" });
  }
}
