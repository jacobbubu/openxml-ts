/**
 * `PresentationDocument.create()` 的种子 XML —— 最小可用 pptx 各 Part 的字面 XML。
 *
 * 直接 `part.writeAsync(seed)` 写入字节，由 typed Part 的 lazy 反序列化在首次访问
 * 时构造 element 树。这样比 typed 构造省 200+ 行 `new X(); appendChild(...)`，
 * 同时保证 PowerPoint Desktop 接受（手工验证留到 Story-4.10）。
 *
 * XML 经过最小化：保留所有必需元素，去掉空白与注释；命名空间声明仅出现在根元素。
 * Theme 内容参照 .NET Open-XML-SDK 的 default theme（Office 2013+ Calibri 配色），
 * 是 PowerPoint 创建空白演示文稿时同款。
 */

const A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

/** `<p:presentation>` 根：1 master + 1 slide + 4:3 屏幕尺寸 + notes 尺寸。 */
export function seedPresentationXml(opts: {
  slideMasterRId: string;
  slideRId: string;
}): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="${opts.slideMasterRId}"/></p:sldMasterIdLst><p:sldIdLst><p:sldId id="256" r:id="${opts.slideRId}"/></p:sldIdLst><p:sldSz cx="9144000" cy="6858000" type="screen4x3"/><p:notesSz cx="6858000" cy="9144000"/><p:defaultTextStyle/></p:presentation>`;
}

/** 空白 `<p:sld>` 根：单 group shape 占位树 + clrMapOvr 引用 master。 */
export function seedSlideXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
}

/** 空白 `<p:sldLayout>` 根：type=\"blank\"，preserve=\"1\"。 */
export function seedSlideLayoutXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
}

/**
 * `<p:sldMaster>` 根：含背景 fill 引用 + clrMap + sldLayoutIdLst（指 layout1） + txStyles 三档样式。
 * clrMap 把 bg1/tx1/bg2/tx2 映射到 lt1/dk1/lt2/dk2（与 theme1 的 clrScheme 对位）。
 */
export function seedSlideMasterXml(opts: { slideLayoutRId: string }): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:p="${P}" xmlns:r="${R}" xmlns:a="${A}"><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="${opts.slideLayoutRId}"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>`;
}

/**
 * `<a:theme>` 根：完整 clrScheme（12 色）+ fontScheme（Calibri Light 主 / Calibri 辅）+
 * fmtScheme（3 档 fill / line / effect / bgFill），是 PowerPoint 默认 Office 主题。
 *
 * 缺任何一档 PowerPoint Desktop 都会拒开（视为 theme 损坏）。每档「3 个」是 schema
 * 硬约束（minOccurs=maxOccurs=3）。
 */
export function seedThemeXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="${A}" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`;
}
