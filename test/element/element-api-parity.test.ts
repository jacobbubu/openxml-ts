/**
 * Epic-88：OpenXmlElement API 完整性测试。
 *
 * 每个新增方法都有至少一个专项测试。覆盖：
 * - ancestors() / ancestorsOfType()
 * - nextSibling() / previousSibling() / typed variants
 * - firstChildElement / lastChildElement / hasChildren
 * - getFirstChild()
 * - prependChild() / insertAfter() / insertAt()
 * - removeChild() / removeAllChildren() / removeAllChildrenOfType()
 * - replaceChild()
 * - removeSelf() / insertAfterSelf() / insertBeforeSelf()
 * - append()
 * - innerText (leaf & composite)
 * - outerXml
 * - cloneNode()
 * - isBefore() / isAfter()
 * - elementsBefore() / elementsAfter()
 */

import { describe, expect, it } from "vitest";
import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  OpenXmlUnknownElement,
} from "../../src/index.js";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

class TText extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  constructor(text?: string) {
    super();
    this.text = text;
  }
}

class TRun extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class TParagraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class TBody extends OpenXmlCompositeElement {
  override readonly localName = "body" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "urn:test:w" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

/** Build: body → [p1 → [r1 → [t1], r2 → [t2]], p2 → []] */
function makeTree(): {
  body: TBody;
  p1: TParagraph;
  p2: TParagraph;
  r1: TRun;
  r2: TRun;
  t1: TText;
  t2: TText;
} {
  const body = new TBody();
  const p1 = new TParagraph();
  const p2 = new TParagraph();
  const r1 = new TRun();
  const r2 = new TRun();
  const t1 = new TText("hello");
  const t2 = new TText(" world");
  r1.appendChild(t1);
  r2.appendChild(t2);
  p1.appendChild(r1);
  p1.appendChild(r2);
  body.appendChild(p1);
  body.appendChild(p2);
  return { body, p1, p2, r1, r2, t1, t2 };
}

// ---------------------------------------------------------------------------
// ancestors()
// ---------------------------------------------------------------------------

describe("ancestors()", () => {
  it("yields parent chain from nearest to furthest", () => {
    const { body, p1, r1, t1 } = makeTree();
    expect([...t1.ancestors()]).toEqual([r1, p1, body]);
  });

  it("yields empty for root element", () => {
    const body = new TBody();
    expect([...body.ancestors()]).toEqual([]);
  });

  it("ancestorsOfType() filters by type", () => {
    const { p1, t1 } = makeTree();
    expect([...t1.ancestorsOfType(TParagraph)]).toEqual([p1]);
    expect([...t1.ancestorsOfType(TText)]).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// nextSibling() / previousSibling()
// ---------------------------------------------------------------------------

describe("nextSibling() / previousSibling()", () => {
  it("nextSibling returns the next element", () => {
    const { r1, r2 } = makeTree();
    expect(r1.nextSibling()).toBe(r2);
  });

  it("nextSibling returns undefined for last child", () => {
    const { r2 } = makeTree();
    expect(r2.nextSibling()).toBeUndefined();
  });

  it("previousSibling returns the previous element", () => {
    const { r1, r2 } = makeTree();
    expect(r2.previousSibling()).toBe(r1);
  });

  it("previousSibling returns undefined for first child", () => {
    const { r1 } = makeTree();
    expect(r1.previousSibling()).toBeUndefined();
  });

  it("nextSiblingOfType skips non-matching types", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const t1 = new TText("x");
    const r2 = new TRun();
    p.appendChild(r1);
    p.appendChild(t1);
    p.appendChild(r2);
    expect(r1.nextSiblingOfType(TRun)).toBe(r2);
  });

  it("previousSiblingOfType skips non-matching types", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const t1 = new TText("x");
    const r2 = new TRun();
    p.appendChild(r1);
    p.appendChild(t1);
    p.appendChild(r2);
    expect(r2.previousSiblingOfType(TRun)).toBe(r1);
  });

  it("nextSibling/previousSibling return undefined with no parent", () => {
    const r = new TRun();
    expect(r.nextSibling()).toBeUndefined();
    expect(r.previousSibling()).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// firstChildElement / lastChildElement / hasChildren
// ---------------------------------------------------------------------------

describe("firstChildElement / lastChildElement / hasChildren", () => {
  it("firstChildElement returns first child", () => {
    const { p1, r1 } = makeTree();
    expect(p1.firstChildElement).toBe(r1);
  });

  it("lastChildElement returns last child", () => {
    const { p1, r2 } = makeTree();
    expect(p1.lastChildElement).toBe(r2);
  });

  it("hasChildren is true when children present", () => {
    const { p1 } = makeTree();
    expect(p1.hasChildren).toBe(true);
  });

  it("hasChildren is false when no children", () => {
    const p = new TParagraph();
    expect(p.hasChildren).toBe(false);
  });

  it("leaf element hasChildren is always false", () => {
    const t = new TText("x");
    expect(t.hasChildren).toBe(false);
  });

  it("leaf element firstChildElement is undefined", () => {
    const t = new TText("x");
    expect(t.firstChildElement).toBeUndefined();
    expect(t.lastChildElement).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getFirstChild()
// ---------------------------------------------------------------------------

describe("getFirstChild()", () => {
  it("returns first child of matching type", () => {
    const { p1, r1 } = makeTree();
    expect(p1.getFirstChild(TRun)).toBe(r1);
  });

  it("returns undefined when no match", () => {
    const { p1 } = makeTree();
    expect(p1.getFirstChild(TText)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// prependChild()
// ---------------------------------------------------------------------------

describe("prependChild()", () => {
  it("inserts at the front", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    p.appendChild(r1);
    p.prependChild(r2);
    expect(p.children.toArray()).toEqual([r2, r1]);
    expect(r2.parent).toBe(p);
  });

  it("prepend on empty composite appends", () => {
    const p = new TParagraph();
    const r = new TRun();
    p.prependChild(r);
    expect(p.children.count).toBe(1);
    expect(r.parent).toBe(p);
  });
});

// ---------------------------------------------------------------------------
// insertAfter()
// ---------------------------------------------------------------------------

describe("insertAfter()", () => {
  it("inserts after given sibling", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    p.appendChild(r1);
    p.appendChild(r3);
    p.insertAfter(r2, r1);
    expect(p.children.toArray()).toEqual([r1, r2, r3]);
  });

  it("insertAfter last element appends to end", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    p.appendChild(r1);
    p.insertAfter(r2, r1);
    expect(p.children.toArray()).toEqual([r1, r2]);
  });

  it("insertAfter(child, undefined) prepends", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    p.appendChild(r1);
    p.insertAfter(r2, undefined);
    expect(p.children.toArray()).toEqual([r2, r1]);
  });
});

// ---------------------------------------------------------------------------
// insertAt()
// ---------------------------------------------------------------------------

describe("insertAt()", () => {
  it("inserts at given index", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    p.appendChild(r1);
    p.appendChild(r3);
    p.insertAt(r2, 1);
    expect(p.children.toArray()).toEqual([r1, r2, r3]);
  });

  it("insertAt(child, 0) prepends", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    p.appendChild(r1);
    p.insertAt(r2, 0);
    expect(p.children.toArray()).toEqual([r2, r1]);
  });

  it("insertAt out-of-range throws RangeError", () => {
    const p = new TParagraph();
    const r = new TRun();
    expect(() => p.insertAt(r, 5)).toThrow(RangeError);
  });
});

// ---------------------------------------------------------------------------
// removeChild() / removeAllChildren() / removeAllChildrenOfType()
// ---------------------------------------------------------------------------

describe("removeChild()", () => {
  it("removes the child and returns it", () => {
    const { p1, r1 } = makeTree();
    const removed = p1.removeChild(r1);
    expect(removed).toBe(r1);
    expect(r1.parent).toBeUndefined();
    expect(p1.children.toArray()).not.toContain(r1);
  });
});

describe("removeAllChildren()", () => {
  it("clears all children", () => {
    const { p1 } = makeTree();
    p1.removeAllChildren();
    expect(p1.children.count).toBe(0);
    expect(p1.hasChildren).toBe(false);
  });
});

describe("removeAllChildrenOfType()", () => {
  it("removes only children of the specified type", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const t1 = new TText("x");
    const r2 = new TRun();
    p.appendChild(r1);
    p.appendChild(t1);
    p.appendChild(r2);
    p.removeAllChildrenOfType(TRun);
    expect(p.children.toArray()).toEqual([t1]);
  });
});

// ---------------------------------------------------------------------------
// replaceChild()
// ---------------------------------------------------------------------------

describe("replaceChild()", () => {
  it("swaps old with new, returns old", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    p.appendChild(r1);
    p.appendChild(r2);
    const old = p.replaceChild(r3, r1);
    expect(old).toBe(r1);
    expect(r1.parent).toBeUndefined();
    expect(r3.parent).toBe(p);
    expect(p.children.toArray()).toEqual([r3, r2]);
  });
});

// ---------------------------------------------------------------------------
// removeSelf() / insertAfterSelf() / insertBeforeSelf()
// ---------------------------------------------------------------------------

describe("removeSelf()", () => {
  it("removes element from parent", () => {
    const { p1, body } = makeTree();
    p1.removeSelf();
    expect(p1.parent).toBeUndefined();
    expect(body.children.toArray()).not.toContain(p1);
  });

  it("throws when element has no parent", () => {
    const r = new TRun();
    expect(() => r.removeSelf()).toThrow("no parent");
  });
});

describe("insertAfterSelf()", () => {
  it("inserts new sibling after current", () => {
    const { p1, p2, body } = makeTree();
    const p3 = new TParagraph();
    p1.insertAfterSelf(p3);
    expect(body.children.toArray()).toEqual([p1, p3, p2]);
    expect(p3.parent).toBe(body);
  });

  it("throws when no parent", () => {
    const r = new TRun();
    expect(() => r.insertAfterSelf(new TRun())).toThrow("no parent");
  });
});

describe("insertBeforeSelf()", () => {
  it("inserts new sibling before current", () => {
    const { p1, p2, body } = makeTree();
    const p0 = new TParagraph();
    p2.insertBeforeSelf(p0);
    expect(body.children.toArray()).toEqual([p1, p0, p2]);
    expect(p0.parent).toBe(body);
  });

  it("throws when no parent", () => {
    const r = new TRun();
    expect(() => r.insertBeforeSelf(new TRun())).toThrow("no parent");
  });
});

// ---------------------------------------------------------------------------
// append()
// ---------------------------------------------------------------------------

describe("append()", () => {
  it("appends multiple children at once", () => {
    const p = new TParagraph();
    const r1 = new TRun();
    const r2 = new TRun();
    const r3 = new TRun();
    p.append(r1, r2, r3);
    expect(p.children.toArray()).toEqual([r1, r2, r3]);
    expect(r1.parent).toBe(p);
    expect(r3.parent).toBe(p);
  });
});

// ---------------------------------------------------------------------------
// innerText
// ---------------------------------------------------------------------------

describe("innerText", () => {
  it("leaf innerText returns text", () => {
    const t = new TText("hello");
    expect(t.innerText).toBe("hello");
  });

  it("leaf innerText returns empty string when text is undefined", () => {
    const t = new TText();
    expect(t.innerText).toBe("");
  });

  it("composite innerText concatenates children recursively", () => {
    const { p1 } = makeTree();
    expect(p1.innerText).toBe("hello world");
  });

  it("composite innerText is empty for element with no text leaves", () => {
    const { p2 } = makeTree();
    expect(p2.innerText).toBe("");
  });
});

// ---------------------------------------------------------------------------
// outerXml
// ---------------------------------------------------------------------------

describe("outerXml", () => {
  it("leaf outerXml serializes correctly", () => {
    const t = new TText("hi");
    expect(t.outerXml).toBe("<w:t>hi</w:t>");
  });

  it("empty composite outerXml is self-closing", () => {
    const p = new TParagraph();
    expect(p.outerXml).toBe("<w:p/>");
  });

  it("composite outerXml includes children", () => {
    const p = new TParagraph();
    const r = new TRun();
    const t = new TText("x");
    r.appendChild(t);
    p.appendChild(r);
    expect(p.outerXml).toBe("<w:p><w:r><w:t>x</w:t></w:r></w:p>");
  });
});

// ---------------------------------------------------------------------------
// cloneNode()
// ---------------------------------------------------------------------------

describe("cloneNode()", () => {
  it("deep=false clones leaf without parent", () => {
    const t = new TText("hi");
    const clone = t.cloneNode(false);
    expect(clone).not.toBe(t);
    expect(clone.text).toBe("hi");
    expect(clone.parent).toBeUndefined();
    expect(clone).toBeInstanceOf(TText);
  });

  it("deep clone copies children recursively", () => {
    const { p1 } = makeTree();
    const clone = p1.cloneNode(true) as TParagraph;
    expect(clone).not.toBe(p1);
    expect(clone.children.count).toBe(p1.children.count);
    expect(clone.parent).toBeUndefined();
    // Children are clones, not same references
    expect(clone.children.at(0)).not.toBe(p1.children.at(0));
    // But innerText should match
    expect(clone.innerText).toBe(p1.innerText);
  });

  it("shallow clone has no children", () => {
    const { p1 } = makeTree();
    const clone = p1.cloneNode(false);
    expect((clone as TParagraph).children.count).toBe(0);
  });

  it("cloneNode on OpenXmlUnknownElement preserves metadata", () => {
    const u = new OpenXmlUnknownElement("mc", "Fallback", "urn:mc");
    u.text = "raw";
    const r = new TRun();
    u.appendChild(r);
    const clone = u.cloneNode(true) as OpenXmlUnknownElement;
    expect(clone.prefix).toBe("mc");
    expect(clone.localName).toBe("Fallback");
    expect(clone.namespaceUri).toBe("urn:mc");
    expect(clone.text).toBe("raw");
    expect(clone.children.count).toBe(1);
  });

  it("cloneNode copies extendedAttributes", () => {
    const r = new TRun();
    r.extendedAttributes.set("mc:Ignorable", "w14");
    const clone = r.cloneNode(false) as TRun;
    expect(clone.extendedAttributes.get("mc:Ignorable")).toBe("w14");
  });
});

// ---------------------------------------------------------------------------
// isBefore() / isAfter()
// ---------------------------------------------------------------------------

describe("isBefore() / isAfter()", () => {
  it("isBefore: sibling earlier in parent", () => {
    const { r1, r2 } = makeTree();
    expect(r1.isBefore(r2)).toBe(true);
    expect(r2.isBefore(r1)).toBe(false);
  });

  it("isAfter: sibling later in parent", () => {
    const { r1, r2 } = makeTree();
    expect(r2.isAfter(r1)).toBe(true);
    expect(r1.isAfter(r2)).toBe(false);
  });

  it("isBefore: ancestor is before descendant", () => {
    const { p1, t1 } = makeTree();
    expect(p1.isBefore(t1)).toBe(true);
    expect(t1.isAfter(p1)).toBe(true);
  });

  it("isBefore: cross-branch ordering", () => {
    const { r1, p2 } = makeTree();
    // r1 is under p1, p2 is second child of body → p1/r1 is before p2
    expect(r1.isBefore(p2)).toBe(true);
    expect(p2.isAfter(r1)).toBe(true);
  });

  it("isBefore returns false for same element", () => {
    const { r1 } = makeTree();
    expect(r1.isBefore(r1)).toBe(false);
    expect(r1.isAfter(r1)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// elementsBefore() / elementsAfter()
// ---------------------------------------------------------------------------

describe("elementsBefore() / elementsAfter()", () => {
  it("elementsBefore yields all preceding siblings", () => {
    const { r1, r2, p1 } = makeTree();
    const r3 = new TRun();
    p1.appendChild(r3);
    expect([...r3.elementsBefore()]).toEqual([r1, r2]);
  });

  it("elementsBefore yields empty for first child", () => {
    const { r1 } = makeTree();
    expect([...r1.elementsBefore()]).toEqual([]);
  });

  it("elementsAfter yields all following siblings", () => {
    const { r1, r2 } = makeTree();
    expect([...r1.elementsAfter()]).toEqual([r2]);
  });

  it("elementsAfter yields empty for last child", () => {
    const { r2 } = makeTree();
    expect([...r2.elementsAfter()]).toEqual([]);
  });

  it("elementsBefore/After yield empty when no parent", () => {
    const r = new TRun();
    expect([...r.elementsBefore()]).toEqual([]);
    expect([...r.elementsAfter()]).toEqual([]);
  });
});
