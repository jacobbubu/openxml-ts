/**
 * Epic-75 smoke test：验证 word-2010 codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（ContentPart / GlowTextEffect / Alpha），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerWord2010Elements } from "../../src/word-2010/generated/_registry.js";
import {
  Alpha,
  ContentPart,
} from "../../src/word-2010/generated/index.js";
import { OpenXmlLeafElement } from "../../src/element/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.microsoft.com/office/word/2010/wordml";

describe("Generated · 核心 Word2010 composite 元素形态", () => {
  it("ContentPart 实例化得到正确 localName/prefix/namespace", () => {
    const e = new ContentPart();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe("contentPart");
    expect(e.prefix).toBe("w14");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · 核心 Word2010 leaf 元素形态", () => {
  it("Alpha 实例化得到正确 localName/prefix/namespace", () => {
    const e = new Alpha();
    expect(e).toBeInstanceOf(OpenXmlLeafElement);
    expect(e.localName).toBe("alpha");
    expect(e.prefix).toBe("w14");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerWord2010Elements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 ContentPart", () => {
    const registry = new ElementRegistry();
    expect(() => registerWord2010Elements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "contentPart");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(ContentPart);
    }
  });
});
