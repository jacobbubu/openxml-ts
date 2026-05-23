// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.TaskGroupCategory

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the TaskGroupCategory Class.
 *
 * Element: `mso14:category` */
export class TaskGroupCategory extends OpenXmlCompositeElement {
  override readonly localName = "category" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  qualifiedId: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** idMso (:idMso) */
  idMso: StringValue | undefined;

  /** insertAfterMso (:insertAfterMso) */
  insertAfterMso: StringValue | undefined;

  /** insertBeforeMso (:insertBeforeMso) */
  insertBeforeMso: StringValue | undefined;

  /** insertAfterQ (:insertAfterQ) */
  insertAfterQulifiedId: StringValue | undefined;

  /** insertBeforeQ (:insertBeforeQ) */
  insertBeforeQulifiedId: StringValue | undefined;

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  /** getVisible (:getVisible) */
  getVisible: StringValue | undefined;

  /** label (:label) */
  label: StringValue | undefined;

  /** getLabel (:getLabel) */
  getLabel: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "TaskGroupCategory" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "TaskGroupCategory" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "TaskGroupCategory" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "TaskGroupCategory" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "TaskGroupCategory" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "TaskGroupCategory" }); return;
      case "insertAfterQ": this.insertAfterQulifiedId = StringValue.parse(value); assertString(this.insertAfterQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "TaskGroupCategory" }); return;
      case "insertBeforeQ": this.insertBeforeQulifiedId = StringValue.parse(value); assertString(this.insertBeforeQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "TaskGroupCategory" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "TaskGroupCategory" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "TaskGroupCategory" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "TaskGroupCategory" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQulifiedId !== undefined) out.push(["insertAfterQ", this.insertAfterQulifiedId.toString()]);
    if (this.insertBeforeQulifiedId !== undefined) out.push(["insertBeforeQ", this.insertBeforeQulifiedId.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    return out;
  }

}
