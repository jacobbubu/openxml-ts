// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/www_w3_org_2003_InkML.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2003InkMLChildMaps } from "./_child-map.js";
import { ActiveArea } from "./active-area.js";
import { Annotation } from "./annotation.js";
import { AnnotationXml } from "./annotation-xml.js";
import { Bind } from "./bind.js";
import { Brush } from "./brush.js";
import { BrushProperty } from "./brush-property.js";
import { Canvas } from "./canvas.js";
import { CanvasTransform } from "./canvas-transform.js";
import { Channel } from "./channel.js";
import { ChannelProperties } from "./channel-properties.js";
import { ChannelProperty } from "./channel-property.js";
import { Context } from "./context.js";
import { Definitions } from "./definitions.js";
import { Ink } from "./ink.js";
import { InkSource } from "./ink-source.js";
import { IntermittentChannels } from "./intermittent-channels.js";
import { Latency } from "./latency.js";
import { Mapping } from "./mapping.js";
import { Matrix } from "./matrix.js";
import { SampleRate } from "./sample-rate.js";
import { SourceProperty } from "./source-property.js";
import { Table } from "./table.js";
import { Timestamp } from "./timestamp.js";
import { Trace } from "./trace.js";
import { TraceFormat } from "./trace-format.js";
import { TraceGroup } from "./trace-group.js";
import { TraceView } from "./trace-view.js";

/**
 * 把 2003-InkML 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2003InkMLElements(registry: ElementRegistry): void {
  registry.register("http://www.w3.org/2003/InkML", "activeArea", ActiveArea);
  registry.register("http://www.w3.org/2003/InkML", "annotation", Annotation);
  registry.register("http://www.w3.org/2003/InkML", "annotationXML", AnnotationXml);
  registry.register("http://www.w3.org/2003/InkML", "bind", Bind);
  registry.register("http://www.w3.org/2003/InkML", "brush", Brush);
  registry.register("http://www.w3.org/2003/InkML", "brushProperty", BrushProperty);
  registry.register("http://www.w3.org/2003/InkML", "canvas", Canvas);
  registry.register("http://www.w3.org/2003/InkML", "canvasTransform", CanvasTransform);
  registry.register("http://www.w3.org/2003/InkML", "channel", Channel);
  registry.register("http://www.w3.org/2003/InkML", "channelProperties", ChannelProperties);
  registry.register("http://www.w3.org/2003/InkML", "channelProperty", ChannelProperty);
  registry.register("http://www.w3.org/2003/InkML", "context", Context);
  registry.register("http://www.w3.org/2003/InkML", "definitions", Definitions);
  registry.register("http://www.w3.org/2003/InkML", "ink", Ink);
  registry.register("http://www.w3.org/2003/InkML", "inkSource", InkSource);
  registry.register("http://www.w3.org/2003/InkML", "intermittentChannels", IntermittentChannels);
  registry.register("http://www.w3.org/2003/InkML", "latency", Latency);
  registry.register("http://www.w3.org/2003/InkML", "mapping", Mapping);
  registry.register("http://www.w3.org/2003/InkML", "matrix", Matrix);
  registry.register("http://www.w3.org/2003/InkML", "sampleRate", SampleRate);
  registry.register("http://www.w3.org/2003/InkML", "srcProperty", SourceProperty);
  registry.register("http://www.w3.org/2003/InkML", "table", Table);
  registry.register("http://www.w3.org/2003/InkML", "timestamp", Timestamp);
  registry.register("http://www.w3.org/2003/InkML", "trace", Trace);
  registry.register("http://www.w3.org/2003/InkML", "traceFormat", TraceFormat);
  registry.register("http://www.w3.org/2003/InkML", "traceGroup", TraceGroup);
  registry.register("http://www.w3.org/2003/InkML", "traceView", TraceView);
  register2003InkMLChildMaps(registry);
}
