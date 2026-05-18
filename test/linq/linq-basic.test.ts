/**
 * Story-5.1 验证：XName / XNamespace / XAttribute / XElement 基础类型契约。
 *
 * 覆盖：
 * - XNamespace.Get intern + None；
 * - XName.Get 三种重载（仅 localName / ns + local / expanded "{uri}name"）；
 * - XName.Equals 与 toString；
 * - XElement Name / Value / Attribute / Attributes / Element / Elements /
 *   Descendants / Ancestors / Parent。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlUnknownElement } from "../../src/element/index.js";
import { XAttribute, XElement, XName, XNamespace } from "../../src/linq/index.js";

const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function ue(
  prefix: string,
  local: string,
  namespaceUri: string,
  text?: string,
): OpenXmlUnknownElement {
  const el = new OpenXmlUnknownElement(prefix, local, namespaceUri);
  if (text !== undefined) el.text = text;
  return el;
}

describe("XNamespace", () => {
  it("Get(uri) intern：同 URI 多次 Get 返同一实例", () => {
    expect(XNamespace.Get(W)).toBe(XNamespace.Get(W));
  });

  it("Get('') 返回 XNamespace.None", () => {
    expect(XNamespace.Get("")).toBe(XNamespace.None);
  });

  it("None.NamespaceName 是空串", () => {
    expect(XNamespace.None.NamespaceName).toBe("");
  });

  it("GetName(local) 构造的 XName 落在本 ns", () => {
    const ns = XNamespace.Get(W);
    const name = ns.GetName("p");
    expect(name.NamespaceName).toBe(W);
    expect(name.LocalName).toBe("p");
  });

  it("toString() 返 URI", () => {
    expect(XNamespace.Get(W).toString()).toBe(W);
  });
});

describe("XName", () => {
  it("Get(localName) 单参——空命名空间", () => {
    const n = XName.Get("p");
    expect(n.NamespaceName).toBe("");
    expect(n.LocalName).toBe("p");
  });

  it("Get(ns, localName) 双参（字符串 ns）", () => {
    const n = XName.Get(W, "p");
    expect(n.NamespaceName).toBe(W);
    expect(n.LocalName).toBe("p");
  });

  it("Get(XNamespace, localName) 双参（XNamespace ns）", () => {
    const n = XName.Get(XNamespace.Get(W), "r");
    expect(n.NamespaceName).toBe(W);
    expect(n.LocalName).toBe("r");
  });

  it("Get('{ns}local') expanded form 解析", () => {
    const n = XName.Get(`{${W}}p`);
    expect(n.NamespaceName).toBe(W);
    expect(n.LocalName).toBe("p");
  });

  it("Get('{malformed') 抛错", () => {
    expect(() => XName.Get("{bad-name")).toThrow();
  });

  it("intern：同 (ns, local) 多次 Get 返同一实例", () => {
    expect(XName.Get(W, "p")).toBe(XName.Get(W, "p"));
  });

  it("Equals 值型对比", () => {
    expect(XName.Get(W, "p").Equals(XName.Get(W, "p"))).toBe(true);
    expect(XName.Get(W, "p").Equals(XName.Get(W, "r"))).toBe(false);
    expect(XName.Get(W, "p").Equals(undefined)).toBe(false);
  });

  it("toString() expanded form", () => {
    expect(XName.Get(W, "p").toString()).toBe(`{${W}}p`);
    expect(XName.Get("plain").toString()).toBe("plain");
  });

  it("Namespace 懒查 XNamespace 实例", () => {
    expect(XName.Get(W, "p").Namespace).toBe(XNamespace.Get(W));
  });
});

describe("XElement · Name / Value", () => {
  it("Name 返 (namespaceUri, localName) XName", () => {
    const root = ue("w", "p", W);
    const xe = new XElement(root);
    expect(xe.Name.NamespaceName).toBe(W);
    expect(xe.Name.LocalName).toBe("p");
  });

  it("Value 拼接所有 leaf/unknown 后代的 text", () => {
    const root = ue("w", "p", W);
    root.appendChild(ue("w", "r", W, "Hello"));
    root.appendChild(ue("w", "r", W, " world"));
    const xe = new XElement(root);
    expect(xe.Value).toBe("Hello world");
  });

  it("叶子节点的 Value = 自己的 text", () => {
    const leaf = ue("w", "t", W, "abc");
    expect(new XElement(leaf).Value).toBe("abc");
  });
});

describe("XElement · Attribute / Attributes", () => {
  it("Attribute(name) 命中无 prefix 属性", () => {
    const root = ue("w", "p", W);
    root.extendedAttributes.set("style", "Heading1");
    expect(new XElement(root).Attribute(XName.Get("style"))?.Value).toBe("Heading1");
  });

  it("Attribute(name) 命中 prefix:local 属性", () => {
    const root = ue("w", "p", W);
    root.extendedAttributes.set("r:id", "rId1");
    expect(new XElement(root).Attribute(XName.Get("r", "id"))?.Value).toBe("rId1");
  });

  it("Attribute 用字符串 name 等价 expanded 解析", () => {
    const root = ue("w", "p", W);
    root.extendedAttributes.set("style", "Heading1");
    expect(new XElement(root).Attribute("style")?.Value).toBe("Heading1");
  });

  it("Attributes() 排除 xmlns 声明", () => {
    const root = ue("w", "p", W);
    root.extendedAttributes.set("xmlns:w", W);
    root.extendedAttributes.set("style", "Heading1");
    const attrs = new XElement(root).Attributes();
    expect(attrs.map((a) => a.Name.LocalName)).toEqual(["style"]);
  });

  it("XAttribute toString() 包名带值", () => {
    const a = new XAttribute(XName.Get("style"), "Heading1");
    expect(a.toString()).toBe('style="Heading1"');
  });
});

describe("XElement · Element / Elements", () => {
  it("Element() 取首个直接子", () => {
    const root = ue("w", "body", W);
    root.appendChild(ue("w", "p", W));
    root.appendChild(ue("w", "p", W));
    expect(new XElement(root).Element()?.Name.LocalName).toBe("p");
  });

  it("Element(name) 按 XName 匹配（含 ns）", () => {
    const root = ue("w", "body", W);
    root.appendChild(ue("a", "drawing", A));
    root.appendChild(ue("w", "p", W));
    expect(new XElement(root).Element(XName.Get(W, "p"))?.Name.LocalName).toBe("p");
    expect(new XElement(root).Element(XName.Get(A, "drawing"))?.Name.LocalName).toBe("drawing");
  });

  it("Element 不命中返 undefined", () => {
    const root = ue("w", "body", W);
    expect(new XElement(root).Element(XName.Get(W, "p"))).toBeUndefined();
  });

  it("Elements() 返所有直接子", () => {
    const root = ue("w", "body", W);
    root.appendChild(ue("w", "p", W));
    root.appendChild(ue("a", "drawing", A));
    expect(new XElement(root).Elements().length).toBe(2);
  });

  it("Elements(name) 按 XName 过滤", () => {
    const root = ue("w", "body", W);
    root.appendChild(ue("w", "p", W));
    root.appendChild(ue("a", "drawing", A));
    root.appendChild(ue("w", "p", W));
    expect(new XElement(root).Elements(XName.Get(W, "p")).length).toBe(2);
  });

  it("叶子 element.Elements() 返空", () => {
    const leaf = ue("w", "t", W, "abc");
    expect(new XElement(leaf).Elements()).toEqual([]);
  });
});

describe("XElement · Descendants / Ancestors / Parent", () => {
  function buildTree(): {
    root: OpenXmlUnknownElement;
    r1: OpenXmlUnknownElement;
    t1: OpenXmlUnknownElement;
  } {
    const root = ue("w", "body", W);
    const p1 = ue("w", "p", W);
    const r1 = ue("w", "r", W);
    const t1 = ue("w", "t", W, "Hello");
    r1.appendChild(t1);
    p1.appendChild(r1);
    root.appendChild(p1);
    return { root, r1, t1 };
  }

  it("Descendants() 深度优先所有后代（不含 self）", () => {
    const { root } = buildTree();
    const all = new XElement(root).Descendants();
    expect(all.map((x) => x.Name.LocalName)).toEqual(["p", "r", "t"]);
  });

  it("Descendants(name) 按 XName 过滤", () => {
    const { root } = buildTree();
    const ts = new XElement(root).Descendants(XName.Get(W, "t"));
    expect(ts.length).toBe(1);
    expect(ts[0]?.Value).toBe("Hello");
  });

  it("Parent 返父 XElement；root 返 undefined", () => {
    const { root, t1 } = buildTree();
    expect(new XElement(t1).Parent?.Name.LocalName).toBe("r");
    expect(new XElement(root).Parent).toBeUndefined();
  });

  it("Ancestors() 链上溯所有祖先", () => {
    const { t1 } = buildTree();
    const anc = new XElement(t1).Ancestors().map((x) => x.Name.LocalName);
    expect(anc).toEqual(["r", "p", "body"]);
  });

  it("Ancestors(name) 按 XName 过滤", () => {
    const { t1 } = buildTree();
    const anc = new XElement(t1).Ancestors(XName.Get(W, "p"));
    expect(anc.length).toBe(1);
    expect(anc[0]?.Name.LocalName).toBe("p");
  });
});
