// Replica of examples/linq-tutorial.ts
// Uses System.Xml.Linq to perform the same 6 operations on the same XML data,
// printing results in the same format as Bun console.log.

using System.Xml.Linq;

namespace CrossSdkVerify.Replicas;

public static class LinqTutorial
{
    private const string CustomersXml = @"<?xml version=""1.0"" encoding=""UTF-8""?>
<customers>
  <customer id=""1"" country=""CN"">
    <name>张三</name>
    <orders>
      <order amount=""120.50"" currency=""USD""/>
      <order amount=""800.00"" currency=""USD""/>
    </orders>
  </customer>
  <customer id=""2"" country=""US"">
    <name>Alice</name>
    <orders>
      <order amount=""50.00"" currency=""USD""/>
      <order amount=""9.99"" currency=""USD""/>
      <order amount=""3000.00"" currency=""USD""/>
    </orders>
  </customer>
  <customer id=""3"" country=""CN"">
    <name>李四</name>
    <orders>
      <order amount=""2500.00"" currency=""USD""/>
    </orders>
  </customer>
  <customer id=""4"" country=""JP"">
    <name>Hiroshi</name>
    <orders/>
  </customer>
</customers>";

    public static void Run(System.IO.TextWriter? output = null)
    {
        output ??= Console.Out;

        var doc = XDocument.Parse(CustomersXml);

        // Example 1: All customer names
        {
            var names = doc.Descendants("customer")
                .Select(c => c.Element("name")?.Value)
                .ToList();
            output.WriteLine("例 1 · 所有 customer 名字：" + FormatNullableStringArray(names));
        }

        // Example 2: Total order amount for CN customers
        {
            var total = doc.Descendants("customer")
                .Where(c => (string?)c.Attribute("country") == "CN")
                .SelectMany(c => c.Descendants("order"))
                .Sum(o => double.Parse((string?)o.Attribute("amount") ?? "0",
                    System.Globalization.CultureInfo.InvariantCulture));
            output.WriteLine("例 2 · CN 客户订单总额：" + FormatDouble(total));
        }

        // Example 3: Customer with highest total order amount
        {
            var top = doc.Descendants("customer")
                .OrderByDescending(c => c.Descendants("order")
                    .Sum(o => double.Parse((string?)o.Attribute("amount") ?? "0",
                        System.Globalization.CultureInfo.InvariantCulture)))
                .First()
                .Element("name")?.Value;
            output.WriteLine("例 3 · 订单金额最高的客户：" + top);
        }

        // Example 4: XNamespace + descendants
        {
            const string wordXml = @"<w:document xmlns:w=""http://schemas.openxmlformats.org/wordprocessingml/2006/main"">
  <w:body>
    <w:p><w:r><w:t>Hello</w:t></w:r></w:p>
    <w:p><w:r><w:t>LINQ</w:t></w:r></w:p>
  </w:body>
</w:document>";
            var wordDoc = XDocument.Parse(wordXml);
            XNamespace w = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
            var paras = wordDoc.Descendants(w + "p")
                .Select(p => p.Value)
                .ToList();
            output.WriteLine("例 4 · word 段落文字：" + FormatStringArray(paras));
        }

        // Example 5: GroupBy + count by country
        {
            var byCountry = doc.Descendants("customer")
                .GroupBy(c => (string?)c.Attribute("country") ?? "")
                .Select(g => (Country: g.Key, Count: g.Count()))
                .ToList();
            output.WriteLine("例 5 · 按国家分组计数：" + FormatGroupByResult(byCountry));
        }

        // Example 6: XName.Equals name comparison
        {
            var name = XName.Get("customer");
            var firstCustomer = doc.Descendants("customer").First();
            bool equals = firstCustomer.Name == name;
            output.WriteLine("例 6 · 第一个 customer Name.Equals('customer')：" + (equals ? "true" : "false"));
        }
    }

    // Format a string? array in Bun console.log style: [ "a", "b", "c" ]
    private static string FormatNullableStringArray(IList<string?> items)
    {
        if (items.Count == 0) return "[]";
        var parts = items.Select(s => s == null ? "null" : $"\"{s}\"");
        return "[ " + string.Join(", ", parts) + " ]";
    }

    private static string FormatStringArray(IList<string> items)
    {
        if (items.Count == 0) return "[]";
        var parts = items.Select(s => $"\"{s}\"");
        return "[ " + string.Join(", ", parts) + " ]";
    }

    private static string FormatDouble(double val)
    {
        // Bun's console.log prints numbers without trailing zeros
        if (val == Math.Floor(val) && !double.IsInfinity(val))
            return ((long)val).ToString();
        return val.ToString("G", System.Globalization.CultureInfo.InvariantCulture);
    }

    // Format GroupBy result in Bun console.log multi-line style:
    // [
    //   {
    //     Country: "CN",
    //     Count: 2,
    //   }, {
    //     ...
    //   }
    // ]
    private static string FormatGroupByResult(IList<(string Country, int Count)> items)
    {
        var sb = new System.Text.StringBuilder();
        sb.AppendLine("[");
        for (int i = 0; i < items.Count; i++)
        {
            var item = items[i];
            bool isLast = i == items.Count - 1;
            sb.AppendLine("  {");
            sb.AppendLine($"    Country: \"{item.Country}\",");
            sb.AppendLine($"    Count: {item.Count},");
            if (!isLast)
                sb.Append("  }, ");
            else
                sb.AppendLine("  }");
        }
        sb.Append("]");
        return sb.ToString();
    }
}
