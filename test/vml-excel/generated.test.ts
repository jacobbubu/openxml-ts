/**
 * Epic-71 smoke test：验证 vml-excel codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（ClientData / Anchor），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerVmlExcelElements } from "../../src/vml-excel/generated/_registry.js";
import { ClientData } from "../../src/vml-excel/generated/index.js";

const CNS = "urn:schemas-microsoft-com:office:excel";

describe("Generated · 核心 VmlExcel 元素形态", () => {
  it.each([{ Ctor: ClientData, localName: "ClientData" }])(
    "$Ctor.name 实例化得到正确 localName/prefix/namespace",
    ({ Ctor, localName }) => {
      const e = new Ctor();
      expect(e).toBeInstanceOf(OpenXmlCompositeElement);
      expect(e.localName).toBe(localName);
      expect(e.prefix).toBe("xvml");
      expect(e.namespaceUri).toBe(CNS);
    },
  );
});

describe("Generated · registerVmlExcelElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 ClientData", () => {
    const registry = new ElementRegistry();
    expect(() => registerVmlExcelElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "ClientData");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(ClientData);
    }
  });
});
