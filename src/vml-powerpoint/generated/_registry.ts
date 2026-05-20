// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_powerpoint.json

import type { ElementRegistry } from "../../element/index.js";
import { InkAnnotationFlag } from "./ink-annotation-flag.js";
import { TextData } from "./text-data.js";

/**
 * 把 vml-powerpoint 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerVmlPowerpointElements(registry: ElementRegistry): void {
  registry.register("urn:schemas-microsoft-com:office:powerpoint", "iscomment", InkAnnotationFlag);
  registry.register("urn:schemas-microsoft-com:office:powerpoint", "textdata", TextData);
}
