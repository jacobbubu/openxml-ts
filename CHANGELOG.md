# Changelog

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
