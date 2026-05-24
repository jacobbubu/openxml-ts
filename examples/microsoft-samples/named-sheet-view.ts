/**
 * Port of Microsoft Open-XML-SDK samples/NamedSheetView/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/NamedSheetView/Program.cs
 *
 * Demonstrates inserting a NamedSheetViewsPart into an xlsx worksheet.
 * A NamedSheetView is an Office 2021+ feature that lets users save the current
 * view configuration (frozen panes, column widths, etc.) under a named label.
 *
 * TS note: NamedSheetViewsPart has an opaque root in openxml-ts, so we write the
 * XML directly via part.writeAsync() instead of using the typed element tree.
 *
 * Run:
 *   pnpm tsx examples/microsoft-samples/named-sheet-view.ts <output.xlsx>
 */

import { NamedSheetViewsPart, SpreadsheetDocument } from "../../src/excel/index.js";
import type { PartUri } from "../../src/packaging/index.js";

/** Port of InsertNamedSheetView — adds a NamedSheetViewsPart to the first worksheet. */
export async function insertNamedSheetView(doc: SpreadsheetDocument): Promise<void> {
  const workbookPart = doc.workbookPart;
  if (workbookPart === undefined) {
    throw new Error("workbookPart is missing");
  }

  const worksheetParts = workbookPart.worksheetParts;
  if (worksheetParts.length === 0) {
    throw new Error("No WorksheetParts found");
  }

  const worksheetPart = worksheetParts[0]!;
  const pkg = doc.package;
  const wsPart = worksheetPart.part;

  // Determine a unique URI for the NamedSheetViewsPart
  let n = 1;
  while (pkg.hasPart(`/xl/namedSheetViews/namedSheetView${n}.xml` as PartUri)) n += 1;
  const nsvUri = `/xl/namedSheetViews/namedSheetView${n}.xml` as PartUri;

  // Create the part in the package
  const rawPart = pkg.createPart(nsvUri, NamedSheetViewsPart.contentType);

  // Add a relationship from the worksheet part to the new named sheet views part
  wsPart.relationships.create({
    type: NamedSheetViewsPart.relationshipType,
    target: `../namedSheetViews/namedSheetView${n}.xml`,
    targetMode: "internal",
  });

  // Build the unique GUID for the view (mirrors .NET: Guid.NewGuid().ToString().ToUpper())
  const guid = `{${crypto.randomUUID().toUpperCase()}}`;

  // Write the XML content for the NamedSheetViewsPart.
  // The .NET sample calls namedSheetViewsPart.NamedSheetViews.AddNamespaceDeclaration
  // to add the "x" namespace — we inline it here since we write raw XML.
  const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<xnsv:namedSheetViews xmlns:xnsv="http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews" xmlns:x="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><xnsv:namedSheetView id="${guid}" name="testview"/></xnsv:namedSheetViews>`;

  await rawPart.writeAsync(xml);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write(
      "usage: named-sheet-view <output.xlsx>\n" +
        "  Creates an xlsx with a NamedSheetViewsPart on the first worksheet.\n",
    );
    process.exit(2);
  }

  // Create a minimal spreadsheet then insert the named sheet view
  const doc = SpreadsheetDocument.create();
  await insertNamedSheetView(doc);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (NamedSheetView "testview" inserted)\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
