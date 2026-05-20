// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Proxy

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Shape Reference.
 *
 * Element: `o:proxy` */
export class Proxy extends OpenXmlLeafElement {
  override readonly localName = "proxy" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** Start Point Connection Flag (:start) */
  start: StringValue | undefined;

  /** End Point Connection Flag (:end) */
  end: StringValue | undefined;

  /** Proxy Shape Reference (:idref) */
  shapeReference: StringValue | undefined;

  /** Connection Location (:connectloc) */
  connectionLocation: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "start": this.start = StringValue.parse(value); return;
      case "end": this.end = StringValue.parse(value); return;
      case "idref": this.shapeReference = StringValue.parse(value); return;
      case "connectloc": this.connectionLocation = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.start !== undefined) out.push(["start", this.start.toString()]);
    if (this.end !== undefined) out.push(["end", this.end.toString()]);
    if (this.shapeReference !== undefined) out.push(["idref", this.shapeReference.toString()]);
    if (this.connectionLocation !== undefined) out.push(["connectloc", this.connectionLocation.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.shapeReference, { attribute: ":idref", elementClass: "Proxy" });
    assertRequired(this.connectionLocation, { attribute: ":connectloc", elementClass: "Proxy" });
  }
}
