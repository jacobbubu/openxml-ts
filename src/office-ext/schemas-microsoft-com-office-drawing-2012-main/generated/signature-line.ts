// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_main.json
// @see DocumentFormat.OpenXml.Drawing2012Main.SignatureLine

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SignatureLine Class.
 *
 * Element: `a15:signatureLine` */
export class SignatureLine extends OpenXmlLeafElement {
  override readonly localName = "signatureLine" as const;
  override readonly prefix = "a15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/main" as const;


  /** isSignatureLine (:isSignatureLine) */
  isSignatureLine: BooleanValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** provId (:provId) */
  providerId: StringValue | undefined;

  /** signingInstructionsSet (:signingInstructionsSet) */
  signingInstructionsSet: BooleanValue | undefined;

  /** allowComments (:allowComments) */
  allowComments: BooleanValue | undefined;

  /** showSignDate (:showSignDate) */
  showSignDate: BooleanValue | undefined;

  /** suggestedSigner (:suggestedSigner) */
  suggestedSigner: StringValue | undefined;

  /** suggestedSigner2 (:suggestedSigner2) */
  suggestedSigner2: StringValue | undefined;

  /** suggestedSignerEmail (:suggestedSignerEmail) */
  suggestedSignerEmail: StringValue | undefined;

  /** signingInstructions (:signingInstructions) */
  signingInstructions: StringValue | undefined;

  /** addlXml (:addlXml) */
  additionalXml: StringValue | undefined;

  /** sigProvUrl (:sigProvUrl) */
  signatureProviderUrl: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isSignatureLine": this.isSignatureLine = BooleanValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "provId": this.providerId = StringValue.parse(value); return;
      case "signingInstructionsSet": this.signingInstructionsSet = BooleanValue.parse(value); return;
      case "allowComments": this.allowComments = BooleanValue.parse(value); return;
      case "showSignDate": this.showSignDate = BooleanValue.parse(value); return;
      case "suggestedSigner": this.suggestedSigner = StringValue.parse(value); return;
      case "suggestedSigner2": this.suggestedSigner2 = StringValue.parse(value); return;
      case "suggestedSignerEmail": this.suggestedSignerEmail = StringValue.parse(value); return;
      case "signingInstructions": this.signingInstructions = StringValue.parse(value); return;
      case "addlXml": this.additionalXml = StringValue.parse(value); return;
      case "sigProvUrl": this.signatureProviderUrl = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isSignatureLine !== undefined) out.push(["isSignatureLine", this.isSignatureLine.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.providerId !== undefined) out.push(["provId", this.providerId.toString()]);
    if (this.signingInstructionsSet !== undefined) out.push(["signingInstructionsSet", this.signingInstructionsSet.toString()]);
    if (this.allowComments !== undefined) out.push(["allowComments", this.allowComments.toString()]);
    if (this.showSignDate !== undefined) out.push(["showSignDate", this.showSignDate.toString()]);
    if (this.suggestedSigner !== undefined) out.push(["suggestedSigner", this.suggestedSigner.toString()]);
    if (this.suggestedSigner2 !== undefined) out.push(["suggestedSigner2", this.suggestedSigner2.toString()]);
    if (this.suggestedSignerEmail !== undefined) out.push(["suggestedSignerEmail", this.suggestedSignerEmail.toString()]);
    if (this.signingInstructions !== undefined) out.push(["signingInstructions", this.signingInstructions.toString()]);
    if (this.additionalXml !== undefined) out.push(["addlXml", this.additionalXml.toString()]);
    if (this.signatureProviderUrl !== undefined) out.push(["sigProvUrl", this.signatureProviderUrl.toString()]);
    return out;
  }

}
