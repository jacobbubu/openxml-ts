import { describe, expect, it } from "vitest";
import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
} from "../../src/index.js";

class C extends OpenXmlCompositeElement {
  override readonly localName = "c";
  override readonly prefix = "t";
  override readonly namespaceUri = "urn:t";
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class L extends OpenXmlLeafElement {
  override readonly localName = "l";
  override readonly prefix = "t";
  override readonly namespaceUri = "urn:t";
}

describe("OpenXmlElementList · 基础", () => {
  it("初始 count=0，at(0)=undefined", () => {
    const c = new C();
    expect(c.children.count).toBe(0);
    expect(c.children.at(0)).toBeUndefined();
  });

  it("append 后 count+=1，at(n) 命中", () => {
    const c = new C();
    const a = new L();
    const b = new L();
    c.children.append(a);
    c.children.append(b);
    expect(c.children.count).toBe(2);
    expect(c.children.at(0)).toBe(a);
    expect(c.children.at(1)).toBe(b);
    expect(c.children.at(2)).toBeUndefined();
  });

  it("Symbol.iterator 保持插入顺序", () => {
    const c = new C();
    const items = [new L(), new L(), new L()];
    for (const x of items) c.children.append(x);
    expect([...c.children]).toEqual(items);
  });

  it("toArray 返回独立快照", () => {
    const c = new C();
    const a = new L();
    c.children.append(a);
    const snap = c.children.toArray();
    c.children.append(new L());
    expect(snap).toEqual([a]);
    expect(c.children.count).toBe(2);
  });

  it("remove 命中清父", () => {
    const c = new C();
    const a = new L();
    c.children.append(a);
    expect(c.children.remove(a)).toBe(true);
    expect(a.parent).toBeUndefined();
    expect(c.children.count).toBe(0);
  });

  it("remove 未命中返回 false", () => {
    const c = new C();
    const stranger = new L();
    expect(c.children.remove(stranger)).toBe(false);
  });

  it("clear 清空并解父", () => {
    const c = new C();
    const a = new L();
    const b = new L();
    c.children.append(a);
    c.children.append(b);
    c.children.clear();
    expect(c.children.count).toBe(0);
    expect(a.parent).toBeUndefined();
    expect(b.parent).toBeUndefined();
  });

  it("insertBefore 维护顺序与 parent", () => {
    const c = new C();
    const a = new L();
    const b = new L();
    const mid = new L();
    c.children.append(a);
    c.children.append(b);
    c.children.insertBefore(mid, b);
    expect(c.children.toArray()).toEqual([a, mid, b]);
    expect(mid.parent).toBe(c);
  });
});
