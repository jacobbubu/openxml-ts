// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.BackstageGroupButton

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the BackstageGroupButton Class.
 *
 * Element: `mso14:button` */
export class BackstageGroupButton extends OpenXmlLeafElement {
  override readonly localName = "button" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;


  /** expand (:expand) */
  expand: StringValue | undefined;

  /** style (:style) */
  style: StringValue | undefined;

  /** screentip (:screentip) */
  screentip: StringValue | undefined;

  /** getScreentip (:getScreentip) */
  getScreentip: StringValue | undefined;

  /** supertip (:supertip) */
  supertip: StringValue | undefined;

  /** getSupertip (:getSupertip) */
  getSupertip: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  qualifiedId: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** onAction (:onAction) */
  onAction: StringValue | undefined;

  /** isDefinitive (:isDefinitive) */
  isDefinitive: BooleanValue | undefined;

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

  /** keytip (:keytip) */
  keytip: StringValue | undefined;

  /** getKeytip (:getKeytip) */
  getKeytip: StringValue | undefined;

  /** image (:image) */
  image: StringValue | undefined;

  /** imageMso (:imageMso) */
  imageMso: StringValue | undefined;

  /** getImage (:getImage) */
  getImage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "expand": this.expand = StringValue.parse(value); return;
      case "style": this.style = StringValue.parse(value); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "BackstageGroupButton" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "BackstageGroupButton" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "BackstageGroupButton" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "BackstageGroupButton" }); return;
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "BackstageGroupButton" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "BackstageGroupButton" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "BackstageGroupButton" }); return;
      case "onAction": this.onAction = StringValue.parse(value); assertString(this.onAction, { maxLength: 1024, minLength: 1 }, { attribute: ":onAction", elementClass: "BackstageGroupButton" }); return;
      case "isDefinitive": this.isDefinitive = BooleanValue.parse(value); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "BackstageGroupButton" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "BackstageGroupButton" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "BackstageGroupButton" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "BackstageGroupButton" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "BackstageGroupButton" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "BackstageGroupButton" }); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "BackstageGroupButton" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "BackstageGroupButton" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "BackstageGroupButton" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.expand !== undefined) out.push(["expand", this.expand.toString()]);
    if (this.style !== undefined) out.push(["style", this.style.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.onAction !== undefined) out.push(["onAction", this.onAction.toString()]);
    if (this.isDefinitive !== undefined) out.push(["isDefinitive", this.isDefinitive.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.keytip !== undefined) out.push(["keytip", this.keytip.toString()]);
    if (this.getKeytip !== undefined) out.push(["getKeytip", this.getKeytip.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    return out;
  }

}
