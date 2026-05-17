/**
 * Story-5.4 验证：examples/linq-tutorial.ts 里 6 类 .NET LINQ to XML 范式
 * 在 TS 端 1:1 翻译能跑通；结果稳定。
 */

import { describe, expect, it } from "vitest";
import { Enumerable, XDocument, XName, XNamespace } from "../../src/linq/index.js";

const customersXml = `<?xml version="1.0" encoding="UTF-8"?>
<customers>
  <customer id="1" country="CN"><name>张三</name>
    <orders>
      <order amount="120.50" currency="USD"/>
      <order amount="800.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="2" country="US"><name>Alice</name>
    <orders>
      <order amount="50.00" currency="USD"/>
      <order amount="9.99" currency="USD"/>
      <order amount="3000.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="3" country="CN"><name>李四</name>
    <orders>
      <order amount="2500.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="4" country="JP"><name>Hiroshi</name><orders/></customer>
</customers>`;

const wordXml = `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Hello</w:t></w:r></w:p>
    <w:p><w:r><w:t>LINQ</w:t></w:r></w:p>
  </w:body>
</w:document>`;

describe("LINQ tutorial · 6 类范式", () => {
  const doc = XDocument.Parse(customersXml);

  it("Descendants + Select 取所有 customer 名字", () => {
    const names = Enumerable.from(doc.Descendants("customer"))
      .Select((c) => c.Element("name")?.Value)
      .ToArray();
    expect(names).toEqual(["张三", "Alice", "李四", "Hiroshi"]);
  });

  it("Where(attr) + SelectMany + sum 计 CN 总额", () => {
    const total = Enumerable.from(doc.Descendants("customer"))
      .Where((c) => c.Attribute("country")?.Value === "CN")
      .SelectMany((c) => c.Descendants("order"))
      .Select((o) => Number.parseFloat(o.Attribute("amount")?.Value ?? "0"))
      .ToArray()
      .reduce((a, b) => a + b, 0);
    expect(total).toBeCloseTo(3420.5, 2);
  });

  it("OrderByDescending + First 取订单金额最高的客户", () => {
    const top = Enumerable.from(doc.Descendants("customer"))
      .OrderByDescending((c) =>
        Enumerable.from(c.Descendants("order"))
          .Select((o) => Number.parseFloat(o.Attribute("amount")?.Value ?? "0"))
          .ToArray()
          .reduce((a, b) => a + b, 0),
      )
      .First()
      .Element("name")?.Value;
    expect(top).toBe("Alice");
  });

  it("XNamespace + GetName 走 Office XML 命名空间路径", () => {
    const W = XNamespace.Get("http://schemas.openxmlformats.org/wordprocessingml/2006/main");
    const wordDoc = XDocument.Parse(wordXml);
    const paras = Enumerable.from(wordDoc.Descendants(W.GetName("p")))
      .Select((p) => p.Value)
      .ToArray();
    expect(paras).toEqual(["Hello", "LINQ"]);
  });

  it("GroupBy + Count 按 country 分组计数", () => {
    const byCountry = Enumerable.from(doc.Descendants("customer"))
      .GroupBy((c) => c.Attribute("country")?.Value ?? "")
      .Select(([country, group]) => ({ Country: country, Count: group.Count() }))
      .ToArray();
    expect(byCountry).toEqual([
      { Country: "CN", Count: 2 },
      { Country: "US", Count: 1 },
      { Country: "JP", Count: 1 },
    ]);
  });

  it("XName.Equals 名字比对", () => {
    const customer = XName.Get("customer");
    const first = doc.Descendants("customer")[0];
    expect(first?.Name.Equals(customer)).toBe(true);
  });
});
