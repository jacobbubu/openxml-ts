// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_taskpanes_2010_11.json

import type { ElementRegistry } from "../../../element/index.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Taskpanes } from "./taskpanes.js";
import { WebExtensionPartReference } from "./web-extension-part-reference.js";
import { WebExtensionTaskpane } from "./web-extension-taskpane.js";

/**
 * 把 taskpanes-2010-11 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerTaskpanes201011Elements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11", "taskpanes", Taskpanes);
  registry.register("http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11", "webextensionref", WebExtensionPartReference);
  registry.register("http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11", "taskpane", WebExtensionTaskpane);
}
