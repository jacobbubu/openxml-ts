// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.ContextualTabSet

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
  assertString,
} from "../../../element/index.js";

/** Defines the ContextualTabSet Class.
 *
 * Element: `mso:tabSet` */
export class ContextualTabSet extends OpenXmlCompositeElement {
  override readonly localName = "tabSet" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** idMso (:idMso) */
  idMso: StringValue | undefined;

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  /** getVisible (:getVisible) */
  getVisible: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "ContextualTabSet" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "ContextualTabSet" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.idMso, { attribute: ":idMso", elementClass: "ContextualTabSet" });
  }
}
