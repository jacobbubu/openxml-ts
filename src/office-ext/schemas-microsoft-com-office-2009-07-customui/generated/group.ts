// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.Group

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the Group Class.
 *
 * Element: `mso14:group` */
export class Group extends OpenXmlCompositeElement {
  override readonly localName = "group" as const;
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

  /** label (:label) */
  label: StringValue | undefined;

  /** getLabel (:getLabel) */
  getLabel: StringValue | undefined;

  /** image (:image) */
  image: StringValue | undefined;

  /** imageMso (:imageMso) */
  imageMso: StringValue | undefined;

  /** getImage (:getImage) */
  getImage: StringValue | undefined;

  /** insertAfterMso (:insertAfterMso) */
  insertAfterMso: StringValue | undefined;

  /** insertBeforeMso (:insertBeforeMso) */
  insertBeforeMso: StringValue | undefined;

  /** insertAfterQ (:insertAfterQ) */
  insertAfterQulifiedId: StringValue | undefined;

  /** insertBeforeQ (:insertBeforeQ) */
  insertBeforeQulifiedId: StringValue | undefined;

  /** screentip (:screentip) */
  screentip: StringValue | undefined;

  /** getScreentip (:getScreentip) */
  getScreentip: StringValue | undefined;

  /** supertip (:supertip) */
  supertip: StringValue | undefined;

  /** getSupertip (:getSupertip) */
  getSupertip: StringValue | undefined;

  /** visible (:visible) */
  visible: BooleanValue | undefined;

  /** getVisible (:getVisible) */
  getVisible: StringValue | undefined;

  /** keytip (:keytip) */
  keytip: StringValue | undefined;

  /** getKeytip (:getKeytip) */
  getKeytip: StringValue | undefined;

  /** autoScale (:autoScale) */
  autoScale: BooleanValue | undefined;

  /** centerVertically (:centerVertically) */
  centerVertically: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "Group" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "Group" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "Group" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "Group" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "Group" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "Group" }); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "Group" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "Group" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "Group" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "Group" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "Group" }); return;
      case "insertAfterQ": this.insertAfterQulifiedId = StringValue.parse(value); assertString(this.insertAfterQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "Group" }); return;
      case "insertBeforeQ": this.insertBeforeQulifiedId = StringValue.parse(value); assertString(this.insertBeforeQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "Group" }); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "Group" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "Group" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "Group" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "Group" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "Group" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "Group" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "Group" }); return;
      case "autoScale": this.autoScale = BooleanValue.parse(value); return;
      case "centerVertically": this.centerVertically = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.getLabel !== undefined) out.push(["getLabel", this.getLabel.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQulifiedId !== undefined) out.push(["insertAfterQ", this.insertAfterQulifiedId.toString()]);
    if (this.insertBeforeQulifiedId !== undefined) out.push(["insertBeforeQ", this.insertBeforeQulifiedId.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.getVisible !== undefined) out.push(["getVisible", this.getVisible.toString()]);
    if (this.keytip !== undefined) out.push(["keytip", this.keytip.toString()]);
    if (this.getKeytip !== undefined) out.push(["getKeytip", this.getKeytip.toString()]);
    if (this.autoScale !== undefined) out.push(["autoScale", this.autoScale.toString()]);
    if (this.centerVertically !== undefined) out.push(["centerVertically", this.centerVertically.toString()]);
    return out;
  }

}
