import { describe, expect, it } from "vitest";
import {
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  OpenXmlUnknownElement,
} from "../../src/index.js";

/** 测试用具体 Leaf —— 模拟 w:t。 */
class TText extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  constructor(text?: string) {
    super();
    this.text = text;
  }
}

/** 测试用 Composite —— 模拟 w:r。 */
class TRun extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

/** 测试用 Composite —— 模拟 w:p（包 Run）。 */
class TParagraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

describe("OpenXmlElement 基础形态", () => {
  it("Leaf 元素持有 text 字段", () => {
    const t = new TText("hello");
    expect(t.localName).toBe("t");
    expect(t.prefix).toBe("w");
    expect(t.namespaceUri).toBe("urn:test:w");
    expect(t.text).toBe("hello");
    expect(t.parent).toBeUndefined();
    expect(t.extendedAttributes.size).toBe(0);
  });

  it("Composite 元素持有空 children", () => {
    const r = new TRun();
    expect(r.children.count).toBe(0);
    expect([...r.children]).toEqual([]);
  });

  it("Leaf 不允许 text 默认值", () => {
    const t = new TText();
    expect(t.text).toBeUndefined();
    t.text = "";
    expect(t.text).toBe("");
    t.text = "中文";
    expect(t.text).toBe("中文");
  });

  it("extendedAttributes 可读写", () => {
    const r = new TRun();
    r.extendedAttributes.set("mc:Ignorable", "w14");
    expect(r.extendedAttributes.get("mc:Ignorable")).toBe("w14");
    expect([...r.extendedAttributes.entries()]).toEqual([["mc:Ignorable", "w14"]]);
  });
});

describe("Composite · 树操作", () => {
  it("appendChild 维护父子关系", () => {
    const p = new TParagraph();
    const r = new TRun();
    expect(p.appendChild(r)).toBe(r);
    expect(r.parent).toBe(p);
    expect(p.children.count).toBe(1);
    expect(p.children.at(0)).toBe(r);
  });

  it("appendChild 返回 child 以支持链式", () => {
    const p = new TParagraph();
    const r = new TRun();
    const result = p.appendChild(r);
    expect(result).toBe(r);
  });

  it("insertBefore 插入位置正确", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    p.appendChild(r1);
    p.appendChild(r3);
    p.insertBefore(r2, r3);
    expect(p.children.toArray()).toEqual([r1, r2, r3]);
    expect(r2.parent).toBe(p);
  });

  it("insertBefore sibling 非本子节点抛 BACKEND_ERROR", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const stranger = new TRun();
    expect(() => p.insertBefore(r1, stranger)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("remove 命中返回 true 并清父", () => {
    const p = new TParagraph();
    const r = new TRun();
    p.appendChild(r);
    expect(p.remove(r)).toBe(true);
    expect(r.parent).toBeUndefined();
    expect(p.children.count).toBe(0);
  });

  it("remove 不存在子返回 false", () => {
    const p = new TParagraph();
    const stranger = new TRun();
    expect(p.remove(stranger)).toBe(false);
  });

  it("已有 parent 的子节点不能直接挂到新 parent 抛 BACKEND_ERROR", () => {
    const p1 = new TParagraph();
    const p2 = new TParagraph();
    const r = new TRun();
    p1.appendChild(r);
    expect(() => p2.appendChild(r)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
    // 先 detach 再 attach 应正常
    p1.remove(r);
    expect(() => p2.appendChild(r)).not.toThrow();
    expect(r.parent).toBe(p2);
  });

  it("拒绝把元素挂到自身", () => {
    const p = new TParagraph();
    expect(() => p.appendChild(p as unknown as OpenXmlElement)).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });
});

describe("Composite · 迭代器", () => {
  function makePara(): { p: TParagraph; r1: TRun; r2: TRun; r3: TRun; t1: TText; t2: TText } {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    const t1 = new TText("foo");
    const t2 = new TText("bar");
    r1.appendChild(t1);
    r2.appendChild(t2);
    p.appendChild(r1);
    p.appendChild(r2);
    p.appendChild(r3);
    return { p, r1, r2, r3, t1, t2 };
  }

  it("elements() 返回直接子（不递归）", () => {
    const { p, r1, r2, r3 } = makePara();
    expect([...p.elements()]).toEqual([r1, r2, r3]);
  });

  it("elements(ctor) 过滤类型", () => {
    const { p, r1, r2, r3 } = makePara();
    expect([...p.elements(TRun)]).toEqual([r1, r2, r3]);
    expect([...p.elements(TText)]).toEqual([]);
  });

  it("descendants() DFS 递归全部后代", () => {
    const { p, r1, r2, r3, t1, t2 } = makePara();
    expect([...p.descendants()]).toEqual([r1, t1, r2, t2, r3]);
  });

  it("descendants(ctor) 过滤后代", () => {
    const { p, t1, t2 } = makePara();
    expect([...p.descendants(TText)]).toEqual([t1, t2]);
  });

  it("firstChild() 返回第一个直接子", () => {
    const { p, r1 } = makePara();
    expect(p.firstChild()).toBe(r1);
  });

  it("firstChild(ctor) 返回第一个匹配类的直接子", () => {
    const { p, r1 } = makePara();
    expect(p.firstChild(TRun)).toBe(r1);
    expect(p.firstChild(TText)).toBeUndefined();
  });

  it("firstChild 空列表返回 undefined", () => {
    const p = new TParagraph();
    expect(p.firstChild()).toBeUndefined();
  });
});

describe("OpenXmlUnknownElement", () => {
  it("保留 prefix/localName/namespace", () => {
    const u = new OpenXmlUnknownElement("mc", "AlternateContent", "urn:mc");
    expect(u.prefix).toBe("mc");
    expect(u.localName).toBe("AlternateContent");
    expect(u.namespaceUri).toBe("urn:mc");
    expect(u.qualifiedName).toBe("mc:AlternateContent");
  });

  it("default namespace（空 prefix）qualifiedName 不含冒号", () => {
    const u = new OpenXmlUnknownElement("", "Foo", "urn:test");
    expect(u.qualifiedName).toBe("Foo");
  });

  it("作为 composite 可挂子元素", () => {
    const u = new OpenXmlUnknownElement("mc", "Fallback", "urn:mc");
    const r = new TRun();
    u.appendChild(r);
    expect(u.children.count).toBe(1);
    expect(r.parent).toBe(u);
  });
});
