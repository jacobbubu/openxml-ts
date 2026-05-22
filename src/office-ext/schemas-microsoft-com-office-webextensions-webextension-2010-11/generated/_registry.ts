// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_webextension_2010_11.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerWebextension201011ChildMaps } from "./_child-map.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Snapshot } from "./snapshot.js";
import { WebExtension } from "./web-extension.js";
import { WebExtensionBinding } from "./web-extension-binding.js";
import { WebExtensionBindingList } from "./web-extension-binding-list.js";
import { WebExtensionProperty } from "./web-extension-property.js";
import { WebExtensionPropertyBag } from "./web-extension-property-bag.js";
import { WebExtensionReference } from "./web-extension-reference.js";
import { WebExtensionReferenceList } from "./web-extension-reference-list.js";
import { WebExtensionStoreReference } from "./web-extension-store-reference.js";

/**
 * 把 webextension-2010-11 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerWebextension201011Elements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "snapshot", Snapshot);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "webextension", WebExtension);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "binding", WebExtensionBinding);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "bindings", WebExtensionBindingList);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "property", WebExtensionProperty);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "properties", WebExtensionPropertyBag);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "webextensionref", WebExtensionReference);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "alternateReferences", WebExtensionReferenceList);
  registry.register("http://schemas.microsoft.com/office/webextensions/webextension/2010/11", "reference", WebExtensionStoreReference);
  registerWebextension201011ChildMaps(registry);
}
