/**
 * Story-3.3 验证：SharedStringTablePart / WorkbookStylesPart /
 * CalculationChainPart / ThemePart typed Parts。
 *
 * 不依赖 SpreadsheetDocument 门面（Story-3.5 才落地）。直接把 typed Part
 * 接到 MemoryOpenXmlPackage 上验证：static 常量、typed root 懒加载 / 缓存、
 * `set` + `flushAsync` 写回字节。
 */

import { describe, expect, it } from "vitest";
import { registerSpreadsheetElements } from "../../src/excel/generated/_registry.js";
import { CalculationChain } from "../../src/excel/generated/calculation-chain.js";
import { SharedStringTable } from "../../src/excel/generated/shared-string-table.js";
import { Stylesheet } from "../../src/excel/generated/stylesheet.js";
import {
  CalculationChainPart,
  SharedStringTablePart,
  ThemePart,
  WorkbookStylesPart,
} from "../../src/excel/parts/index.js";
import { ElementRegistry, OpenXmlUnknownElement } from "../../src/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";

const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const ANS = "http://schemas.openxmlformats.org/drawingml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerSpreadsheetElements(r);
  return r;
}

describe("SharedStringTablePart · 核心契约", () => {
  it("static 常量与 OPC 规范对齐", () => {
    expect(SharedStringTablePart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    );
    expect(SharedStringTablePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
    );
  });

  it("get sharedStringTable 懒加载 → SharedStringTable；set + flushAsync 回写", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart(
      "/xl/sharedStrings.xml" as PartUri,
      SharedStringTablePart.contentType,
    );
    await part.writeAsync(
      `<x:sst xmlns:x="${XNS}" count="2" uniqueCount="2"><x:si><x:t>Hello</x:t></x:si><x:si><x:t>World</x:t></x:si></x:sst>`,
    );

    const ssp = new SharedStringTablePart(part, makeRegistry());
    expect(ssp.sharedStringTable).toBeInstanceOf(SharedStringTable);
    expect(ssp.sharedStringTable.localName).toBe("sst");

    // 同一引用（缓存）
    expect(ssp.sharedStringTable).toBe(ssp.sharedStringTable);

    // 触发懒加载后 flush 应把当前 typed root 序列化回 part bytes
    await ssp.flushAsync();
    const bytes = (part as { snapshot(): Uint8Array }).snapshot();
    expect(new TextDecoder().decode(bytes)).toContain("sst");
  });
});

describe("WorkbookStylesPart · 核心契约", () => {
  it("static 常量与 OPC 规范对齐", () => {
    expect(WorkbookStylesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    );
    expect(WorkbookStylesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
    );
  });

  it("get stylesheet 懒加载 → Stylesheet 实例", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/xl/styles.xml" as PartUri, WorkbookStylesPart.contentType);
    await part.writeAsync(`<x:styleSheet xmlns:x="${XNS}"/>`);

    const sp = new WorkbookStylesPart(part, makeRegistry());
    expect(sp.stylesheet).toBeInstanceOf(Stylesheet);
    expect(sp.stylesheet.localName).toBe("styleSheet");
  });
});

describe("CalculationChainPart · 核心契约", () => {
  it("static 常量与 OPC 规范对齐", () => {
    expect(CalculationChainPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml",
    );
    expect(CalculationChainPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/calcChain",
    );
  });

  it("get calculationChain 懒加载 → CalculationChain 实例", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/xl/calcChain.xml" as PartUri, CalculationChainPart.contentType);
    await part.writeAsync(`<x:calcChain xmlns:x="${XNS}"><x:c r="A1" i="1"/></x:calcChain>`);

    const ccp = new CalculationChainPart(part, makeRegistry());
    expect(ccp.calculationChain).toBeInstanceOf(CalculationChain);
    expect(ccp.calculationChain.localName).toBe("calcChain");
  });
});

describe("ThemePart · 共享 typed Part（word + excel 共用）", () => {
  it("static 常量与 OPC 规范对齐", () => {
    expect(ThemePart.contentType).toBe("application/vnd.openxmlformats-officedocument.theme+xml");
    expect(ThemePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
    );
  });

  it("theme root 走 OpenXmlUnknownElement 占位透传（DrawingML 未在 Epic-3 落地）", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/xl/theme/theme1.xml" as PartUri, ThemePart.contentType);
    await part.writeAsync(`<a:theme xmlns:a="${ANS}"><a:name>Office</a:name></a:theme>`);

    const tp = new ThemePart(part, makeRegistry());
    expect(tp.theme).toBeInstanceOf(OpenXmlUnknownElement);
    expect(tp.theme.localName).toBe("theme");
    expect(tp.theme.namespaceUri).toBe(ANS);
  });
});
