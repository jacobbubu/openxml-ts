// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Entry

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Regroup Entry.
 *
 * Element: `o:entry` */
export class Entry extends OpenXmlLeafElement {
  override readonly localName = "entry" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** New Group ID (:new) */
  new: Int32Value | undefined;

  /** Old Group ID (:old) */
  old: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "new": this.new = Int32Value.parse(value); return;
      case "old": this.old = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.new !== undefined) out.push(["new", this.new.toString()]);
    if (this.old !== undefined) out.push(["old", this.old.toString()]);
    return out;
  }

}
