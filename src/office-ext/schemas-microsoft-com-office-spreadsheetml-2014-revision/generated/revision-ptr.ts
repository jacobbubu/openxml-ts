// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.RevisionPtr

import {
  OpenXmlLeafElement,
  StringValue,
  UInt64Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RevisionPtr Class.
 *
 * Element: `xr:revisionPtr` */
export class RevisionPtr extends OpenXmlLeafElement {
  override readonly localName = "revisionPtr" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** revIDLastSave (:revIDLastSave) */
  revIDLastSave: UInt64Value | undefined;

  /** documentId (:documentId) */
  documentId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "revIDLastSave": this.revIDLastSave = UInt64Value.parse(value); return;
      case "documentId": this.documentId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.revIDLastSave !== undefined) out.push(["revIDLastSave", this.revIDLastSave.toString()]);
    if (this.documentId !== undefined) out.push(["documentId", this.documentId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revIDLastSave, { attribute: ":revIDLastSave", elementClass: "RevisionPtr" });
    assertRequired(this.documentId, { attribute: ":documentId", elementClass: "RevisionPtr" });
  }
}
