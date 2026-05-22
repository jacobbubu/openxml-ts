// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_customDocumentInformationPanel.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2006CustomDocumentInformationPanelChildMaps } from "./_child-map.js";
import { CustomPropertyEditor } from "./custom-property-editor.js";
import { CustomPropertyEditors } from "./custom-property-editors.js";
import { DefaultPropertyEditorNamespace } from "./default-property-editor-namespace.js";
import { PropertyEditorNamespace } from "./property-editor-namespace.js";
import { ShowOnOpen } from "./show-on-open.js";
import { XsnFileLocation } from "./xsn-file-location.js";

/**
 * 把 2006-customDocumentInformationPanel 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2006CustomDocumentInformationPanelElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "customPropertyEditor", CustomPropertyEditor);
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "customPropertyEditors", CustomPropertyEditors);
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "defaultPropertyEditorNamespace", DefaultPropertyEditorNamespace);
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "XMLNamespace", PropertyEditorNamespace);
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "showOnOpen", ShowOnOpen);
  registry.register("http://schemas.microsoft.com/office/2006/customDocumentInformationPanel", "XSNLocation", XsnFileLocation);
  register2006CustomDocumentInformationPanelChildMaps(registry);
}
