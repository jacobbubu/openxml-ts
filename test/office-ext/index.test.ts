/**
 * Epic-76 smoke test：验证 office-ext umbrella 入口可用性。
 *
 * - 抽样 3 个命名空间别名，各实例化一个类，验证 localName/prefix/namespaceUri
 * - 验证 registerOfficeExtElements 可无异常地向 ElementRegistry 注册全部元素
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry } from "../../src/index.js";
import {
  officeDrawing2012Chartstyle,
  officeSpreadsheetml2014Revision,
  officeWord2012Wordml,
  registerOfficeExtElements,
} from "../../src/office-ext/index.js";

describe("office-ext · word-2012-wordml alias", () => {
  it("Appearance 实例化得到正确 localName/prefix/namespaceUri", () => {
    const e = new officeWord2012Wordml.Appearance();
    expect(e.localName).toBe("appearance");
    expect(e.prefix).toBe("w15");
    expect(e.namespaceUri).toBe("http://schemas.microsoft.com/office/word/2012/wordml");
  });
});

describe("office-ext · drawing-2012-chartStyle alias", () => {
  it("ChartArea 实例化得到正确 localName/prefix/namespaceUri", () => {
    const e = new officeDrawing2012Chartstyle.ChartArea();
    expect(e.localName).toBe("chartArea");
    expect(e.prefix).toBe("cs");
    expect(e.namespaceUri).toBe("http://schemas.microsoft.com/office/drawing/2012/chartStyle");
  });
});

describe("office-ext · spreadsheetml-2014-revision alias", () => {
  it("AutoFilter 实例化得到正确 localName", () => {
    const e = new officeSpreadsheetml2014Revision.AutoFilter();
    expect(e.localName).toBe("autoFilter");
    expect(e.namespaceUri).toBe("http://schemas.microsoft.com/office/spreadsheetml/2014/revision");
  });
});

describe("office-ext · registerOfficeExtElements", () => {
  it("向 ElementRegistry 注册全部元素不抛出", () => {
    const registry = new ElementRegistry();
    expect(() => registerOfficeExtElements(registry)).not.toThrow();
  });

  it("注册后可查到 w15:appearance", () => {
    const registry = new ElementRegistry();
    registerOfficeExtElements(registry);
    const Ctor = registry.lookup(
      "http://schemas.microsoft.com/office/word/2012/wordml",
      "appearance",
    );
    expect(Ctor).toBeDefined();
  });
});
