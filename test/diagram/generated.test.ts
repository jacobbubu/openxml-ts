/**
 * Epic-74 smoke test：验证 diagram codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（DataModelRoot / ColorsDefinition / LayoutDefinition / StyleDefinition / RelationshipIds），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerDiagramElements } from "../../src/diagram/generated/_registry.js";
import {
  ColorsDefinition,
  DataModelRoot,
  LayoutDefinition,
  RelationshipIds,
  StyleDefinition,
} from "../../src/diagram/generated/index.js";
import { OpenXmlLeafElement } from "../../src/element/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/diagram";

describe("Generated · 核心 Diagram composite 元素形态", () => {
  it.each([
    { Ctor: ColorsDefinition, localName: "colorsDef" },
    { Ctor: DataModelRoot, localName: "dataModel" },
    { Ctor: LayoutDefinition, localName: "layoutDef" },
    { Ctor: StyleDefinition, localName: "styleDef" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("dgm");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · 核心 Diagram leaf 元素形态", () => {
  it("RelationshipIds 实例化得到正确 localName/prefix/namespace", () => {
    const e = new RelationshipIds();
    expect(e).toBeInstanceOf(OpenXmlLeafElement);
    expect(e.localName).toBe("relIds");
    expect(e.prefix).toBe("dgm");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerDiagramElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 DataModelRoot", () => {
    const registry = new ElementRegistry();
    expect(() => registerDiagramElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "dataModel");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(DataModelRoot);
    }
  });
});
