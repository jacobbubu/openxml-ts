// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.ControlCloneQat

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the ControlCloneQat Class.
 *
 * Element: `mso14:control` */
export class ControlCloneQat extends OpenXmlLeafElement {
  override readonly localName = "control" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;


  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  idQ: StringValue | undefined;

  /** idMso (:idMso) */
  idMso: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** getDescription (:getDescription) */
  getDescription: StringValue | undefined;

  /** size (:size) */
  size: StringValue | undefined;

  /** getSize (:getSize) */
  getSize: StringValue | undefined;

  /** image (:image) */
  image: StringValue | undefined;

  /** imageMso (:imageMso) */
  imageMso: StringValue | undefined;

  /** getImage (:getImage) */
  getImage: StringValue | undefined;

  /** screentip (:screentip) */
  screentip: StringValue | undefined;

  /** getScreentip (:getScreentip) */
  getScreentip: StringValue | undefined;

  /** supertip (:supertip) */
  supertip: StringValue | undefined;

  /** getSupertip (:getSupertip) */
  getSupertip: StringValue | undefined;

  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** getEnabled (:getEnabled) */
  getEnabled: StringValue | undefined;

  /** label (:label) */
  label: StringValue | undefined;

  /** getLabel (:getLabel) */
  getLabel: StringValue | undefined;

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

  /** keytip (:keytip) */
  keytip: StringValue | undefined;

  /** getKeytip (:getKeytip) */
  getKeytip: StringValue | undefined;

  /** showLabel (:showLabel) */
  showLabel: BooleanValue | undefined;

  /** getShowLabel (:getShowLabel) */
  getShowLabel: StringValue | undefined;

  /** showImage (:showImage) */
  showImage: BooleanValue | undefined;

  /** getShowImage (:getShowImage) */
  getShowImage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "ControlCloneQat" }); return;
      case "idQ": this.idQ = StringValue.parse(value); assertString(this.idQ, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "ControlCloneQat" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "ControlCloneQat" }); return;
      case "description": this.description = StringValue.parse(value); assertString(this.description, { maxLength: 4096, minLength: 1 }, { attribute: ":description", elementClass: "ControlCloneQat" }); return;
      case "getDescription": this.getDescription = StringValue.parse(value); assertString(this.getDescription, { maxLength: 1024, minLength: 1 }, { attribute: ":getDescription", elementClass: "ControlCloneQat" }); return;
      case "size": this.size = StringValue.parse(value); return;
      case "getSize": this.getSize = StringValue.parse(value); assertString(this.getSize, { maxLength: 1024, minLength: 1 }, { attribute: ":getSize", elementClass: "ControlCloneQat" }); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "ControlCloneQat" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "ControlCloneQat" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "ControlCloneQat" }); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "ControlCloneQat" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "ControlCloneQat" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "ControlCloneQat" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "ControlCloneQat" }); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "ControlCloneQat" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "ControlCloneQat" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "ControlCloneQat" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "ControlCloneQat" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "ControlCloneQat" }); return;
      case "insertAfterQ": this.insertAfterQulifiedId = StringValue.parse(value); assertString(this.insertAfterQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "ControlCloneQat" }); return;
      case "insertBeforeQ": this.insertBeforeQulifiedId = StringValue.parse(value); assertString(this.insertBeforeQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "ControlCloneQat" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "ControlCloneQat" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "ControlCloneQat" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "ControlCloneQat" }); return;
      case "showLabel": this.showLabel = BooleanValue.parse(value); return;
      case "getShowLabel": this.getShowLabel = StringValue.parse(value); assertString(this.getShowLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowLabel", elementClass: "ControlCloneQat" }); return;
      case "showImage": this.showImage = BooleanValue.parse(value); return;
      case "getShowImage": this.getShowImage = StringValue.parse(value); assertString(this.getShowImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowImage", elementClass: "ControlCloneQat" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.idQ !== undefined) out.push(["idQ", this.idQ.toString()]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.getDescription !== undefined) out.push(["getDescription", this.getDescription.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    if (this.getSize !== undefined) out.push(["getSize", this.getSize.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQulifiedId !== undefined) out.push(["insertAfterQ", this.insertAfterQulifiedId.toString()]);
    if (this.insertBeforeQulifiedId !== undefined) out.push(["insertBeforeQ", this.insertBeforeQulifiedId.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.keytip !== undefined) out.push(["keytip", this.keytip.toString()]);
    if (this.getKeytip !== undefined) out.push(["getKeytip", this.getKeytip.toString()]);
    if (this.showLabel !== undefined) out.push(["showLabel", this.showLabel.toString()]);
    if (this.getShowLabel !== undefined) out.push(["getShowLabel", this.getShowLabel.toString()]);
    if (this.showImage !== undefined) out.push(["showImage", this.showImage.toString()]);
    if (this.getShowImage !== undefined) out.push(["getShowImage", this.getShowImage.toString()]);
    return out;
  }

}
