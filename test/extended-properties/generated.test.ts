/**
 * Epic-70 smoke test：验证 extended-properties codegen 跑出的元素类按预期可用。
 */

import { describe, expect, it } from "vitest";
import { registerExtendedPropertiesElements } from "../../src/extended-properties/generated/_registry.js";
import { Properties } from "../../src/extended-properties/generated/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";

describe("Generated · 核心 ExtendedProperties 元素形态", () => {
  it("Properties 实例化得到正确 localName/prefix/namespace", () => {
    const e = new Properties();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe("Properties");
    expect(e.prefix).toBe("ap");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerExtendedPropertiesElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 Properties", () => {
    const registry = new ElementRegistry();
    expect(() => registerExtendedPropertiesElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "Properties");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(Properties);
    }
  });
});
