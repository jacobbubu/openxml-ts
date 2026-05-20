/**
 * Epic-72：ExtendedFilePropertiesPart / CustomFilePropertiesPart 单元 + 集成测试。
 */

import { describe, expect, it } from "vitest";
import { CustomDocumentProperty } from "../../src/custom-properties/generated/custom-document-property.js";
import { Int32Value, StringValue } from "../../src/element/index.js";
import { OpenXmlUnknownElement } from "../../src/element/unknown-element.js";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import {
  CustomFilePropertiesPart,
  ExtendedFilePropertiesPart,
  PresentationDocument,
} from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

describe("ExtendedFilePropertiesPart 基本属性（Epic-72）", () => {
  it("relationshipType 和 contentType 正确", () => {
    expect(ExtendedFilePropertiesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
    );
    expect(ExtendedFilePropertiesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.extended-properties+xml",
    );
  });

  it("新建 Part 时 properties 根元素为 ap:Properties", () => {
    const doc = WordprocessingDocument.create();
    const part = doc.extendedFileProperties;
    const props = part.properties;
    expect(props.localName).toBe("Properties");
    expect(props.namespaceUri).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    );
  });
});

describe("CustomFilePropertiesPart 基本属性（Epic-72）", () => {
  it("relationshipType 和 contentType 正确", () => {
    expect(CustomFilePropertiesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
    );
    expect(CustomFilePropertiesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.custom-properties+xml",
    );
  });

  it("新建 Part 时 properties 根元素为 op:Properties", () => {
    const doc = WordprocessingDocument.create();
    const part = doc.customFileProperties;
    const props = part.properties;
    expect(props.localName).toBe("Properties");
    expect(props.namespaceUri).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
    );
  });
});

describe("WordprocessingDocument 扩展属性（Epic-72）", () => {
  it("懒 bootstrap：首次访问 extendedFileProperties 创建 Part", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.package.hasPart("/docProps/app.xml" as never)).toBe(false);
    doc.extendedFileProperties; // 触发懒 bootstrap
    expect(doc.package.hasPart("/docProps/app.xml" as never)).toBe(true);
  });

  it("懒 bootstrap：首次访问 customFileProperties 创建 Part", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.package.hasPart("/docProps/custom.xml" as never)).toBe(false);
    doc.customFileProperties; // 触发懒 bootstrap
    expect(doc.package.hasPart("/docProps/custom.xml" as never)).toBe(true);
  });

  it("extendedFileProperties 可追加子元素并 round-trip 保持", async () => {
    const doc = WordprocessingDocument.create();
    const props = doc.extendedFileProperties.properties;

    // 追加 <ap:Application> 子元素
    const appEl = new OpenXmlUnknownElement(
      "ap",
      "Application",
      "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    );
    appEl.text = "openxml-ts/test";
    props.appendChild(appEl);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);

    const root = reopened.extendedFileProperties.properties;
    let found = false;
    for (const child of root.children) {
      if (child.localName === "Application") {
        expect((child as { text?: string }).text).toBe("openxml-ts/test");
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });

  it("customFileProperties round-trip", async () => {
    const doc = WordprocessingDocument.create();
    // 向 custom properties 根追加一个 CustomDocumentProperty 子元素
    const propEl = new CustomDocumentProperty();
    propEl.formatId = StringValue.parse("{D5CDD505-2E9C-101B-9397-08002B2CF9AE}");
    propEl.propertyId = Int32Value.parse("2");
    propEl.name = StringValue.parse("TestProp");
    const vtStr = new OpenXmlUnknownElement(
      "vt",
      "lpwstr",
      "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    );
    vtStr.text = "hello";
    propEl.appendChild(vtStr);
    doc.customFileProperties.properties.appendChild(propEl);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);

    const root = reopened.customFileProperties.properties;
    let found = false;
    for (const child of root.children) {
      if (child instanceof CustomDocumentProperty) {
        expect(child.name?.toString()).toBe("TestProp");
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });
});

describe("SpreadsheetDocument 扩展属性（Epic-72）", () => {
  it("Excel extendedFileProperties round-trip", async () => {
    const doc = SpreadsheetDocument.create();
    const companyEl = new OpenXmlUnknownElement(
      "ap",
      "Company",
      "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    );
    companyEl.text = "Acme Corp";
    doc.extendedFileProperties.properties.appendChild(companyEl);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);

    let company: string | undefined;
    for (const child of reopened.extendedFileProperties.properties.children) {
      if (child.localName === "Company") {
        company = (child as { text?: string }).text;
        break;
      }
    }
    expect(company).toBe("Acme Corp");
  });
});

describe("PresentationDocument 扩展属性（Epic-72）", () => {
  it("PPT extendedFileProperties round-trip", async () => {
    const doc = PresentationDocument.create();
    const presFormatEl = new OpenXmlUnknownElement(
      "ap",
      "PresentationFormat",
      "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    );
    presFormatEl.text = "Widescreen";
    doc.extendedFileProperties.properties.appendChild(presFormatEl);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);

    let format: string | undefined;
    for (const child of reopened.extendedFileProperties.properties.children) {
      if (child.localName === "PresentationFormat") {
        format = (child as { text?: string }).text;
        break;
      }
    }
    expect(format).toBe("Widescreen");
  });
});
