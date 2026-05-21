// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.EditBox

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the EditBox Class.
 *
 * Element: `mso:editBox` */
export class EditBox extends OpenXmlLeafElement {
  override readonly localName = "editBox" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;


  /** enabled (:enabled) */
  enabled: BooleanValue | undefined;

  /** getEnabled (:getEnabled) */
  getEnabled: StringValue | undefined;

  /** image (:image) */
  image: StringValue | undefined;

  /** imageMso (:imageMso) */
  imageMso: StringValue | undefined;

  /** getImage (:getImage) */
  getImage: StringValue | undefined;

  /** maxLength (:maxLength) */
  maxLength: StringValue | undefined;

  /** getText (:getText) */
  getText: StringValue | undefined;

  /** onChange (:onChange) */
  onChange: StringValue | undefined;

  /** sizeString (:sizeString) */
  sizeString: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  idQ: StringValue | undefined;

  /** idMso (:idMso) */
  idMso: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** screentip (:screentip) */
  screentip: StringValue | undefined;

  /** getScreentip (:getScreentip) */
  getScreentip: StringValue | undefined;

  /** supertip (:supertip) */
  supertip: StringValue | undefined;

  /** getSupertip (:getSupertip) */
  getSupertip: StringValue | undefined;

  /** label (:label) */
  label: StringValue | undefined;

  /** getLabel (:getLabel) */
  getLabel: StringValue | undefined;

  /** insertAfterMso (:insertAfterMso) */
  insertAfterMso: StringValue | undefined;

  /** insertBeforeMso (:insertBeforeMso) */
  insertBeforeMso: StringValue | undefined;

  /** insertAfterQ (:insertAfterQ) */
  insertAfterQ: StringValue | undefined;

  /** insertBeforeQ (:insertBeforeQ) */
  insertBeforeQ: StringValue | undefined;

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
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "EditBox" }); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "EditBox" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "EditBox" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "EditBox" }); return;
      case "maxLength": this.maxLength = StringValue.parse(value); return;
      case "getText": this.getText = StringValue.parse(value); assertString(this.getText, { maxLength: 1024, minLength: 1 }, { attribute: ":getText", elementClass: "EditBox" }); return;
      case "onChange": this.onChange = StringValue.parse(value); assertString(this.onChange, { maxLength: 1024, minLength: 1 }, { attribute: ":onChange", elementClass: "EditBox" }); return;
      case "sizeString": this.sizeString = StringValue.parse(value); assertString(this.sizeString, { maxLength: 1024, minLength: 1 }, { attribute: ":sizeString", elementClass: "EditBox" }); return;
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "EditBox" }); return;
      case "idQ": this.idQ = StringValue.parse(value); assertString(this.idQ, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "EditBox" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "EditBox" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "EditBox" }); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "EditBox" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "EditBox" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "EditBox" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "EditBox" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "EditBox" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "EditBox" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "EditBox" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "EditBox" }); return;
      case "insertAfterQ": this.insertAfterQ = StringValue.parse(value); assertString(this.insertAfterQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "EditBox" }); return;
      case "insertBeforeQ": this.insertBeforeQ = StringValue.parse(value); assertString(this.insertBeforeQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "EditBox" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "EditBox" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "EditBox" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "EditBox" }); return;
      case "showLabel": this.showLabel = BooleanValue.parse(value); return;
      case "getShowLabel": this.getShowLabel = StringValue.parse(value); assertString(this.getShowLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowLabel", elementClass: "EditBox" }); return;
      case "showImage": this.showImage = BooleanValue.parse(value); return;
      case "getShowImage": this.getShowImage = StringValue.parse(value); assertString(this.getShowImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowImage", elementClass: "EditBox" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    if (this.maxLength !== undefined) out.push(["maxLength", this.maxLength.toString()]);
    if (this.getText !== undefined) out.push(["getText", this.getText.toString()]);
    if (this.onChange !== undefined) out.push(["onChange", this.onChange.toString()]);
    if (this.sizeString !== undefined) out.push(["sizeString", this.sizeString.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.idQ !== undefined) out.push(["idQ", this.idQ.toString()]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQ !== undefined) out.push(["insertAfterQ", this.insertAfterQ.toString()]);
    if (this.insertBeforeQ !== undefined) out.push(["insertBeforeQ", this.insertBeforeQ.toString()]);
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
