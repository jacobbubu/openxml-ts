// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_activeX.json
// @see DocumentFormat.OpenXml.2006ActiveX.ActiveXControlData

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ActiveXControlData Class.
 *
 * Element: `ax:ocx` */
export class ActiveXControlData extends OpenXmlCompositeElement {
  override readonly localName = "ocx" as const;
  override readonly prefix = "ax" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/activeX" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** classid (ax:classid) */
  activeXControlClassId: StringValue | undefined;

  /** license (ax:license) */
  license: StringValue | undefined;

  /** id (r:id) */
  id: StringValue | undefined;

  /** persistence (ax:persistence) */
  persistence: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ax:classid": this.activeXControlClassId = StringValue.parse(value); return;
      case "ax:license": this.license = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case "ax:persistence": this.persistence = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.activeXControlClassId !== undefined) out.push(["ax:classid", this.activeXControlClassId.toString()]);
    if (this.license !== undefined) out.push(["ax:license", this.license.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.persistence !== undefined) out.push(["ax:persistence", this.persistence.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.activeXControlClassId, { attribute: "ax:classid", elementClass: "ActiveXControlData" });
    assertRequired(this.persistence, { attribute: "ax:persistence", elementClass: "ActiveXControlData" });
  }
}
