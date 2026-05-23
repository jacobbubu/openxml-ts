// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevExHeader

import {
  DateTimeValue,
  OpenXmlLeafElement,
  StringValue,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevExHeader Class.
 *
 * Element: `xr:hdr` */
export class RevExHeader extends OpenXmlLeafElement {
  override readonly localName = "hdr" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** id (r:id) */
  id: StringValue | undefined;

  /** minRev (:minRev) */
  minRev: UInt64Value | undefined;

  /** maxRev (:maxRev) */
  maxRev: UInt64Value | undefined;

  /** time (:time) */
  time: DateTimeValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
      case "minRev": this.minRev = UInt64Value.parse(value); return;
      case "maxRev": this.maxRev = UInt64Value.parse(value); return;
      case "time": this.time = DateTimeValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.minRev !== undefined) out.push(["minRev", this.minRev.toString()]);
    if (this.maxRev !== undefined) out.push(["maxRev", this.maxRev.toString()]);
    if (this.time !== undefined) out.push(["time", this.time.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "RevExHeader" });
    assertRequired(this.time, { attribute: ":time", elementClass: "RevExHeader" });
  }
}
