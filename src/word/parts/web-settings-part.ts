import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { WebSettings } from "../generated/web-settings.js";
import { TypedXmlPart } from "./typed-xml-part.js";

/** `.../webSettings` 关系下的 Part；根元素 `<w:webSettings>`。 */
export class WebSettingsPart extends TypedXmlPart<WebSettings> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, WebSettings);
  }

  get webSettings(): WebSettings {
    return this.root;
  }

  set webSettings(value: WebSettings) {
    this.root = value;
  }
}
