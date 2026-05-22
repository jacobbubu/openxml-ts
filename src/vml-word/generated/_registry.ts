// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_word.json

import type { ElementRegistry } from "../../element/index.js";
import { registerVmlWordChildMaps } from "./_child-map.js";
import { AnchorLock } from "./anchor-lock.js";
import { BottomBorder } from "./bottom-border.js";
import { LeftBorder } from "./left-border.js";
import { RightBorder } from "./right-border.js";
import { TextWrap } from "./text-wrap.js";
import { TopBorder } from "./top-border.js";

/**
 * 把 vml-word 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerVmlWordElements(registry: ElementRegistry): void {
  registry.register("urn:schemas-microsoft-com:office:word", "anchorlock", AnchorLock);
  registry.register("urn:schemas-microsoft-com:office:word", "borderbottom", BottomBorder);
  registry.register("urn:schemas-microsoft-com:office:word", "borderleft", LeftBorder);
  registry.register("urn:schemas-microsoft-com:office:word", "borderright", RightBorder);
  registry.register("urn:schemas-microsoft-com:office:word", "wrap", TextWrap);
  registry.register("urn:schemas-microsoft-com:office:word", "bordertop", TopBorder);
  registerVmlWordChildMaps(registry);
}
