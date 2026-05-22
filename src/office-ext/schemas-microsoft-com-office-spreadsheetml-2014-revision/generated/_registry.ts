// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2014RevisionChildMaps } from "./_child-map.js";
import { AutoFilter } from "./auto-filter.js";
import { ChangeCellSubEdit } from "./change-cell-sub-edit.js";
import { Comments } from "./comments.js";
import { DataValidation } from "./data-validation.js";
import { DifferentialFormatType } from "./differential-format-type.js";
import { ExtensionList } from "./extension-list.js";
import { FFormula } from "./f-formula.js";
import { FormulaFormula } from "./formula-formula.js";
import { FreezePanes } from "./freeze-panes.js";
import { HideUnhideSheet } from "./hide-unhide-sheet.js";
import { Hyperlink } from "./hyperlink.js";
import { Outline } from "./outline.js";
import { Outlines } from "./outlines.js";
import { pivotTableDefinition } from "./pivot-table-definition.js";
import { RefCell } from "./ref-cell.js";
import { RefFuture } from "./ref-future.js";
import { RefMap } from "./ref-map.js";
import { RefOartAnchor } from "./ref-oart-anchor.js";
import { RefTest } from "./ref-test.js";
import { RevCell } from "./rev-cell.js";
import { RevExChangeCell } from "./rev-ex-change-cell.js";
import { RevExChgObj } from "./rev-ex-chg-obj.js";
import { RevExDefinedName } from "./rev-ex-defined-name.js";
import { RevExDelObj } from "./rev-ex-del-obj.js";
import { RevExFormatting } from "./rev-ex-formatting.js";
import { RevExFuture } from "./rev-ex-future.js";
import { RevExHeaders } from "./rev-ex-headers.js";
import { RevExMove } from "./rev-ex-move.js";
import { RevExRowColumn } from "./rev-ex-row-column.js";
import { RevExSheetOp } from "./rev-ex-sheet-op.js";
import { RevExStream } from "./rev-ex-stream.js";
import { RevExTest } from "./rev-ex-test.js";
import { RevExTrimmed } from "./rev-ex-trimmed.js";
import { RevExUnsupported } from "./rev-ex-unsupported.js";
import { RevGroup } from "./rev-group.js";
import { RevisionList } from "./revision-list.js";
import { RevisionPtr } from "./revision-ptr.js";
import { RevisionState } from "./revision-state.js";
import { RevisionStateLink } from "./revision-state-link.js";
import { RevListAutoExpandRw } from "./rev-list-auto-expand-rw.js";
import { RowColVisualOps } from "./row-col-visual-ops.js";
import { RstType } from "./rst-type.js";
import { SheetXluid } from "./sheet-xluid.js";
import { ShowGridlinesHeadings } from "./show-gridlines-headings.js";
import { SparklineGroup } from "./sparkline-group.js";
import { StateBasedHeader } from "./state-based-header.js";
import { StateBasedObject } from "./state-based-object.js";
import { Xstring } from "./xstring.js";

/**
 * 把 spreadsheetml-2014-revision 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2014RevisionElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "autoFilter", AutoFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "ccse", ChangeCellSubEdit);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "comments", Comments);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "dataValidation", DataValidation);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "dxf", DifferentialFormatType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "f", FFormula);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "formula", FormulaFormula);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "freezePanes", FreezePanes);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "hideUnhideSheet", HideUnhideSheet);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "hyperlink", Hyperlink);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "outline", Outline);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "outlines", Outlines);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "pivotTableDefinition", pivotTableDefinition);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "ref", RefCell);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "future", RefFuture);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "refmap", RefMap);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "oartAnchor", RefOartAnchor);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "test", RefTest);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "c", RevCell);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrc", RevExChangeCell);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrco", RevExChgObj);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrDefName", RevExDefinedName);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrdo", RevExDelObj);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrf", RevExFormatting);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrftr", RevExFuture);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "revHdrs", RevExHeaders);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrm", RevExMove);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrrc", RevExRowColumn);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrSheet", RevExSheetOp);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "revStream", RevExStream);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrtest", RevExTest);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrTrim", RevExTrimmed);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrUspt", RevExUnsupported);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrg", RevGroup);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrList", RevisionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "revisionPtr", RevisionPtr);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "body", RevisionState);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "link", RevisionStateLink);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "xrrListExpR", RevListAutoExpandRw);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "rowColVisualOps", RowColVisualOps);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "is", RstType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "sheetUid", SheetXluid);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "showGridlinesHeadings", ShowGridlinesHeadings);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "sparklineGroup", SparklineGroup);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "hdr", StateBasedHeader);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "objectState", StateBasedObject);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/revision", "v", Xstring);
  registerSpreadsheetml2014RevisionChildMaps(registry);
}
