// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RefOartAnchor

import {
  BooleanValue,
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RefOartAnchor Class.
 *
 * Element: `xr:oartAnchor` */
export class RefOartAnchor extends OpenXmlLeafElement {
  override readonly localName = "oartAnchor" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** n (:n) */
  n: StringValue | undefined;

  /** ajt (:ajt) */
  ajt: StringValue | undefined;

  /** ajtx (:ajtx) */
  ajtx: StringValue | undefined;

  /** homeRef (:homeRef) */
  homeRef: BooleanValue | undefined;

  /** r (:r) */
  r: StringValue | undefined;

  /** fromRowOff (:fromRowOff) */
  fromRowOff: Int64Value | undefined;

  /** fromColOff (:fromColOff) */
  fromColOff: Int64Value | undefined;

  /** toRowOff (:toRowOff) */
  toRowOff: Int64Value | undefined;

  /** toColOff (:toColOff) */
  toColOff: Int64Value | undefined;

  /** cx (:cx) */
  cx: Int64Value | undefined;

  /** cy (:cy) */
  cy: Int64Value | undefined;

  /** x (:x) */
  x: Int64Value | undefined;

  /** y (:y) */
  y: Int64Value | undefined;

  /** oat (:oat) */
  oat: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.n = StringValue.parse(value); return;
      case "ajt": this.ajt = StringValue.parse(value); return;
      case "ajtx": this.ajtx = StringValue.parse(value); return;
      case "homeRef": this.homeRef = BooleanValue.parse(value); return;
      case "r": this.r = StringValue.parse(value); return;
      case "fromRowOff": this.fromRowOff = Int64Value.parse(value); assertNumber(this.fromRowOff, { min: -27273042329600, max: 27273042316900 }, { attribute: ":fromRowOff", elementClass: "RefOartAnchor" }); return;
      case "fromColOff": this.fromColOff = Int64Value.parse(value); assertNumber(this.fromColOff, { min: -27273042329600, max: 27273042316900 }, { attribute: ":fromColOff", elementClass: "RefOartAnchor" }); return;
      case "toRowOff": this.toRowOff = Int64Value.parse(value); assertNumber(this.toRowOff, { min: -27273042329600, max: 27273042316900 }, { attribute: ":toRowOff", elementClass: "RefOartAnchor" }); return;
      case "toColOff": this.toColOff = Int64Value.parse(value); assertNumber(this.toColOff, { min: -27273042329600, max: 27273042316900 }, { attribute: ":toColOff", elementClass: "RefOartAnchor" }); return;
      case "cx": this.cx = Int64Value.parse(value); assertNumber(this.cx, { min: 0, max: 2147483647 }, { attribute: ":cx", elementClass: "RefOartAnchor" }); return;
      case "cy": this.cy = Int64Value.parse(value); assertNumber(this.cy, { min: 0, max: 2147483647 }, { attribute: ":cy", elementClass: "RefOartAnchor" }); return;
      case "x": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":x", elementClass: "RefOartAnchor" }); return;
      case "y": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":y", elementClass: "RefOartAnchor" }); return;
      case "oat": this.oat = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.n !== undefined) out.push(["n", this.n.toString()]);
    if (this.ajt !== undefined) out.push(["ajt", this.ajt.toString()]);
    if (this.ajtx !== undefined) out.push(["ajtx", this.ajtx.toString()]);
    if (this.homeRef !== undefined) out.push(["homeRef", this.homeRef.toString()]);
    if (this.r !== undefined) out.push(["r", this.r.toString()]);
    if (this.fromRowOff !== undefined) out.push(["fromRowOff", this.fromRowOff.toString()]);
    if (this.fromColOff !== undefined) out.push(["fromColOff", this.fromColOff.toString()]);
    if (this.toRowOff !== undefined) out.push(["toRowOff", this.toRowOff.toString()]);
    if (this.toColOff !== undefined) out.push(["toColOff", this.toColOff.toString()]);
    if (this.cx !== undefined) out.push(["cx", this.cx.toString()]);
    if (this.cy !== undefined) out.push(["cy", this.cy.toString()]);
    if (this.x !== undefined) out.push(["x", this.x.toString()]);
    if (this.y !== undefined) out.push(["y", this.y.toString()]);
    if (this.oat !== undefined) out.push(["oat", this.oat.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.n, { attribute: ":n", elementClass: "RefOartAnchor" });
    assertRequired(this.ajt, { attribute: ":ajt", elementClass: "RefOartAnchor" });
    assertRequired(this.oat, { attribute: ":oat", elementClass: "RefOartAnchor" });
  }
}
