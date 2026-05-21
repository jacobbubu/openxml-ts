// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.ModificationVerifier

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the ModificationVerifier Class.
 *
 * Element: `p:modifyVerifier` */
export class ModificationVerifier extends OpenXmlLeafElement {
  override readonly localName = "modifyVerifier" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Cryptographic Provider Type (:cryptProviderType) */
  cryptographicProviderType: StringValue | undefined;

  /** Cryptographic Algorithm Class (:cryptAlgorithmClass) */
  cryptographicAlgorithmClass: StringValue | undefined;

  /** Cryptographic Algorithm Type (:cryptAlgorithmType) */
  cryptographicAlgorithmType: StringValue | undefined;

  /** Cryptographic Hashing Algorithm (:cryptAlgorithmSid) */
  cryptographicAlgorithmSid: UInt32Value | undefined;

  /** Iterations to Run Hashing Algorithm (:spinCount) */
  spinCount: UInt32Value | undefined;

  /** Salt for Password Verifier (:saltData) */
  saltData: StringValue | undefined;

  /** Password Hash (:hashData) */
  hashData: StringValue | undefined;

  /** Cryptographic Provider (:cryptProvider) */
  cryptographicProvider: StringValue | undefined;

  /** Cryptographic Algorithm Extensibility (:algIdExt) */
  extendedCryptographicAlgorithm: UInt32Value | undefined;

  /** Algorithm Extensibility Source (:algIdExtSource) */
  extendedCryptographicAlgorithmSource: StringValue | undefined;

  /** Cryptographic Provider Type Extensibility (:cryptProviderTypeExt) */
  cryptographicProviderTypeExtensibility: UInt32Value | undefined;

  /** Provider Type Extensibility Source (:cryptProviderTypeExtSource) */
  cryptographicProviderTypeExtensibilitySource: StringValue | undefined;

  /** algorithmName (:algorithmName) */
  algorithmName: StringValue | undefined;

  /** hashValue (:hashValue) */
  hashValue: StringValue | undefined;

  /** saltValue (:saltValue) */
  saltValue: StringValue | undefined;

  /** spinValue (:spinValue) */
  spinValue: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "cryptProviderType": this.cryptographicProviderType = StringValue.parse(value); return;
      case "cryptAlgorithmClass": this.cryptographicAlgorithmClass = StringValue.parse(value); return;
      case "cryptAlgorithmType": this.cryptographicAlgorithmType = StringValue.parse(value); return;
      case "cryptAlgorithmSid": this.cryptographicAlgorithmSid = UInt32Value.parse(value); return;
      case "spinCount": this.spinCount = UInt32Value.parse(value); return;
      case "saltData": this.saltData = StringValue.parse(value); return;
      case "hashData": this.hashData = StringValue.parse(value); return;
      case "cryptProvider": this.cryptographicProvider = StringValue.parse(value); return;
      case "algIdExt": this.extendedCryptographicAlgorithm = UInt32Value.parse(value); return;
      case "algIdExtSource": this.extendedCryptographicAlgorithmSource = StringValue.parse(value); return;
      case "cryptProviderTypeExt": this.cryptographicProviderTypeExtensibility = UInt32Value.parse(value); return;
      case "cryptProviderTypeExtSource": this.cryptographicProviderTypeExtensibilitySource = StringValue.parse(value); return;
      case "algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "hashValue": this.hashValue = StringValue.parse(value); return;
      case "saltValue": this.saltValue = StringValue.parse(value); return;
      case "spinValue": this.spinValue = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cryptographicProviderType !== undefined) out.push(["cryptProviderType", this.cryptographicProviderType.toString()]);
    if (this.cryptographicAlgorithmClass !== undefined) out.push(["cryptAlgorithmClass", this.cryptographicAlgorithmClass.toString()]);
    if (this.cryptographicAlgorithmType !== undefined) out.push(["cryptAlgorithmType", this.cryptographicAlgorithmType.toString()]);
    if (this.cryptographicAlgorithmSid !== undefined) out.push(["cryptAlgorithmSid", this.cryptographicAlgorithmSid.toString()]);
    if (this.spinCount !== undefined) out.push(["spinCount", this.spinCount.toString()]);
    if (this.saltData !== undefined) out.push(["saltData", this.saltData.toString()]);
    if (this.hashData !== undefined) out.push(["hashData", this.hashData.toString()]);
    if (this.cryptographicProvider !== undefined) out.push(["cryptProvider", this.cryptographicProvider.toString()]);
    if (this.extendedCryptographicAlgorithm !== undefined) out.push(["algIdExt", this.extendedCryptographicAlgorithm.toString()]);
    if (this.extendedCryptographicAlgorithmSource !== undefined) out.push(["algIdExtSource", this.extendedCryptographicAlgorithmSource.toString()]);
    if (this.cryptographicProviderTypeExtensibility !== undefined) out.push(["cryptProviderTypeExt", this.cryptographicProviderTypeExtensibility.toString()]);
    if (this.cryptographicProviderTypeExtensibilitySource !== undefined) out.push(["cryptProviderTypeExtSource", this.cryptographicProviderTypeExtensibilitySource.toString()]);
    if (this.algorithmName !== undefined) out.push(["algorithmName", this.algorithmName.toString()]);
    if (this.hashValue !== undefined) out.push(["hashValue", this.hashValue.toString()]);
    if (this.saltValue !== undefined) out.push(["saltValue", this.saltValue.toString()]);
    if (this.spinValue !== undefined) out.push(["spinValue", this.spinValue.toString()]);
    return out;
  }

}
