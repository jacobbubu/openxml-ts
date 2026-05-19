// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Headers

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Headers.
 *
 * Element: `x:headers` */
export class Headers extends OpenXmlCompositeElement {
  override readonly localName = "headers" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Last Revision GUID (:guid) */
  guid: StringValue | undefined;

  /** Last GUID (:lastGuid) */
  lastGuid: StringValue | undefined;

  /** Shared Workbook (:shared) */
  shared: BooleanValue | undefined;

  /** Disk Revisions (:diskRevisions) */
  diskRevisions: BooleanValue | undefined;

  /** History (:history) */
  history: BooleanValue | undefined;

  /** Track Revisions (:trackRevisions) */
  trackRevisions: BooleanValue | undefined;

  /** Exclusive Mode (:exclusive) */
  exclusive: BooleanValue | undefined;

  /** Revision Id (:revisionId) */
  revisionId: UInt32Value | undefined;

  /** Version (:version) */
  version: Int32Value | undefined;

  /** Keep Change History (:keepChangeHistory) */
  keepChangeHistory: BooleanValue | undefined;

  /** Protected (:protected) */
  protected: BooleanValue | undefined;

  /** Preserve History (:preserveHistory) */
  preserveHistory: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "guid": this.guid = StringValue.parse(value); return;
      case "lastGuid": this.lastGuid = StringValue.parse(value); return;
      case "shared": this.shared = BooleanValue.parse(value); return;
      case "diskRevisions": this.diskRevisions = BooleanValue.parse(value); return;
      case "history": this.history = BooleanValue.parse(value); return;
      case "trackRevisions": this.trackRevisions = BooleanValue.parse(value); return;
      case "exclusive": this.exclusive = BooleanValue.parse(value); return;
      case "revisionId": this.revisionId = UInt32Value.parse(value); return;
      case "version": this.version = Int32Value.parse(value); return;
      case "keepChangeHistory": this.keepChangeHistory = BooleanValue.parse(value); return;
      case "protected": this.protected = BooleanValue.parse(value); return;
      case "preserveHistory": this.preserveHistory = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push(["guid", this.guid.toString()]);
    if (this.lastGuid !== undefined) out.push(["lastGuid", this.lastGuid.toString()]);
    if (this.shared !== undefined) out.push(["shared", this.shared.toString()]);
    if (this.diskRevisions !== undefined) out.push(["diskRevisions", this.diskRevisions.toString()]);
    if (this.history !== undefined) out.push(["history", this.history.toString()]);
    if (this.trackRevisions !== undefined) out.push(["trackRevisions", this.trackRevisions.toString()]);
    if (this.exclusive !== undefined) out.push(["exclusive", this.exclusive.toString()]);
    if (this.revisionId !== undefined) out.push(["revisionId", this.revisionId.toString()]);
    if (this.version !== undefined) out.push(["version", this.version.toString()]);
    if (this.keepChangeHistory !== undefined) out.push(["keepChangeHistory", this.keepChangeHistory.toString()]);
    if (this.protected !== undefined) out.push(["protected", this.protected.toString()]);
    if (this.preserveHistory !== undefined) out.push(["preserveHistory", this.preserveHistory.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "Headers" });
  }
}
