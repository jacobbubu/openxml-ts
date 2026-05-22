// CorePropertiesExtractor.cs
// Extracts core properties (title, creator, subject, keywords, lastModifiedBy, revision)
// from any OOXML file and emits a deterministic JSON digest.
// Timestamps (created/modified) are intentionally excluded — they are variable.

using System.IO.Compression;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace CrossSdkVerify;

public record CorePropsDigest(
    [property: JsonPropertyName("title")] string? Title,
    [property: JsonPropertyName("creator")] string? Creator,
    [property: JsonPropertyName("lastModifiedBy")] string? LastModifiedBy,
    [property: JsonPropertyName("subject")] string? Subject,
    [property: JsonPropertyName("keywords")] string? Keywords,
    [property: JsonPropertyName("revision")] string? Revision
);

public static class CorePropertiesExtractor
{
    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private static readonly XNamespace Dc =
        "http://purl.org/dc/elements/1.1/";
    private static readonly XNamespace Cp =
        "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";

    public static string Extract(string filePath)
    {
        // OOXML files are ZIP archives; core properties live in docProps/core.xml
        using var zip = ZipFile.OpenRead(filePath);
        var entry = zip.GetEntry("docProps/core.xml");
        if (entry == null)
        {
            // No core properties — return empty digest
            return JsonSerializer.Serialize(
                new { type = "core-props", digest = new CorePropsDigest(null, null, null, null, null, null) },
                JsonOpts);
        }

        using var stream = entry.Open();
        var xdoc = XDocument.Load(stream);
        var root = xdoc.Root;
        if (root == null)
        {
            return JsonSerializer.Serialize(
                new { type = "core-props", digest = new CorePropsDigest(null, null, null, null, null, null) },
                JsonOpts);
        }

        string? GetDc(string localName) =>
            root.Element(Dc + localName)?.Value?.Trim();
        string? GetCp(string localName) =>
            root.Element(Cp + localName)?.Value?.Trim();

        var digest = new CorePropsDigest(
            Title: GetDc("title"),
            Creator: GetDc("creator"),
            LastModifiedBy: GetCp("lastModifiedBy"),
            Subject: GetDc("subject"),
            Keywords: GetCp("keywords"),
            Revision: GetCp("revision")
        );

        return JsonSerializer.Serialize(new { type = "core-props", digest }, JsonOpts);
    }
}
