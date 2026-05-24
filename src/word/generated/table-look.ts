// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableLook

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

// §14.4.11 of ISO/IEC 29500-4: Strict boolean attributes collapse into a single
// Transitional hex bitmask attribute w:val (ST_ShortHexNumber, 4 hex digits).
const TABLE_LOOK_STRICT_BIT_MAP: ReadonlyMap<string, number> = new Map([
  ["w:firstRow", 0x0020],
  ["w:lastRow", 0x0040],
  ["w:firstColumn", 0x0080],
  ["w:lastColumn", 0x0100],
  ["w:noHBand", 0x0200],
  ["w:noVBand", 0x0400],
]);

function tableLookValToHex(n: number): string {
  return n.toString(16).padStart(4, "0");
}

function tableLookHexToVal(s: string | undefined): number {
  if (!s) return 0;
  try {
    return Number.parseInt(s, 16);
  } catch {
    return 0;
  }
}

/** Defines the TableLook Class.
 *
 * Element: `w:tblLook` */
export class TableLook extends OpenXmlLeafElement {
  override readonly localName = "tblLook" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;

  /** val — hex bitmask (w:val) */
  val: StringValue | undefined;

  /** firstRow (w:firstRow) */
  firstRow: BooleanValue | undefined;

  /** lastRow (w:lastRow) */
  lastRow: BooleanValue | undefined;

  /** firstColumn (w:firstColumn) */
  firstColumn: BooleanValue | undefined;

  /** lastColumn (w:lastColumn) */
  lastColumn: BooleanValue | undefined;

  /** noHBand (w:noHBand) */
  noHorizontalBand: BooleanValue | undefined;

  /** noVBand (w:noVBand) */
  noVerticalBand: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    const bit = TABLE_LOOK_STRICT_BIT_MAP.get(qname);
    if (bit !== undefined) {
      // §14.4.11: translate Strict boolean attribute into the Transitional hex bitmask val
      const isTrue = value === "true" || value === "1";
      const current = tableLookHexToVal(this.val?.toString());
      const updated = isTrue ? (current | bit) : (current & ~bit);
      this.val = StringValue.parse(tableLookValToHex(updated));
      return;
    }
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:firstRow": this.firstRow = BooleanValue.parse(value); return;
      case "w:lastRow": this.lastRow = BooleanValue.parse(value); return;
      case "w:firstColumn": this.firstColumn = BooleanValue.parse(value); return;
      case "w:lastColumn": this.lastColumn = BooleanValue.parse(value); return;
      case "w:noHBand": this.noHorizontalBand = BooleanValue.parse(value); return;
      case "w:noVBand": this.noVerticalBand = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.firstRow !== undefined) out.push(["w:firstRow", this.firstRow.toString()]);
    if (this.lastRow !== undefined) out.push(["w:lastRow", this.lastRow.toString()]);
    if (this.firstColumn !== undefined) out.push(["w:firstColumn", this.firstColumn.toString()]);
    if (this.lastColumn !== undefined) out.push(["w:lastColumn", this.lastColumn.toString()]);
    if (this.noHorizontalBand !== undefined) out.push(["w:noHBand", this.noHorizontalBand.toString()]);
    if (this.noVerticalBand !== undefined) out.push(["w:noVBand", this.noVerticalBand.toString()]);
    return out;
  }

}
