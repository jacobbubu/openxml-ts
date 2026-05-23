/**
 * `WordprocessingPeoplePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.WordprocessingPeoplePart.
 *
 * Root element: `w15:people` (W15 People class).
 * Registry must include W15 elements for typed deserialization of Person / PresenceInfo.
 */
import type { ElementRegistry } from "../../element/index.js";
import { People } from "../../office-ext/schemas-microsoft-com-office-word-2012-wordml/generated/people.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class WordprocessingPeoplePart extends TypedXmlPart<People> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2011/relationships/people";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.people+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, People);
  }

  /** `<w15:people>` 根元素（对位 .NET `WordprocessingPeoplePart.People`）。 */
  get people(): People {
    return this.root;
  }
}
