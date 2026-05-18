/**
 * 浏览器 playground 入口（Story-6.2）。
 *
 * 流程：file pick / drop → 按扩展名路由到 Word / Excel / PPT 子系统 → 解 element
 * 树并显示统计 → 可选 mutate + saveAsBytesAsync → Blob URL 下载。
 */

import { Cell, SpreadsheetDocument } from "openxml-ts/excel";
import { PresentationDocument } from "openxml-ts/ppt";
import { Paragraph, WordprocessingDocument } from "openxml-ts/word";

type StackKind = "word" | "excel" | "ppt";

interface OpenedDoc {
  kind: StackKind;
  fileName: string;
  doc: WordprocessingDocument | SpreadsheetDocument | PresentationDocument;
}

const dropEl = document.querySelector<HTMLLabelElement>("#drop")!;
const fileEl = document.querySelector<HTMLInputElement>("#file")!;
const statusEl = document.querySelector<HTMLDivElement>("#status")!;
const actionsEl = document.querySelector<HTMLDivElement>("#actions")!;
const mutateBtn = document.querySelector<HTMLButtonElement>("#mutate")!;
const downloadLink = document.querySelector<HTMLAnchorElement>("#download")!;

let opened: OpenedDoc | undefined;

function log(msg: string): void {
  statusEl.textContent = msg;
}

function kindFor(name: string): StackKind | undefined {
  if (name.endsWith(".docx")) return "word";
  if (name.endsWith(".xlsx")) return "excel";
  if (name.endsWith(".pptx")) return "ppt";
  return undefined;
}

async function openFile(file: File): Promise<void> {
  const kind = kindFor(file.name.toLowerCase());
  if (kind === undefined) {
    log(`不支持的扩展名：${file.name}（要 .docx / .xlsx / .pptx）`);
    return;
  }
  log(`读 ${file.name}（${file.size} 字节）…`);
  const bytes = new Uint8Array(await file.arrayBuffer());

  if (kind === "word") {
    const doc = await WordprocessingDocument.openAsync(bytes);
    const main = doc.mainDocumentPart;
    if (main === undefined) {
      log("✗ docx 缺 mainDocumentPart");
      return;
    }
    let paraCount = 0;
    for (const _ of main.document.descendants(Paragraph)) paraCount += 1;
    log(
      `✓ ${file.name}\n  类型：Word（docx）\n  段落数：${paraCount}\n  package parts：${[...doc.package.parts()].length}`,
    );
    opened = { kind, fileName: file.name, doc };
  } else if (kind === "excel") {
    const doc = await SpreadsheetDocument.openAsync(bytes);
    const wp = doc.workbookPart;
    if (wp === undefined) {
      log("✗ xlsx 缺 workbookPart");
      return;
    }
    const sheets = wp.worksheetParts.length;
    let totalCells = 0;
    for (const wsp of wp.worksheetParts) {
      for (const _ of wsp.worksheet.descendants(Cell)) totalCells += 1;
    }
    log(
      `✓ ${file.name}\n  类型：Excel（xlsx）\n  Worksheet 数：${sheets}\n  Cell 总数：${totalCells}\n  package parts：${[...doc.package.parts()].length}`,
    );
    opened = { kind, fileName: file.name, doc };
  } else {
    const doc = await PresentationDocument.openAsync(bytes);
    const pp = doc.presentationPart;
    if (pp === undefined) {
      log("✗ pptx 缺 presentationPart");
      return;
    }
    const slides = pp.slideParts.length;
    const sp0 = pp.slideParts[0];
    const colorScheme = sp0?.effectiveColorScheme?.localName ?? "（无）";
    log(
      `✓ ${file.name}\n  类型：PowerPoint（pptx）\n  Slide 数：${slides}\n  effective color scheme：${colorScheme}\n  package parts：${[...doc.package.parts()].length}`,
    );
    opened = { kind, fileName: file.name, doc };
  }

  actionsEl.hidden = false;
  downloadLink.hidden = true;
}

async function mutateAndDownload(): Promise<void> {
  if (opened === undefined) return;
  const { kind, fileName, doc } = opened;
  log("修改 element 树并序列化…");

  // 在每族里做一个最小可见修改（在某根上塞个 extendedAttribute），证明 typed 树
  // 可写、saveAsBytesAsync 能跑通 → 浏览器侧 ZIP 写出。
  if (kind === "word") {
    const w = doc as WordprocessingDocument;
    w.mainDocumentPart?.document.extendedAttributes.set("data-playground", "mutated");
  } else if (kind === "excel") {
    const x = doc as SpreadsheetDocument;
    x.workbookPart?.workbook.extendedAttributes.set("data-playground", "mutated");
  } else {
    const p = doc as PresentationDocument;
    p.presentationPart?.presentation.extendedAttributes.set("data-playground", "mutated");
  }

  const bytes = await doc.saveAsBytesAsync();
  // Uint8Array<ArrayBufferLike> 在 TS lib.dom 严格模式下不直接是 BlobPart；
  // 拿底层 ArrayBuffer 即可（playground 不在乎 SharedArrayBuffer 场景）。
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const outName = fileName.replace(/(\.docx|\.xlsx|\.pptx)$/, ".mutated$1");
  downloadLink.href = url;
  downloadLink.download = outName;
  downloadLink.textContent = `↓ ${outName}（${bytes.byteLength} 字节）`;
  downloadLink.hidden = false;
  log(`✓ 写回 ${bytes.byteLength} 字节，准备下载。`);
}

fileEl.addEventListener("change", () => {
  const file = fileEl.files?.[0];
  if (file !== undefined) void openFile(file);
});
dropEl.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropEl.classList.add("hover");
});
dropEl.addEventListener("dragleave", () => dropEl.classList.remove("hover"));
dropEl.addEventListener("drop", (e) => {
  e.preventDefault();
  dropEl.classList.remove("hover");
  const file = e.dataTransfer?.files[0];
  if (file !== undefined) void openFile(file);
});
mutateBtn.addEventListener("click", () => void mutateAndDownload());
