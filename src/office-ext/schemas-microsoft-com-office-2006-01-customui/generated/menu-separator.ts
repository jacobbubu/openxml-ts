// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.MenuSeparator

import {
  OpenXmlLeafElement,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the MenuSeparator Class.
 *
 * Element: `mso:menuSeparator` */
export class MenuSeparator extends OpenXmlLeafElement {
  override readonly localName = "menuSeparator" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;


  /** id (:id) */
  id: StringValue | undefined;

  /** idQ (:idQ) */
  idQ: StringValue | undefined;

  /** insertAfterMso (:insertAfterMso) */
  insertAfterMso: StringValue | undefined;

  /** insertBeforeMso (:insertBeforeMso) */
  insertBeforeMso: StringValue | undefined;

  /** insertAfterQ (:insertAfterQ) */
  insertAfterQ: StringValue | undefined;

  /** insertBeforeQ (:insertBeforeQ) */
  insertBeforeQ: StringValue | undefined;

  /** title (:title) */
  title: StringValue | undefined;

  /** getTitle (:getTitle) */
  getTitle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); assertString(this.id, { maxLength: 1024, minLength: 1 }, { attribute: ":id", elementClass: "MenuSeparator" }); return;
      case "idQ": this.idQ = StringValue.parse(value); assertString(this.idQ, { maxLength: 1024, minLength: 1 }, { attribute: ":idQ", elementClass: "MenuSeparator" }); return;
      case "insertAfterMso": this.insertAfterMso = StringValue.parse(value); assertString(this.insertAfterMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterMso", elementClass: "MenuSeparator" }); return;
      case "insertBeforeMso": this.insertBeforeMso = StringValue.parse(value); assertString(this.insertBeforeMso, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeMso", elementClass: "MenuSeparator" }); return;
      case "insertAfterQ": this.insertAfterQ = StringValue.parse(value); assertString(this.insertAfterQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertAfterQ", elementClass: "MenuSeparator" }); return;
      case "insertBeforeQ": this.insertBeforeQ = StringValue.parse(value); assertString(this.insertBeforeQ, { maxLength: 1024, minLength: 1 }, { attribute: ":insertBeforeQ", elementClass: "MenuSeparator" }); return;
      case "title": this.title = StringValue.parse(value); assertString(this.title, { maxLength: 1024, minLength: 1 }, { attribute: ":title", elementClass: "MenuSeparator" }); return;
      case "getTitle": this.getTitle = StringValue.parse(value); assertString(this.getTitle, { maxLength: 1024, minLength: 1 }, { attribute: ":getTitle", elementClass: "MenuSeparator" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.idQ !== undefined) out.push(["idQ", this.idQ.toString()]);
    if (this.insertAfterMso !== undefined) out.push(["insertAfterMso", this.insertAfterMso.toString()]);
    if (this.insertBeforeMso !== undefined) out.push(["insertBeforeMso", this.insertBeforeMso.toString()]);
    if (this.insertAfterQ !== undefined) out.push(["insertAfterQ", this.insertAfterQ.toString()]);
    if (this.insertBeforeQ !== undefined) out.push(["insertBeforeQ", this.insertBeforeQ.toString()]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    if (this.getTitle !== undefined) out.push(["getTitle", this.getTitle.toString()]);
    return out;
  }

}
