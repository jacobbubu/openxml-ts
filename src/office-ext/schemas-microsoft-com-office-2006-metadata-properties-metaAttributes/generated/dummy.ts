// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_metadata_properties_metaAttributes.json
// @see DocumentFormat.OpenXml.MetadataPropertiesMetaAttributes.Dummy

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../../element/index.js";

/** Defines the Dummy Class.
 *
 * Element: `ma:DummyContentTypeElement` */
export class Dummy extends OpenXmlLeafElement {
  override readonly localName = "DummyContentTypeElement" as const;
  override readonly prefix = "ma" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/metadata/properties/metaAttributes" as const;


  /** decimals (:decimals) */
  decimals: StringValue | undefined;

  /** default (:default) */
  default: StringValue | undefined;

  /** description (:description) */
  description: StringValue | undefined;

  /** displayName (:displayName) */
  displayName: StringValue | undefined;

  /** fieldsID (:fieldsID) */
  fieldsID: StringValue | undefined;

  /** format (:format) */
  format: StringValue | undefined;

  /** hidden (:hidden) */
  hidden: StringValue | undefined;

  /** index (:index) */
  index: Int32Value | undefined;

  /** internalName (:internalName) */
  internalName: StringValue | undefined;

  /** LCID (:LCID) */
  lCID: Int32Value | undefined;

  /** list (:list) */
  list: StringValue | undefined;

  /** percentage (:percentage) */
  percentage: StringValue | undefined;

  /** readOnly (:readOnly) */
  readOnly: StringValue | undefined;

  /** requiredMultiChoice (:requiredMultiChoice) */
  requiredMultiChoice: StringValue | undefined;

  /** root (:root) */
  root: StringValue | undefined;

  /** showField (:showField) */
  showField: StringValue | undefined;

  /** web (:web) */
  web: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "decimals": this.decimals = StringValue.parse(value); return;
      case "default": this.default = StringValue.parse(value); return;
      case "description": this.description = StringValue.parse(value); return;
      case "displayName": this.displayName = StringValue.parse(value); return;
      case "fieldsID": this.fieldsID = StringValue.parse(value); return;
      case "format": this.format = StringValue.parse(value); return;
      case "hidden": this.hidden = StringValue.parse(value); return;
      case "index": this.index = Int32Value.parse(value); assertNumber(this.index, { min: 0 }, { attribute: ":index", elementClass: "Dummy" }); return;
      case "internalName": this.internalName = StringValue.parse(value); return;
      case "LCID": this.lCID = Int32Value.parse(value); return;
      case "list": this.list = StringValue.parse(value); return;
      case "percentage": this.percentage = StringValue.parse(value); return;
      case "readOnly": this.readOnly = StringValue.parse(value); return;
      case "requiredMultiChoice": this.requiredMultiChoice = StringValue.parse(value); return;
      case "root": this.root = StringValue.parse(value); return;
      case "showField": this.showField = StringValue.parse(value); return;
      case "web": this.web = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.decimals !== undefined) out.push(["decimals", this.decimals.toString()]);
    if (this.default !== undefined) out.push(["default", this.default.toString()]);
    if (this.description !== undefined) out.push(["description", this.description.toString()]);
    if (this.displayName !== undefined) out.push(["displayName", this.displayName.toString()]);
    if (this.fieldsID !== undefined) out.push(["fieldsID", this.fieldsID.toString()]);
    if (this.format !== undefined) out.push(["format", this.format.toString()]);
    if (this.hidden !== undefined) out.push(["hidden", this.hidden.toString()]);
    if (this.index !== undefined) out.push(["index", this.index.toString()]);
    if (this.internalName !== undefined) out.push(["internalName", this.internalName.toString()]);
    if (this.lCID !== undefined) out.push(["LCID", this.lCID.toString()]);
    if (this.list !== undefined) out.push(["list", this.list.toString()]);
    if (this.percentage !== undefined) out.push(["percentage", this.percentage.toString()]);
    if (this.readOnly !== undefined) out.push(["readOnly", this.readOnly.toString()]);
    if (this.requiredMultiChoice !== undefined) out.push(["requiredMultiChoice", this.requiredMultiChoice.toString()]);
    if (this.root !== undefined) out.push(["root", this.root.toString()]);
    if (this.showField !== undefined) out.push(["showField", this.showField.toString()]);
    if (this.web !== undefined) out.push(["web", this.web.toString()]);
    return out;
  }

}
