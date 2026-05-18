# Changelog

## [0.8.0](https://github.com/jacobbubu/openxml-ts/compare/v0.7.0...v0.8.0) (2026-05-18)


### Features

* **element:** Phase C schema validator opt-in via collectValidationIssues() ([#75](https://github.com/jacobbubu/openxml-ts/issues/75)) ([31210cf](https://github.com/jacobbubu/openxml-ts/commit/31210cff3d258776db71670d4f5b9d26481ef050))
* **excel:** Epic-13 Excel 图片嵌入 ([#85](https://github.com/jacobbubu/openxml-ts/issues/85)) ([92775ce](https://github.com/jacobbubu/openxml-ts/commit/92775ce9d756222e7ac4ca7b03b017ae65a363de))
* **excel:** Epic-13 Excel 图片嵌入（DrawingPart + addImagePart + xdr:twoCellAnchor 助手） ([#85](https://github.com/jacobbubu/openxml-ts/issues/85)) ([6b20ace](https://github.com/jacobbubu/openxml-ts/commit/6b20aceacf93a05e04d2196d4126318106864f6b))
* **packaging:** Phase D 加密 OOXML 检测（CFB 容器嗅探） ([2fe79fb](https://github.com/jacobbubu/openxml-ts/commit/2fe79fb9e879c91fef6327abe1da7542ec0f4351))
* **parts:** Epic-12 跨子系统图片嵌入助手 ([#83](https://github.com/jacobbubu/openxml-ts/issues/83)) ([7bd0a89](https://github.com/jacobbubu/openxml-ts/commit/7bd0a8903d94af19a1d2b59a5067afaa8b44e084))
* **parts:** Epic-12 跨子系统图片嵌入助手（BinaryPart + ImagePart + addImagePart + markup 助手） ([#83](https://github.com/jacobbubu/openxml-ts/issues/83)) ([9338255](https://github.com/jacobbubu/openxml-ts/commit/93382559290ca1ccf1d39a3557863cd901729195))
* **word:** Epic-11 Word 便捷层 ([#77](https://github.com/jacobbubu/openxml-ts/issues/77)) ([c406009](https://github.com/jacobbubu/openxml-ts/commit/c406009dabfc3bfba57ce54db90a457c7c05753a))
* **word:** Epic-11 Word 便捷层（Paragraph/Run.text 访问器 + effective 样式解析） ([#77](https://github.com/jacobbubu/openxml-ts/issues/77)) ([99aaa8f](https://github.com/jacobbubu/openxml-ts/commit/99aaa8f9e05d50a6d21a7f3c5bd5800fcd38fe42))


### Bug Fixes

* **ci:** Build 在 Test 之前 + Browser config 排除 validate.test.ts ([#80](https://github.com/jacobbubu/openxml-ts/issues/80)) ([8c77807](https://github.com/jacobbubu/openxml-ts/commit/8c7780712353904712d940f61e688006b163b35f))
* **codegen:** 元素注册器去重 + 修 w:style → composite Style 优先级 ([#78](https://github.com/jacobbubu/openxml-ts/issues/78)) ([b8ab144](https://github.com/jacobbubu/openxml-ts/commit/b8ab144f53d7dc0a62c71d295f438d05d38eee0a))
* **codegen:** 元素注册器去重 + 修 w:style 优先级 ([#78](https://github.com/jacobbubu/openxml-ts/issues/78)) ([1c45bc9](https://github.com/jacobbubu/openxml-ts/commit/1c45bc964a86a5a682e4077c5b63ae3cb26be3f2))
* **lint:** 修 CI lint 基线 ([#80](https://github.com/jacobbubu/openxml-ts/issues/80)) ([9ff54f6](https://github.com/jacobbubu/openxml-ts/commit/9ff54f6cbee35e8af2c11f1cc751d34c022bbef5))
* **lint:** 修 CI lint 基线——69 errors → 0 ([#80](https://github.com/jacobbubu/openxml-ts/issues/80)) ([c14654d](https://github.com/jacobbubu/openxml-ts/commit/c14654dcc7053cca27b23efde19403e335745663))


### Refactor

* **element:** element-list 自指检测从 \`as unknown\` 换成 \`as OpenXmlElement\` ([265c457](https://github.com/jacobbubu/openxml-ts/commit/265c457fd560f35340d929af04f5448cb3fff8cd))


### Documentation

* Phase A 文档卫生（CONTRIBUTING Epic 列表 + size-limit 不再硬编 + docs/planning 内部标注） ([#72](https://github.com/jacobbubu/openxml-ts/issues/72)) ([5267fde](https://github.com/jacobbubu/openxml-ts/commit/5267fded697cdba86c2771bacd7779360025ccca))
* 代码与类型规范 docs/code-style.md + 审计结论 ([bce91be](https://github.com/jacobbubu/openxml-ts/commit/bce91be270750f7dd623a5ef99d9ec07fdebbec1))

## [0.7.0](https://github.com/jacobbubu/openxml-ts/compare/v0.6.0...v0.7.0) (2026-05-18)


### Features

* **cli:** Epic-9 openxml-ts CLI（inspect / cat） ([#70](https://github.com/jacobbubu/openxml-ts/issues/70)) ([0e43ae3](https://github.com/jacobbubu/openxml-ts/commit/0e43ae35bef47e4622b6af439b1e3408849e3fab))
* **element:** Epic-8 OOXML Strict ↔ Transitional URI 双向兼容 ([#69](https://github.com/jacobbubu/openxml-ts/issues/69)) ([c5cb026](https://github.com/jacobbubu/openxml-ts/commit/c5cb026e83f94a3ad35e3cc20a3f3f7c99b9fcaa))
* **linq:** Epic-7 LINQ mutator API + XDocument.ToString/Save ([#67](https://github.com/jacobbubu/openxml-ts/issues/67)) ([204620b](https://github.com/jacobbubu/openxml-ts/commit/204620b79406021f7c0ad2d6b64708d84e90367c))


### Documentation

* Epic-10 CONTRIBUTING.md + 单页架构总览 ([#71](https://github.com/jacobbubu/openxml-ts/issues/71)) ([0e4321a](https://github.com/jacobbubu/openxml-ts/commit/0e4321aeda4cb915099853e352fcbb8a35a913a4))
* **readme:** 从使用者视角全面重写 README ([639120e](https://github.com/jacobbubu/openxml-ts/commit/639120e6de9e825c956ec491648ce36aed4cdee6))

## [0.6.0](https://github.com/jacobbubu/openxml-ts/compare/v0.5.0...v0.6.0) (2026-05-17)


### Features

* **linq:** Story-5.1 LINQ to XML 基础类型 XName/XNamespace/XElement/XAttribute ([#62](https://github.com/jacobbubu/openxml-ts/issues/62)) ([fc729d8](https://github.com/jacobbubu/openxml-ts/commit/fc729d8f7e540468259c93fd2302451886368dc0))
* **linq:** Story-5.2 Enumerable&lt;T&gt; 链式 LINQ 操作子 ([#64](https://github.com/jacobbubu/openxml-ts/issues/64)) ([06a038e](https://github.com/jacobbubu/openxml-ts/commit/06a038ed6c3240aa27519c198c0f2fe63576a76d))
* **linq:** Story-5.3 XDocument.Parse + Load 兼容入口 ([#65](https://github.com/jacobbubu/openxml-ts/issues/65)) ([5e0e16d](https://github.com/jacobbubu/openxml-ts/commit/5e0e16d222983d17f1153448bfdc1acc4272885e))
* **linq:** Story-5.4 examples/linq-tutorial.ts + README LINQ 节段 ([#66](https://github.com/jacobbubu/openxml-ts/issues/66)) ([233230f](https://github.com/jacobbubu/openxml-ts/commit/233230fbacd147de59d3de932b61f585b401a222))

## [0.5.0](https://github.com/jacobbubu/openxml-ts/compare/v0.4.0...v0.5.0) (2026-05-17)


### Features

* **playground:** Story-6.2 浏览器 Vite playground，三栈 docx/xlsx/pptx 在 chromium 跑通 ([#59](https://github.com/jacobbubu/openxml-ts/issues/59)) ([c71b6d6](https://github.com/jacobbubu/openxml-ts/commit/c71b6d6e22ee885efdac4fce120425db75ef5345))


### Bug Fixes

* **playground:** drop zone 用 display:block 修 label 默认 inline 导致的 dashed border 错位 ([6cd6ec7](https://github.com/jacobbubu/openxml-ts/commit/6cd6ec70a79f3d5eb5653ca44d44c336cc862c49))


### Documentation

* **epic-6:** Story-6.4 浏览器人工验证收尾，3 栈通过 live demo 烟雾测试 ([004f7bb](https://github.com/jacobbubu/openxml-ts/commit/004f7bb5e70834ae886964d1883dceb9dff02646))

## [0.4.0](https://github.com/jacobbubu/openxml-ts/compare/v0.3.0...v0.4.0) (2026-05-17)


### Features

* **drawing:** Story-4.1 DrawingML codegen 落地，产出 383 个 element 类 ([#46](https://github.com/jacobbubu/openxml-ts/issues/46)) ([124a877](https://github.com/jacobbubu/openxml-ts/commit/124a87780db543c2c1a74928ff6a90fd9cbad4d5))
* **pkg:** Story-4.8 双子 entry openxml-ts/ppt + openxml-ts/drawing + size-limit 守护 ([#54](https://github.com/jacobbubu/openxml-ts/issues/54)) ([0a7b0ff](https://github.com/jacobbubu/openxml-ts/commit/0a7b0ff0a36347b94a0a8e1f7ab45542e264367e))
* **ppt:** Story-4.2 PresentationML codegen 落地，产出 269 个 element 类 ([#48](https://github.com/jacobbubu/openxml-ts/issues/48)) ([e068d1a](https://github.com/jacobbubu/openxml-ts/commit/e068d1a65542e9e4396ba5c4c9d385ad42ec89ad))
* **ppt:** Story-4.3 PresentationPart + SlidePart typed Parts ([#49](https://github.com/jacobbubu/openxml-ts/issues/49)) ([77c4c89](https://github.com/jacobbubu/openxml-ts/commit/77c4c89bfc8cb1b166ff4f76a0b0d743d1b5f548))
* **ppt:** Story-4.4 补齐 5 个 typed Part，建立三级版式继承关系网络 ([#50](https://github.com/jacobbubu/openxml-ts/issues/50)) ([9fd3498](https://github.com/jacobbubu/openxml-ts/commit/9fd34988fd542d944521625fbfdffcbf16caf9b5))
* **ppt:** Story-4.5 PresentationDocument 强类型门面 + create() 工厂 ([#51](https://github.com/jacobbubu/openxml-ts/issues/51)) ([9f0f1ed](https://github.com/jacobbubu/openxml-ts/commit/9f0f1edc79f48654c75e84e403d903146bde74cc))
* **ppt:** Story-4.6 三级版式继承 effective* resolver ([#52](https://github.com/jacobbubu/openxml-ts/issues/52)) ([08e7316](https://github.com/jacobbubu/openxml-ts/commit/08e731603a28cc1a0cd81143519824092fb9e3f8))
* **ppt:** Story-4.7 Roundtrip 真实样例 + element golden 生成器适配 ([#53](https://github.com/jacobbubu/openxml-ts/issues/53)) ([ff575ff](https://github.com/jacobbubu/openxml-ts/commit/ff575ff7f15806a40d0e80c7d6dbfe179279a64b))
* **ppt:** Story-4.9 bench/ppt.bench.ts + examples/ppt-{create,replace}.ts + bench-baseline ([#55](https://github.com/jacobbubu/openxml-ts/issues/55)) ([87c5e90](https://github.com/jacobbubu/openxml-ts/commit/87c5e90129b576894b7494360a038e96c790ff8e))

## [0.3.0](https://github.com/jacobbubu/openxml-ts/compare/v0.2.0...v0.3.0) (2026-05-17)


### Features

* **excel:** Story-3.1 codegen 跑通 spreadsheetml namespace，产出 461 个 element 类 ([#32](https://github.com/jacobbubu/openxml-ts/issues/32)) ([119128c](https://github.com/jacobbubu/openxml-ts/commit/119128cb1bcac0d9cf60299df3ef54a2c03041ca))
* **excel:** Story-3.2 WorkbookPart + WorksheetPart typed Parts ([#33](https://github.com/jacobbubu/openxml-ts/issues/33)) ([84c707f](https://github.com/jacobbubu/openxml-ts/commit/84c707fe264bb56efd61a7ae040bb5fc3dccd539))
* **excel:** Story-3.3 SharedStringTable / WorkbookStyles / CalcChain / Theme typed Parts ([#34](https://github.com/jacobbubu/openxml-ts/issues/34)) ([90181b6](https://github.com/jacobbubu/openxml-ts/commit/90181b6b825c7bc0cdf2229d1c0f3a66ed3be487))
* **excel:** Story-3.4 SharedStringResolver + Cell.resolvedText partial mixin ([#35](https://github.com/jacobbubu/openxml-ts/issues/35)) ([89576af](https://github.com/jacobbubu/openxml-ts/commit/89576afcb393349a0838fd4a9f2d9e10e1d51600))
* **excel:** Story-3.5 SpreadsheetDocument 强类型门面 + create() 工厂 ([#36](https://github.com/jacobbubu/openxml-ts/issues/36)) ([c60eb91](https://github.com/jacobbubu/openxml-ts/commit/c60eb91ffe38247596513cd5a071df69eb75bad6))
* **excel:** Story-3.6 CalcChain 自动失效 + Cell dirty tracking ([#37](https://github.com/jacobbubu/openxml-ts/issues/37)) ([a45eba8](https://github.com/jacobbubu/openxml-ts/commit/a45eba83b0616a02cdd7e005efa117354c099624))
* **excel:** Story-3.7 Roundtrip 真实样例 + element golden 生成器适配 ([#38](https://github.com/jacobbubu/openxml-ts/issues/38)) ([6f0bf8e](https://github.com/jacobbubu/openxml-ts/commit/6f0bf8eefde70504e3d178fda8b67c6219dd25f9))
* **excel:** Story-3.8 子 entry openxml-ts/excel + tree-shake size-limit 守护 ([#39](https://github.com/jacobbubu/openxml-ts/issues/39)) ([a01bd4a](https://github.com/jacobbubu/openxml-ts/commit/a01bd4a7d6dbdcb56c730c60fd2b2b7efd9a6079))
* **excel:** Story-3.9 bench/excel.bench.ts + examples 落地 ([#40](https://github.com/jacobbubu/openxml-ts/issues/40)) ([90ba1ba](https://github.com/jacobbubu/openxml-ts/commit/90ba1bace08e2484116b61b05fb74d7f69d11652))


### Bug Fixes

* **element:** xmlns:x 只在 typed.prefix 未绑定时补一次，避免 4x 暴胀与 Excel 拒读 ([#44](https://github.com/jacobbubu/openxml-ts/issues/44)) ([2407ff8](https://github.com/jacobbubu/openxml-ts/commit/2407ff8402e5d3649d720a94c9336fb87283d312))
* **excel:** [Content_Types].xml 补 Default rels/xml，彻底解 Excel Desktop 恢复对话 ([#43](https://github.com/jacobbubu/openxml-ts/issues/43)) ([fa6cf73](https://github.com/jacobbubu/openxml-ts/commit/fa6cf73fffbf3079802111903090598c068af09e))
* **excel:** examples 加 r 引用属性 + 改用 inlineStr，解 Excel Desktop Repaired 警告 ([#41](https://github.com/jacobbubu/openxml-ts/issues/41)) ([0a5b466](https://github.com/jacobbubu/openxml-ts/commit/0a5b466d10a2458798af731efa4103f1d3998d35))
* **excel:** SpreadsheetDocument.create() seed 最小可用 xl/styles.xml，彻底解 Excel Desktop Repaired ([#42](https://github.com/jacobbubu/openxml-ts/issues/42)) ([5f3e69b](https://github.com/jacobbubu/openxml-ts/commit/5f3e69b102ea2c1b33614eee43f05cf84b3dcdfd))
* **packaging:** tokenizer 保留元素内纯空白文本，解 SST &lt;t xml:space=\"preserve\"&gt; &lt;/t&gt; 丢空格 → Excel Repaired ([#45](https://github.com/jacobbubu/openxml-ts/issues/45)) ([31e9dff](https://github.com/jacobbubu/openxml-ts/commit/31e9dff8b20f293bab3825da82b50fda82a4de99))


### Documentation

* **epic-3:** Story-3.10 manual-test 收尾，记录 5 份 Desktop 验证结果与 4 个 0.3.0 release-blocking 修复 ([62edb3a](https://github.com/jacobbubu/openxml-ts/commit/62edb3af162c7852933f561a6c49b059a29fe367))
* **excel:** Epic-3 BMAD 规划阶段三件套（Excel PRD / Architecture / Story 拆分） ([#29](https://github.com/jacobbubu/openxml-ts/issues/29)) ([1a9dd00](https://github.com/jacobbubu/openxml-ts/commit/1a9dd00e9e6ffe7115a7ce236be3cb84cfa4d7d8))
* **ppt:** Epic-4 BMAD 规划阶段三件套（PowerPoint PRD / Architecture / Story 拆分） ([#30](https://github.com/jacobbubu/openxml-ts/issues/30)) ([81c1c0a](https://github.com/jacobbubu/openxml-ts/commit/81c1c0af97e33815bfef5db222c95c5823f64ae7))

## [0.2.0](https://github.com/jacobbubu/openxml-ts/compare/v0.1.0...v0.2.0) (2026-05-16)


### Features

* **codegen:** Story-2.4 Schema codegen 管线（吃 schema JSON → TS element 类）([#19](https://github.com/jacobbubu/openxml-ts/issues/19)) ([31dc96b](https://github.com/jacobbubu/openxml-ts/commit/31dc96b31ff1f01c76f8f2a637eedc42da4a2307))
* **element:** Story-2.1 OpenXmlElement 基础 + 子元素树操作 ([#16](https://github.com/jacobbubu/openxml-ts/issues/16)) ([569651e](https://github.com/jacobbubu/openxml-ts/commit/569651edeb37acbc168f03d621b569eed5f9130d))
* **element:** Story-2.2 强类型属性值（StringValue / EnumValue&lt;T&gt; / ...）([#17](https://github.com/jacobbubu/openxml-ts/issues/17)) ([3027452](https://github.com/jacobbubu/openxml-ts/commit/3027452a56232148db696f6eb3a6ed8a5e0b2973))
* **element:** Story-2.3 XML ↔ Element 树双向序列化 + 注册表 ([#18](https://github.com/jacobbubu/openxml-ts/issues/18)) ([7cc21b1](https://github.com/jacobbubu/openxml-ts/commit/7cc21b12dbb8092cd70adbdd037d22c430261f45))
* **element:** Story-2.7 属性级 Validator + codegen 注入 ([#22](https://github.com/jacobbubu/openxml-ts/issues/22)) ([88322a1](https://github.com/jacobbubu/openxml-ts/commit/88322a16a97b55eb2bad47d8cc0a12df9cca9b96))
* **word:** Story-2.10 Word 性能基线 + Diagnostics 扩展 + 0.2.0 发版准备 ([#25](https://github.com/jacobbubu/openxml-ts/issues/25)) ([90a58f4](https://github.com/jacobbubu/openxml-ts/commit/90a58f44615795efe17244cc338be4e93723bbeb))
* **word:** Story-2.5 生成 wordprocessingml 主 namespace 全部 element 类 ([#20](https://github.com/jacobbubu/openxml-ts/issues/20)) ([90b26eb](https://github.com/jacobbubu/openxml-ts/commit/90b26ebc4a71ea977329b459be0942e26946b083))
* **word:** Story-2.6 WordprocessingDocument + typed Parts ([#21](https://github.com/jacobbubu/openxml-ts/issues/21)) ([300d6fb](https://github.com/jacobbubu/openxml-ts/commit/300d6fbc0c1b3afaf90d8e154ff1b27c0eebebed))
* **word:** Story-2.8 Roundtrip 真实样例 + element golden 生成器 ([#23](https://github.com/jacobbubu/openxml-ts/issues/23)) ([b006b3e](https://github.com/jacobbubu/openxml-ts/commit/b006b3e132fe2f3a9f223008b0b15611f3a6be0a))
* **word:** Story-2.9 子 entry openxml-ts/word + tree-shake size-limit 守护 ([#24](https://github.com/jacobbubu/openxml-ts/issues/24)) ([121760e](https://github.com/jacobbubu/openxml-ts/commit/121760e10a7b3a4397bac6a024b974dfd3fd597a))


### Bug Fixes

* **release:** release-please 取消 0.1.0 release-as 锁，让 0.2.0 minor bump 自动产生 ([#25](https://github.com/jacobbubu/openxml-ts/issues/25)) ([4c0ad0a](https://github.com/jacobbubu/openxml-ts/commit/4c0ad0a495552c6402cee1026dbc02e7c6cdce91))


### Documentation

* Epic-2 BMAD 规划阶段三件套（Word PRD / Architecture / Story 拆分） ([#14](https://github.com/jacobbubu/openxml-ts/issues/14)) ([a1a6237](https://github.com/jacobbubu/openxml-ts/commit/a1a6237087c17a7140c66b05ce40ca3dc0dc5bce))
* **word:** 回写 Story-2.10 examples 人工验证结果 ([#28](https://github.com/jacobbubu/openxml-ts/issues/28)) ([2f6ca38](https://github.com/jacobbubu/openxml-ts/commit/2f6ca38c07c599b7db9d77593ba2693dd6223f75))

## 0.1.0 (2026-05-15)


### Features

* **packaging:** Story-1.1 OPC 接口契约 + 错误模型 ([#4](https://github.com/jacobbubu/openxml-ts/issues/4)) ([64ca803](https://github.com/jacobbubu/openxml-ts/commit/64ca803fc67f06a57cc15b9eab49071e65ced0bb))
* **packaging:** Story-1.2 MemoryPackageBackend + 生命周期 ([#5](https://github.com/jacobbubu/openxml-ts/issues/5)) ([8dda072](https://github.com/jacobbubu/openxml-ts/commit/8dda072f17218bf336c8638a85de406432edbfb9))
* **packaging:** Story-1.3 Content-Types 读写 + 自家 XML 工具 ([#6](https://github.com/jacobbubu/openxml-ts/issues/6)) ([5fe53d2](https://github.com/jacobbubu/openxml-ts/commit/5fe53d2bd7dc9f4f9b9faafa221ec003adbc6142))
* **packaging:** Story-1.4 Relationships XML + rId 与 .NET 对齐 ([#7](https://github.com/jacobbubu/openxml-ts/issues/7)) ([a50b007](https://github.com/jacobbubu/openxml-ts/commit/a50b007d58ee13ba9bd215333b2763ecfa08158e))
* **packaging:** Story-1.5 ZipPackageBackend 接入 `@zip.js/zip.js` ([#8](https://github.com/jacobbubu/openxml-ts/issues/8)) ([85c5929](https://github.com/jacobbubu/openxml-ts/commit/85c592989789d844ce2bb4e90dcba44a2a2d9d76))
* **packaging:** Story-1.6 Parts CRUD 持久化到 ZIP backend ([#9](https://github.com/jacobbubu/openxml-ts/issues/9)) ([fbb1366](https://github.com/jacobbubu/openxml-ts/commit/fbb13668694b1172da8a245f5446bde86134ab67))
* **packaging:** Story-1.7 Flat OPC 互转 ([#10](https://github.com/jacobbubu/openxml-ts/issues/10)) ([6e12baa](https://github.com/jacobbubu/openxml-ts/commit/6e12baa4eb1d8d770114ccb18224f7c81cb069bf))
* **packaging:** Story-1.8 真实 docx/xlsx/pptx Roundtrip + Golden 生成器 ([#11](https://github.com/jacobbubu/openxml-ts/issues/11)) ([8be2f1b](https://github.com/jacobbubu/openxml-ts/commit/8be2f1bdc7aa00d40a96ebc5b1a6bace918c0931))
* **packaging:** Story-1.9 性能基线 + Diagnostics + 0.1.0 发版准备 ([#12](https://github.com/jacobbubu/openxml-ts/issues/12)) ([f91d814](https://github.com/jacobbubu/openxml-ts/commit/f91d814574f52990e54d4eec2b419270fb22a259))


### Documentation

* BMAD 规划三件套 (brief / PRD / architecture) ([#2](https://github.com/jacobbubu/openxml-ts/issues/2)) ([57ffa25](https://github.com/jacobbubu/openxml-ts/commit/57ffa25cb790d4a5b59abbaf5338fd18fc4ff02c))
* **changelog:** 清理 release-please 之前的占位段 ([a3b0256](https://github.com/jacobbubu/openxml-ts/commit/a3b02561dc646ee3383a0689bbb8220eea96709a))
* SM 阶段产出 Epic-1 OPC Packaging 拆分（9 个 Story）([#2](https://github.com/jacobbubu/openxml-ts/issues/2)) ([9146683](https://github.com/jacobbubu/openxml-ts/commit/9146683fdac2904e08c10e086141e6595c1e61e7))

## Changelog

All notable changes to this project will be documented in this file. See
[release-please](https://github.com/googleapis/release-please) for the
automation rules.
