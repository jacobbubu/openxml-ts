/**
 * Epic-98: 序列化 namespace 声明完整性测试。
 *
 * 验证 serialize() 在 root element 上为子树中所有用到的 namespace prefix 补全
 * `xmlns:<prefix>` 声明，输出为严格合法的 XML（任何标准 XML 解析器均可解析）。
 */

import { describe, expect, it } from "vitest";
import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  OpenXmlLeafElement,
  serialize,
} from "../../src/index.js";

// ── Namespace URI 常量 ───────────────────────────────────────────────────────

const W_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const P_NS = "http://schemas.openxmlformats.org/presentationml/2006/main";
const A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";
const XDR_NS = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing";
const X_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

// ── 最小化测试用元素类 ────────────────────────────────────────────────────────

class WDocument extends OpenXmlCompositeElement {
  override readonly localName = "document" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children = new OpenXmlElementList(this);
}

class WBody extends OpenXmlCompositeElement {
  override readonly localName = "body" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;
  override readonly children = new OpenXmlElementList(this);
}

class WFooterRef extends OpenXmlLeafElement {
  override readonly localName = "footerReference" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = W_NS;

  /** r:id attribute (cross-namespace) */
  rId: string | undefined;

  protected override collectAttributes(): Array<[string, string]> {
    const out = super.collectAttributes();
    if (this.rId !== undefined) out.push(["r:id", this.rId]);
    return out;
  }
}

class PNotes extends OpenXmlCompositeElement {
  override readonly localName = "notes" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = P_NS;
  override readonly children = new OpenXmlElementList(this);
}

class PBody extends OpenXmlCompositeElement {
  override readonly localName = "cSld" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = P_NS;
  override readonly children = new OpenXmlElementList(this);
}

class ASpTree extends OpenXmlCompositeElement {
  override readonly localName = "spTree" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = A_NS;
  override readonly children = new OpenXmlElementList(this);
}

class XdrOneCellAnchor extends OpenXmlCompositeElement {
  override readonly localName = "oneCellAnchor" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = XDR_NS;
  override readonly children = new OpenXmlElementList(this);
}

class XdrWsDr extends OpenXmlCompositeElement {
  override readonly localName = "wsDr" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = XDR_NS;
  override readonly children = new OpenXmlElementList(this);
}

class ABlipFill extends OpenXmlLeafElement {
  override readonly localName = "blipFill" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = A_NS;

  /** r:embed attribute (cross-namespace) */
  embed: string | undefined;

  protected override collectAttributes(): Array<[string, string]> {
    const out = super.collectAttributes();
    if (this.embed !== undefined) out.push(["r:embed", this.embed]);
    return out;
  }
}

class XSheet extends OpenXmlLeafElement {
  override readonly localName = "sheet" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = X_NS;

  rId: string | undefined;
  name: string | undefined;

  protected override collectAttributes(): Array<[string, string]> {
    const out = super.collectAttributes();
    if (this.name !== undefined) out.push(["x:name", this.name]);
    if (this.rId !== undefined) out.push(["r:id", this.rId]);
    return out;
  }
}

class XWorkbook extends OpenXmlCompositeElement {
  override readonly localName = "workbook" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = X_NS;
  override readonly children = new OpenXmlElementList(this);
}

// ── 辅助函数 ─────────────────────────────────────────────────────────────────

/**
 * 从序列化输出的根元素标签中提取所有 xmlns 声明。
 * 返回 Map<prefix, uri>（prefix="" 代表默认命名空间）。
 */
function extractXmlnsDeclarations(xml: string): Map<string, string> {
  const result = new Map<string, string>();
  // 仅检查 root 开标签（到第一个 > 或 /> 为止）
  const end = xml.indexOf(">");
  const rootTag = xml.slice(0, end + 1);
  const re = /xmlns(?::([a-zA-Z0-9_.-]+))?="([^"]*)"/g;
  for (let m = re.exec(rootTag); m !== null; m = re.exec(rootTag)) {
    result.set(m[1] ?? "", m[2] ?? "");
  }
  return result;
}

/**
 * 验证 xml 字符串是否为严格有效 XML：提取 root 标签内所有 xmlns 声明，
 * 然后扫描整个文档中所有带前缀的元素名和属性名，确保每个前缀均已声明。
 */
function findUndeclaredPrefixes(xml: string): string[] {
  // 提取 root 的 xmlns 声明
  const declared = new Set<string>();
  const re = /xmlns(?::([a-zA-Z0-9_.-]+))?="([^"]*)"/g;
  for (let m = re.exec(xml); m !== null; m = re.exec(xml)) {
    declared.add(m[1] ?? "");
  }
  declared.add("xml"); // xml: prefix is always reserved

  // 扫描所有使用的前缀（元素和属性）
  const usageRe = /[<\s]([a-zA-Z_][a-zA-Z0-9_.-]*):(?!\/\/)/g;
  const undeclared = new Set<string>();
  for (let m = usageRe.exec(xml); m !== null; m = usageRe.exec(xml)) {
    const prefix = m[1] ?? "";
    if (prefix === "xmlns") continue; // xmlns 本身是保留词
    if (!declared.has(prefix)) {
      undeclared.add(prefix);
    }
  }
  return [...undeclared];
}

// ── テスト ───────────────────────────────────────────────────────────────────

describe("Epic-98: serialize() namespace declaration completeness", () => {
  it("1. 单命名空间文档：root xmlns 声明存在", () => {
    const doc = new WDocument();
    const xml = serialize(doc, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("w")).toBe(W_NS);
  });

  it("2. 带 r:id 属性的 footerReference：root 声明 xmlns:r", () => {
    const doc = new WDocument();
    const body = new WBody();
    const ref = new WFooterRef();
    ref.rId = "rId2";
    body.appendChild(ref);
    doc.appendChild(body);

    const xml = serialize(doc, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("w")).toBe(W_NS);
    expect(decls.get("r")).toBe(R_NS);
    // 不应有未声明的前缀
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("3. PresentationML notes slide：root 声明 xmlns:p（且无 a prefix 时不多余声明）", () => {
    const notes = new PNotes();
    const body = new PBody();
    notes.appendChild(body);

    const xml = serialize(notes, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("p")).toBe(P_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("4. PresentationML notes slide 含 DrawingML 子元素：声明 p 和 a", () => {
    const notes = new PNotes();
    const spTree = new ASpTree();
    notes.appendChild(spTree);

    const xml = serialize(notes, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("p")).toBe(P_NS);
    expect(decls.get("a")).toBe(A_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("5. SpreadsheetDrawing wsDr 含 xdr 子元素：声明 xdr", () => {
    const wsDr = new XdrWsDr();
    const anchor = new XdrOneCellAnchor();
    wsDr.appendChild(anchor);

    const xml = serialize(wsDr, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("xdr")).toBe(XDR_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("6. xdr wsDr 含 a 子元素（r:embed 属性）：声明 xdr、a、r", () => {
    const wsDr = new XdrWsDr();
    const blip = new ABlipFill();
    blip.embed = "rId1";
    wsDr.appendChild(blip);

    const xml = serialize(wsDr, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("xdr")).toBe(XDR_NS);
    expect(decls.get("a")).toBe(A_NS);
    expect(decls.get("r")).toBe(R_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("7. 已有 xmlns 声明不被重复添加", () => {
    const doc = new WDocument();
    // 预先把 xmlns:w 写进 extendedAttributes（模拟 deserialize 后再 serialize 的场景）
    doc.extendedAttributes.set("xmlns:w", W_NS);

    const xml = serialize(doc, { withDeclaration: false });
    // 计算 xmlns:w 出现次数——应仅出现一次
    const matches = xml.match(/xmlns:w=/g);
    expect(matches?.length).toBe(1);
  });

  it("8. Workbook 含 sheet（r:id 属性）：声明 x 和 r", () => {
    const wb = new XWorkbook();
    const sheet = new XSheet();
    sheet.name = "Sheet1";
    sheet.rId = "rId1";
    wb.appendChild(sheet);

    const xml = serialize(wb, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("x")).toBe(X_NS);
    expect(decls.get("r")).toBe(R_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("9. 多层嵌套：深层元素的 prefix 也被声明", () => {
    // WDocument > WBody > XdrWsDr > ABlipFill(r:embed)
    const doc = new WDocument();
    const body = new WBody();
    const wsDr = new XdrWsDr();
    const blip = new ABlipFill();
    blip.embed = "rId3";
    wsDr.appendChild(blip);
    body.appendChild(wsDr);
    doc.appendChild(body);

    const xml = serialize(doc, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("w")).toBe(W_NS);
    expect(decls.get("xdr")).toBe(XDR_NS);
    expect(decls.get("a")).toBe(A_NS);
    expect(decls.get("r")).toBe(R_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("10. extendedAttributes 中带 prefix 的属性（如 mc:Ignorable）也被声明", () => {
    const MC_NS = "http://schemas.openxmlformats.org/markup-compatibility/2006";
    const doc = new WDocument();
    doc.extendedAttributes.set("mc:Ignorable", "w14 w15");

    const xml = serialize(doc, { withDeclaration: false });
    const decls = extractXmlnsDeclarations(xml);
    expect(decls.get("mc")).toBe(MC_NS);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("11. XML 声明默认输出", () => {
    const doc = new WDocument();
    const xml = serialize(doc);
    expect(xml).toMatch(/^<\?xml version="1\.0"/);
    expect(findUndeclaredPrefixes(xml)).toEqual([]);
  });

  it("12. 空 root 无前缀：不添加多余 xmlns", () => {
    // 纯无前缀元素（prefix=""）不应触发任何 xmlns 声明
    class NoPrefix extends OpenXmlLeafElement {
      override readonly localName = "root" as const;
      override readonly prefix = "" as const;
      override readonly namespaceUri = "" as const;
    }
    const el = new NoPrefix();
    const xml = serialize(el, { withDeclaration: false });
    expect(xml).toBe("<root/>");
  });
});
