/**
 * #78 回归守护：codegen 对 (namespaceUri, localName) 同 qname 多次注册时，
 * `w:style` 必须解析到 composite Style——否则像旧实现那样让 leaf StyleId
 * 后注册胜出，`StylesPart` 反序列化会抛
 * `Cannot append child to leaf element <style>`，整个样式表读不进来。
 *
 * 该规则在 codegen 的 EXPLICIT_PRIORITY 表里强制；本测试是它的回归守护。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlLeafElement } from "../../src/element/element.js";
import { ElementRegistry } from "../../src/element/index.js";
import { registerWordprocessingElements } from "../../src/word/generated/_registry.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

describe("Word _registry.ts dedup（#78）", () => {
  it("w:style 解析到 composite Style（不是 leaf StyleId）", () => {
    const registry = new ElementRegistry();
    registerWordprocessingElements(registry);
    const Ctor = registry.lookup(WPNS, "style");
    expect(Ctor).toBeDefined();
    if (Ctor === undefined) return;
    const instance = new Ctor();
    expect(instance).not.toBeInstanceOf(OpenXmlLeafElement);
    expect(instance.constructor.name).toBe("Style");
  });
});
