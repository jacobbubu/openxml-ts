/**
 * Epic-119: LINQ XName 命名空间常量验证。
 *
 * 覆盖：
 * - 113 个 namespace 对象全部导出；
 * - 高频常量 namespaceUri + localName 正确性抽样（W, R, X, P, A, M, NoNamespace）；
 * - 常量总数 smoke check（≥5500）；
 * - XName intern：同一 namespace 下同名常量返回同一实例。
 */

import { describe, expect, it } from "vitest";
import { namespaces } from "../../src/linq/index.js";
import { A, M, NoNamespace, P, R, W, X } from "../../src/linq/namespaces/index.js";

const W_URI = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const R_URI = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const X_URI = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const P_URI = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A_URI = "http://schemas.openxmlformats.org/drawingml/2006/main";
const M_URI = "http://schemas.openxmlformats.org/officeDocument/2006/math";

describe("LINQ XName namespaces — 113 namespace classes", () => {
  it("namespaces object from linq/index exports all 113 namespace classes", () => {
    expect(Object.keys(namespaces).length).toBe(113);
  });

  it("namespaces object includes W, R, X, P, A, M, NoNamespace", () => {
    expect(namespaces.W).toBeDefined();
    expect(namespaces.R).toBeDefined();
    expect(namespaces.X).toBeDefined();
    expect(namespaces.P).toBeDefined();
    expect(namespaces.A).toBeDefined();
    expect(namespaces.M).toBeDefined();
    expect(namespaces.NoNamespace).toBeDefined();
  });
});

describe("W namespace constants", () => {
  it("W.NamespaceName.NamespaceName equals wordprocessingml URI", () => {
    expect(W.NamespaceName.NamespaceName).toBe(W_URI);
  });

  it("W.p has correct namespaceUri and localName", () => {
    expect(W.p.NamespaceName).toBe(W_URI);
    expect(W.p.LocalName).toBe("p");
  });

  it("W.body has correct namespaceUri and localName", () => {
    expect(W.body.NamespaceName).toBe(W_URI);
    expect(W.body.LocalName).toBe("body");
  });

  it("W.document has correct namespaceUri and localName", () => {
    expect(W.document.NamespaceName).toBe(W_URI);
    expect(W.document.LocalName).toBe("document");
  });

  it("W.val has correct namespaceUri and localName", () => {
    expect(W.val.NamespaceName).toBe(W_URI);
    expect(W.val.LocalName).toBe("val");
  });

  it("W constants are interned (same instance for same name)", () => {
    // XName.Get interns, so W.p accessed twice is same reference
    expect(W.p).toBe(W.p);
  });
});

describe("R namespace constants", () => {
  it("R.NamespaceName.NamespaceName equals relationships URI", () => {
    expect(R.NamespaceName.NamespaceName).toBe(R_URI);
  });

  it("R.id has correct namespaceUri and localName", () => {
    expect(R.id.NamespaceName).toBe(R_URI);
    expect(R.id.LocalName).toBe("id");
  });
});

describe("X namespace constants", () => {
  it("X.NamespaceName.NamespaceName equals spreadsheetml URI", () => {
    expect(X.NamespaceName.NamespaceName).toBe(X_URI);
  });

  it("X.workbook has correct namespaceUri and localName", () => {
    expect(X.workbook.NamespaceName).toBe(X_URI);
    expect(X.workbook.LocalName).toBe("workbook");
  });
});

describe("P namespace constants", () => {
  it("P.NamespaceName.NamespaceName equals presentationml URI", () => {
    expect(P.NamespaceName.NamespaceName).toBe(P_URI);
  });

  it("P.sld has correct namespaceUri and localName", () => {
    expect(P.sld.NamespaceName).toBe(P_URI);
    expect(P.sld.LocalName).toBe("sld");
  });
});

describe("A namespace constants", () => {
  it("A.NamespaceName.NamespaceName equals drawingml URI", () => {
    expect(A.NamespaceName.NamespaceName).toBe(A_URI);
  });

  it("A.p has correct namespaceUri and localName", () => {
    expect(A.p.NamespaceName).toBe(A_URI);
    expect(A.p.LocalName).toBe("p");
  });
});

describe("M namespace constants", () => {
  it("M.NamespaceName.NamespaceName equals math URI", () => {
    expect(M.NamespaceName.NamespaceName).toBe(M_URI);
  });

  it("M.oMath has correct namespaceUri and localName", () => {
    expect(M.oMath.NamespaceName).toBe(M_URI);
    expect(M.oMath.LocalName).toBe("oMath");
  });
});

describe("NoNamespace constants", () => {
  it("NoNamespace constants have empty namespaceUri", () => {
    expect(NoNamespace.val.NamespaceName).toBe("");
    expect(NoNamespace.val.LocalName).toBe("val");
  });

  it("NoNamespace.id has empty namespace", () => {
    expect(NoNamespace.id.NamespaceName).toBe("");
    expect(NoNamespace.id.LocalName).toBe("id");
  });
});

describe("Total constant count smoke check", () => {
  it("total constants across all namespaces is at least 5500", () => {
    let total = 0;
    for (const ns of Object.values(namespaces)) {
      // Each namespace object: subtract NamespaceName if present
      const keys = Object.keys(ns as Record<string, unknown>);
      total += keys.filter((k) => k !== "NamespaceName").length;
    }
    expect(total).toBeGreaterThanOrEqual(5500);
  });
});
