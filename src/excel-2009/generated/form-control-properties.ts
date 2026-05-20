// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.FormControlProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the FormControlProperties Class.
 *
 * Element: `x14:formControlPr` */
export class FormControlProperties extends OpenXmlCompositeElement {
  override readonly localName = "formControlPr" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** objectType (:objectType) */
  objectType: StringValue | undefined;

  /** checked (:checked) */
  checked: StringValue | undefined;

  /** colored (:colored) */
  colored: BooleanValue | undefined;

  /** dropLines (:dropLines) */
  dropLines: UInt32Value | undefined;

  /** dropStyle (:dropStyle) */
  dropStyle: StringValue | undefined;

  /** dx (:dx) */
  scrollBarWidth: UInt32Value | undefined;

  /** firstButton (:firstButton) */
  firstButton: BooleanValue | undefined;

  /** fmlaGroup (:fmlaGroup) */
  fmlaGroup: StringValue | undefined;

  /** fmlaLink (:fmlaLink) */
  fmlaLink: StringValue | undefined;

  /** fmlaRange (:fmlaRange) */
  fmlaRange: StringValue | undefined;

  /** fmlaTxbx (:fmlaTxbx) */
  fmlaTextbox: StringValue | undefined;

  /** horiz (:horiz) */
  horizontal: BooleanValue | undefined;

  /** inc (:inc) */
  incremental: UInt32Value | undefined;

  /** justLastX (:justLastX) */
  justLastX: BooleanValue | undefined;

  /** lockText (:lockText) */
  lockText: BooleanValue | undefined;

  /** max (:max) */
  max: UInt32Value | undefined;

  /** min (:min) */
  min: UInt32Value | undefined;

  /** multiSel (:multiSel) */
  multipleSelection: StringValue | undefined;

  /** noThreeD (:noThreeD) */
  noThreeD: BooleanValue | undefined;

  /** noThreeD2 (:noThreeD2) */
  noThreeD2: BooleanValue | undefined;

  /** page (:page) */
  page: UInt32Value | undefined;

  /** sel (:sel) */
  selected: UInt32Value | undefined;

  /** seltype (:seltype) */
  selectionType: StringValue | undefined;

  /** textHAlign (:textHAlign) */
  textHorizontalAlign: StringValue | undefined;

  /** textVAlign (:textVAlign) */
  textVerticalAlign: StringValue | undefined;

  /** val (:val) */
  val: UInt32Value | undefined;

  /** widthMin (:widthMin) */
  minimumWidth: UInt32Value | undefined;

  /** editVal (:editVal) */
  editVal: StringValue | undefined;

  /** multiLine (:multiLine) */
  multipleLines: BooleanValue | undefined;

  /** verticalBar (:verticalBar) */
  verticalBar: BooleanValue | undefined;

  /** passwordEdit (:passwordEdit) */
  passwordEdit: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "objectType": this.objectType = StringValue.parse(value); return;
      case "checked": this.checked = StringValue.parse(value); return;
      case "colored": this.colored = BooleanValue.parse(value); return;
      case "dropLines": this.dropLines = UInt32Value.parse(value); return;
      case "dropStyle": this.dropStyle = StringValue.parse(value); return;
      case "dx": this.scrollBarWidth = UInt32Value.parse(value); return;
      case "firstButton": this.firstButton = BooleanValue.parse(value); return;
      case "fmlaGroup": this.fmlaGroup = StringValue.parse(value); return;
      case "fmlaLink": this.fmlaLink = StringValue.parse(value); return;
      case "fmlaRange": this.fmlaRange = StringValue.parse(value); return;
      case "fmlaTxbx": this.fmlaTextbox = StringValue.parse(value); return;
      case "horiz": this.horizontal = BooleanValue.parse(value); return;
      case "inc": this.incremental = UInt32Value.parse(value); return;
      case "justLastX": this.justLastX = BooleanValue.parse(value); return;
      case "lockText": this.lockText = BooleanValue.parse(value); return;
      case "max": this.max = UInt32Value.parse(value); return;
      case "min": this.min = UInt32Value.parse(value); return;
      case "multiSel": this.multipleSelection = StringValue.parse(value); return;
      case "noThreeD": this.noThreeD = BooleanValue.parse(value); return;
      case "noThreeD2": this.noThreeD2 = BooleanValue.parse(value); return;
      case "page": this.page = UInt32Value.parse(value); return;
      case "sel": this.selected = UInt32Value.parse(value); return;
      case "seltype": this.selectionType = StringValue.parse(value); return;
      case "textHAlign": this.textHorizontalAlign = StringValue.parse(value); return;
      case "textVAlign": this.textVerticalAlign = StringValue.parse(value); return;
      case "val": this.val = UInt32Value.parse(value); return;
      case "widthMin": this.minimumWidth = UInt32Value.parse(value); return;
      case "editVal": this.editVal = StringValue.parse(value); return;
      case "multiLine": this.multipleLines = BooleanValue.parse(value); return;
      case "verticalBar": this.verticalBar = BooleanValue.parse(value); return;
      case "passwordEdit": this.passwordEdit = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.objectType !== undefined) out.push(["objectType", this.objectType.toString()]);
    if (this.checked !== undefined) out.push(["checked", this.checked.toString()]);
    if (this.colored !== undefined) out.push(["colored", this.colored.toString()]);
    if (this.dropLines !== undefined) out.push(["dropLines", this.dropLines.toString()]);
    if (this.dropStyle !== undefined) out.push(["dropStyle", this.dropStyle.toString()]);
    if (this.scrollBarWidth !== undefined) out.push(["dx", this.scrollBarWidth.toString()]);
    if (this.firstButton !== undefined) out.push(["firstButton", this.firstButton.toString()]);
    if (this.fmlaGroup !== undefined) out.push(["fmlaGroup", this.fmlaGroup.toString()]);
    if (this.fmlaLink !== undefined) out.push(["fmlaLink", this.fmlaLink.toString()]);
    if (this.fmlaRange !== undefined) out.push(["fmlaRange", this.fmlaRange.toString()]);
    if (this.fmlaTextbox !== undefined) out.push(["fmlaTxbx", this.fmlaTextbox.toString()]);
    if (this.horizontal !== undefined) out.push(["horiz", this.horizontal.toString()]);
    if (this.incremental !== undefined) out.push(["inc", this.incremental.toString()]);
    if (this.justLastX !== undefined) out.push(["justLastX", this.justLastX.toString()]);
    if (this.lockText !== undefined) out.push(["lockText", this.lockText.toString()]);
    if (this.max !== undefined) out.push(["max", this.max.toString()]);
    if (this.min !== undefined) out.push(["min", this.min.toString()]);
    if (this.multipleSelection !== undefined) out.push(["multiSel", this.multipleSelection.toString()]);
    if (this.noThreeD !== undefined) out.push(["noThreeD", this.noThreeD.toString()]);
    if (this.noThreeD2 !== undefined) out.push(["noThreeD2", this.noThreeD2.toString()]);
    if (this.page !== undefined) out.push(["page", this.page.toString()]);
    if (this.selected !== undefined) out.push(["sel", this.selected.toString()]);
    if (this.selectionType !== undefined) out.push(["seltype", this.selectionType.toString()]);
    if (this.textHorizontalAlign !== undefined) out.push(["textHAlign", this.textHorizontalAlign.toString()]);
    if (this.textVerticalAlign !== undefined) out.push(["textVAlign", this.textVerticalAlign.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    if (this.minimumWidth !== undefined) out.push(["widthMin", this.minimumWidth.toString()]);
    if (this.editVal !== undefined) out.push(["editVal", this.editVal.toString()]);
    if (this.multipleLines !== undefined) out.push(["multiLine", this.multipleLines.toString()]);
    if (this.verticalBar !== undefined) out.push(["verticalBar", this.verticalBar.toString()]);
    if (this.passwordEdit !== undefined) out.push(["passwordEdit", this.passwordEdit.toString()]);
    return out;
  }

}
