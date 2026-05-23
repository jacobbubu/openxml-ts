// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_metadata_contentType.json
// @see DocumentFormat.OpenXml.2006MetadataContentType.ContentTypeSchema

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertString,
} from "../../../element/index.js";

/** Defines the ContentTypeSchema Class.
 *
 * Element: `ct:contentTypeSchema` */
export class ContentTypeSchema extends OpenXmlCompositeElement {
  override readonly localName = "contentTypeSchema" as const;
  override readonly prefix = "ct" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/metadata/contentType" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** _ (ct:_) */
  underScore: StringValue | undefined;

  /** _ (ma:_) */
  reservedAttributeString: StringValue | undefined;

  /** contentTypeName (ma:contentTypeName) */
  contentTypeName: StringValue | undefined;

  /** contentTypeID (ma:contentTypeID) */
  contentTypeID: StringValue | undefined;

  /** contentTypeVersion (ma:contentTypeVersion) */
  contentTypeVersion: Int32Value | undefined;

  /** contentTypeDescription (ma:contentTypeDescription) */
  contentTypeDescription: StringValue | undefined;

  /** contentTypeScope (ma:contentTypeScope) */
  contentTypeScope: StringValue | undefined;

  /** versionID (ma:versionID) */
  versionID: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ct:_": this.underScore = StringValue.parse(value); return;
      case "ma:_": this.reservedAttributeString = StringValue.parse(value); return;
      case "ma:contentTypeName": this.contentTypeName = StringValue.parse(value); return;
      case "ma:contentTypeID": this.contentTypeID = StringValue.parse(value); assertString(this.contentTypeID, { maxLength: 1026, minLength: 2 }, { attribute: "ma:contentTypeID", elementClass: "ContentTypeSchema" }); return;
      case "ma:contentTypeVersion": this.contentTypeVersion = Int32Value.parse(value); assertNumber(this.contentTypeVersion, { min: 0 }, { attribute: "ma:contentTypeVersion", elementClass: "ContentTypeSchema" }); return;
      case "ma:contentTypeDescription": this.contentTypeDescription = StringValue.parse(value); return;
      case "ma:contentTypeScope": this.contentTypeScope = StringValue.parse(value); return;
      case "ma:versionID": this.versionID = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.underScore !== undefined) out.push(["ct:_", this.underScore.toString()]);
    if (this.reservedAttributeString !== undefined) out.push(["ma:_", this.reservedAttributeString.toString()]);
    if (this.contentTypeName !== undefined) out.push(["ma:contentTypeName", this.contentTypeName.toString()]);
    if (this.contentTypeID !== undefined) out.push(["ma:contentTypeID", this.contentTypeID.toString()]);
    if (this.contentTypeVersion !== undefined) out.push(["ma:contentTypeVersion", this.contentTypeVersion.toString()]);
    if (this.contentTypeDescription !== undefined) out.push(["ma:contentTypeDescription", this.contentTypeDescription.toString()]);
    if (this.contentTypeScope !== undefined) out.push(["ma:contentTypeScope", this.contentTypeScope.toString()]);
    if (this.versionID !== undefined) out.push(["ma:versionID", this.versionID.toString()]);
    return out;
  }

}
