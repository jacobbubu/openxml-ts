/**
 * Port of Microsoft Open-XML-SDK samples/DocumentTaskExample/Program.cs
 * @see https://github.com/microsoft/Open-XML-SDK/blob/main/samples/DocumentTaskExample/Program.cs
 *
 * Demonstrates adding a DocumentTask (Office 365 task assignment linked to a comment) to a Word
 * document. Document tasks are stored in a DocumentTasksPart and linked to a comment via a
 * CommentAnchor.
 *
 * TS note: DocumentTasksPart and WordprocessingCommentsPart have opaque roots in openxml-ts,
 * so XML is written via part.writeAsync() instead of using typed element trees.
 * The Word comment markup (CommentRangeStart/End/Reference) is written via raw XML
 * inside the main document body.
 *
 * Run:
 *   pnpm tsx examples/microsoft-samples/document-task.ts <output.docx>
 */

import type { PartUri } from "../../src/packaging/index.js";
import { DocumentTasksPart } from "../../src/parts/generated/document-tasks-part.js";
import { WordprocessingDocument } from "../../src/word/index.js";
import {
  CommentRangeEnd,
  CommentRangeStart,
  CommentReference,
  Paragraph,
  Run,
  Text,
} from "../../src/word/index.js";

interface User {
  userId: string;
  userName: string;
  directoryProvider: string;
  mention: string;
  email: string;
}

export async function addDocumentTask(doc: WordprocessingDocument): Promise<void> {
  const mdp = doc.mainDocumentPart;
  if (mdp === undefined) {
    throw new Error("mainDocumentPart is missing");
  }

  const pkg = doc.package;
  const mdpPart = mdp.part;
  const body = mdp.document.firstChild(); // Body element

  const strCommentId = "3";
  const commentText = " Here's another sentence that is just too long. Shorten it please.";
  const runText = "The introduction to this article.";

  const tony: User = {
    userId: "S::john.doe@contoso.com::3063813b-f01d-4030-9808-501a178e7963",
    userName: "John Doe",
    directoryProvider: "AD",
    mention: "@John Doe",
    email: "john.doe@contoso.com",
  };
  const bruce: User = {
    userId: "S::jane.doe@contoso.com::ec6240b1-52a3-46dd-9697-ef7bcc7a29e8",
    userName: "Jane Doe",
    directoryProvider: "AD",
    mention: "@Jane Doe",
    email: "jane.doe@contoso.com",
  };

  // ── 1. Add a paragraph with comment range markers ─────────────────────────
  const para = new Paragraph();

  const rangeStart = new CommentRangeStart();
  rangeStart.id = strCommentId;
  para.appendChild(rangeStart);

  const textRun = new Run();
  const t = new Text();
  t.text = runText;
  textRun.appendChild(t);
  para.appendChild(textRun);

  const rangeEnd = new CommentRangeEnd();
  rangeEnd.id = strCommentId;
  para.appendChild(rangeEnd);

  const refRun = new Run();
  const ref = new CommentReference();
  ref.id = strCommentId;
  refRun.appendChild(ref);
  para.appendChild(refRun);

  (body as unknown as { appendChild: (e: unknown) => void }).appendChild(para);

  // ── 2. WordprocessingCommentsPart (mention comment) ───────────────────────
  const commentsPartUri = "/word/comments.xml" as PartUri;
  const commentsRaw = pkg.createPart(
    commentsPartUri,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml",
  );
  mdpPart.relationships.create({
    type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
    target: "comments.xml",
    targetMode: "internal",
  });

  const taskStr = `${bruce.mention} ${commentText}`;
  const now = new Date().toISOString();

  const commentsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:comments xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"><w:comment w:id="${strCommentId}" w:author="${tony.userName}" w:date="${now}" w:initials="${tony.userName[0]}${tony.userName.split(" ")[1]?.[0] ?? ""}"><w:p><w:r><w:rPr><w:color w:val="2B579A"/><w:shd w:val="clear" w:color="auto" w:fill="E6E6E6"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> HYPERLINK "mailto:${bruce.email}"</w:instrText></w:r><w:bookmarkStart w:id="2" w:name="_@_0FD9AD1E39C946AB9F9E1352162C9910Z"/><w:r><w:rPr><w:color w:val="2B579A"/><w:shd w:val="clear" w:color="auto" w:fill="E6E6E6"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:bookmarkEnd w:id="2"/><w:r><w:rPr><w:rStyle w:val="Mention"/><w:noProof/></w:rPr><w:t>${bruce.mention}</w:t></w:r><w:r><w:rPr><w:color w:val="2B579A"/><w:shd w:val="clear" w:color="auto" w:fill="E6E6E6"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r><w:r><w:t xml:space="preserve">${commentText}</w:t></w:r><w:r><w:annotationRef/></w:r></w:p></w:comment></w:comments>`;
  await commentsRaw.writeAsync(commentsXml);

  // ── 3. DocumentTasksPart ──────────────────────────────────────────────────
  const tasksPartUri = "/word/tasks.xml" as PartUri;
  const tasksRaw = pkg.createPart(tasksPartUri, DocumentTasksPart.contentType);
  mdpPart.relationships.create({
    type: DocumentTasksPart.relationshipType,
    target: "tasks.xml",
    targetMode: "internal",
  });

  const guidEventId = crypto.randomUUID();
  const guidTaskId = crypto.randomUUID();
  const commonAnchorId = "546836446";

  const tasksXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><t:Tasks xmlns:t="http://schemas.microsoft.com/office/2021/documenttasks"><t:Task t:id="${guidTaskId}"><t:Anchor><t:CommentAnchor t:id="${commonAnchorId}"/></t:Anchor><t:History><t:Event t:id="${guidEventId}" t:time="${now}"><t:Attribution t:userId="${tony.userId}" t:userProvider="${tony.directoryProvider}" t:userName="${tony.userName}"/><t:Anchor><t:CommentAnchor t:id="${commonAnchorId}"/></t:Anchor><t:Create/></t:Event><t:Event t:id="${guidEventId}" t:time="${now}"><t:Attribution t:userId="${tony.userId}" t:userProvider="${tony.directoryProvider}" t:userName="${tony.userName}"/><t:Anchor><t:CommentAnchor t:id="${commonAnchorId}"/></t:Anchor><t:Assign t:userId="${bruce.userId}" t:userProvider="${bruce.directoryProvider}" t:userName="${bruce.userName}"/></t:Event><t:Event t:id="${guidEventId}" t:time="${now}"><t:Attribution t:userId="${tony.userId}" t:userProvider="${tony.directoryProvider}" t:userName="${tony.userName}"/><t:Anchor><t:CommentAnchor t:id="${commonAnchorId}"/></t:Anchor><t:Title t:title="${taskStr}"/></t:Event></t:History></t:Task></t:Tasks>`;
  await tasksRaw.writeAsync(tasksXml);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write(
      "usage: document-task <output.docx>\n" +
        "  Creates a docx with a DocumentTask (task assignment linked to a comment).\n",
    );
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  await addDocumentTask(doc);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (DocumentTask inserted)\n`);
}

if (process.argv[1] === (await import("node:url")).fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
    process.exit(1);
  });
}
