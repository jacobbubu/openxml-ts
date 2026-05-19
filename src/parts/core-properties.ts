/**
 * `CoreProperties` —— `<cp:coreProperties>` 的便捷访问类（Epic-29）。
 *
 * 给 Word/Excel/PPT 三族 facade 共用——\`doc.coreProperties.title = "Q4 Report"\`
 * 一行设标题。包装 \`CorePropertiesPart.coreProperties\` 根元素，按 schema
 * 子元素名 / namespace 寻址，所有 setter 走「存在则替换 text，缺则新建 child」。
 *
 * 命名空间分布：
 *
 * - **dc**（Dublin Core）: title / subject / creator / description / language
 * - **cp**（OPC core）: keywords / lastModifiedBy / revision / category / contentStatus
 * - **dcterms**（DC Terms）: created / modified （\`<dcterms:created xsi:type="dcterms:W3CDTF">\`）
 *
 * created / modified 走 Date 自动 ISO 字符串；其余都是 string。getter 拿不到返 undefined。
 */

import {
  OpenXmlCompositeElement,
  type OpenXmlElement,
  OpenXmlUnknownElement,
} from "../element/index.js";

const CP_NS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
const DC_NS = "http://purl.org/dc/elements/1.1/";
const DCTERMS_NS = "http://purl.org/dc/terms/";

const DC_PROPS = ["title", "subject", "creator", "description", "language"] as const;
const CP_PROPS = ["keywords", "lastModifiedBy", "revision", "category", "contentStatus"] as const;

type DcProp = (typeof DC_PROPS)[number];
type CpProp = (typeof CP_PROPS)[number];

export class CoreProperties {
  constructor(private readonly root: OpenXmlElement) {}

  // ─── Dublin Core 属性 ──────────────────────────────────────────────────────

  get title(): string | undefined {
    return this.getText(DC_NS, "title");
  }
  set title(value: string | undefined) {
    this.setText(DC_NS, "dc", "title", value);
  }
  get subject(): string | undefined {
    return this.getText(DC_NS, "subject");
  }
  set subject(value: string | undefined) {
    this.setText(DC_NS, "dc", "subject", value);
  }
  get creator(): string | undefined {
    return this.getText(DC_NS, "creator");
  }
  set creator(value: string | undefined) {
    this.setText(DC_NS, "dc", "creator", value);
  }
  get description(): string | undefined {
    return this.getText(DC_NS, "description");
  }
  set description(value: string | undefined) {
    this.setText(DC_NS, "dc", "description", value);
  }
  get language(): string | undefined {
    return this.getText(DC_NS, "language");
  }
  set language(value: string | undefined) {
    this.setText(DC_NS, "dc", "language", value);
  }

  // ─── OPC core 属性 ─────────────────────────────────────────────────────────

  get keywords(): string | undefined {
    return this.getText(CP_NS, "keywords");
  }
  set keywords(value: string | undefined) {
    this.setText(CP_NS, "cp", "keywords", value);
  }
  get lastModifiedBy(): string | undefined {
    return this.getText(CP_NS, "lastModifiedBy");
  }
  set lastModifiedBy(value: string | undefined) {
    this.setText(CP_NS, "cp", "lastModifiedBy", value);
  }
  get revision(): string | undefined {
    return this.getText(CP_NS, "revision");
  }
  set revision(value: string | undefined) {
    this.setText(CP_NS, "cp", "revision", value);
  }
  get category(): string | undefined {
    return this.getText(CP_NS, "category");
  }
  set category(value: string | undefined) {
    this.setText(CP_NS, "cp", "category", value);
  }
  get contentStatus(): string | undefined {
    return this.getText(CP_NS, "contentStatus");
  }
  set contentStatus(value: string | undefined) {
    this.setText(CP_NS, "cp", "contentStatus", value);
  }

  // ─── dcterms 时间戳——Date 双向 ────────────────────────────────────────────

  get created(): Date | undefined {
    return parseDate(this.getText(DCTERMS_NS, "created"));
  }
  set created(value: Date | string | undefined) {
    this.setW3cdtf(DCTERMS_NS, "dcterms", "created", value);
  }
  get modified(): Date | undefined {
    return parseDate(this.getText(DCTERMS_NS, "modified"));
  }
  set modified(value: Date | string | undefined) {
    this.setW3cdtf(DCTERMS_NS, "dcterms", "modified", value);
  }

  /** 列出所有已设置的属性名 / 值——debug 用。 */
  list(): Record<string, string> {
    const out: Record<string, string> = {};
    for (const p of DC_PROPS) {
      const v = this.getText(DC_NS, p);
      if (v !== undefined) out[p] = v;
    }
    for (const p of CP_PROPS) {
      const v = this.getText(CP_NS, p);
      if (v !== undefined) out[p] = v;
    }
    const c = this.getText(DCTERMS_NS, "created");
    if (c !== undefined) out.created = c;
    const m = this.getText(DCTERMS_NS, "modified");
    if (m !== undefined) out.modified = m;
    return out;
  }

  // ─── 内部 ─────────────────────────────────────────────────────────────────

  private getText(ns: string, localName: string): string | undefined {
    if (!(this.root instanceof OpenXmlCompositeElement)) return undefined;
    for (const child of this.root.children) {
      if (child.namespaceUri === ns && child.localName === localName) {
        const text = (child as { text?: string }).text;
        return typeof text === "string" ? text : undefined;
      }
    }
    return undefined;
  }

  private setText(ns: string, prefix: string, localName: string, value: string | undefined): void {
    if (!(this.root instanceof OpenXmlCompositeElement)) return;
    // 找到现有
    let existing: OpenXmlElement | undefined;
    for (const child of this.root.children) {
      if (child.namespaceUri === ns && child.localName === localName) {
        existing = child;
        break;
      }
    }
    if (value === undefined) {
      if (existing !== undefined) this.root.children.remove(existing);
      return;
    }
    if (existing !== undefined) {
      (existing as { text?: string }).text = value;
    } else {
      const el = new OpenXmlUnknownElement(prefix, localName, ns);
      el.text = value;
      this.root.appendChild(el);
    }
  }

  private setW3cdtf(
    ns: string,
    prefix: string,
    localName: string,
    value: Date | string | undefined,
  ): void {
    if (value === undefined) {
      this.setText(ns, prefix, localName, undefined);
      return;
    }
    if (!(this.root instanceof OpenXmlCompositeElement)) return;
    const iso = value instanceof Date ? value.toISOString() : value;

    // 找到 / 新建 dcterms:created|modified 元素，并保 \`xsi:type="dcterms:W3CDTF"\`
    let existing: OpenXmlElement | undefined;
    for (const child of this.root.children) {
      if (child.namespaceUri === ns && child.localName === localName) {
        existing = child;
        break;
      }
    }
    if (existing !== undefined) {
      (existing as { text?: string }).text = iso;
      existing.extendedAttributes.set("xsi:type", "dcterms:W3CDTF");
    } else {
      const el = new OpenXmlUnknownElement(prefix, localName, ns);
      el.extendedAttributes.set("xsi:type", "dcterms:W3CDTF");
      el.text = iso;
      this.root.appendChild(el);
    }
  }
}

function parseDate(text: string | undefined): Date | undefined {
  if (text === undefined) return undefined;
  const d = new Date(text);
  return Number.isNaN(d.getTime()) ? undefined : d;
}
