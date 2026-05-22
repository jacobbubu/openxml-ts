import { describe, expect, it } from "vitest";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  OpenXmlUnknownElement,
  deserialize,
  serialize,
} from "../../src/index.js";

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

/** 测试用具体类。 */
class WText extends OpenXmlLeafElement {
  override readonly localName = "t" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
}

class WRun extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

class WParagraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);
}

function freshRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  r.register(W_NS, "p", WParagraph);
  r.register(W_NS, "r", WRun);
  r.register(W_NS, "t", WText);
  return r;
}

describe("serialize / deserialize · 正向", () => {
  it("空注册表 → 全部退化为 OpenXmlUnknownElement", () => {
    const xml = `<w:p xmlns:w="${W_NS}"><w:r><w:t>hi</w:t></w:r></w:p>`;
    const root = deserialize(xml, { registry: new ElementRegistry() });
    expect(root).toBeInstanceOf(OpenXmlUnknownElement);
    expect(root.localName).toBe("p");
    expect(root.namespaceUri).toBe(W_NS);
    expect(root.qualifiedName).toBe("w:p");
  });

  it("已注册 typed 类被实例化", () => {
    const xml = `<w:p xmlns:w="${W_NS}"><w:r><w:t>hi</w:t></w:r></w:p>`;
    const root = deserialize(xml, { registry: freshRegistry() });
    expect(root).toBeInstanceOf(WParagraph);
    const r = (root as WParagraph).firstChild();
    expect(r).toBeInstanceOf(WRun);
    const t = (r as WRun).firstChild();
    expect(t).toBeInstanceOf(WText);
    expect((t as WText).text).toBe("hi");
  });

  it("反序列化保留 xmlns 与 typed 属性到 extendedAttributes", () => {
    const xml = `<w:p xmlns:w="${W_NS}" w:rsidR="00AB12CD"/>`;
    const root = deserialize(xml, { registry: freshRegistry() }) as WParagraph;
    expect(root.extendedAttributes.get("xmlns:w")).toBe(W_NS);
    expect(root.extendedAttributes.get("w:rsidR")).toBe("00AB12CD");
  });

  it("namespace 继承：子元素无 xmlns 也能解析", () => {
    const xml = `<w:p xmlns:w="${W_NS}"><w:r/></w:p>`;
    const root = deserialize(xml, { registry: freshRegistry() }) as WParagraph;
    const r = root.firstChild();
    expect(r).toBeInstanceOf(WRun);
    expect(r?.namespaceUri).toBe(W_NS);
  });
});

describe("serialize / deserialize · round-trip", () => {
  it("典型 word fragment 双向字节稳定", () => {
    const original = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:p xmlns:w="${W_NS}"><w:r><w:t>Hello</w:t></w:r></w:p>`;
    const tree = deserialize(original, { registry: freshRegistry() });
    expect(serialize(tree)).toBe(original);
  });

  it("空根元素", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:p xmlns:w="${W_NS}"/>`;
    const tree = deserialize(xml, { registry: freshRegistry() });
    expect(serialize(tree)).toBe(xml);
  });

  it("属性顺序保留（插入序）", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:p xmlns:w="${W_NS}" w:rsidR="00AB12CD" w:rsidRDefault="00112233"/>`;
    const tree = deserialize(xml, { registry: freshRegistry() });
    expect(serialize(tree)).toBe(xml);
  });

  it("未知元素透传字节级", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><pkg:foo xmlns:pkg="urn:test" pkg:attr="x"><pkg:bar>inner</pkg:bar></pkg:foo>`;
    const tree = deserialize(xml, { registry: new ElementRegistry() });
    expect(serialize(tree)).toBe(xml);
  });

  it("typed leaf 文本保留 + 实体转义", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:t xmlns:w="${W_NS}">A &amp; B &lt; C</w:t>`;
    const tree = deserialize(xml, { registry: freshRegistry() }) as WText;
    expect(tree.text).toBe("A & B < C");
    expect(serialize(tree)).toBe(xml);
  });

  it("混合 namespace：default + prefixed 并存", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Root xmlns="urn:default" xmlns:w="${W_NS}"><w:p/></Root>`;
    const tree = deserialize(xml, { registry: freshRegistry() });
    expect(tree).toBeInstanceOf(OpenXmlUnknownElement); // Root 未注册
    const p = (tree as OpenXmlUnknownElement).firstChild();
    expect(p).toBeInstanceOf(WParagraph); // w:p 已注册
    expect(serialize(tree)).toBe(xml);
  });
});

describe("OpenXmlElement.applyAttribute · 默认实现", () => {
  it("默认把 qname → value 收入 extendedAttributes", () => {
    const p = new WParagraph();
    p.applyAttribute("w:rsidR", "00AB12CD");
    expect(p.extendedAttributes.get("w:rsidR")).toBe("00AB12CD");
  });

  it("子类可重写 applyAttribute 拦截 typed 属性（模拟 codegen）", () => {
    class TypedP extends WParagraph {
      rsidR?: string;
      override applyAttribute(qname: string, value: string): void {
        if (qname === "w:rsidR") {
          this.rsidR = value;
          return;
        }
        super.applyAttribute(qname, value);
      }
    }
    const registry = new ElementRegistry();
    registry.register(W_NS, "p", TypedP);
    const xml = `<w:p xmlns:w="${W_NS}" w:rsidR="00AB12CD" w:other="x"/>`;
    const root = deserialize(xml, { registry }) as TypedP;
    expect(root.rsidR).toBe("00AB12CD");
    expect(root.extendedAttributes.has("w:rsidR")).toBe(false);
    expect(root.extendedAttributes.get("w:other")).toBe("x");
  });
});

describe("ElementRegistry", () => {
  it("register / lookup / has / clear / size", () => {
    const r = new ElementRegistry();
    expect(r.size).toBe(0);
    r.register(W_NS, "p", WParagraph);
    expect(r.size).toBe(1);
    expect(r.has(W_NS, "p")).toBe(true);
    expect(r.lookup(W_NS, "p")).toBe(WParagraph);
    expect(r.lookup(W_NS, "missing")).toBeUndefined();
    expect(r.lookup("other", "p")).toBeUndefined();
    r.clear();
    expect(r.size).toBe(0);
  });

  it("重复 register 后者覆盖前者", () => {
    const r = new ElementRegistry();
    r.register(W_NS, "p", WParagraph);
    r.register(W_NS, "p", WRun);
    expect(r.lookup(W_NS, "p")).toBe(WRun);
  });
});

describe("deserialize · 负向", () => {
  it("空字符串抛 BACKEND_ERROR", () => {
    expect(() => deserialize("")).toThrowError(expect.objectContaining({ code: "BACKEND_ERROR" }));
  });

  it("仅声明无根元素抛 BACKEND_ERROR", () => {
    expect(() => deserialize('<?xml version="1.0"?>')).toThrowError(
      expect.objectContaining({ code: "BACKEND_ERROR" }),
    );
  });

  it("DTD 攻击被 tokenizer 拦截", () => {
    expect(() =>
      deserialize(`<!DOCTYPE foo SYSTEM "evil.dtd"><w:p xmlns:w="${W_NS}"/>`),
    ).toThrowError(expect.objectContaining({ code: "SECURITY_VIOLATION" }));
  });
});

describe("Composite 默认 writeTo · 无 children 写自闭合", () => {
  it("空 Paragraph 序列化为自闭合", () => {
    const p = new WParagraph();
    p.applyAttribute("xmlns:w", W_NS);
    expect(serialize(p, { withDeclaration: false })).toBe(`<w:p xmlns:w="${W_NS}"/>`);
  });

  // Epic-98：序列化器现在把子树用到的命名空间前缀声明到根元素——
  // 单独序列化一个带前缀的 leaf 也会补 xmlns:w，使其成为合法的独立 XML。
  const WT_NS = ' xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

  it("Leaf 无 text 时也是自闭合", () => {
    const t = new WText();
    expect(serialize(t, { withDeclaration: false })).toBe(`<w:t${WT_NS}/>`);
  });

  it("Leaf 空字符串 text 序列化为展开形式", () => {
    const t = new WText();
    t.text = "";
    // 空串经 XmlWriter.text() 后是空，open/close 包裹
    expect(serialize(t, { withDeclaration: false })).toBe(`<w:t${WT_NS}></w:t>`);
  });
});

describe("Programmatic 树构造 → 序列化", () => {
  it("手工搭出 paragraph 树并 emit", () => {
    const p = new WParagraph();
    p.applyAttribute("xmlns:w", W_NS);
    const r = new WRun();
    const t = new WText();
    t.text = "Built in code";
    r.appendChild(t);
    p.appendChild(r);
    const out = serialize(p, { withDeclaration: false });
    expect(out).toBe(`<w:p xmlns:w="${W_NS}"><w:r><w:t>Built in code</w:t></w:r></w:p>`);
  });
});

describe("Round-trip · OpenXmlElement subclass identity preserved", () => {
  it("解析后的对象可用 instanceof 校验类型", () => {
    const xml = `<w:p xmlns:w="${W_NS}"><w:r><w:t>x</w:t></w:r></w:p>`;
    const root = deserialize(xml, { registry: freshRegistry() });
    expect(root).toBeInstanceOf(WParagraph);
    expect((root as OpenXmlElement).parent).toBeUndefined();
  });
});
