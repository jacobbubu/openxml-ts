/**
 * Story-11.1：Paragraph / Run `text` 访问器单元测试。
 *
 * 不依赖 fixture 文件——纯内存构造 element 树即可覆盖各种内联文本组合。
 */

import { describe, expect, it } from "vitest";
import { Break, Paragraph, Run, TabChar, Text } from "../../src/word/index.js";

function makeRun(...children: Array<Text | TabChar | Break>): Run {
  const r = new Run();
  for (const c of children) r.appendChild(c);
  return r;
}

function makeText(s: string): Text {
  const t = new Text();
  t.text = s;
  return t;
}

describe("Run.text getter（Story-11.1）", () => {
  it("空 Run 返回空串", () => {
    expect(new Run().text).toBe("");
  });

  it("单个 Text 节点", () => {
    expect(makeRun(makeText("hello")).text).toBe("hello");
  });

  it("多个 Text 节点按文档顺序拼接", () => {
    expect(makeRun(makeText("foo"), makeText("bar")).text).toBe("foobar");
  });

  it("TabChar 展平为 \\t", () => {
    expect(makeRun(makeText("a"), new TabChar(), makeText("b")).text).toBe("a\tb");
  });

  it("Break 展平为 \\n", () => {
    expect(makeRun(makeText("a"), new Break(), makeText("b")).text).toBe("a\nb");
  });

  it("混合 Text / Tab / Break 按顺序展平", () => {
    const r = makeRun(
      makeText("hello"),
      new TabChar(),
      makeText("world"),
      new Break(),
      makeText("again"),
    );
    expect(r.text).toBe("hello\tworld\nagain");
  });
});

describe("Run.text setter（Story-11.1）", () => {
  it("空串清空所有内联文本子节点", () => {
    const r = makeRun(makeText("foo"), new TabChar(), makeText("bar"));
    r.text = "";
    expect(r.children.count).toBe(0);
    expect(r.text).toBe("");
  });

  it("纯文本写一个 Text 节点", () => {
    const r = new Run();
    r.text = "hello";
    expect(r.children.count).toBe(1);
    expect(r.text).toBe("hello");
  });

  it("含 \\t 拆出 TabChar 节点", () => {
    const r = new Run();
    r.text = "a\tb";
    expect(r.text).toBe("a\tb");
    const kinds = r.children.toArray().map((c) => c.constructor.name);
    expect(kinds).toEqual(["Text", "TabChar", "Text"]);
  });

  it("含 \\n 拆出 Break 节点", () => {
    const r = new Run();
    r.text = "line1\nline2";
    expect(r.text).toBe("line1\nline2");
    const kinds = r.children.toArray().map((c) => c.constructor.name);
    expect(kinds).toEqual(["Text", "Break", "Text"]);
  });

  it("setter 覆盖旧文本，不动其它结构性子节点（无 rPr 时为空 Run）", () => {
    const r = makeRun(makeText("old"), new Break(), makeText("text"));
    r.text = "new";
    expect(r.text).toBe("new");
    expect(r.children.count).toBe(1);
  });

  it("前导/尾随空格写入 xml:space=preserve", () => {
    const r = new Run();
    r.text = " padded ";
    const t = r.children.toArray()[0] as Text;
    expect(t.extendedAttributes.get("xml:space")).toBe("preserve");
  });

  it("回环：setter 写入字符串再 getter 读出应一致", () => {
    const samples = [
      "hello",
      "tab\there",
      "line\nbreak",
      "mix\there\nthere\tagain",
      "  leading and trailing  ",
      "",
    ];
    for (const s of samples) {
      const r = new Run();
      r.text = s;
      expect(r.text, `sample=${JSON.stringify(s)}`).toBe(s);
    }
  });
});

describe("Paragraph.text getter（Story-11.1）", () => {
  it("空段落返回空串", () => {
    expect(new Paragraph().text).toBe("");
  });

  it("单个 Run 文本", () => {
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("hello")));
    expect(p.text).toBe("hello");
  });

  it("多个 Run 按顺序拼接", () => {
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("hello ")));
    p.appendChild(makeRun(makeText("world")));
    expect(p.text).toBe("hello world");
  });

  it("Run 之间隐含的 Break / Tab 也按位置展平", () => {
    const p = new Paragraph();
    p.appendChild(makeRun(makeText("a"), new TabChar(), makeText("b")));
    p.appendChild(makeRun(new Break(), makeText("c")));
    expect(p.text).toBe("a\tb\nc");
  });
});
