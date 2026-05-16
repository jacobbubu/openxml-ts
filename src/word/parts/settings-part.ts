import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Settings } from "../generated/settings.js";

/** `.../settings` 关系下的 Part；根元素 `<w:settings>`。 */
export class SettingsPart extends TypedXmlPart<Settings> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Settings);
  }

  get settings(): Settings {
    return this.root;
  }

  set settings(value: Settings) {
    this.root = value;
  }
}
