// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Connection

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Connection.
 *
 * Element: `x:connection` */
export class Connection extends OpenXmlCompositeElement {
  override readonly localName = "connection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt32Value | undefined;

  /** sourceFile (:sourceFile) */
  sourceFile: StringValue | undefined;

  /** odcFile (:odcFile) */
  connectionFile: StringValue | undefined;

  /** keepAlive (:keepAlive) */
  keepAlive: BooleanValue | undefined;

  /** interval (:interval) */
  interval: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** type (:type) */
  type: UInt32Value | undefined;

  /** reconnectionMethod (:reconnectionMethod) */
  reconnectionMethod: UInt32Value | undefined;

  /** refreshedVersion (:refreshedVersion) */
  refreshedVersion: StringValue | undefined;

  /** minRefreshableVersion (:minRefreshableVersion) */
  minRefreshableVersion: StringValue | undefined;

  /** savePassword (:savePassword) */
  savePassword: BooleanValue | undefined;

  /** new (:new) */
  new: BooleanValue | undefined;

  /** deleted (:deleted) */
  deleted: BooleanValue | undefined;

  /** onlyUseConnectionFile (:onlyUseConnectionFile) */
  onlyUseConnectionFile: BooleanValue | undefined;

  /** background (:background) */
  background: BooleanValue | undefined;

  /** refreshOnLoad (:refreshOnLoad) */
  refreshOnLoad: BooleanValue | undefined;

  /** saveData (:saveData) */
  saveData: BooleanValue | undefined;

  /** credentials (:credentials) */
  credentials: StringValue | undefined;

  /** singleSignOnId (:singleSignOnId) */
  singleSignOnId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":sourceFile": this.sourceFile = StringValue.parse(value); return;
      case ":odcFile": this.connectionFile = StringValue.parse(value); return;
      case ":keepAlive": this.keepAlive = BooleanValue.parse(value); return;
      case ":interval": this.interval = UInt32Value.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":description": this.description = StringValue.parse(value); return;
      case ":type": this.type = UInt32Value.parse(value); return;
      case ":reconnectionMethod": this.reconnectionMethod = UInt32Value.parse(value); return;
      case ":refreshedVersion": this.refreshedVersion = StringValue.parse(value); return;
      case ":minRefreshableVersion": this.minRefreshableVersion = StringValue.parse(value); return;
      case ":savePassword": this.savePassword = BooleanValue.parse(value); return;
      case ":new": this.new = BooleanValue.parse(value); return;
      case ":deleted": this.deleted = BooleanValue.parse(value); return;
      case ":onlyUseConnectionFile": this.onlyUseConnectionFile = BooleanValue.parse(value); return;
      case ":background": this.background = BooleanValue.parse(value); return;
      case ":refreshOnLoad": this.refreshOnLoad = BooleanValue.parse(value); return;
      case ":saveData": this.saveData = BooleanValue.parse(value); return;
      case ":credentials": this.credentials = StringValue.parse(value); return;
      case ":singleSignOnId": this.singleSignOnId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.sourceFile !== undefined) out.push([":sourceFile", this.sourceFile.toString()]);
    if (this.connectionFile !== undefined) out.push([":odcFile", this.connectionFile.toString()]);
    if (this.keepAlive !== undefined) out.push([":keepAlive", this.keepAlive.toString()]);
    if (this.interval !== undefined) out.push([":interval", this.interval.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.description !== undefined) out.push([":description", this.description.toString()]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.reconnectionMethod !== undefined) out.push([":reconnectionMethod", this.reconnectionMethod.toString()]);
    if (this.refreshedVersion !== undefined) out.push([":refreshedVersion", this.refreshedVersion.toString()]);
    if (this.minRefreshableVersion !== undefined) out.push([":minRefreshableVersion", this.minRefreshableVersion.toString()]);
    if (this.savePassword !== undefined) out.push([":savePassword", this.savePassword.toString()]);
    if (this.new !== undefined) out.push([":new", this.new.toString()]);
    if (this.deleted !== undefined) out.push([":deleted", this.deleted.toString()]);
    if (this.onlyUseConnectionFile !== undefined) out.push([":onlyUseConnectionFile", this.onlyUseConnectionFile.toString()]);
    if (this.background !== undefined) out.push([":background", this.background.toString()]);
    if (this.refreshOnLoad !== undefined) out.push([":refreshOnLoad", this.refreshOnLoad.toString()]);
    if (this.saveData !== undefined) out.push([":saveData", this.saveData.toString()]);
    if (this.credentials !== undefined) out.push([":credentials", this.credentials.toString()]);
    if (this.singleSignOnId !== undefined) out.push([":singleSignOnId", this.singleSignOnId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Connection" });
    assertRequired(this.refreshedVersion, { attribute: ":refreshedVersion", elementClass: "Connection" });
  }
}
