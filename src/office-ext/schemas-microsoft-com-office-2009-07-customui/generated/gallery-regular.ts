// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2009_07_customui.json
// @see DocumentFormat.OpenXml.200907Customui.GalleryRegular

import {
  BooleanValue,
  IntegerValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the GalleryRegular Class.
 *
 * Element: `mso14:gallery` */
export class GalleryRegular extends OpenXmlCompositeElement {
  override readonly localName = "gallery" as const;
  override readonly prefix = "mso14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2009/07/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** description (:description) */
  description: StringValue | undefined;

  /** getDescription (:getDescription) */
  getDescription: StringValue | undefined;

  /** invalidateContentOnDrop (:invalidateContentOnDrop) */
  invalidateContentOnDrop: BooleanValue | undefined;

  /** columns (:columns) */
  columns: IntegerValue | undefined;

  /** rows (:rows) */
  rows: IntegerValue | undefined;

  /** itemWidth (:itemWidth) */
  itemWidth: IntegerValue | undefined;

  /** itemHeight (:itemHeight) */
  itemHeight: IntegerValue | undefined;

  /** getItemWidth (:getItemWidth) */
  getItemWidth: StringValue | undefined;

  /** getItemHeight (:getItemHeight) */
  getItemHeight: StringValue | undefined;

  /** showItemLabel (:showItemLabel) */
  showItemLabel: BooleanValue | undefined;

  /** showInRibbon (:showInRibbon) */
  showInRibbon: StringValue | undefined;

  /** onAction (:onAction) */
  onAction: StringValue | undefined;

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

  /** showItemImage (:showItemImage) */
  showItemImage: BooleanValue | undefined;

  /** getItemCount (:getItemCount) */
  getItemCount: StringValue | undefined;

  /** getItemLabel (:getItemLabel) */
  getItemLabel: StringValue | undefined;

  /** getItemScreentip (:getItemScreentip) */
  getItemScreentip: StringValue | undefined;

  /** getItemSupertip (:getItemSupertip) */
  getItemSupertip: StringValue | undefined;

  /** getItemImage (:getItemImage) */
  getItemImage: StringValue | undefined;

  /** getItemID (:getItemID) */
  getItemID: StringValue | undefined;

  /** sizeString (:sizeString) */
  sizeString: StringValue | undefined;

  /** getSelectedItemID (:getSelectedItemID) */
  getSelectedItemID: StringValue | undefined;

  /** getSelectedItemIndex (:getSelectedItemIndex) */
  getSelectedItemIndex: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  qualifiedId: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** idMso (:idMso) */
  idMso: StringValue | undefined;

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
      case "description": this.description = StringValue.parse(value); assertString(this.description, { maxLength: 4096, minLength: 1 }, { attribute: ":description", elementClass: "GalleryRegular" }); return;
      case "getDescription": this.getDescription = StringValue.parse(value); assertString(this.getDescription, { maxLength: 1024, minLength: 1 }, { attribute: ":getDescription", elementClass: "GalleryRegular" }); return;
      case "invalidateContentOnDrop": this.invalidateContentOnDrop = BooleanValue.parse(value); return;
      case "columns": this.columns = IntegerValue.parse(value); return;
      case "rows": this.rows = IntegerValue.parse(value); return;
      case "itemWidth": this.itemWidth = IntegerValue.parse(value); return;
      case "itemHeight": this.itemHeight = IntegerValue.parse(value); return;
      case "getItemWidth": this.getItemWidth = StringValue.parse(value); assertString(this.getItemWidth, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemWidth", elementClass: "GalleryRegular" }); return;
      case "getItemHeight": this.getItemHeight = StringValue.parse(value); assertString(this.getItemHeight, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemHeight", elementClass: "GalleryRegular" }); return;
      case "showItemLabel": this.showItemLabel = BooleanValue.parse(value); return;
      case "showInRibbon": this.showInRibbon = StringValue.parse(value); return;
      case "onAction": this.onAction = StringValue.parse(value); assertString(this.onAction, { maxLength: 1024, minLength: 1 }, { attribute: ":onAction", elementClass: "GalleryRegular" }); return;
      case "enabled": this.enabled = BooleanValue.parse(value); return;
      case "getEnabled": this.getEnabled = StringValue.parse(value); assertString(this.getEnabled, { maxLength: 1024, minLength: 1 }, { attribute: ":getEnabled", elementClass: "GalleryRegular" }); return;
      case "image": this.image = StringValue.parse(value); assertString(this.image, { maxLength: 1024, minLength: 1 }, { attribute: ":image", elementClass: "GalleryRegular" }); return;
      case "imageMso": this.imageMso = StringValue.parse(value); assertString(this.imageMso, { maxLength: 1024, minLength: 1 }, { attribute: ":imageMso", elementClass: "GalleryRegular" }); return;
      case "getImage": this.getImage = StringValue.parse(value); assertString(this.getImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getImage", elementClass: "GalleryRegular" }); return;
      case "showItemImage": this.showItemImage = BooleanValue.parse(value); return;
      case "getItemCount": this.getItemCount = StringValue.parse(value); assertString(this.getItemCount, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemCount", elementClass: "GalleryRegular" }); return;
      case "getItemLabel": this.getItemLabel = StringValue.parse(value); assertString(this.getItemLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemLabel", elementClass: "GalleryRegular" }); return;
      case "getItemScreentip": this.getItemScreentip = StringValue.parse(value); assertString(this.getItemScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemScreentip", elementClass: "GalleryRegular" }); return;
      case "getItemSupertip": this.getItemSupertip = StringValue.parse(value); assertString(this.getItemSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemSupertip", elementClass: "GalleryRegular" }); return;
      case "getItemImage": this.getItemImage = StringValue.parse(value); assertString(this.getItemImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemImage", elementClass: "GalleryRegular" }); return;
      case "getItemID": this.getItemID = StringValue.parse(value); assertString(this.getItemID, { maxLength: 1024, minLength: 1 }, { attribute: ":getItemID", elementClass: "GalleryRegular" }); return;
      case "sizeString": this.sizeString = StringValue.parse(value); assertString(this.sizeString, { maxLength: 1024, minLength: 1 }, { attribute: ":sizeString", elementClass: "GalleryRegular" }); return;
      case "getSelectedItemID": this.getSelectedItemID = StringValue.parse(value); assertString(this.getSelectedItemID, { maxLength: 1024, minLength: 1 }, { attribute: ":getSelectedItemID", elementClass: "GalleryRegular" }); return;
      case "getSelectedItemIndex": this.getSelectedItemIndex = StringValue.parse(value); assertString(this.getSelectedItemIndex, { maxLength: 1024, minLength: 1 }, { attribute: ":getSelectedItemIndex", elementClass: "GalleryRegular" }); return;
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "GalleryRegular" }); return;
      case "idQ": this.qualifiedId = StringValue.parse(value); assertString(this.qualifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "GalleryRegular" }); return;
      case "tag": this.tag = StringValue.parse(value); assertString(this.tag, { maxLength: 1024, minLength: 1 }, { attribute: ":tag", elementClass: "GalleryRegular" }); return;
      case "idMso": this.idMso = StringValue.parse(value); assertString(this.idMso, { maxLength: 1024, minLength: 1 }, { attribute: ":idMso", elementClass: "GalleryRegular" }); return;
      case "screentip": this.screentip = StringValue.parse(value); assertString(this.screentip, { maxLength: 1024, minLength: 1 }, { attribute: ":screentip", elementClass: "GalleryRegular" }); return;
      case "getScreentip": this.getScreentip = StringValue.parse(value); assertString(this.getScreentip, { maxLength: 1024, minLength: 1 }, { attribute: ":getScreentip", elementClass: "GalleryRegular" }); return;
      case "supertip": this.supertip = StringValue.parse(value); assertString(this.supertip, { maxLength: 1024, minLength: 1 }, { attribute: ":supertip", elementClass: "GalleryRegular" }); return;
      case "getSupertip": this.getSupertip = StringValue.parse(value); assertString(this.getSupertip, { maxLength: 1024, minLength: 1 }, { attribute: ":getSupertip", elementClass: "GalleryRegular" }); return;
      case "label": this.label = StringValue.parse(value); assertString(this.label, { maxLength: 1024, minLength: 1 }, { attribute: ":label", elementClass: "GalleryRegular" }); return;
      case "getLabel": this.getLabel = StringValue.parse(value); assertString(this.getLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getLabel", elementClass: "GalleryRegular" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "GalleryRegular" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "GalleryRegular" }); return;
      case "insertAfterQ": this.insertAfterQulifiedId = StringValue.parse(value); assertString(this.insertAfterQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "GalleryRegular" }); return;
      case "insertBeforeQ": this.insertBeforeQulifiedId = StringValue.parse(value); assertString(this.insertBeforeQulifiedId, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "GalleryRegular" }); return;
      case "visible": this.visible = BooleanValue.parse(value); return;
      case "getVisible": this.getVisible = StringValue.parse(value); assertString(this.getVisible, { maxLength: 1024, minLength: 1 }, { attribute: ":getVisible", elementClass: "GalleryRegular" }); return;
      case "keytip": this.keytip = StringValue.parse(value); assertString(this.keytip, { maxLength: 3, minLength: 1 }, { attribute: ":keytip", elementClass: "GalleryRegular" }); return;
      case "getKeytip": this.getKeytip = StringValue.parse(value); assertString(this.getKeytip, { maxLength: 1024, minLength: 1 }, { attribute: ":getKeytip", elementClass: "GalleryRegular" }); return;
      case "showLabel": this.showLabel = BooleanValue.parse(value); return;
      case "getShowLabel": this.getShowLabel = StringValue.parse(value); assertString(this.getShowLabel, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowLabel", elementClass: "GalleryRegular" }); return;
      case "showImage": this.showImage = BooleanValue.parse(value); return;
      case "getShowImage": this.getShowImage = StringValue.parse(value); assertString(this.getShowImage, { maxLength: 1024, minLength: 1 }, { attribute: ":getShowImage", elementClass: "GalleryRegular" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.getDescription !== undefined) out.push(["getDescription", this.getDescription.toString()]);
    if (this.invalidateContentOnDrop !== undefined) out.push(["invalidateContentOnDrop", this.invalidateContentOnDrop.toString()]);
    if (this.columns !== undefined) out.push(["columns", this.columns.toString()]);
    if (this.rows !== undefined) out.push(["rows", this.rows.toString()]);
    if (this.itemWidth !== undefined) out.push(["itemWidth", this.itemWidth.toString()]);
    if (this.itemHeight !== undefined) out.push(["itemHeight", this.itemHeight.toString()]);
    if (this.getItemWidth !== undefined) out.push(["getItemWidth", this.getItemWidth.toString()]);
    if (this.getItemHeight !== undefined) out.push(["getItemHeight", this.getItemHeight.toString()]);
    if (this.showItemLabel !== undefined) out.push(["showItemLabel", this.showItemLabel.toString()]);
    if (this.showInRibbon !== undefined) out.push(["showInRibbon", this.showInRibbon.toString()]);
    if (this.onAction !== undefined) out.push(["onAction", this.onAction.toString()]);
    if (this.enabled !== undefined) out.push(["enabled", this.enabled.toString()]);
    if (this.getEnabled !== undefined) out.push(["getEnabled", this.getEnabled.toString()]);
    if (this.image !== undefined) out.push(["image", this.image.toString()]);
    if (this.imageMso !== undefined) out.push(["imageMso", this.imageMso.toString()]);
    if (this.getImage !== undefined) out.push(["getImage", this.getImage.toString()]);
    if (this.showItemImage !== undefined) out.push(["showItemImage", this.showItemImage.toString()]);
    if (this.getItemCount !== undefined) out.push(["getItemCount", this.getItemCount.toString()]);
    if (this.getItemLabel !== undefined) out.push(["getItemLabel", this.getItemLabel.toString()]);
    if (this.getItemScreentip !== undefined) out.push(["getItemScreentip", this.getItemScreentip.toString()]);
    if (this.getItemSupertip !== undefined) out.push(["getItemSupertip", this.getItemSupertip.toString()]);
    if (this.getItemImage !== undefined) out.push(["getItemImage", this.getItemImage.toString()]);
    if (this.getItemID !== undefined) out.push(["getItemID", this.getItemID.toString()]);
    if (this.sizeString !== undefined) out.push(["sizeString", this.sizeString.toString()]);
    if (this.getSelectedItemID !== undefined) out.push(["getSelectedItemID", this.getSelectedItemID.toString()]);
    if (this.getSelectedItemIndex !== undefined) out.push(["getSelectedItemIndex", this.getSelectedItemIndex.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.qualifiedId !== undefined) out.push(["idQ", this.qualifiedId.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.idMso !== undefined) out.push(["idMso", this.idMso.toString()]);
    if (this.screentip !== undefined) out.push(["screentip", this.screentip.toString()]);
    if (this.getScreentip !== undefined) out.push(["getScreentip", this.getScreentip.toString()]);
    if (this.supertip !== undefined) out.push(["supertip", this.supertip.toString()]);
    if (this.getSupertip !== undefined) out.push(["getSupertip", this.getSupertip.toString()]);
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
