/**
 * Epic-69 smoke test：验证 math codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（OfficeMath / Paragraph / Fraction / Radical / Subscript / Run），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerMathElements } from "../../src/math/generated/_registry.js";
import {
  Fraction,
  OfficeMath,
  Paragraph,
  Radical,
  Run,
  Subscript,
} from "../../src/math/generated/index.js";

const CNS = "http://schemas.openxmlformats.org/officeDocument/2006/math";

describe("Generated · 核心 Math 元素形态", () => {
  it.each([
    { Ctor: OfficeMath, localName: "oMath" },
    { Ctor: Paragraph, localName: "oMathPara" },
    { Ctor: Fraction, localName: "f" },
    { Ctor: Radical, localName: "rad" },
    { Ctor: Subscript, localName: "sSub" },
    { Ctor: Run, localName: "r" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("m");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerMathElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 OfficeMath", () => {
    const registry = new ElementRegistry();
    expect(() => registerMathElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "oMath");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(OfficeMath);
    }
  });
});
