// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.WriteProtection

import {
  BooleanValue,
  HexBinaryValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Write Protection.
 *
 * Element: `w:writeProtection` */
export class WriteProtection extends OpenXmlLeafElement {
  override readonly localName = "writeProtection" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Recommend Write Protection in User Interface (w:recommended) */
  recommended: BooleanValue | undefined;

  /** Cryptographic Provider Type (w:cryptProviderType) */
  cryptographicProviderType: StringValue | undefined;

  /** Cryptographic Algorithm Class (w:cryptAlgorithmClass) */
  cryptographicAlgorithmClass: StringValue | undefined;

  /** Cryptographic Algorithm Type (w:cryptAlgorithmType) */
  cryptographicAlgorithmType: StringValue | undefined;

  /** Cryptographic Hashing Algorithm (w:cryptAlgorithmSid) */
  cryptographicAlgorithmSid: Int32Value | undefined;

  /** Iterations to Run Hashing Algorithm (w:cryptSpinCount) */
  cryptographicSpinCount: UInt32Value | undefined;

  /** Cryptographic Provider (w:cryptProvider) */
  cryptographicProvider: StringValue | undefined;

  /** Cryptographic Algorithm Extensibility (w:algIdExt) */
  algorithmIdExtensibility: HexBinaryValue | undefined;

  /** Algorithm Extensibility Source (w:algIdExtSource) */
  algorithmIdExtensibilitySource: StringValue | undefined;

  /** Cryptographic Provider Type Extensibility (w:cryptProviderTypeExt) */
  cryptographicProviderTypeExtensibility: HexBinaryValue | undefined;

  /** Provider Type Extensibility Source (w:cryptProviderTypeExtSource) */
  cryptographicProviderTypeExtSource: StringValue | undefined;

  /** Password Hash (w:hash) */
  hash: StringValue | undefined;

  /** Salt for Password Verifier (w:salt) */
  salt: StringValue | undefined;

  /** algorithmName (w:algorithmName) */
  algorithmName: StringValue | undefined;

  /** hashValue (w:hashValue) */
  hashValue: StringValue | undefined;

  /** saltValue (w:saltValue) */
  saltValue: StringValue | undefined;

  /** spinCount (w:spinCount) */
  spinCount: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:recommended": this.recommended = BooleanValue.parse(value); return;
      case "w:cryptProviderType": this.cryptographicProviderType = StringValue.parse(value); return;
      case "w:cryptAlgorithmClass": this.cryptographicAlgorithmClass = StringValue.parse(value); return;
      case "w:cryptAlgorithmType": this.cryptographicAlgorithmType = StringValue.parse(value); return;
      case "w:cryptAlgorithmSid": this.cryptographicAlgorithmSid = Int32Value.parse(value); return;
      case "w:cryptSpinCount": this.cryptographicSpinCount = UInt32Value.parse(value); return;
      case "w:cryptProvider": this.cryptographicProvider = StringValue.parse(value); return;
      case "w:algIdExt": this.algorithmIdExtensibility = HexBinaryValue.parse(value); return;
      case "w:algIdExtSource": this.algorithmIdExtensibilitySource = StringValue.parse(value); return;
      case "w:cryptProviderTypeExt": this.cryptographicProviderTypeExtensibility = HexBinaryValue.parse(value); return;
      case "w:cryptProviderTypeExtSource": this.cryptographicProviderTypeExtSource = StringValue.parse(value); return;
      case "w:hash": this.hash = StringValue.parse(value); return;
      case "w:salt": this.salt = StringValue.parse(value); return;
      case "w:algorithmName": this.algorithmName = StringValue.parse(value); return;
      case "w:hashValue": this.hashValue = StringValue.parse(value); return;
      case "w:saltValue": this.saltValue = StringValue.parse(value); return;
      case "w:spinCount": this.spinCount = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.recommended !== undefined) out.push(["w:recommended", this.recommended.toString()]);
    if (this.cryptographicProviderType !== undefined) out.push(["w:cryptProviderType", this.cryptographicProviderType.toString()]);
    if (this.cryptographicAlgorithmClass !== undefined) out.push(["w:cryptAlgorithmClass", this.cryptographicAlgorithmClass.toString()]);
    if (this.cryptographicAlgorithmType !== undefined) out.push(["w:cryptAlgorithmType", this.cryptographicAlgorithmType.toString()]);
    if (this.cryptographicAlgorithmSid !== undefined) out.push(["w:cryptAlgorithmSid", this.cryptographicAlgorithmSid.toString()]);
    if (this.cryptographicSpinCount !== undefined) out.push(["w:cryptSpinCount", this.cryptographicSpinCount.toString()]);
    if (this.cryptographicProvider !== undefined) out.push(["w:cryptProvider", this.cryptographicProvider.toString()]);
    if (this.algorithmIdExtensibility !== undefined) out.push(["w:algIdExt", this.algorithmIdExtensibility.toString()]);
    if (this.algorithmIdExtensibilitySource !== undefined) out.push(["w:algIdExtSource", this.algorithmIdExtensibilitySource.toString()]);
    if (this.cryptographicProviderTypeExtensibility !== undefined) out.push(["w:cryptProviderTypeExt", this.cryptographicProviderTypeExtensibility.toString()]);
    if (this.cryptographicProviderTypeExtSource !== undefined) out.push(["w:cryptProviderTypeExtSource", this.cryptographicProviderTypeExtSource.toString()]);
    if (this.hash !== undefined) out.push(["w:hash", this.hash.toString()]);
    if (this.salt !== undefined) out.push(["w:salt", this.salt.toString()]);
    if (this.algorithmName !== undefined) out.push(["w:algorithmName", this.algorithmName.toString()]);
    if (this.hashValue !== undefined) out.push(["w:hashValue", this.hashValue.toString()]);
    if (this.saltValue !== undefined) out.push(["w:saltValue", this.saltValue.toString()]);
    if (this.spinCount !== undefined) out.push(["w:spinCount", this.spinCount.toString()]);
    return out;
  }
}
