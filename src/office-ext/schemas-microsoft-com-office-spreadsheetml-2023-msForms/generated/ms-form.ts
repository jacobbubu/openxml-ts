// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_msForms.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023MsForms.MsForm

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the MsForm Class.
 *
 * Element: `xlmsforms:msForm` */
export class MsForm extends OpenXmlCompositeElement {
  override readonly localName = "msForm" as const;
  override readonly prefix = "xlmsforms" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/msForms" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** isFormConnected (:isFormConnected) */
  isFormConnected: BooleanValue | undefined;

  /** maxResponseId (:maxResponseId) */
  maxResponseId: Int32Value | undefined;

  /** latestEventMarker (:latestEventMarker) */
  latestEventMarker: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "isFormConnected": this.isFormConnected = BooleanValue.parse(value); return;
      case "maxResponseId": this.maxResponseId = Int32Value.parse(value); return;
      case "latestEventMarker": this.latestEventMarker = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.isFormConnected !== undefined) out.push(["isFormConnected", this.isFormConnected.toString()]);
    if (this.maxResponseId !== undefined) out.push(["maxResponseId", this.maxResponseId.toString()]);
    if (this.latestEventMarker !== undefined) out.push(["latestEventMarker", this.latestEventMarker.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "MsForm" });
  }
}
