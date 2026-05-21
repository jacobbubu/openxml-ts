// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_ink_2010_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { ContextNode } from "./context-node.js";
import { ContextNodeProperty } from "./context-node-property.js";
import { DestinationLink } from "./destination-link.js";
import { SourceLink } from "./source-link.js";

/**
 * 把 ink-2010-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerInk2010MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/ink/2010/main", "context", ContextNode);
  registry.register("http://schemas.microsoft.com/ink/2010/main", "property", ContextNodeProperty);
  registry.register("http://schemas.microsoft.com/ink/2010/main", "destinationLink", DestinationLink);
  registry.register("http://schemas.microsoft.com/ink/2010/main", "sourceLink", SourceLink);
}
