import { describe, expect, it } from "vitest";
import { type SchemaType, generateElement } from "../../tools/schema-codegen/index.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const OPTS = {
  targetNamespace: WPNS,
  sourcePath: "data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json",
};

describe("element-template · 5 种核心形态", () => {
  it("形态 1：Leaf with attributes", () => {
    const type: SchemaType = {
      Name: "w:CT_Empty/w:cellMerge",
      ClassName: "CellMerge",
      Summary: "Vertically Merged/Split Table Cells.",
      BaseClass: "OpenXmlLeafElement",
      IsLeafElement: true,
      Attributes: [
        {
          QName: "w:author",
          PropertyName: "Author",
          Type: "StringValue",
          PropertyComments: "author",
        },
        {
          QName: "w:date",
          PropertyName: "Date",
          Type: "DateTimeValue",
          PropertyComments: "date",
        },
      ],
    };
    expect(generateElement(type, OPTS)).toMatchInlineSnapshot(`
      "// THIS FILE IS GENERATED. DO NOT EDIT.
      // Source: data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
      // @see DocumentFormat.OpenXml.Wordprocessing.CellMerge

      import {
        DateTimeValue,
        OpenXmlLeafElement,
        StringValue,
      } from "../../element/index.js";

      /** Vertically Merged/Split Table Cells.
       *
       * Element: \`w:cellMerge\` */
      export class CellMerge extends OpenXmlLeafElement {
        override readonly localName = "cellMerge" as const;
        override readonly prefix = "w" as const;
        override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


        /** author (w:author) */
        author: StringValue | undefined;

        /** date (w:date) */
        date: DateTimeValue | undefined;

        override applyAttribute(qname: string, value: string): void {
          switch (qname) {
            case "w:author": this.author = StringValue.parse(value); return;
            case "w:date": this.date = DateTimeValue.parse(value); return;
          }
          super.applyAttribute(qname, value);
        }

        protected override collectAttributes(): Array<[string, string]> {
          const out: Array<[string, string]> = [];
          for (const [k, v] of this.extendedAttributes) out.push([k, v]);
          if (this.author !== undefined) out.push(["w:author", this.author.toString()]);
          if (this.date !== undefined) out.push(["w:date", this.date.toString()]);
          return out;
        }

      }
      "
    `);
  });

  it("形态 2：Composite with HexBinary attributes", () => {
    const type: SchemaType = {
      Name: "w:CT_P/w:p",
      ClassName: "Paragraph",
      Summary: "Defines the Paragraph Class.",
      BaseClass: "OpenXmlCompositeElement",
      Attributes: [
        {
          QName: "w:rsidR",
          PropertyName: "RsidParagraphAddition",
          Type: "HexBinaryValue",
          PropertyComments: "w:rsidR",
        },
        {
          QName: "w:rsidRPr",
          PropertyName: "RsidParagraphMarkRevision",
          Type: "HexBinaryValue",
          PropertyComments: "Revision Identifier for Paragraph Glyph Formatting",
        },
      ],
    };
    expect(generateElement(type, OPTS)).toMatchInlineSnapshot(`
      "// THIS FILE IS GENERATED. DO NOT EDIT.
      // Source: data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
      // @see DocumentFormat.OpenXml.Wordprocessing.Paragraph

      import {
        HexBinaryValue,
        OpenXmlCompositeElement,
        OpenXmlElementList,
      } from "../../element/index.js";

      /** Defines the Paragraph Class.
       *
       * Element: \`w:p\` */
      export class Paragraph extends OpenXmlCompositeElement {
        override readonly localName = "p" as const;
        override readonly prefix = "w" as const;
        override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
        override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

        /** w:rsidR (w:rsidR) */
        rsidParagraphAddition: HexBinaryValue | undefined;

        /** Revision Identifier for Paragraph Glyph Formatting (w:rsidRPr) */
        rsidParagraphMarkRevision: HexBinaryValue | undefined;

        override applyAttribute(qname: string, value: string): void {
          switch (qname) {
            case "w:rsidR": this.rsidParagraphAddition = HexBinaryValue.parse(value); return;
            case "w:rsidRPr": this.rsidParagraphMarkRevision = HexBinaryValue.parse(value); return;
          }
          super.applyAttribute(qname, value);
        }

        protected override collectAttributes(): Array<[string, string]> {
          const out: Array<[string, string]> = [];
          for (const [k, v] of this.extendedAttributes) out.push([k, v]);
          if (this.rsidParagraphAddition !== undefined) out.push(["w:rsidR", this.rsidParagraphAddition.toString()]);
          if (this.rsidParagraphMarkRevision !== undefined) out.push(["w:rsidRPr", this.rsidParagraphMarkRevision.toString()]);
          return out;
        }

      }
      "
    `);
  });

  it("形态 3：抽象基类（元素名为空）", () => {
    const type: SchemaType = {
      Name: "w:CT_TrackChange/",
      ClassName: "TrackChangeType",
      Summary: "Defines the TrackChangeType Class.",
      BaseClass: "OpenXmlLeafElement",
      IsAbstract: true,
      IsLeafElement: true,
      Attributes: [
        {
          QName: "w:author",
          PropertyName: "Author",
          Type: "StringValue",
        },
      ],
    };
    const out = generateElement(type, OPTS);
    expect(out).toContain("export abstract class TrackChangeType extends OpenXmlLeafElement");
    expect(out).toContain('override readonly localName = "" as const;');
    expect(out).toContain('override readonly prefix = "" as const;');
    expect(out).toContain("(abstract)");
  });

  it("形态 4：EnumValue 退化为 StringValue（Story-2.5 再补真 enum）", () => {
    const type: SchemaType = {
      Name: "w:CT_X/w:vMerge",
      ClassName: "VerticalMerge",
      BaseClass: "OpenXmlLeafElement",
      IsLeafElement: true,
      Attributes: [
        {
          QName: "w:val",
          PropertyName: "Val",
          Type: "EnumValue<DocumentFormat.OpenXml.Wordprocessing.VerticalMergeValues>",
        },
      ],
    };
    const out = generateElement(type, OPTS);
    expect(out).toContain("val: StringValue | undefined");
    expect(out).toContain('case "w:val": this.val = StringValue.parse(value); return;');
    expect(out).not.toContain("EnumValue<string>"); // 不再误生成无效 TS
  });

  it("形态 5：无属性的最简 element", () => {
    const type: SchemaType = {
      Name: "w:CT_Empty/w:tab",
      ClassName: "Tab",
      Summary: "Custom Tab Stop.",
      BaseClass: "OpenXmlLeafElement",
      IsLeafElement: true,
    };
    const out = generateElement(type, OPTS);
    expect(out).toContain("export class Tab extends OpenXmlLeafElement");
    expect(out).not.toContain("applyAttribute");
    expect(out).not.toContain("collectAttributes");
  });
});

describe("确定性", () => {
  it("两次跑产物字节一致", () => {
    const type: SchemaType = {
      Name: "w:CT_Empty/w:cellMerge",
      ClassName: "CellMerge",
      BaseClass: "OpenXmlLeafElement",
      IsLeafElement: true,
      Attributes: [
        { QName: "w:author", PropertyName: "Author", Type: "StringValue" },
        { QName: "w:date", PropertyName: "Date", Type: "DateTimeValue" },
      ],
    };
    const a = generateElement(type, OPTS);
    const b = generateElement(type, OPTS);
    expect(a).toBe(b);
  });

  it("属性顺序保留", () => {
    const type: SchemaType = {
      Name: "w:CT_X/w:rPr",
      ClassName: "RunProperties",
      BaseClass: "OpenXmlCompositeElement",
      Attributes: [
        { QName: "w:z", PropertyName: "Z", Type: "StringValue" },
        { QName: "w:a", PropertyName: "A", Type: "StringValue" },
        { QName: "w:m", PropertyName: "M", Type: "StringValue" },
      ],
    };
    const out = generateElement(type, OPTS);
    const zIdx = out.indexOf('"w:z"');
    const aIdx = out.indexOf('"w:a"');
    const mIdx = out.indexOf('"w:m"');
    expect(zIdx).toBeGreaterThan(0);
    expect(zIdx).toBeLessThan(aIdx);
    expect(aIdx).toBeLessThan(mIdx);
  });
});

describe("transforms", () => {
  it("parseSchemaName 正常 + 抽象", async () => {
    const { parseSchemaName } = await import("../../tools/schema-codegen/index.js");
    expect(parseSchemaName("w:CT_X/w:p")).toEqual({
      typePrefix: "w",
      typeName: "CT_X",
      elementPrefix: "w",
      elementName: "p",
      isAbstract: false,
    });
    expect(parseSchemaName("w:CT_TrackChange/").isAbstract).toBe(true);
  });

  it("classNameToFileName: PascalCase → kebab-case", async () => {
    const { classNameToFileName } = await import("../../tools/schema-codegen/index.js");
    expect(classNameToFileName("Paragraph")).toBe("paragraph");
    expect(classNameToFileName("RunProperties")).toBe("run-properties");
    expect(classNameToFileName("TrackChangeType")).toBe("track-change-type");
    expect(classNameToFileName("HTMLBlock")).toBe("html-block");
  });

  it("prefixForUri / uriForPrefix", async () => {
    const { prefixForUri, uriForPrefix } = await import("../../tools/schema-codegen/index.js");
    expect(prefixForUri(WPNS)).toBe("w");
    expect(uriForPrefix("w")).toBe(WPNS);
    expect(prefixForUri("urn:unknown")).toBeUndefined();
  });

  it("mapSchemaType 已知 → 对应类；未知 → StringValue 退化", async () => {
    const { mapSchemaType } = await import("../../tools/schema-codegen/index.js");
    expect(mapSchemaType("StringValue")).toEqual({ expr: "StringValue", imports: ["StringValue"] });
    expect(mapSchemaType("OnOffValue")).toEqual({
      expr: "BooleanValue",
      imports: ["BooleanValue"],
    });
    expect(mapSchemaType("Int64Value")).toEqual({ expr: "Int64Value", imports: ["Int64Value"] });
    expect(mapSchemaType("UnknownTypeXX")).toEqual({
      expr: "StringValue",
      imports: ["StringValue"],
    });
  });
});
