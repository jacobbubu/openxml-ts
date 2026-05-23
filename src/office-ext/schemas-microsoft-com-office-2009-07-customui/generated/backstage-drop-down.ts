// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.BackstageDropDown

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the BackstageDropDown Class.
 *
 * Element: `mso14:dropDown` */
export class BackstageDropDown extends OpenXmlCompositeElement {
  override readonly localName = "dropDown" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  qualifiedId: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** alignLabel (:alignLabel) */
  alignLabel: StringValue | undefined;

  /** expand (:expand) */
  expand: StringValue | undefined;

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

  /** onAction (:onAction) */
  onAction: StringValue | undefined;

  /** screentip (:screentip) */
  screentip: StringValue | undefined;

  /** getScreentip (:getScreentip) */
  getScreentip: StringValue | undefined;

  /** supertip (:supertip) */
  supertip: StringValue | undefined;

  /** getSupertip (:getSupertip) */
  getSupertip: StringValue | undefined;

  /** keytip (:keytip) */
  keytip: StringValue | undefined;

  /** getKeytip (:getKeytip) */
  getKeytip: StringValue | undefined;

  /** getSelectedItemIndex (:getSelectedItemIndex) */
  getSelectedItemIndex: StringValue | undefined;

  /** sizeString (:sizeString) */
  sizeString: StringValue | undefined;

  /** getItemCount (:getItemCount) */
  getItemCount: StringValue | undefined;

  /** getItemLabel (:getItemLabel) */
  getItemLabel: StringValue | undefined;

  /** getItemID (:getItemID) */
  getItemID: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "BackstageDropDown" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "BackstageDropDown" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "BackstageDropDown" }); return;
      case "alignLabel": this.alignLabel = StringValue.parse(value); return;
      case "expand": this.expand = StringValue.parse(value); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "BackstageDropDown" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "BackstageDropDown" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "BackstageDropDown" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "BackstageDropDown" }); return;
      case "onAction": this.onAction = StringValue.parse(value); assertString(this.onAction, { maxLength: 1024, minLength: 1 }, { attribute: ":onAction", elementClass: "BackstageDropDown" }); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "BackstageDropDown" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "BackstageDropDown" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "BackstageDropDown" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "BackstageDropDown" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "BackstageDropDown" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "BackstageDropDown" }); return;
      case "getSelectedItemIndex": this.getSelectedItemIndex = StringValue.parse(value); assertString(this.getSelectedItemIndex, { maxLength: 1024, minLength: 1 }, { attribute: ":getSelectedItemIndex", elementClass: "BackstageDropDown" }); return;
      case "sizeString": this.sizeString = StringValue.parse(value); assertString(this.sizeString, { maxLength: 1024, minLength: 1 }, { attribute: ":sizeString", elementClass: "BackstageDropDown" }); return;
      case "getItemCount": this.getItemCount = StringValue.parse(value); assertString(this.getItemCount, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemCount", elementClass: "BackstageDropDown" }); return;
      case "getItemLabel": this.getItemLabel = StringValue.parse(value); assertString(this.getItemLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemLabel", elementClass: "BackstageDropDown" }); return;
      case "getItemID": this.getItemID = StringValue.parse(value); assertString(this.getItemID, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemID", elementClass: "BackstageDropDown" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.alignLabel !== undefined) out.push(["alignLabel", this.alignLabel.toString()]);
    if (this.expand !== undefined) out.push(["expand", this.expand.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.onAction !== undefined) out.push(["onAction", this.onAction.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
    if (this.keytip !== undefined) out.push(["keytip", this.keytip.toString()]);
    if (this.getKeytip !== undefined) out.push(["getKeytip", this.getKeytip.toString()]);
    if (this.getSelectedItemIndex !== undefined) out.push(["getSelectedItemIndex", this.getSelectedItemIndex.toString()]);
    if (this.sizeString !== undefined) out.push(["sizeString", this.sizeString.toString()]);
    if (this.getItemCount !== undefined) out.push(["getItemCount", this.getItemCount.toString()]);
    if (this.getItemLabel !== undefined) out.push(["getItemLabel", this.getItemLabel.toString()]);
    if (this.getItemID !== undefined) out.push(["getItemID", this.getItemID.toString()]);
    return out;
  }

}
