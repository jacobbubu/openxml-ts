// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Ink

import {
  Base64BinaryValue,
  OpenXmlLeafElement,
  TrueFalseValue,
} from "../../element/index.js";

/** Ink.
 *
 * Element: `o:ink` */
export class Ink extends OpenXmlLeafElement {
  override readonly localName = "ink" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** Ink Data (:i) */
  inkData: Base64BinaryValue | undefined;

  /** Annotation Flag (:annotation) */
  annotationFlag: TrueFalseValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "i": this.inkData = Base64BinaryValue.parse(value); return;
      case "annotation": this.annotationFlag = TrueFalseValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.inkData !== undefined) out.push(["i", this.inkData.toString()]);
    if (this.annotationFlag !== undefined) out.push(["annotation", this.annotationFlag.toString()]);
    return out;
  }

}
