/**
 * Port of Microsoft Open-XML-SDK samples/ThreadedCommentExample/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/ThreadedCommentExample/Program.cs
 *
 * Demonstrates adding a threaded comment to an Excel worksheet cell (Office 2019+).
 * A threaded comment is different from a legacy comment: it is stored in a separate
 * WorksheetThreadedCommentsPart and linked to a person in a WorkbookPersonPart.
 *
 * TS note: WorkbookPersonPart and WorksheetThreadedCommentsPart have opaque roots
 * in openxml-ts, so XML is written via part.writeAsync() rather than typed elements.
 *
 * Run:
 *   pnpm tsx examples/microsoft-samples/threaded-comment.ts <output.xlsx>
 */

import { StringValue } from "../../src/element/index.js";
import { LegacyDrawing } from "../../src/excel/generated/legacy-drawing.js";
import {
  Cell,
  InlineString,
  Row,
  SheetData,
  SpreadsheetDocument,
  Text,
  VmlDrawingPart,
  WorkbookPersonPart,
  WorksheetCommentsPart,
  WorksheetThreadedCommentsPart,
} from "../../src/excel/index.js";
import type { PartUri } from "../../src/packaging/index.js";

/** Port of the ThreadedCommentExample main logic. */
export async function addThreadedComment(doc: SpreadsheetDocument): Promise<void> {
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

  const _sheetName = "commentSheet";
  const column = "A";
  const row = 1;
  const reference = `${column}${row}`;

  // Insert text into the worksheet cell A1
  const ws = worksheetPart.worksheet;
  let sd = ws.firstChild(SheetData);
  if (sd === undefined) {
    sd = ws.appendChild(new SheetData()) as SheetData;
  }
  const r = new Row();
  r.extendedAttributes.set("r", String(row));
  const c = new Cell();
  c.extendedAttributes.set("r", reference);
  c.extendedAttributes.set("t", "inlineStr");
  const is = new InlineString();
  const t = new Text();
  t.text = "Please comment on this cell.";
  is.appendChild(t);
  c.appendChild(is);
  r.appendChild(c);
  sd.appendChild(r);

  // User identity (in production, these come from directory services)
  const displayNameUser = "Jose Contoso";
  const idUser = `{${crypto.randomUUID().toUpperCase()}}`;
  const tcId = `{${crypto.randomUUID().toUpperCase()}}`;
  const userIdJose = "j.contoso@example.com";
  const providerIdAzure = "PeoplePicker";

  // ── WorkbookPersonPart ──────────────────────────────────────────────────────
  const personPartUri = "/xl/persons/person1.xml" as PartUri;
  const personRawPart = pkg.createPart(personPartUri, WorkbookPersonPart.contentType);
  workbookPart.part.relationships.create({
    type: WorkbookPersonPart.relationshipType,
    target: "persons/person1.xml",
    targetMode: "internal",
  });

  const personXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<xltc:personList xmlns:xltc="http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments"><xltc:person displayName="${displayNameUser}" id="${idUser}" userId="${userIdJose}" providerId="${providerIdAzure}"/></xltc:personList>`;
  await personRawPart.writeAsync(personXml);

  // ── WorksheetCommentsPart (legacy anchor for the threaded comment) ───────────
  const commentsPartUri = "/xl/comments1.xml" as PartUri;
  const commentsRawPart = pkg.createPart(commentsPartUri, WorksheetCommentsPart.contentType);
  worksheetPart.part.relationships.create({
    type: WorksheetCommentsPart.relationshipType,
    target: "../comments1.xml",
    targetMode: "internal",
  });

  const commentsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<comments xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><authors><author>tc=${tcId}</author></authors><commentList><comment ref="${reference}" authorId="0" shapeId="0" guid="${tcId}"><text><t>Comment: Ok, here's a comment!</t></text></comment></commentList></comments>`;
  await commentsRawPart.writeAsync(commentsXml);

  // ── WorksheetThreadedCommentsPart ───────────────────────────────────────────
  const threadedPartUri = "/xl/threadedComments/threadedComment1.xml" as PartUri;
  const threadedRawPart = pkg.createPart(
    threadedPartUri,
    WorksheetThreadedCommentsPart.contentType,
  );
  worksheetPart.part.relationships.create({
    type: WorksheetThreadedCommentsPart.relationshipType,
    target: "../threadedComments/threadedComment1.xml",
    targetMode: "internal",
  });

  const now = new Date().toISOString();
  const threadedXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<xltc:ThreadedComments xmlns:xltc="http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments"><xltc:threadedComment ref="${reference}" personId="${idUser}" id="${tcId}" dT="${now}"><xltc:text>Ok, here's a threaded comment!</xltc:text></xltc:threadedComment></xltc:ThreadedComments>`;
  await threadedRawPart.writeAsync(threadedXml);

  // ── VML Drawing (legacy note shape required by Excel for threaded comments) ──
  const vmlPartUri = "/xl/drawings/vmlDrawing1.vml" as PartUri;
  const vmlRawPart = pkg.createPart(vmlPartUri, VmlDrawingPart.contentType);
  const vmlRelId = worksheetPart.part.relationships.create({
    type: VmlDrawingPart.relationshipType,
    target: "../drawings/vmlDrawing1.vml",
    targetMode: "internal",
  }).id;

  const vmlXml =
    `<xml xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" ` +
    `xmlns:x="urn:schemas-microsoft-com:office:excel">` +
    `<o:shapelayout v:ext="edit"><o:idmap v:ext="edit" data="1"/></o:shapelayout>` +
    `<v:shapetype id="_x0000_t202" coordsize="21600,21600" o:spt="202" path="m,l,21600r21600,l21600,xe">` +
    `<v:stroke joinstyle="miter"/><v:path gradientshapeok="t" o:connecttype="rect"/>` +
    "</v:shapetype>" +
    `<v:shape id="_x0000_s1025" type="#_x0000_t202" style='position:absolute;margin-left:59.25pt;margin-top:1.5pt;` +
    `width:108pt;height:59.25pt;z-index:1;visibility:hidden' fillcolor="infoBackground [80]" strokecolor="none [81]" o:insetmode="auto">` +
    `<v:fill color2="infoBackground [80]"/><v:shadow color="none [81]" obscured="t"/>` +
    `<v:path o:connecttype="none"/><v:textbox style='mso-direction-alt:auto'><div style='text-align:left'></div></v:textbox>` +
    `<x:ClientData ObjectType="Note"><x:MoveWithCells/><x:SizeWithCells/>` +
    "<x:Anchor>1, 15, 0, 2, 3, 31, 4, 1</x:Anchor><x:AutoFill>False</x:AutoFill>" +
    "<x:Row>0</x:Row><x:Column>0</x:Column></x:ClientData>" +
    "</v:shape></xml>";
  await vmlRawPart.writeAsync(vmlXml);

  // Add LegacyDrawing element to worksheet referencing the VML part
  const legacyDrawing = new LegacyDrawing();
  legacyDrawing.id = StringValue.parse(vmlRelId);
  ws.appendChild(legacyDrawing);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write(
      "usage: threaded-comment <output.xlsx>\n" +
        "  Creates an xlsx with a threaded comment on cell A1.\n",
    );
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  await addThreadedComment(doc);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (threaded comment on ${process.argv[2]})\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
