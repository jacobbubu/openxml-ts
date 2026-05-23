// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevCell

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the RevCell Class.
 *
 * Element: `xr:c` */
export class RevCell extends OpenXmlCompositeElement {
  override readonly localName = "c" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** t (:t) */
  t: StringValue | undefined;

  /** nop (:nop) */
  nop: BooleanValue | undefined;

  /** tick (:tick) */
  tick: BooleanValue | undefined;

  /** rep (:rep) */
  rep: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.t = StringValue.parse(value); return;
      case "nop": this.nop = BooleanValue.parse(value); return;
      case "tick": this.tick = BooleanValue.parse(value); return;
      case "rep": this.rep = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    if (this.nop !== undefined) out.push(["nop", this.nop.toString()]);
    if (this.tick !== undefined) out.push(["tick", this.tick.toString()]);
    if (this.rep !== undefined) out.push(["rep", this.rep.toString()]);
    return out;
  }

}
