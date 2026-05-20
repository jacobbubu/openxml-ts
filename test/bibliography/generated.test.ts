/**
 * Epic-70 smoke test：验证 bibliography codegen 跑出的元素类按预期可用。
 */

import { describe, expect, it } from "vitest";
import { registerBibliographyElements } from "../../src/bibliography/generated/_registry.js";
import { Source, Sources } from "../../src/bibliography/generated/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.openxmlformats.org/officeDocument/2006/bibliography";

describe("Generated · 核心 Bibliography 元素形态", () => {
  it.each([
    { Ctor: Sources, localName: "Sources" },
    { Ctor: Source, localName: "Source" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("b");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerBibliographyElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 Sources", () => {
    const registry = new ElementRegistry();
    expect(() => registerBibliographyElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "Sources");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(Sources);
    }
  });
});
