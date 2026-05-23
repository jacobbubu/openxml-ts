// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2020_classificationShape.json
// @see DocumentFormat.OpenXml.Drawing2020ClassificationShape.ClassificationOutcome

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ClassificationOutcome Class.
 *
 * Element: `aclsh:classification` */
export class ClassificationOutcome extends OpenXmlLeafElement {
  override readonly localName = "classification" as const;
  override readonly prefix = "aclsh" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2020/classificationShape" as const;


  /** classificationOutcomeType (:classificationOutcomeType) */
  classificationOutcomeType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "classificationOutcomeType": this.classificationOutcomeType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.classificationOutcomeType !== undefined) out.push(["classificationOutcomeType", this.classificationOutcomeType.toString()]);
    return out;
  }

}
