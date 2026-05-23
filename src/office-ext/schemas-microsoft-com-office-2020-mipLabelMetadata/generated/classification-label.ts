// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2020_mipLabelMetadata.json
// @see DocumentFormat.OpenXml.2020MipLabelMetadata.ClassificationLabel

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ClassificationLabel Class.
 *
 * Element: `clbl:label` */
export class ClassificationLabel extends OpenXmlLeafElement {
  override readonly localName = "label" as const;
  override readonly prefix = "clbl" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2020/mipLabelMetadata" as const;


  /** id (:id) */
  id: StringValue | undefined;

  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** setDate (:setDate) */
  setDate: StringValue | undefined;

  /** method (:method) */
  method: StringValue | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** siteId (:siteId) */
  siteId: StringValue | undefined;

  /** actionId (:actionId) */
  actionId: StringValue | undefined;

  /** contentBits (:contentBits) */
  contentBits: UInt32Value | undefined;

  /** removed (:removed) */
  removed: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "setDate": this.setDate = StringValue.parse(value); return;
      case "method": this.method = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "siteId": this.siteId = StringValue.parse(value); return;
      case "actionId": this.actionId = StringValue.parse(value); return;
      case "contentBits": this.contentBits = UInt32Value.parse(value); return;
      case "removed": this.removed = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.setDate !== undefined) out.push(["setDate", this.setDate.toString()]);
    if (this.method !== undefined) out.push(["method", this.method.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.siteId !== undefined) out.push(["siteId", this.siteId.toString()]);
    if (this.actionId !== undefined) out.push(["actionId", this.actionId.toString()]);
    if (this.contentBits !== undefined) out.push(["contentBits", this.contentBits.toString()]);
    if (this.removed !== undefined) out.push(["removed", this.removed.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "ClassificationLabel" });
    assertRequired(this.enabled, { attribute: ":enabled", elementClass: "ClassificationLabel" });
    assertRequired(this.method, { attribute: ":method", elementClass: "ClassificationLabel" });
    assertRequired(this.siteId, { attribute: ":siteId", elementClass: "ClassificationLabel" });
    assertRequired(this.removed, { attribute: ":removed", elementClass: "ClassificationLabel" });
  }
}
