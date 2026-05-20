// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Ink

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Ink.
 *
 * Element: `o:ink` */
export class Ink extends OpenXmlLeafElement {
  override readonly localName = "ink" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** Ink Data (:i) */
  inkData: StringValue | undefined;

  /** Annotation Flag (:annotation) */
  annotationFlag: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "i": this.inkData = StringValue.parse(value); return;
      case "annotation": this.annotationFlag = StringValue.parse(value); return;
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
