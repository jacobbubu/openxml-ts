/**
 * Epic-71 smoke test：验证 vml codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（Fill / Stroke / Shape / Path），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerVmlElements } from "../../src/vml/generated/_registry.js";
import { Fill, Stroke } from "../../src/vml/generated/index.js";

const CNS = "urn:schemas-microsoft-com:vml";

describe("Generated · 核心 VML 元素形态", () => {
  it.each([
    { Ctor: Fill, localName: "fill" },
    { Ctor: Stroke, localName: "stroke" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("v");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerVmlElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 Fill", () => {
    const registry = new ElementRegistry();
    expect(() => registerVmlElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "fill");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(Fill);
    }
  });
});
