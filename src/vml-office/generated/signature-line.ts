// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.SignatureLine

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Digital Signature Line.
 *
 * Element: `o:signatureline` */
export class SignatureLine extends OpenXmlLeafElement {
  override readonly localName = "signatureline" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Signature Line Flag (:issignatureline) */
  isSignatureLine: StringValue | undefined;

  /** Unique ID (:id) */
  id: StringValue | undefined;

  /** Signature Provider ID (:provid) */
  providerId: StringValue | undefined;

  /** Use Signing Instructions Flag (:signinginstructionsset) */
  signingInstructionsSet: StringValue | undefined;

  /** User-specified Comments Flag (:allowcomments) */
  allowComments: StringValue | undefined;

  /** Show Signed Date Flag (:showsigndate) */
  showSignDate: StringValue | undefined;

  /** Suggested Signer Line 1 (o:suggestedsigner) */
  suggestedSigner: StringValue | undefined;

  /** Suggested Signer Line 2 (o:suggestedsigner2) */
  suggestedSigner2: StringValue | undefined;

  /** Suggested Signer E-mail Address (o:suggestedsigneremail) */
  suggestedSignerEmail: StringValue | undefined;

  /** Instructions for Signing (:signinginstructions) */
  signingInstructions: StringValue | undefined;

  /** Additional Signature Information (:addlxml) */
  additionalXml: StringValue | undefined;

  /** Signature Provider Download URL (:sigprovurl) */
  signatureProviderUrl: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "issignatureline": this.isSignatureLine = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "provid": this.providerId = StringValue.parse(value); return;
      case "signinginstructionsset": this.signingInstructionsSet = StringValue.parse(value); return;
      case "allowcomments": this.allowComments = StringValue.parse(value); return;
      case "showsigndate": this.showSignDate = StringValue.parse(value); return;
      case "o:suggestedsigner": this.suggestedSigner = StringValue.parse(value); return;
      case "o:suggestedsigner2": this.suggestedSigner2 = StringValue.parse(value); return;
      case "o:suggestedsigneremail": this.suggestedSignerEmail = StringValue.parse(value); return;
      case "signinginstructions": this.signingInstructions = StringValue.parse(value); return;
      case "addlxml": this.additionalXml = StringValue.parse(value); return;
      case "sigprovurl": this.signatureProviderUrl = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.isSignatureLine !== undefined) out.push(["issignatureline", this.isSignatureLine.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.providerId !== undefined) out.push(["provid", this.providerId.toString()]);
    if (this.signingInstructionsSet !== undefined) out.push(["signinginstructionsset", this.signingInstructionsSet.toString()]);
    if (this.allowComments !== undefined) out.push(["allowcomments", this.allowComments.toString()]);
    if (this.showSignDate !== undefined) out.push(["showsigndate", this.showSignDate.toString()]);
    if (this.suggestedSigner !== undefined) out.push(["o:suggestedsigner", this.suggestedSigner.toString()]);
    if (this.suggestedSigner2 !== undefined) out.push(["o:suggestedsigner2", this.suggestedSigner2.toString()]);
    if (this.suggestedSignerEmail !== undefined) out.push(["o:suggestedsigneremail", this.suggestedSignerEmail.toString()]);
    if (this.signingInstructions !== undefined) out.push(["signinginstructions", this.signingInstructions.toString()]);
    if (this.additionalXml !== undefined) out.push(["addlxml", this.additionalXml.toString()]);
    if (this.signatureProviderUrl !== undefined) out.push(["sigprovurl", this.signatureProviderUrl.toString()]);
    return out;
  }

}
