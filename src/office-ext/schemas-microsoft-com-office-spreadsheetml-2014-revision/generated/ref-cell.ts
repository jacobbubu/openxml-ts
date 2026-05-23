// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RefCell

import {
  BooleanValue,
  ListValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RefCell Class.
 *
 * Element: `xr:ref` */
export class RefCell extends OpenXmlLeafElement {
  override readonly localName = "ref" as const;
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
  r: ListValue<StringValue> | undefined;

  /** uid (:uid) */
  uid: StringValue | undefined;

  /** uidLast (:uidLast) */
  uidLast: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "n": this.n = StringValue.parse(value); return;
      case "ajt": this.ajt = StringValue.parse(value); return;
      case "ajtx": this.ajtx = StringValue.parse(value); return;
      case "homeRef": this.homeRef = BooleanValue.parse(value); return;
      case "r": this.r = ListValue.parse(value, StringValue.parse); return;
      case "uid": this.uid = StringValue.parse(value); return;
      case "uidLast": this.uidLast = StringValue.parse(value); return;
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
    if (this.uid !== undefined) out.push(["uid", this.uid.toString()]);
    if (this.uidLast !== undefined) out.push(["uidLast", this.uidLast.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.n, { attribute: ":n", elementClass: "RefCell" });
    assertRequired(this.ajt, { attribute: ":ajt", elementClass: "RefCell" });
    assertRequired(this.r, { attribute: ":r", elementClass: "RefCell" });
  }
}
