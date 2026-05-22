/**
 * Story-15.1：`createHyperlinkRun` 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { createHyperlinkRun } from "../../src/word/index.js";

describe("createHyperlinkRun（Story-15.1）", () => {
  it("外链路径：r:id + Hyperlink rStyle", () => {
    const link = createHyperlinkRun({ relId: "rId7", text: "Click here" });
    const xml = serialize(link);
    // Epic-98: serialize() 现在会在 root element 补全所有用到的 xmlns 声明，
    // 所以 r:id 的 xmlns:r 和 w:* 的 xmlns:w 都出现在 root 上，顺序不固定。
    // 分开断言每个属性存在即可。
    expect(xml).toContain(
      'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"',
    );
    expect(xml).toContain('r:id="rId7"');
    expect(xml).toContain('<w:rStyle w:val="Hyperlink"');
    expect(xml).toContain(">Click here<");
  });

  it("内链路径：w:anchor，没 r:id", () => {
    const link = createHyperlinkRun({ anchor: "bookmark1", text: "Jump" });
    const xml = serialize(link);
    expect(xml).toContain('w:anchor="bookmark1"');
    expect(xml).not.toContain('r:id="');
  });

  it("tooltip 透传到 w:tooltip", () => {
    const link = createHyperlinkRun({ relId: "rId1", text: "x", tooltip: "Open in new tab" });
    const xml = serialize(link);
    expect(xml).toContain('w:tooltip="Open in new tab"');
  });

  it('history=false 写入 w:history="0"', () => {
    const link = createHyperlinkRun({ relId: "rId1", text: "x", history: false });
    expect(serialize(link)).toContain('w:history="0"');
  });

  it('style="" 表示不写 rStyle（用户样式表缺失 Hyperlink 字符样式时的回退）', () => {
    const link = createHyperlinkRun({ relId: "rId1", text: "x", style: "" });
    const xml = serialize(link);
    expect(xml).not.toContain("w:rStyle");
  });

  it("自定义 style", () => {
    const link = createHyperlinkRun({ relId: "rId1", text: "x", style: "InternetLink" });
    expect(serialize(link)).toContain('<w:rStyle w:val="InternetLink"');
  });

  it("前导/尾随空格的文本写入 xml:space=preserve", () => {
    const link = createHyperlinkRun({ relId: "rId1", text: "  pad  " });
    expect(serialize(link)).toContain('xml:space="preserve"');
  });
});
