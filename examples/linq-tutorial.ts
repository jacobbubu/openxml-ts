/**
 * 例子：把典型 .NET LINQ to XML 教程代码翻成 TS，几乎不改命名跑通。
 *
 * 跑法：
 *   bun run examples/linq-tutorial.ts
 *
 * 输出对比每一段 .NET 原版与 TS 翻译版的结果，证明 .NET 工程师把代码搬过来
 * 只需把 C# 关键字（var / from-in-where 查询表达式）换成 TS 习惯写法，其余
 * 类名 / 方法名保持原样。
 */

import { Enumerable, XDocument, XName, XNamespace } from "../src/linq/index.js";

const customersXml = `<?xml version="1.0" encoding="UTF-8"?>
<customers>
  <customer id="1" country="CN">
    <name>张三</name>
    <orders>
      <order amount="120.50" currency="USD"/>
      <order amount="800.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="2" country="US">
    <name>Alice</name>
    <orders>
      <order amount="50.00" currency="USD"/>
      <order amount="9.99" currency="USD"/>
      <order amount="3000.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="3" country="CN">
    <name>李四</name>
    <orders>
      <order amount="2500.00" currency="USD"/>
    </orders>
  </customer>
  <customer id="4" country="JP">
    <name>Hiroshi</name>
    <orders/>
  </customer>
</customers>`;

const doc = XDocument.Parse(customersXml);

// ─── 例 1：所有 customer 的姓名 ────────────────────────────────────────────────
//
// .NET:
//   var names = doc.Descendants("customer")
//                  .Select(c => c.Element("name")?.Value);
//
// TS:
{
  const names = Enumerable.from(doc.Descendants("customer"))
    .Select((c) => c.Element("name")?.Value)
    .ToArray();
  console.log("例 1 · 所有 customer 名字：", names);
}

// ─── 例 2：CN 用户的订单总额 ──────────────────────────────────────────────────
//
// .NET:
//   var total = doc.Descendants("customer")
//                  .Where(c => (string)c.Attribute("country") == "CN")
//                  .SelectMany(c => c.Descendants("order"))
//                  .Sum(o => decimal.Parse((string)o.Attribute("amount")!));
//
// TS（.NET 没 Sum 算子时改用 reduce；其余 1:1）:
{
  const total = Enumerable.from(doc.Descendants("customer"))
    .Where((c) => c.Attribute("country")?.Value === "CN")
    .SelectMany((c) => c.Descendants("order"))
    .Select((o) => Number.parseFloat(o.Attribute("amount")?.Value ?? "0"))
    .ToArray()
    .reduce((a, b) => a + b, 0);
  console.log("例 2 · CN 客户订单总额：", total);
}

// ─── 例 3：订单金额最高的客户姓名（OrderByDescending + First） ──────────────
//
// .NET:
//   var top = doc.Descendants("customer")
//                .OrderByDescending(c => c.Descendants("order")
//                                          .Sum(o => decimal.Parse((string)o.Attribute("amount")!)))
//                .First()
//                .Element("name").Value;
{
  const top = Enumerable.from(doc.Descendants("customer"))
    .OrderByDescending((c) =>
      Enumerable.from(c.Descendants("order"))
        .Select((o) => Number.parseFloat(o.Attribute("amount")?.Value ?? "0"))
        .ToArray()
        .reduce((a, b) => a + b, 0),
    )
    .First()
    .Element("name")?.Value;
  console.log("例 3 · 订单金额最高的客户：", top);
}

// ─── 例 4：用 XNamespace + 子 entry 处理带命名空间的 Office XML ───────────────
//
// .NET:
//   XNamespace w = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
//   var paras = wordDoc.Descendants(w + "p");
{
  const wordXml = `<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Hello</w:t></w:r></w:p>
    <w:p><w:r><w:t>LINQ</w:t></w:r></w:p>
  </w:body>
</w:document>`;
  const wordDoc = XDocument.Parse(wordXml);
  const W = XNamespace.Get("http://schemas.openxmlformats.org/wordprocessingml/2006/main");
  const paras = Enumerable.from(wordDoc.Descendants(W.GetName("p")))
    .Select((p) => p.Value)
    .ToArray();
  console.log("例 4 · word 段落文字：", paras);
}

// ─── 例 5：GroupBy + 计数（按 country 分组） ──────────────────────────────────
//
// .NET:
//   var byCountry = doc.Descendants("customer")
//                      .GroupBy(c => (string)c.Attribute("country"))
//                      .Select(g => new { Country = g.Key, Count = g.Count() });
{
  const byCountry = Enumerable.from(doc.Descendants("customer"))
    .GroupBy((c) => c.Attribute("country")?.Value ?? "")
    .Select(([country, group]) => ({ Country: country, Count: group.Count() }))
    .ToArray();
  console.log("例 5 · 按国家分组计数：", byCountry);
}

// ─── 例 6：XName.Equals 做名字比对 ────────────────────────────────────────────
{
  const name = XName.Get("customer");
  const firstCustomer = doc.Descendants("customer")[0];
  console.log("例 6 · 第一个 customer Name.Equals('customer')：", firstCustomer?.Name.Equals(name));
}
