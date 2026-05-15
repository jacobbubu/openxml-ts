// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.FontSignature

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the FontSignature Class.
 *
 * Element: `w:sig` */
export class FontSignature extends OpenXmlLeafElement {
  override readonly localName = "sig" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** First 32 Bits of Unicode Subset Bitfield (w:usb0) */
  unicodeSignature0: HexBinaryValue | undefined;

  /** Second 32 Bits of Unicode Subset Bitfield (w:usb1) */
  unicodeSignature1: HexBinaryValue | undefined;

  /** Third 32 Bits of Unicode Subset Bitfield (w:usb2) */
  unicodeSignature2: HexBinaryValue | undefined;

  /** Fourth 32 Bits of Unicode Subset Bitfield (w:usb3) */
  unicodeSignature3: HexBinaryValue | undefined;

  /** Lower 32 Bits of Code Page Bit Field (w:csb0) */
  codePageSignature0: HexBinaryValue | undefined;

  /** Upper 32 Bits of Code Page Bit Field (w:csb1) */
  codePageSignature1: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:usb0": this.unicodeSignature0 = HexBinaryValue.parse(value); return;
      case "w:usb1": this.unicodeSignature1 = HexBinaryValue.parse(value); return;
      case "w:usb2": this.unicodeSignature2 = HexBinaryValue.parse(value); return;
      case "w:usb3": this.unicodeSignature3 = HexBinaryValue.parse(value); return;
      case "w:csb0": this.codePageSignature0 = HexBinaryValue.parse(value); return;
      case "w:csb1": this.codePageSignature1 = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.unicodeSignature0 !== undefined) out.push(["w:usb0", this.unicodeSignature0.toString()]);
    if (this.unicodeSignature1 !== undefined) out.push(["w:usb1", this.unicodeSignature1.toString()]);
    if (this.unicodeSignature2 !== undefined) out.push(["w:usb2", this.unicodeSignature2.toString()]);
    if (this.unicodeSignature3 !== undefined) out.push(["w:usb3", this.unicodeSignature3.toString()]);
    if (this.codePageSignature0 !== undefined) out.push(["w:csb0", this.codePageSignature0.toString()]);
    if (this.codePageSignature1 !== undefined) out.push(["w:csb1", this.codePageSignature1.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.unicodeSignature0, { attribute: "w:usb0", elementClass: "FontSignature" });
    assertRequired(this.unicodeSignature1, { attribute: "w:usb1", elementClass: "FontSignature" });
    assertRequired(this.unicodeSignature2, { attribute: "w:usb2", elementClass: "FontSignature" });
    assertRequired(this.unicodeSignature3, { attribute: "w:usb3", elementClass: "FontSignature" });
    assertRequired(this.codePageSignature0, { attribute: "w:csb0", elementClass: "FontSignature" });
    assertRequired(this.codePageSignature1, { attribute: "w:csb1", elementClass: "FontSignature" });
  }
}
