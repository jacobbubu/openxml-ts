import { Theme } from "../drawing/generated/theme.js";
import type { ElementRegistry } from "../element/index.js";
import type { IPackagePart } from "../packaging/interfaces/part.js";
import { TypedXmlPart } from "./typed-xml-part.js";

/**
 * `.../theme` 关系下的 Part；根元素 `<a:theme>`（DrawingML namespace）。
 *
 * 使用 typed `Theme` 根元素（Epic-118b），支持 `themeId`（thm15:id）等属性。
 * Word / Excel / PPT 三族共用本类，对位 .NET `DocumentFormat.OpenXml.Packaging.ThemePart`。
 */
export class ThemePart extends TypedXmlPart<Theme> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.theme+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Theme);
  }

  get theme(): Theme {
    return this.root;
  }

  set theme(value: Theme) {
    this.root = value;
  }
}
