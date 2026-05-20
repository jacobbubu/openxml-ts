/**
 * Epic-68 smoke test：验证 picture codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（Picture / NonVisualPictureProperties / BlipFill / ShapeProperties），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerPictureElements } from "../../src/picture/generated/_registry.js";
import {
  BlipFill,
  NonVisualPictureProperties,
  Picture,
  ShapeProperties,
} from "../../src/picture/generated/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/picture";

describe("Generated · 核心 Picture 元素形态", () => {
  it.each([
    { Ctor: Picture, localName: "pic" },
    { Ctor: NonVisualPictureProperties, localName: "nvPicPr" },
    { Ctor: BlipFill, localName: "blipFill" },
    { Ctor: ShapeProperties, localName: "spPr" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("pic");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerPictureElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 Picture", () => {
    const registry = new ElementRegistry();
    expect(() => registerPictureElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "pic");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(Picture);
    }
  });
});
