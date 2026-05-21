# openxml-ts 便捷扩展层清单

本文件是 **openxml-ts 便捷扩展层（Convenience Layer）** 的权威清单。

## 概念说明

openxml-ts 的核心使命是**忠实移植** .NET [DocumentFormat.OpenXml SDK](https://github.com/dotnet/Open-XML-SDK)：typed element 类、Part 类、序列化/反序列化、Markup Compatibility（MC）协商等，均以「不越界、不遗失」为原则。

在此基础上，openxml-ts 额外提供了一批**便捷扩展**——通过 TypeScript module augmentation / prototype 注入，为 SDK 的 generated element 类挂载人机工程学访问器（getter/setter/函数），让常见操作只需一行代码完成。这些扩展是 **openxml-ts 自有设计**，.NET SDK 中没有对等 API。

### 区分原则

| 层次 | 内容 | 标识 |
| --- | --- | --- |
| 忠实移植层（Faithful Port） | generated element 类、Part 类、validator、streaming、MC 协商 | 无额外标注 |
| 便捷扩展层（Convenience Layer） | mixins、helper 函数、prototype 访问器 | 文件头 banner + 本文档 |

便捷扩展层的政策：**可加不可改**——只做加法（新增访问器/函数），不改变底层 SDK 忠实语义；按需 import，不影响 tree-shake。

---

## Word 便捷扩展（`src/word/extensions/`）

### paragraph-alignment.ts

**模块路径**：`src/word/extensions/paragraph-alignment.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.alignment` | getter/setter | 读写段落对齐方式 | `<w:pPr><w:jc w:val="...">` |

Prototype mixin。`alignment = "center"` 等价于手动创建 `ParagraphProperties` + `Justification` 子元素。`undefined` 表示无显式对齐（继承样式默认）。

---

### paragraph-extensions.ts

**模块路径**：`src/word/extensions/paragraph-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.text` | getter（只读） | 展平段落内所有 Run 文本 | `<w:t>` / `<w:tab>` / `<w:br>` |

Prototype mixin。委托 `text-collect.ts` 的 `collectRunText()` 实现。

---

### paragraph-flow.ts

**模块路径**：`src/word/extensions/paragraph-flow.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.keepNext` | getter/setter | 与下一段保持同页 | `<w:pPr><w:keepNext>` |
| `Paragraph.prototype.keepLines` | getter/setter | 本段所有行保持同页 | `<w:pPr><w:keepLines>` |
| `Paragraph.prototype.pageBreakBefore` | getter/setter | 本段前强制分页 | `<w:pPr><w:pageBreakBefore>` |

Prototype mixin。三态 OnOff 语义：`true` / `false` / `undefined`（继承）。

---

### paragraph-indent.ts

**模块路径**：`src/word/extensions/paragraph-indent.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.indent` | getter/setter | 读写段落缩进（dxa 单位） | `<w:pPr><w:ind>` |

Prototype mixin。返回 `ParagraphIndent { leftDxa?, rightDxa?, firstLineDxa?, hangingDxa? }` 对象。setter 支持 partial merge（仅写入指定字段）。

---

### paragraph-numbering.ts

**模块路径**：`src/word/extensions/paragraph-numbering.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.numbering` | getter/setter | 读写段落编号引用 | `<w:pPr><w:numPr><w:ilvl><w:numId>` |

Prototype mixin。返回 `{ id, level }` 对象。`undefined` 删除 `<w:numPr>`。

---

### paragraph-spacing.ts

**模块路径**：`src/word/extensions/paragraph-spacing.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.spacing` | getter/setter | 读写段落间距（段前/段后/行距） | `<w:pPr><w:spacing>` |

Prototype mixin。返回 `ParagraphSpacing { beforeDxa?, afterDxa?, lineDxa?, lineRule? }` 对象。setter 支持 partial merge。

---

### paragraph-style-id.ts

**模块路径**：`src/word/extensions/paragraph-style-id.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.styleId` | getter/setter | 读写段落样式引用 | `<w:pPr><w:pStyle w:val="...">` |

Prototype mixin。`styleId = "Heading1"` 等价于创建 `ParagraphStyleId` 子元素。

---

### paragraph-tab-stops.ts

**模块路径**：`src/word/extensions/paragraph-tab-stops.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.tabStops` | getter/setter | 读写自定义制表位列表 | `<w:pPr><w:tabs><w:tab>` |

Prototype mixin。返回 `ParagraphTabStop[] { positionDxa, alignment?, leader? }`。setter 整体替换，自动按 positionDxa 升序写入。

---

### run-extensions.ts

**模块路径**：`src/word/extensions/run-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.text` | getter/setter | 读写 Run 内联文本 | `<w:t>` / `<w:tab>` / `<w:br>` |

Prototype mixin。委托 `text-collect.ts`。setter 替换 Text/TabChar/Break 子节点，保留 rPr 等其它子节点。

---

### run-fonts.ts

**模块路径**：`src/word/extensions/run-fonts.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.fontFamily` | getter/setter | 同时设置四个字体字段的快捷方式 | `<w:rPr><w:rFonts>` |
| `Run.prototype.fontFamilyDetail` | getter/setter | 细粒度字体设置（ascii/eastAsia/hAnsi/cs） | `<w:rPr><w:rFonts>` |

Prototype mixin。`fontFamily = "Calibri"` 同时写 ascii / eastAsia / hAnsi / cs 四个属性。

---

### run-formatting.ts

**模块路径**：`src/word/extensions/run-formatting.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.bold` | getter/setter | 加粗（三态 OnOff） | `<w:rPr><w:b>` |
| `Run.prototype.italic` | getter/setter | 斜体（三态 OnOff） | `<w:rPr><w:i>` |
| `Run.prototype.underline` | getter/setter | 下划线样式 | `<w:rPr><w:u>` |
| `Run.prototype.fontSizeHalfPoints` | getter/setter | 字号（半点；24 = 12pt） | `<w:rPr><w:sz>` |
| `Run.prototype.colorHex` | getter/setter | 文字颜色 hex 字符串（无 #） | `<w:rPr><w:color>` |

Prototype mixin。rPr 不存在时自动创建并作为 Run 第一个 child。

---

### run-style-id.ts

**模块路径**：`src/word/extensions/run-style-id.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.styleId` | getter/setter | 读写 Character Style 引用 | `<w:rPr><w:rStyle w:val="...">` |

Prototype mixin。与 `paragraph-style-id.ts` 对称。

---

### table-cell-shading.ts

**模块路径**：`src/word/extensions/table-cell-shading.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `TableCell.prototype.shading` | getter/setter | 读写单元格底纹（背景色/图案） | `<w:tcPr><w:shd>` |

Prototype mixin。返回 `CellShading { fill?, color?, pattern? }`。setter 支持 partial merge。

---

### text-collect.ts

**模块路径**：`src/word/extensions/text-collect.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `collectRunText(root)` | 函数 | 展平 `<w:t>` / `<w:tab>` / `<w:br>` 为字符串 | `Text` / `TabChar` / `Break` |
| `applyRunText(parent, value)` | 函数 | 把字符串写回 Text/TabChar/Break 节点序列 | `Text` / `TabChar` / `Break` |

内部工具模块，供 `run-extensions.ts` 和 `paragraph-extensions.ts` 共用。

---

## PPT 便捷扩展（`src/ppt/extensions/`）

### paragraph-extensions.ts

**模块路径**：`src/ppt/extensions/paragraph-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.text`（DrawingML） | getter（只读） | 展平 DrawingML 段落内所有 Run 文本 | `<a:t>` / `<a:br>` |

Prototype mixin（作用于 `src/drawing/generated/paragraph.ts`）。

---

### paragraph-formatting.ts

**模块路径**：`src/ppt/extensions/paragraph-formatting.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Paragraph.prototype.alignment`（DrawingML） | getter/setter | 读写 DrawingML 段落对齐 | `<a:pPr algn="...">` |
| `Paragraph.prototype.leftMarginEmu` | getter/setter | 左缩进（EMU） | `<a:pPr marL="...">` |
| `Paragraph.prototype.indentEmu` | getter/setter | 首行缩进（EMU，负值为悬挂缩进） | `<a:pPr indent="...">` |

Prototype mixin（作用于 `src/drawing/generated/paragraph.ts`）。

---

### picture-crop.ts

**模块路径**：`src/ppt/extensions/picture-crop.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `getPictureCrop(pic)` | 函数 | 读取 `p:pic` 裁剪设置（百分比） | `<p:blipFill><a:srcRect>` |
| `setPictureCrop(pic, crop)` | 函数 | 设置 `p:pic` 裁剪（百分比 0–100） | `<p:blipFill><a:srcRect>` |

独立函数。操作 `createImagePictureForPpt` 返回的 `p:pic` 元素上的 `a:srcRect`。

---

### run-extensions.ts

**模块路径**：`src/ppt/extensions/run-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.text`（DrawingML） | getter/setter | 读写 DrawingML Run 内联文本 | `<a:t>` / `<a:br>` |

Prototype mixin（作用于 `src/drawing/generated/run.ts`）。

---

### run-formatting.ts

**模块路径**：`src/ppt/extensions/run-formatting.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Run.prototype.bold`（DrawingML） | getter/setter | 加粗（三态） | `<a:rPr b="...">` |
| `Run.prototype.italic`（DrawingML） | getter/setter | 斜体 | `<a:rPr i="...">` |
| `Run.prototype.underline`（DrawingML） | getter/setter | 下划线 | `<a:rPr u="...">` |
| `Run.prototype.fontSizeHundredths` | getter/setter | 字号（1/100 pt；2400 = 24pt） | `<a:rPr sz="...">` |
| `Run.prototype.colorHex`（DrawingML） | getter/setter | 颜色 hex（无 #） | `<a:rPr><a:solidFill><a:srgbClr>` |

Prototype mixin（作用于 `src/drawing/generated/run.ts`）。注意 DrawingML 与 Word 结构有差异：加粗/斜体等直接挂 rPr 属性，颜色走 child 元素链。

---

### shape-accessibility.ts

**模块路径**：`src/ppt/extensions/shape-accessibility.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Shape.prototype.name` | getter/setter | 形状名称 | `<p:nvSpPr><p:cNvPr name="...">` |
| `Shape.prototype.altTitle` | getter/setter | 屏幕阅读器标题 | `<p:nvSpPr><p:cNvPr title="...">` |
| `Shape.prototype.altDescription` | getter/setter | 屏幕阅读器描述 | `<p:nvSpPr><p:cNvPr descr="...">` |

Prototype mixin。nvSpPr / cNvPr 不存在时自动创建。

---

### shape-rotation.ts

**模块路径**：`src/ppt/extensions/shape-rotation.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Shape.prototype.rotationDegrees` | getter/setter | 旋转角度（度，内部存 60000 分之 1 度） | `<p:spPr><a:xfrm rot="...">` |
| `Shape.prototype.flipHorizontal` | getter/setter | 水平翻转 | `<p:spPr><a:xfrm flipH="...">` |
| `Shape.prototype.flipVertical` | getter/setter | 垂直翻转 | `<p:spPr><a:xfrm flipV="...">` |

Prototype mixin。spPr / xfrm 不存在时自动创建。

---

### shape-xfrm.ts

**模块路径**：`src/ppt/extensions/shape-xfrm.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Shape.prototype.position` | getter/setter | 形状位置（EMU，`{ xEmu, yEmu }`） | `<p:spPr><a:xfrm><a:off>` |
| `Shape.prototype.size` | getter/setter | 形状尺寸（EMU，`{ widthEmu, heightEmu }`） | `<p:spPr><a:xfrm><a:ext>` |

Prototype mixin。EMU 单位（914400 = 1 英寸）。

---

### slide-background.ts

**模块路径**：`src/ppt/extensions/slide-background.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Slide.prototype.backgroundColorHex` | getter/setter | 幻灯片背景纯色（hex，无 #） | `<p:cSld><p:bg><p:bgPr><a:solidFill><a:srgbClr>` |

Prototype mixin。setter `undefined` 删除整个 `<p:bg>`；写入时自动创建 bg → bgPr → solidFill → srgbClr 链。

---

### slide-extensions.ts

**模块路径**：`src/ppt/extensions/slide-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Slide.prototype.text` | getter（只读） | 展平整张幻灯片所有文本（段落间 `\n`） | `<a:t>` / `<a:br>` |
| `Shape.prototype.text` | getter（只读） | 展平 Shape 内所有文本 | `<a:t>` / `<a:br>` |

Prototype mixin（作用于 `src/ppt/generated/slide.ts` 和 `src/ppt/generated/shape.ts`）。

---

### slide-hidden.ts

**模块路径**：`src/ppt/extensions/slide-hidden.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Slide.prototype.hidden` | getter/setter | 幻灯片放映时是否隐藏 | `<p:sld show="0/1">` |

Prototype mixin。`show` 属性缺失或为 true → `hidden = false`（可见）；`show="0"` → `hidden = true`（隐藏）。

---

### slide-title.ts

**模块路径**：`src/ppt/extensions/slide-title.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Slide.prototype.title` | getter/setter | 幻灯片标题占位符文本 | `<p:sp><p:nvPr><p:ph type="title">` 对应的 txBody |

Prototype mixin。找到 `type="title"` 或 `"ctrTitle"` 的 placeholder shape，读/写其 txBody。找不到标题占位符时 getter 返 `undefined`，setter 抛错。

---

### slide-transition.ts

**模块路径**：`src/ppt/extensions/slide-transition.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Slide.prototype.transition` | getter/setter | 幻灯片切换效果（fade/push/cut/wipe/split/dissolve） | `<p:transition>` |

Prototype mixin。返回 `SlideTransition { effect, speed?, advanceOnClick?, advanceAfterTimeMs? }`。setter `undefined` 删除 `<p:transition>`。

---

### text-collect.ts

**模块路径**：`src/ppt/extensions/text-collect.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `collectAText(root)` | 函数 | 展平所有 `<a:t>`，段落间插 `\n` | `Text` / `Break` / `Paragraph`（DrawingML） |
| `collectParagraphText(p)` | 函数 | 单 DrawingML 段落内文本展平 | `Text` / `Break` |
| `applyARunText(run, value)` | 函数 | 把字符串写回 DrawingML Run 的 `<a:t>` / `<a:br>` | `Text` / `Break` |

内部工具模块，供 PPT 各 mixin 共用，与 `src/word/extensions/text-collect.ts` 对称。

---

## Excel 便捷扩展（`src/excel/` 与 `src/excel/extensions/`）

### data-validations.ts

**模块路径**：`src/excel/data-validations.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `addCellListValidation(worksheet, sqref, options)` | 函数 | 添加下拉列表验证 | `<x:dataValidations><x:dataValidation>` |
| `addCellRangeValidation(worksheet, sqref, options)` | 函数 | 添加数值/日期/文本长度范围验证 | `<x:dataValidations><x:dataValidation>` |
| `clearCellValidations(worksheet, sqref)` | 函数 | 删除指定范围的验证规则 | `<x:dataValidations>` |
| `getCellValidations(worksheet)` | 函数 | 读取所有验证规则 | `<x:dataValidations>` |

独立函数。自动管理 `<x:dataValidations>` 容器（自动创建、同步 count、空时删除）。

---

### image-markup.ts

**模块路径**：`src/excel/image-markup.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `createImageTwoCellAnchorForExcel(relId, from, to, options)` | 函数 | 构造完整的 `<xdr:twoCellAnchor>` 节点 | `<xdr:twoCellAnchor>` / `<xdr:pic>` / `<xdr:blipFill>` |

独立函数。接受 relId + 两个单元格锚点，返回可直接 `appendChild` 到 `drawingPart.wsDr` 的节点。

---

### merge-cells.ts

**模块路径**：`src/excel/merge-cells.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `mergeCells(worksheet, range)` | 函数 | 添加合并单元格范围（幂等） | `<x:mergeCells><x:mergeCell>` |
| `unmergeCells(worksheet, range)` | 函数 | 删除指定合并范围 | `<x:mergeCells>` |
| `clearAllMergedCells(worksheet)` | 函数 | 清除所有合并范围 | `<x:mergeCells>` |
| `getMergedRanges(worksheet)` | 函数 | 读取当前合并范围列表 | `<x:mergeCells>` |

独立函数。自动管理 `<x:mergeCells>` 容器（按 schema 顺序插入 sheetData 之后、同步 count、空时删除）。

---

### number-format.ts

**模块路径**：`src/excel/number-format.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `setBuiltInNumberFormat(doc, cell, builtInId)` | 函数 | 给 cell 应用内建数字格式 | `<x:cellXfs><x:xf numFmtId="...">` + `cell.styleIndex` |
| `BuiltInNumberFormat` | 常量对象 | 常用内建数字格式 ID 枚举（GENERAL / INTEGER / DATE_SHORT / CURRENCY 等） | — |

独立函数。在 stylesheet.cellFormats 找或创建对应 xf 条目，设置 cell.styleIndex。

---

### shared-string-table.ts

**模块路径**：`src/excel/shared-string-table.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `SharedStringResolver` | 类 | 解引用 / 插入共享字符串 | `<sst><si><t>` |
| `registerSharedStringResolver(worksheet, resolver)` | 函数 | 注册 Worksheet ↔ resolver 关联（Part 层调用） | — |
| `getResolverForWorksheet(worksheet)` | 函数 | 反查 resolver（cell-extensions 内部用） | — |

内部基础设施模块。`SharedStringResolver.resolve(idx)` 解引用共享串，`intern(phrase)` 强制去重插入。被 `cell-extensions.ts` 和 `cell-value-accessor.ts` 消费。

---

### sheet-metadata.ts

**模块路径**：`src/excel/sheet-metadata.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `setSheetState(sheet, state)` | 函数 | 设置 sheet 可见性（visible / hidden / veryHidden） | `<x:sheet state="...">` |
| `getSheetState(sheet)` | 函数 | 读取 sheet 可见性 | `<x:sheet state="...">` |
| `setActiveSheet(workbook, sheetIndex)` | 函数 | 设置激活工作表索引 | `<x:bookViews><x:workbookView activeTab="...">` |
| `getActiveSheet(workbook)` | 函数 | 读取激活工作表索引 | `<x:bookViews><x:workbookView activeTab="...">` |
| `setWorksheetTabColor(worksheet, hex)` | 函数 | 设置工作表标签颜色（ARGB hex） | `<x:sheetPr><x:tabColor rgb="...">` |
| `getWorksheetTabColor(worksheet)` | 函数 | 读取工作表标签颜色 | `<x:sheetPr><x:tabColor rgb="...">` |
| `clearWorksheetTabColor(worksheet)` | 函数 | 清除工作表标签颜色 | `<x:sheetPr><x:tabColor>` |

独立函数。

---

### worksheet-dimensions.ts

**模块路径**：`src/excel/worksheet-dimensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `setColumnWidth(worksheet, range)` | 函数 | 设置列宽（字符数）并自动处理范围重叠 | `<x:cols><x:col>` |
| `getColumnWidth(worksheet, columnIndex)` | 函数 | 读取 1-based 列宽 | `<x:cols><x:col>` |
| `setRowHeight(row, heightPoints)` | 函数 | 设置行高（磅） | `<x:row height="..." customHeight="1">` |
| `getRowHeight(row)` | 函数 | 读取行高 | `<x:row height="...">` |

独立函数。列宽 range 重叠时自动切分/替换，保证结果互不重叠。

---

### worksheet-freeze.ts

**模块路径**：`src/excel/worksheet-freeze.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `setFreezePanes(worksheet, options)` | 函数 | 设置冻结行/列（或解除冻结） | `<x:sheetViews><x:sheetView><x:pane state="frozen">` + `<x:selection>` |
| `getFreezePanes(worksheet)` | 函数 | 读取冻结配置 | `<x:sheetViews><x:sheetView><x:pane>` |

独立函数。自动确保 sheetViews / sheetView 存在；`options = undefined` 解除冻结。

---

### cell-extensions.ts

**模块路径**：`src/excel/extensions/cell-extensions.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Cell.prototype.resolvedText` | getter（只读） | 解引用共享串/inlineStr/直接值的纯文本 | `<v>` / `<is>` / SharedStringTable |
| `Cell.prototype.isDirty` | getter（只读） | 内容是否已改动（供 SpreadsheetDocument flush 用） | — |
| `clearCellDirty(cell)` | 函数（内部） | flush 后复位 dirty 标志 | — |
| `markCellDirty(cell)` | 函数（内部） | 手动标 dirty（formula accessor 用） | — |

Prototype mixin + 内部工具。同时 override `Cell.prototype.appendChild` / `remove` 以追踪 `CellValue` / `CellFormula` 变动，触发 CalcChain 失效（Architecture ADR-019）。

---

### cell-formula-accessor.ts

**模块路径**：`src/excel/extensions/cell-formula-accessor.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Cell.prototype.formula` | getter/setter | 读写 `<f>` 公式文本 | `<c><f>` |
| `Cell.prototype.cachedValue` | getter/setter | 读写 `<v>` 缓存值文本 | `<c><v>` |

Prototype mixin。写入后自动触发 `isDirty = true`，CalcChain 在下次 flush 时失效。

---

### cell-value-accessor.ts

**模块路径**：`src/excel/extensions/cell-value-accessor.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `Cell.prototype.value` | getter/setter | 类型化 cell 值访问器（number / string / boolean / Date / undefined） | `<c t="..." ><v>` / `<is><t>` |

Prototype mixin。getter 依据 `dataType` 自动解引用（s / inlineStr / b / n / str）；setter 自动设置 `dataType` 并写入对应子元素。

---

## Parts 共享便捷函数（`src/parts/`）

### get-or-create-core-properties.ts

**模块路径**：`src/parts/get-or-create-core-properties.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `getOrCreateCorePropertiesPart(pkg, registry)` | 函数 | 找或创建 `CorePropertiesPart`（`/docProps/core.xml`） | IPackage 关系 + Part |

独立函数。Word/Excel/PPT 三族门面共享，避免重复写 bootstrap 逻辑。

---

### get-or-create-custom-file-properties.ts

**模块路径**：`src/parts/get-or-create-custom-file-properties.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `getOrCreateCustomFilePropertiesPart(pkg)` | 函数 | 找或创建 `CustomFilePropertiesPart`（`/docProps/custom.xml`） | IPackage 关系 + Part |

独立函数。

---

### get-or-create-extended-file-properties.ts

**模块路径**：`src/parts/get-or-create-extended-file-properties.ts`

| API | 类型 | 用途 | 底层 SDK 元素 |
| --- | --- | --- | --- |
| `getOrCreateExtendedFilePropertiesPart(pkg)` | 函数 | 找或创建 `ExtendedFilePropertiesPart`（`/docProps/app.xml`） | IPackage 关系 + Part |

独立函数。

---

## 统计摘要

| 分类 | 文件数 | 新增 API 数（约） |
| --- | --- | --- |
| Word 扩展（`src/word/extensions/`） | 14 | ~20 个属性 + 2 个函数 |
| PPT 扩展（`src/ppt/extensions/`） | 14 | ~17 个属性 + 5 个函数 |
| Excel 扩展（`src/excel/`） | 8 | ~15 个函数 |
| Excel 扩展（`src/excel/extensions/`） | 3 | ~7 个属性 + 2 个函数 |
| Parts 共享函数（`src/parts/`） | 3 | 3 个函数 |
| **合计** | **42** | **~64** |

---

*本文档由 Epic-83 生成，随便捷层演进持续更新。*
