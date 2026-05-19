/**
 * Epic-24：PPT 文本访问器单元测试。
 */

import { describe, expect, it } from "vitest";
import { Break } from "../../src/drawing/generated/break.js";
import { Paragraph } from "../../src/drawing/generated/paragraph.js";
import { Run } from "../../src/drawing/generated/run.js";
import { Text } from "../../src/drawing/generated/text.js";
// 必要 side-effect 导入以挂上原型 text getter / setter
import "../../src/ppt/index.js";
import { Shape } from "../../src/ppt/generated/shape.js";
import { Slide } from "../../src/ppt/generated/slide.js";

function makeText(s: string): Text {
  const t = new Text();
  t.text = s;
  return t;
}

function makeRun(...children: Array<Text | Break>): Run {
  const r = new Run();
  for (const c of children) r.appendChild(c);
  return r;
}

describe("DrawingML Run.text（Story-24.1）", () => {
  it("getter 展平 Text + Break", () => {
    const r = makeRun(makeText("hello"), new Break(), makeText("world"));
    expect(r.text).toBe("hello\nworld");
  });

  it("空 Run getter 返空串", () => {
    expect(new Run().text).toBe("");
  });

  it("setter 替换内容（rPr 等其它子节点保留——这里没构造）", () => {
    const r = makeRun(makeText("old"));
    r.text = "new";
    expect(r.text).toBe("new");
    expect(r.children.count).toBe(1);
  });

  it("setter 含 \\n 拆出 Break", () => {
    const r = new Run();
    r.text = "line1\nline2";
    expect(r.text).toBe("line1\nline2");
    const kinds = r.children.toArray().map((c) => c.constructor.name);
    expect(kinds).toEqual(["Text", "Break", "Text"]);
  });
});

describe("DrawingML Paragraph.text（Story-24.2）", () => {
  it("getter 展平段落里所有 Run", () => {
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("Hello ")));
    p.appendChild(makeRun(makeText("world")));
    expect(p.text).toBe("Hello world");
  });

  it("段落里的 Break 也展平为 \\n", () => {
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("a"), new Break(), makeText("b")));
    expect(p.text).toBe("a\nb");
  });
});

describe("Slide.text / Shape.text（Story-24.3）", () => {
  it("Shape.text：单段落 + 多 Run", () => {
    const sp = new Shape();
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("Title ")));
    p.appendChild(makeRun(makeText("text")));
    sp.appendChild(p);
    expect(sp.text).toBe("Title text");
  });

  it("Shape.text：多段落 → \\n 分隔", () => {
    const sp = new Shape();
    const p1 = new Paragraph();
    p1.appendChild(makeRun(makeText("First")));
    const p2 = new Paragraph();
    p2.appendChild(makeRun(makeText("Second")));
    sp.appendChild(p1);
    sp.appendChild(p2);
    expect(sp.text).toBe("First\nSecond");
  });

  it("Slide.text：展平 slide 树 — 含多 Shape 多 Paragraph", () => {
    const slide = new Slide();
    // slide > sp1, sp2 直接挂（实际 slide 走 cSld>spTree，但访问器靠 descendants
    // 不假设结构）
    const sp1 = new Shape();
    const p1 = new Paragraph();
    p1.appendChild(makeRun(makeText("Slide title")));
    sp1.appendChild(p1);
    const sp2 = new Shape();
    const p2 = new Paragraph();
    p2.appendChild(makeRun(makeText("Body line 1"), new Break(), makeText("Body line 2")));
    sp2.appendChild(p2);
    slide.appendChild(sp1);
    slide.appendChild(sp2);
    expect(slide.text).toBe("Slide title\nBody line 1\nBody line 2");
  });

  it("Slide.text 空 slide 返空串", () => {
    expect(new Slide().text).toBe("");
  });
});
