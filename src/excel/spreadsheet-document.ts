/**
 * `SpreadsheetDocument` —— Excel 文档的强类型门面（Story-3.5 / Architecture §3）。
 *
 * 与 .NET `DocumentFormat.OpenXml.Packaging.SpreadsheetDocument` 同名同位，
 * 但实现上**包装一个 OPC 包**（HAS-A，ADR-022），与 `WordprocessingDocument`
 * 完全对称：底层 backend（ZIP / Memory / Flat OPC）选谁都能套上 typed 门面。
 *
 * 使用模式：
 * ```ts
 * await using doc = await SpreadsheetDocument.openAsync("./report.xlsx");
 * const sheet = doc.workbookPart!.worksheetParts[0]!.worksheet;
 * for (const c of sheet.descendants(Cell)) {
 *   if (c.resolvedText === "{{client}}") c.cellValue = ...;
 * }
 * await doc.saveAsync();
 * ```
 */

import type { MemoryOpenXmlPackage } from "../backends/memory/memory-package.js";
import { writeFilePath } from "../backends/zip/source-reader.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  type OpenXmlElement,
  StringValue,
  UInt32Value,
} from "../element/index.js";
import { OpenXmlUnknownElement } from "../element/unknown-element.js";
import { registerExcel2009Elements } from "../excel-2009/generated/_registry.js";
import { registerExcel2010Elements } from "../excel-2010/generated/_registry.js";
import type { MarkupCompatibilityProcessSettings } from "../markup-compat/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import {
  type IPackage,
  type IPackagePart,
  type IPackageRelationship,
  type OpenAsyncOptions,
  ZipOpenXmlPackage,
  type ZipSource,
  createInMemory,
  openAsync,
  packageToZipBytes,
} from "../packaging/index.js";
import type { PartUri } from "../packaging/interfaces/types.js";
import { CoreProperties } from "../parts/core-properties.js";
import type { CustomFilePropertiesPart } from "../parts/custom-file-properties-part.js";
import type { ExtendedFilePropertiesPart } from "../parts/extended-file-properties-part.js";
import { getOrCreateCorePropertiesPart } from "../parts/get-or-create-core-properties.js";
import { getOrCreateCustomFilePropertiesPart } from "../parts/get-or-create-custom-file-properties.js";
import { getOrCreateExtendedFilePropertiesPart } from "../parts/get-or-create-extended-file-properties.js";
import { type AddImagePartOptions, type ImagePart, addImagePartTo } from "../parts/image-part.js";
import { relationshipTypeMatches } from "../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../parts/relationship-uri.js";
import { ThemePart } from "../parts/theme-part.js";
import type { TypedXmlPart } from "../parts/typed-xml-part.js";
import { clearCellDirty } from "./extensions/cell-extensions.js"; // 必要副作用：挂上 Cell.resolvedText + isDirty
import { registerSpreadsheetElements } from "./generated/_registry.js";
import { Border } from "./generated/border.js";
import { Borders } from "./generated/borders.js";
import { CellFormat } from "./generated/cell-format.js";
import { CellFormats } from "./generated/cell-formats.js";
import { CellStyleFormats } from "./generated/cell-style-formats.js";
import { CellStyle } from "./generated/cell-style.js";
import { CellStyles } from "./generated/cell-styles.js";
import { CellValue } from "./generated/cell-value.js";
import { Cell } from "./generated/cell.js";
import { DefinedName } from "./generated/defined-name.js";
import { DefinedNames } from "./generated/defined-names.js";
import { Drawing } from "./generated/drawing.js";
import { Fill } from "./generated/fill.js";
import { Fills } from "./generated/fills.js";
import { FontName } from "./generated/font-name.js";
import { FontSize } from "./generated/font-size.js";
import { Font } from "./generated/font.js";
import { Fonts } from "./generated/fonts.js";
import { PatternFill } from "./generated/pattern-fill.js";
import { SharedStringTable } from "./generated/shared-string-table.js";
import { SheetData } from "./generated/sheet-data.js";
import { Sheet } from "./generated/sheet.js";
import { Sheets } from "./generated/sheets.js";
import { Stylesheet } from "./generated/stylesheet.js";
import { Workbook } from "./generated/workbook.js";
import { Worksheet } from "./generated/worksheet.js";
import {
  CalculationChainPart,
  DrawingPart,
  SharedStringTablePart,
  WorkbookPart,
  WorkbookStylesPart,
  type WorksheetPart,
} from "./parts/index.js";
import { SharedStringResolver, registerSharedStringResolver } from "./shared-string-table.js";

/**
 * Excel 文档类型枚举——对位 .NET `SpreadsheetDocumentType`。
 *
 * 控制主工作簿 Part（`/xl/workbook.xml`）的 content-type，决定文件以
 * `.xlsx` / `.xltx` / `.xlsm` / `.xltm` / `.xlam` 保存时的语义。
 */
export enum SpreadsheetDocumentType {
  /** 普通 Excel 工作簿（.xlsx）。 */
  Workbook = "Workbook",
  /** Excel 模板（.xltx）。 */
  Template = "Template",
  /** 启用宏的 Excel 工作簿（.xlsm）。 */
  MacroEnabledWorkbook = "MacroEnabledWorkbook",
  /** 启用宏的 Excel 模板（.xltm）。 */
  MacroEnabledTemplate = "MacroEnabledTemplate",
  /** Excel 加载项（.xlam）。 */
  AddIn = "AddIn",
}

/** 文档类型 → 主工作簿 Part 的 content-type 映射（同 .NET SDK GetContentType）。 */
const SPREADSHEET_CONTENT_TYPES: Readonly<Record<SpreadsheetDocumentType, string>> = {
  [SpreadsheetDocumentType.Workbook]:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
  [SpreadsheetDocumentType.Template]:
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml",
  [SpreadsheetDocumentType.MacroEnabledWorkbook]:
    "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
  [SpreadsheetDocumentType.MacroEnabledTemplate]:
    "application/vnd.ms-excel.template.macroEnabled.main+xml",
  [SpreadsheetDocumentType.AddIn]: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
};

/** content-type → 文档类型的反向映射（同 .NET SDK GetDocumentType）。 */
const SPREADSHEET_DOCUMENT_TYPE_BY_CT = new Map<string, SpreadsheetDocumentType>(
  Object.entries(SPREADSHEET_CONTENT_TYPES).map(([t, ct]) => [ct, t as SpreadsheetDocumentType]),
);

/**
 * Excel 子系统共用的 typed element registry（包内自管，不污染全局）。
 *
 * 注：spreadsheetml schema 有多处 (namespace, localName) 二义性——同一 localName
 * 对应多个 ClassName（如 `<x:v>` 既可表示 CellValue 也可表示 Xstring）。codegen
 * 按字母序注册，最后写入的会胜出；这里在常用路径上显式覆盖回我们期望的 canonical
 * 类（与 .NET SDK 默认一致）。
 */
const DEFAULT_WORKBOOK_URI = "/xl/workbook.xml" as PartUri;
const DEFAULT_WORKSHEET_URI = "/xl/worksheets/sheet1.xml" as PartUri;
const DEFAULT_SST_URI = "/xl/sharedStrings.xml" as PartUri;
const DEFAULT_STYLES_URI = "/xl/styles.xml" as PartUri;
const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
const RNS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

const excelRegistry: ElementRegistry = (() => {
  const r = new ElementRegistry();
  registerSpreadsheetElements(r);
  registerExcel2009Elements(r);
  registerExcel2010Elements(r);
  r.register(XNS, "v", CellValue);
  return r;
})();

export class SpreadsheetDocument {
  /** 已加载的 typed Part 缓存——按 relationshipType 索引。 */
  private readonly typedParts = new Map<string, TypedXmlPart<OpenXmlElement>>();
  /** DrawingPart 缓存——按 Part URI 索引；同一 worksheet 多次 addImagePart 复用。 */
  private readonly drawingParts = new Map<string, DrawingPart>();
  /** SST resolver 是否已构建并注册到全部 worksheet（懒一次）。 */
  private _sstWired = false;
  /** SST resolver 缓存（一份对应 sharedStringTablePart 的 typed root）。 */
  private _sharedStringResolver: SharedStringResolver | undefined;
  /** Epic-29：CoreProperties 缓存。 */
  private _coreProperties: CoreProperties | undefined;
  /** Epic-72：ExtendedFilePropertiesPart 缓存。 */
  private _extendedFilePropertiesPart: ExtendedFilePropertiesPart | undefined;
  /** Epic-72：CustomFilePropertiesPart 缓存。 */
  private _customFilePropertiesPart: CustomFilePropertiesPart | undefined;
  /** Epic-82：MC 协商处理设置；undefined = NoProcess（默认行为不变）。 */
  private readonly _mcSettings: MarkupCompatibilityProcessSettings | undefined;

  constructor(
    private readonly pkg: MemoryOpenXmlPackage,
    mcSettings?: MarkupCompatibilityProcessSettings,
  ) {
    this._mcSettings = mcSettings;
    pkg.registerDiagnosticsElementCounter(() => this.countLoadedElements());
  }

  /** 走一遍已加载 typed Part 缓存，统计 element 树规模 + Unknown 数。 */
  private countLoadedElements(): { elementCount: number; unknownElementCount: number } {
    let elementCount = 0;
    let unknownElementCount = 0;
    const tally = (root: OpenXmlElement): void => {
      elementCount += 1;
      if (root instanceof OpenXmlUnknownElement) unknownElementCount += 1;
      if (root instanceof OpenXmlCompositeElement) {
        for (const _ of root.descendants()) elementCount += 1;
        for (const _ of root.descendants(OpenXmlUnknownElement)) unknownElementCount += 1;
      }
    };
    for (const part of this.typedParts.values()) {
      if (!part.isLoaded) continue;
      tally(part.root);
    }
    const wp = this.typedParts.get(WorkbookPart.relationshipType) as WorkbookPart | undefined;
    if (wp !== undefined) {
      for (const wsp of wp.worksheetParts) {
        if (wsp.isLoaded) tally(wsp.root);
      }
    }
    return { elementCount, unknownElementCount };
  }

  /** 底层 OPC 包句柄。 */
  get package(): IPackage {
    return this.pkg;
  }

  /**
   * 工作簿 Part。包级关系中无 officeDocument 关系则 undefined。
   * 多次访问返回同一 typed wrapper；首次访问触发 SST resolver 自动注册。
   */
  get workbookPart(): WorkbookPart | undefined {
    const wp = this.getOrLoadWorkbookPart();
    if (wp !== undefined) this.wireSstResolver(wp);
    return wp;
  }

  /** SharedStringTable Part（workbook 的 part-level 关系）。 */
  get sharedStringTablePart(): SharedStringTablePart | undefined {
    return this.getOrLoadTypedPartFromWorkbook(SharedStringTablePart);
  }

  /** WorkbookStyles Part（workbook 的 part-level 关系）。 */
  get workbookStylesPart(): WorkbookStylesPart | undefined {
    return this.getOrLoadTypedPartFromWorkbook(WorkbookStylesPart);
  }

  /** CalculationChain Part（workbook 的 part-level 关系）。 */
  get calculationChainPart(): CalculationChainPart | undefined {
    return this.getOrLoadTypedPartFromWorkbook(CalculationChainPart);
  }

  /** Theme Part（workbook 的 part-level 关系）。 */
  get themePart(): ThemePart | undefined {
    return this.getOrLoadTypedPartFromWorkbook(ThemePart);
  }

  /**
   * 包级 CoreProperties 元数据（Epic-29）。\`doc.coreProperties.title = "…"\` 一行设置。
   */
  get coreProperties(): CoreProperties {
    if (this._coreProperties === undefined) {
      const cpPart = getOrCreateCorePropertiesPart(this.pkg, excelRegistry);
      this._coreProperties = new CoreProperties(cpPart.coreProperties);
      this.typedParts.set("__corePropertiesPart__", cpPart);
    }
    return this._coreProperties;
  }

  /**
   * 包级 ExtendedFileProperties 元数据（Epic-72）。
   * 懒 bootstrap：首次访问时找/创建 `/docProps/app.xml`。
   */
  get extendedFileProperties(): ExtendedFilePropertiesPart {
    if (this._extendedFilePropertiesPart === undefined) {
      this._extendedFilePropertiesPart = getOrCreateExtendedFilePropertiesPart(this.pkg);
      this.typedParts.set("__extendedFilePropertiesPart__", this._extendedFilePropertiesPart);
    }
    return this._extendedFilePropertiesPart;
  }

  /**
   * 包级 CustomFileProperties 元数据（Epic-72）。
   * 懒 bootstrap：首次访问时找/创建 `/docProps/custom.xml`。
   */
  get customFileProperties(): CustomFilePropertiesPart {
    if (this._customFilePropertiesPart === undefined) {
      this._customFilePropertiesPart = getOrCreateCustomFilePropertiesPart(this.pkg);
      this.typedParts.set("__customFilePropertiesPart__", this._customFilePropertiesPart);
    }
    return this._customFilePropertiesPart;
  }

  /**
   * 加一个命名范围到 workbook（Epic-28）。
   *
   * 等价 \`<workbook><definedNames><definedName name="…" [localSheetId="…"] [hidden="1"]>formula</definedName>\`。
   *
   * @param name 命名范围标识；非空，长度 1..255 chars
   * @param formula 引用串（如 \`'Sheet1'!\$A\$1:\$B\$5\` 或常量公式）
   * @param opts.localSheetId 工作表级 scope（0-based sheet index）；省略 = 工作簿级
   * @param opts.hidden 是否对用户隐藏；默认 false
   *
   * @throws OpenXmlPackageError 当 name 非法 / 同 scope 已有同名 / workbookPart 缺失
   */
  addDefinedName(
    name: string,
    formula: string,
    opts: { localSheetId?: number; hidden?: boolean } = {},
  ): void {
    if (name.length === 0 || name.length > 255) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `addDefinedName: name must be 1..255 chars, got length ${name.length}`,
      });
    }
    const wp = this.workbookPart;
    if (wp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addDefinedName: workbookPart is missing",
      });
    }
    // 检测重名（同 scope）
    for (const existing of this.listDefinedNames()) {
      if (existing.name === name && existing.localSheetId === opts.localSheetId) {
        throw new OpenXmlPackageError({
          code: "BACKEND_ERROR",
          message:
            opts.localSheetId !== undefined
              ? `addDefinedName: name "${name}" already exists for sheet ${opts.localSheetId}`
              : `addDefinedName: workbook-level name "${name}" already exists`,
        });
      }
    }
    const container = this.ensureDefinedNamesContainer(wp);
    const dn = new DefinedName();
    dn.name = StringValue.parse(name);
    if (opts.localSheetId !== undefined) {
      dn.localSheetId = UInt32Value.parse(String(opts.localSheetId));
    }
    if (opts.hidden === true) {
      dn.extendedAttributes.set("hidden", "1");
    }
    dn.text = formula;
    container.appendChild(dn);
  }

  /**
   * 删除命名范围。返是否找到并删除。
   */
  removeDefinedName(name: string, opts: { localSheetId?: number } = {}): boolean {
    const wp = this.workbookPart;
    if (wp === undefined) return false;
    const container = this.findDefinedNamesContainer(wp);
    if (container === undefined) return false;
    for (const child of container.children.toArray()) {
      if (!(child instanceof DefinedName)) continue;
      const cn = child.name?.toString();
      const lid =
        child.localSheetId === undefined
          ? undefined
          : Number.parseInt(child.localSheetId.toString(), 10);
      if (cn === name && lid === opts.localSheetId) {
        container.children.remove(child);
        return true;
      }
    }
    return false;
  }

  /** 列出当前所有命名范围（快照副本）。 */
  listDefinedNames(): Array<{
    name: string;
    formula: string;
    localSheetId?: number;
    hidden?: boolean;
  }> {
    const wp = this.workbookPart;
    if (wp === undefined) return [];
    const container = this.findDefinedNamesContainer(wp);
    if (container === undefined) return [];
    const out: Array<{
      name: string;
      formula: string;
      localSheetId?: number;
      hidden?: boolean;
    }> = [];
    for (const child of container.children) {
      if (!(child instanceof DefinedName)) continue;
      const entry: {
        name: string;
        formula: string;
        localSheetId?: number;
        hidden?: boolean;
      } = {
        name: child.name?.toString() ?? "",
        formula: child.text ?? "",
      };
      if (child.localSheetId !== undefined) {
        entry.localSheetId = Number.parseInt(child.localSheetId.toString(), 10);
      }
      if (child.hidden !== undefined && child.hidden.toString() === "true") {
        entry.hidden = true;
      } else if (child.extendedAttributes.get("hidden") === "1") {
        entry.hidden = true;
      }
      out.push(entry);
    }
    return out;
  }

  /** 找/创 \`<definedNames>\` 容器；插入到 \`<workbook>\` 子的标准位置（sheets 之后）。 */
  private ensureDefinedNamesContainer(wp: WorkbookPart): DefinedNames {
    const existing = this.findDefinedNamesContainer(wp);
    if (existing !== undefined) return existing;
    const dns = new DefinedNames();
    wp.workbook.appendChild(dns);
    return dns;
  }

  /** 在 workbook 里找 \`<definedNames>\` 容器；不存在返 undefined。 */
  private findDefinedNamesContainer(wp: WorkbookPart): DefinedNames | undefined {
    for (const child of wp.workbook.children) {
      if (child instanceof DefinedNames) return child;
    }
    return undefined;
  }

  /**
   * 把字节加成图片 Part 并挂到指定 worksheet（Story-13.2，Epic-13）。
   *
   * 比 Word/PPT 多一层：图片不直接挂 worksheet，要走中间的 \`DrawingPart\`。
   * - worksheet \`<x:drawing r:id="...">\` 引用 DrawingPart；
   * - DrawingPart 自己的 part-level relationships 持 image 关系。
   *
   * 本方法：
   *   1. 找/创建 worksheet 的 DrawingPart（含 worksheet 端 \`<x:drawing>\` 引用）
   *   2. 把图片字节通过共享实现写入 \`/xl/media/imageN.<ext>\`
   *   3. 关系挂在 DrawingPart 上
   *
   * 返 \`{ part, drawingPart, relId }\`：调用方拿 \`relId\` 用
   * \`createImageTwoCellAnchorForExcel(relId, from, to)\` 一行生成锚节点，挂到
   * \`drawingPart.wsDr\` 即可。
   *
   * @throws OpenXmlPackageError 当 contentType 没传且字节首部嗅探不出已知 MIME、
   *   worksheet 不存在时
   */
  addImagePart(
    worksheet: WorksheetPart | number,
    bytes: Uint8Array,
    opts: AddImagePartOptions = {},
  ): { part: ImagePart; drawingPart: DrawingPart; relId: string } {
    const wp = this.workbookPart;
    if (wp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message: "addImagePart: workbookPart is missing",
      });
    }
    const sheetParts = wp.worksheetParts;
    const wsp =
      typeof worksheet === "number"
        ? sheetParts[worksheet]
        : sheetParts.find((s) => s === worksheet);
    if (wsp === undefined) {
      throw new OpenXmlPackageError({
        code: "PART_NOT_FOUND",
        message:
          typeof worksheet === "number"
            ? `addImagePart: worksheet index ${worksheet} out of range (total ${sheetParts.length})`
            : "addImagePart: provided WorksheetPart is not in this workbook",
      });
    }

    const drawingPart = this.getOrCreateDrawingPart(wsp);
    const { part, relId } = addImagePartTo(this.pkg, drawingPart.part, "/xl/media", bytes, opts);
    return { part, drawingPart, relId };
  }

  /** 查或创建 worksheet 的 DrawingPart——必要时 wire 关系 + 插 \`<x:drawing>\` 引用。 */
  private getOrCreateDrawingPart(wsp: WorksheetPart): DrawingPart {
    // 1. 先看 worksheet part-level relationships 里有没有现成 drawing 关系
    for (const rel of wsp.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, DrawingPart.relationshipType)) continue;
      const partUri = resolveRelativePartUri(wsp.part.uri, rel.target);
      if (partUri === undefined || !this.pkg.hasPart(partUri)) continue;
      const cached = this.drawingParts.get(partUri);
      if (cached !== undefined) return cached;
      const dp = new DrawingPart(this.pkg.getPart(partUri), excelRegistry, this.pkg);
      if (this._mcSettings !== undefined) dp.setMcSettings(this._mcSettings);
      this.drawingParts.set(partUri, dp);
      return dp;
    }

    // 2. 不存在则创建：分配 URI + Part + 关系 + worksheet 里 \`<x:drawing>\` 引用
    const uri = this.nextDrawingPartUri();
    const part = this.pkg.createPart(uri, DrawingPart.contentType);
    // 从 worksheet (\`/xl/worksheets/sheet1.xml\`) 到 \`/xl/drawings/drawing1.xml\` 的相对路径 = \`../drawings/drawing1.xml\`
    const target = `../drawings/${uri.split("/").pop()}`;
    const rel = wsp.part.relationships.create({
      type: DrawingPart.relationshipType,
      target,
      targetMode: "internal",
    });
    // 在 typed worksheet 里挂 \`<x:drawing r:id="..."/>\`——必须在 sheetData 之后；
    // append 到末尾对新建 fixture / Open-XML 读取器都接受（schema 序列严格但实际宽松）。
    const drawingEl = new Drawing();
    drawingEl.id = StringValue.parse(rel.id);
    wsp.worksheet.appendChild(drawingEl);

    const dp = new DrawingPart(part, excelRegistry, this.pkg);
    if (this._mcSettings !== undefined) dp.setMcSettings(this._mcSettings);
    this.drawingParts.set(uri, dp);
    return dp;
  }

  /** 找下一个未用的 \`/xl/drawings/drawing<N>.xml\`。 */
  private nextDrawingPartUri(): PartUri {
    let n = 1;
    while (this.pkg.hasPart(`/xl/drawings/drawing${n}.xml` as PartUri)) n += 1;
    return `/xl/drawings/drawing${n}.xml` as PartUri;
  }

  /**
   * 把所有已加载 typed Part 序列化回 part bytes，再触发 OPC 包 saveAsync。
   * 未访问过的 typed Part 不会被 flush。
   */
  async saveAsync(): Promise<void> {
    await this.flushAllTypedParts();
    if (this.pkg instanceof ZipOpenXmlPackage) {
      await this.pkg.saveAsync();
      return;
    }
    throw new OpenXmlPackageError({
      code: "UNSUPPORTED_OPERATION",
      message:
        "saveAsync requires an open-from-path source; use saveAsAsync(path) or saveAsBytesAsync() instead",
    });
  }

  async saveAsBytesAsync(): Promise<Uint8Array> {
    await this.flushAllTypedParts();
    return packageToZipBytes(this.pkg);
  }

  async saveAsAsync(targetPath: string): Promise<void> {
    await this.flushAllTypedParts();
    if (this.pkg instanceof ZipOpenXmlPackage) {
      await this.pkg.saveAsAsync(targetPath);
      return;
    }
    const bytes = await packageToZipBytes(this.pkg);
    await writeFilePath(targetPath, bytes);
  }

  async dispose(): Promise<void> {
    await this.pkg.dispose();
  }

  [Symbol.asyncDispose](): Promise<void> {
    return this.dispose();
  }

  /**
   * 当前文档类型（Epic-96，对位 .NET `SpreadsheetDocument.DocumentType`）。
   *
   * 读取主工作簿 Part 的 content-type 并反向映射到 `SpreadsheetDocumentType`。
   * 主工作簿 Part 不存在或 content-type 未知时返回 `undefined`。
   */
  get documentType(): SpreadsheetDocumentType | undefined {
    const wp = this.workbookPart;
    if (wp === undefined) return undefined;
    const ct = this.pkg.contentTypes.resolveContentType(wp.part.uri as PartUri);
    if (ct === undefined) return undefined;
    return SPREADSHEET_DOCUMENT_TYPE_BY_CT.get(ct);
  }

  /**
   * 切换文档类型（Epic-96，对位 .NET `SpreadsheetDocument.ChangeDocumentType`）。
   *
   * 重写主工作簿 Part 在 `[Content_Types].xml` 中的 Override 条目，使其 content-type
   * 匹配目标类型（Workbook / Template / MacroEnabledWorkbook / MacroEnabledTemplate / AddIn）。
   *
   * 行为对位 .NET SDK：
   * - 与当前类型相同时静默返回（no-op）。
   * - 主工作簿 Part 不存在时静默返回。
   *
   * @param newType 目标文档类型。
   */
  changeDocumentType(newType: SpreadsheetDocumentType): void {
    const wp = this.workbookPart;
    if (wp === undefined) return;

    const newContentType = SPREADSHEET_CONTENT_TYPES[newType];
    const partUri = wp.part.uri as PartUri;
    const currentContentType = this.pkg.contentTypes.resolveContentType(partUri);

    if (currentContentType === newContentType) return;

    this.pkg.contentTypes.removeOverride(partUri);
    this.pkg.contentTypes.addOverride(partUri, newContentType);
  }

  // ─── 静态工厂 ───────────────────────────────────────────────────────────────

  /** 从路径 / 字节流 / Blob / Stream 打开一份 xlsx。 */
  static async openAsync(
    source: ZipSource,
    options: OpenAsyncOptions = {},
  ): Promise<SpreadsheetDocument> {
    const pkg = await openAsync(source, options);
    return new SpreadsheetDocument(pkg, options.markupCompatibilityProcessSettings);
  }

  /**
   * 创建最小可用空白 xlsx：
   * - `xl/workbook.xml`（1 个默认 Sheet1）
   * - `xl/worksheets/sheet1.xml`（空 sheetData）
   * - `xl/sharedStrings.xml`（空 sst）
   * - 包级 officeDocument 关系 + workbook 的 part-level 关系（worksheet + sharedStrings）
   *
   * 实现关键：直接 seed typed root，避免 sync getter 与 async writeAsync 的竞态；
   * flush 时统一序列化回 part bytes。
   */
  static create(): SpreadsheetDocument {
    const inMemory = createInMemory() as MemoryOpenXmlPackage;

    // 0. `[Content_Types].xml` 的两条 `<Default>`：缺它们 Excel Desktop 无法把 `_rels/.rels`
    // 与 `xl/_rels/workbook.xml.rels` 解析成 relationships+xml content-type，整个包当损坏 →
    // 弹「We found a problem...recover」对话。OPC §10.1 规定，真 Excel 文件无一例外都有这两条。
    inMemory.contentTypes.addDefault(
      "rels",
      "application/vnd.openxmlformats-package.relationships+xml",
    );
    inMemory.contentTypes.addDefault("xml", "application/xml");

    // 1. 创建 4 个 Part（字节先空，flush 时由 typed root 写入）
    inMemory.createPart(DEFAULT_WORKBOOK_URI, WorkbookPart.contentType);
    inMemory.createPart(
      DEFAULT_WORKSHEET_URI,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    );
    inMemory.createPart(DEFAULT_SST_URI, SharedStringTablePart.contentType);
    inMemory.createPart(DEFAULT_STYLES_URI, WorkbookStylesPart.contentType);

    // 2. 包级关系：officeDocument → workbook
    inMemory.relationships.create({
      type: WorkbookPart.relationshipType,
      target: "xl/workbook.xml",
      targetMode: "internal",
    });

    // 3. workbook 的 part-level 关系：worksheet1 + styles + sharedStrings
    const workbookPart = inMemory.getPart(DEFAULT_WORKBOOK_URI);
    const wsRel = workbookPart.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
      target: "worksheets/sheet1.xml",
      targetMode: "internal",
    });
    workbookPart.relationships.create({
      type: WorkbookStylesPart.relationshipType,
      target: "styles.xml",
      targetMode: "internal",
    });
    workbookPart.relationships.create({
      type: SharedStringTablePart.relationshipType,
      target: "sharedStrings.xml",
      targetMode: "internal",
    });

    // 4. 构造 typed 根，挂到 typed Part 上
    const doc = new SpreadsheetDocument(inMemory);
    const wp = doc.workbookPart;
    if (wp !== undefined) {
      const wb = new Workbook();
      wb.extendedAttributes.set("xmlns:x", XNS);
      wb.extendedAttributes.set("xmlns:r", RNS);
      const sheets = new Sheets();
      const sheet = new Sheet();
      sheet.name = new StringValue("Sheet1");
      sheet.sheetId = new UInt32Value(1);
      sheet.extendedAttributes.set("r:id", wsRel.id);
      sheets.appendChild(sheet);
      wb.appendChild(sheets);
      wp.workbook = wb;
    }

    const wsParts = wp?.worksheetParts ?? [];
    if (wsParts.length > 0) {
      const wsp = wsParts[0] as WorksheetPart;
      const ws = new Worksheet();
      ws.extendedAttributes.set("xmlns:x", XNS);
      ws.appendChild(new SheetData());
      wsp.worksheet = ws;
    }

    const sstPart = doc.sharedStringTablePart;
    if (sstPart !== undefined) {
      const sst = new SharedStringTable();
      sst.extendedAttributes.set("xmlns:x", XNS);
      sst.extendedAttributes.set("count", "0");
      sst.extendedAttributes.set("uniqueCount", "0");
      sstPart.sharedStringTable = sst;
    }

    const stylesPart = doc.workbookStylesPart;
    if (stylesPart !== undefined) {
      stylesPart.stylesheet = buildMinimalStylesheet();
    }

    return doc;
  }

  // ─── 内部 ─────────────────────────────────────────────────────────────────

  private async flushAllTypedParts(): Promise<void> {
    // Phase 1：扫描已加载 worksheet 的 dirty cells；命中即丢 CalcChainPart（ADR-019）。
    const wp = this.typedParts.get(WorkbookPart.relationshipType) as WorkbookPart | undefined;
    if (wp !== undefined) {
      const dirtyCells = this.collectDirtyCells(wp);
      if (dirtyCells.length > 0) {
        this.dropCalculationChainPart(wp);
      }
    }

    // Phase 2：正常 flush。
    const promises: Promise<void>[] = [];
    for (const part of this.typedParts.values()) {
      if (part.isLoaded) promises.push(part.flushAsync());
    }
    if (wp !== undefined) {
      for (const wsp of wp.worksheetParts) {
        if (wsp.isLoaded) promises.push(wsp.flushAsync());
        for (const sp of wsp.slicersParts) {
          if (sp.isLoaded) promises.push(sp.flushAsync());
        }
        for (const tlp of wsp.timeLineParts) {
          if (tlp.isLoaded) promises.push(tlp.flushAsync());
        }
      }
      // WorkbookPart 子 Part（connectionsPart、slicerCacheParts、timeLineCacheParts）
      if (wp.connectionsPart?.isLoaded) promises.push(wp.connectionsPart.flushAsync());
      for (const scp of wp.slicerCacheParts) {
        if (scp.isLoaded) promises.push(scp.flushAsync());
      }
      for (const tlcp of wp.timeLineCacheParts) {
        if (tlcp.isLoaded) promises.push(tlcp.flushAsync());
      }
    }
    // Epic-13：drawingParts 不在 typedParts map 里（按 Part URI 而非 relationshipType 索引）
    for (const dp of this.drawingParts.values()) {
      if (dp.isLoaded) promises.push(dp.flushAsync());
    }
    await Promise.all(promises);

    // Phase 3：清掉本轮 dirty 标志，让用户下一轮修改才会再次失效 CalcChain。
    if (wp !== undefined) {
      for (const wsp of wp.worksheetParts) {
        if (!wsp.isLoaded) continue;
        for (const cell of wsp.worksheet.descendants(Cell)) {
          if (cell.isDirty) clearCellDirty(cell);
        }
      }
    }
  }

  /** 扫描已加载 worksheet 子树，收集 isDirty === true 的 Cell。 */
  private collectDirtyCells(wp: WorkbookPart): Cell[] {
    const out: Cell[] = [];
    for (const wsp of wp.worksheetParts) {
      if (!wsp.isLoaded) continue;
      for (const cell of wsp.worksheet.descendants(Cell)) {
        if (cell.isDirty) out.push(cell);
      }
    }
    return out;
  }

  /**
   * 丢弃 CalcChainPart：删 Part 字节 + 删 workbook 的 part-level 关系 +
   * 从 typed Part 缓存里移除。若关系不存在则零开销返回（Excel 重 open 后
   * 自动重新拓扑排序）。
   */
  private dropCalculationChainPart(wp: WorkbookPart): void {
    let targetRelId: string | undefined;
    for (const rel of wp.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, CalculationChainPart.relationshipType)) continue;
      targetRelId = rel.id;
      const targetUri = resolveRelativePartUri(wp.part.uri, rel.target);
      if (targetUri !== undefined && this.pkg.hasPart(targetUri)) {
        this.pkg.deletePart(targetUri);
      }
      break;
    }
    if (targetRelId !== undefined) {
      wp.part.relationships.remove(targetRelId);
    }
    this.typedParts.delete(CalculationChainPart.relationshipType);
  }

  /** 加载（懒构造）workbook Part；不附带 SST resolver 自动注册。 */
  private getOrLoadWorkbookPart(): WorkbookPart | undefined {
    const cached = this.typedParts.get(WorkbookPart.relationshipType);
    if (cached !== undefined) return cached as WorkbookPart;
    const rel = findRelationship(this.pkg.relationships, WorkbookPart.relationshipType);
    if (rel === undefined) return undefined;
    const partUri = resolveRelativePartUri("/", rel.target);
    if (partUri === undefined || !this.pkg.hasPart(partUri)) return undefined;
    const part = this.pkg.getPart(partUri);
    const wp = new WorkbookPart(part, excelRegistry, this.pkg);
    if (this._mcSettings !== undefined) wp.setMcSettings(this._mcSettings);
    this.typedParts.set(WorkbookPart.relationshipType, wp);
    return wp;
  }

  /** 从 workbook Part 的 part-level 关系中找指定 type 的 Part。 */
  private getOrLoadTypedPartFromWorkbook<T extends TypedXmlPart<OpenXmlElement>>(
    Ctor: TypedPartCtor<T>,
  ): T | undefined {
    const cached = this.typedParts.get(Ctor.relationshipType);
    if (cached !== undefined) return cached as T;
    const wp = this.getOrLoadWorkbookPart();
    if (wp === undefined) return undefined;
    const rel = findRelationship(wp.part.relationships, Ctor.relationshipType);
    if (rel === undefined) return undefined;
    const partUri = resolveRelativePartUri(wp.part.uri, rel.target);
    if (partUri === undefined || !this.pkg.hasPart(partUri)) return undefined;
    const part = this.pkg.getPart(partUri);
    const typed = new Ctor(part, excelRegistry);
    if (this._mcSettings !== undefined) typed.setMcSettings(this._mcSettings);
    this.typedParts.set(Ctor.relationshipType, typed);
    return typed;
  }

  /**
   * 首次访问 workbookPart 后把每个 worksheet 与 SST resolver 绑定，让
   * `Cell.resolvedText` 能解 `<c t="s">` 索引。无 SST Part 时本步跳过。
   *
   * 一次性 eager 注册：触发各 WorksheetPart 的 root 加载。这是 Story-3.5
   * 接受的妥协（vs 每次 worksheet 加载都 hook，避免侵入 WorksheetPart 公共
   * API）；Story-3.10 bench 阶段若 NFR-3.1 不达标再优化。
   */
  private wireSstResolver(wp: WorkbookPart): void {
    if (this._sstWired) return;
    const sstPart = this.getOrLoadTypedPartFromWorkbook(SharedStringTablePart);
    if (sstPart === undefined) {
      this._sstWired = true;
      return;
    }
    const resolver = new SharedStringResolver(sstPart.sharedStringTable);
    this._sharedStringResolver = resolver;
    for (const wsp of wp.worksheetParts) {
      registerSharedStringResolver(wsp.worksheet, resolver);
    }
    this._sstWired = true;
  }
}

interface TypedPartCtor<T extends TypedXmlPart<OpenXmlElement>> {
  new (part: IPackagePart, registry: ElementRegistry): T;
  readonly relationshipType: string;
}

function findRelationship(
  collection: Iterable<IPackageRelationship>,
  relationshipType: string,
): IPackageRelationship | undefined {
  for (const rel of collection) {
    if (rel.targetMode !== "internal") continue;
    if (relationshipTypeMatches(rel.type, relationshipType)) return rel;
  }
  return undefined;
}

/**
 * 构造 OOXML 规范要求的最小可用 `xl/styles.xml` typed root：
 *
 *     <styleSheet>
 *       <fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
 *       <fills count="2">
 *         <fill><patternFill patternType="none"/></fill>
 *         <fill><patternFill patternType="gray125"/></fill>
 *       </fills>
 *       <borders count="1"><border/></borders>
 *       <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
 *       <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
 *       <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
 *     </styleSheet>
 *
 * 缺这份 stylesheet 时 Excel Desktop 打开会弹「Repaired」（即便所有 cell 都没引用
 * 任何 style）。`<fills>` 至少要 2 条（默认 + gray125 占位）；其它每个 count
 * 至少 1。container `count` 属性用 extendedAttributes 设——schema 上无 typed 字段。
 */
function buildMinimalStylesheet(): Stylesheet {
  const ss = new Stylesheet();
  ss.extendedAttributes.set("xmlns:x", XNS);

  const fonts = new Fonts();
  fonts.extendedAttributes.set("count", "1");
  const font = new Font();
  const fontSize = new FontSize();
  fontSize.val = new StringValue("11");
  font.appendChild(fontSize);
  const fontName = new FontName();
  fontName.val = new StringValue("Calibri");
  font.appendChild(fontName);
  fonts.appendChild(font);
  ss.appendChild(fonts);

  const fills = new Fills();
  fills.extendedAttributes.set("count", "2");
  for (const patternType of ["none", "gray125"] as const) {
    const fill = new Fill();
    const pf = new PatternFill();
    pf.patternType = new StringValue(patternType);
    fill.appendChild(pf);
    fills.appendChild(fill);
  }
  ss.appendChild(fills);

  const borders = new Borders();
  borders.extendedAttributes.set("count", "1");
  borders.appendChild(new Border());
  ss.appendChild(borders);

  const cellStyleXfs = new CellStyleFormats();
  cellStyleXfs.extendedAttributes.set("count", "1");
  cellStyleXfs.appendChild(zeroCellFormat());
  ss.appendChild(cellStyleXfs);

  const cellXfs = new CellFormats();
  cellXfs.extendedAttributes.set("count", "1");
  const xf = zeroCellFormat();
  xf.formatId = new UInt32Value(0);
  cellXfs.appendChild(xf);
  ss.appendChild(cellXfs);

  const cellStyles = new CellStyles();
  cellStyles.extendedAttributes.set("count", "1");
  const cs = new CellStyle();
  cs.name = new StringValue("Normal");
  cs.formatId = new UInt32Value(0); // 对位 xfId
  cs.builtinId = new UInt32Value(0);
  cellStyles.appendChild(cs);
  ss.appendChild(cellStyles);

  return ss;
}

/** `numFmtId="0" fontId="0" fillId="0" borderId="0"` 的默认 CellFormat。 */
function zeroCellFormat(): CellFormat {
  const xf = new CellFormat();
  xf.numberFormatId = new UInt32Value(0);
  xf.fontId = new UInt32Value(0);
  xf.fillId = new UInt32Value(0);
  xf.borderId = new UInt32Value(0);
  return xf;
}
