import type { ElementRegistry, OpenXmlElement } from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

/**
 * `.../theme` 关系下的 Part；根元素 `<a:theme>`（DrawingML namespace）。
 *
 * DrawingML schema 类要等 Epic-4 才落地。当前 root 是 `OpenXmlUnknownElement`
 * 占位透传：读出来什么样、写回去就什么样，保 docx/xlsx round-trip 不破。
 * Word / Excel 两族共用本类，对位 .NET `DocumentFormat.OpenXml.Packaging.ThemePart`。
 */
export class ThemePart extends TypedXmlPart<OpenXmlElement> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.theme+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, ThemePlaceholder);
  }

  get theme(): OpenXmlElement {
    return this.root;
  }

  set theme(value: OpenXmlElement) {
    this.root = value;
  }
}

/** 给 TypedXmlPart 的 RootCtor 占位：新建场景下 root 是空 unknown。 */
class ThemePlaceholder extends OpenXmlUnknownElement {
  constructor() {
    super("a", "theme", "http://schemas.openxmlformats.org/drawingml/2006/main");
  }
}
