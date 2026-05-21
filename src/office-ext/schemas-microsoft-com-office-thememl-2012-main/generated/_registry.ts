// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_thememl_2012_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { ThemeFamily } from "./theme-family.js";
import { ThemeVariant } from "./theme-variant.js";
import { ThemeVariantList } from "./theme-variant-list.js";

/**
 * 把 thememl-2012-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerThememl2012MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/thememl/2012/main", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/thememl/2012/main", "themeFamily", ThemeFamily);
  registry.register("http://schemas.microsoft.com/office/thememl/2012/main", "themeVariant", ThemeVariant);
  registry.register("http://schemas.microsoft.com/office/thememl/2012/main", "themeVariantLst", ThemeVariantList);
}
