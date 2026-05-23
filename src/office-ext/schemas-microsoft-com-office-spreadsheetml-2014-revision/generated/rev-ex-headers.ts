// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExHeaders

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExHeaders Class.
 *
 * Element: `xr:revHdrs` */
export class RevExHeaders extends OpenXmlCompositeElement {
  override readonly localName = "revHdrs" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** minRev (:minRev) */
  minRev: UInt64Value | undefined;

  /** maxRev (:maxRev) */
  maxRev: UInt64Value | undefined;

  /** docId (:docId) */
  docId: StringValue | undefined;

  /** endpointId (:endpointId) */
  endpointId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "minRev": this.minRev = UInt64Value.parse(value); return;
      case "maxRev": this.maxRev = UInt64Value.parse(value); return;
      case "docId": this.docId = StringValue.parse(value); return;
      case "endpointId": this.endpointId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.minRev !== undefined) out.push(["minRev", this.minRev.toString()]);
    if (this.maxRev !== undefined) out.push(["maxRev", this.maxRev.toString()]);
    if (this.docId !== undefined) out.push(["docId", this.docId.toString()]);
    if (this.endpointId !== undefined) out.push(["endpointId", this.endpointId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.minRev, { attribute: ":minRev", elementClass: "RevExHeaders" });
    assertRequired(this.maxRev, { attribute: ":maxRev", elementClass: "RevExHeaders" });
    assertRequired(this.docId, { attribute: ":docId", elementClass: "RevExHeaders" });
    assertRequired(this.endpointId, { attribute: ":endpointId", elementClass: "RevExHeaders" });
  }
}
