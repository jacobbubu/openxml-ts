// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.ButtonGroup

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the ButtonGroup Class.
 *
 * Element: `mso:buttonGroup` */
export class ButtonGroup extends OpenXmlCompositeElement {
  override readonly localName = "buttonGroup" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  idQ: StringValue | undefined;

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  /** getVisible (:getVisible) */
  getVisible: StringValue | undefined;

  /** insertAfterMso (:insertAfterMso) */
  insertAfterMso: StringValue | undefined;

  /** insertBeforeMso (:insertBeforeMso) */
  insertBeforeMso: StringValue | undefined;

  /** insertAfterQ (:insertAfterQ) */
  insertAfterQ: StringValue | undefined;

  /** insertBeforeQ (:insertBeforeQ) */
  insertBeforeQ: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "ButtonGroup" }); return;
      case "idQ": this.idQ = StringValue.parse(value); assertString(this.idQ, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "ButtonGroup" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "ButtonGroup" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "ButtonGroup" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "ButtonGroup" }); return;
      case "insertAfterQ": this.insertAfterQ = StringValue.parse(value); assertString(this.insertAfterQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "ButtonGroup" }); return;
      case "insertBeforeQ": this.insertBeforeQ = StringValue.parse(value); assertString(this.insertBeforeQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "ButtonGroup" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.idQ !== undefined) out.push(["idQ", this.idQ.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQ !== undefined) out.push(["insertAfterQ", this.insertAfterQ.toString()]);
    if (this.insertBeforeQ !== undefined) out.push(["insertBeforeQ", this.insertBeforeQ.toString()]);
    return out;
  }

}
