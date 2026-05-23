// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.TaskGroupTask

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the TaskGroupTask Class.
 *
 * Element: `mso14:task` */
export class TaskGroupTask extends OpenXmlLeafElement {
  override readonly localName = "task" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;


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

  /** onAction (:onAction) */
  onAction: StringValue | undefined;

  /** isDefinitive (:isDefinitive) */
  isDefinitive: BooleanValue | undefined;

  /** image (:image) */
  image: StringValue | undefined;

  /** imageMso (:imageMso) */
  imageMso: StringValue | undefined;

  /** getImage (:getImage) */
  getImage: StringValue | undefined;

  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** getEnabled (:getEnabled) */
  getEnabled: StringValue | undefined;

  /** label (:label) */
  label: StringValue | undefined;

  /** getLabel (:getLabel) */
  getLabel: StringValue | undefined;

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  /** getVisible (:getVisible) */
  getVisible: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** getDescription (:getDescription) */
  getDescription: StringValue | undefined;

  /** keytip (:keytip) */
  keytip: StringValue | undefined;

  /** getKeytip (:getKeytip) */
  getKeytip: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "TaskGroupTask" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "TaskGroupTask" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "TaskGroupTask" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "TaskGroupTask" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "TaskGroupTask" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "TaskGroupTask" }); return;
      case "insertAfterQ": this.insertAfterQulifiedId = StringValue.parse(value); assertString(this.insertAfterQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "TaskGroupTask" }); return;
      case "insertBeforeQ": this.insertBeforeQulifiedId = StringValue.parse(value); assertString(this.insertBeforeQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "TaskGroupTask" }); return;
      case "onAction": this.onAction = StringValue.parse(value); assertString(this.onAction, { maxLength: 1024, minLength: 1 }, { attribute: ":onAction", elementClass: "TaskGroupTask" }); return;
      case "isDefinitive": this.isDefinitive = BooleanValue.parse(value); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "TaskGroupTask" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "TaskGroupTask" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "TaskGroupTask" }); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "TaskGroupTask" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "TaskGroupTask" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "TaskGroupTask" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "TaskGroupTask" }); return;
      case "description": this.description = StringValue.parse(value); assertString(this.description, { maxLength: 4096, minLength: 1 }, { attribute: ":description", elementClass: "TaskGroupTask" }); return;
      case "getDescription": this.getDescription = StringValue.parse(value); assertString(this.getDescription, { maxLength: 1024, minLength: 1 }, { attribute: ":getDescription", elementClass: "TaskGroupTask" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "TaskGroupTask" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "TaskGroupTask" }); return;
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
    if (this.onAction !== undefined) out.push(["onAction", this.onAction.toString()]);
    if (this.isDefinitive !== undefined) out.push(["isDefinitive", this.isDefinitive.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.getDescription !== undefined) out.push(["getDescription", this.getDescription.toString()]);
    if (this.keytip !== undefined) out.push(["keytip", this.keytip.toString()]);
    if (this.getKeytip !== undefined) out.push(["getKeytip", this.getKeytip.toString()]);
    return out;
  }

}
