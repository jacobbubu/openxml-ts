# Changelog

## [1.2.0](https://github.com/jacobbubu/openxml-ts/compare/v1.1.1...v1.2.0) (2026-05-22)


### Features

* **validation:** Epic-101 OpenXmlValidator 加固——补 OPC 包级校验，消除漏报 ([a50991b](https://github.com/jacobbubu/openxml-ts/commit/a50991be273e4c428087a0834d8d62d6f4e51a72))
* **validation:** Epic-101 OpenXmlValidator 加固——补 OPC 包级校验，消除漏报 ([#296](https://github.com/jacobbubu/openxml-ts/issues/296)) ([4b8bace](https://github.com/jacobbubu/openxml-ts/commit/4b8bace878223c6e3e14a3994388d6a70dcbaca3))


### Bug Fixes

* **ppt,excel:** 修复 PPT 形状 nvSpPr 缺 cNvSpPr/nvPr + Excel sheetView 缺 workbookViewId ([fa7d243](https://github.com/jacobbubu/openxml-ts/commit/fa7d243a62717ac2065613bd2b051160b94c09a6))
* **ppt,excel:** 修复 PPT 形状 nvSpPr 缺 cNvSpPr/nvPr + Excel sheetView 缺 workbookViewId（[#295](https://github.com/jacobbubu/openxml-ts/issues/295)） ([c698d2b](https://github.com/jacobbubu/openxml-ts/commit/c698d2be889799884ce8e277cb4fda66cd0653af))
* **word:** Epic-102 修复子元素顺序违规（rPr schema 顺序 + numbering 分组） ([7824e19](https://github.com/jacobbubu/openxml-ts/commit/7824e19bf8b37c484260615639ff1d25cf7d790e))
* **word:** Epic-102 修复子元素顺序违规（rPr schema 顺序 + numbering 分组）([#301](https://github.com/jacobbubu/openxml-ts/issues/301)) ([afebc3d](https://github.com/jacobbubu/openxml-ts/commit/afebc3daee023bd69c2248c3671b733750ef530a))
* **word:** 修复 Word create() 缺 Default content-type 声明（Epic-99 [#294](https://github.com/jacobbubu/openxml-ts/issues/294)） ([cb1fc0e](https://github.com/jacobbubu/openxml-ts/commit/cb1fc0e1c17e9dca04f91e4f59e34fa3b4d6ff65))
* **word:** 修复 Word create() 缺 Default content-type 声明（Epic-99） ([19a225e](https://github.com/jacobbubu/openxml-ts/commit/19a225e220525794b706dff86d39633621a84ce1))

## [1.1.1](https://github.com/jacobbubu/openxml-ts/compare/v1.1.0...v1.1.1) (2026-05-22)


### Bug Fixes

* **serialize:** 序列化时声明子树用到的全部命名空间前缀 ([#291](https://github.com/jacobbubu/openxml-ts/issues/291)) ([0f31368](https://github.com/jacobbubu/openxml-ts/commit/0f3136817a64fa18b7d1d197a22e87cf2eb68ce4))
* **serialize:** 序列化时把子树用到的命名空间前缀声明到部件根 ([#291](https://github.com/jacobbubu/openxml-ts/issues/291)) ([08a0b6f](https://github.com/jacobbubu/openxml-ts/commit/08a0b6f83d741c60bc14bab463c2efe95b9955c3))
* 修复阻塞 CI 的 package.json 格式 + gen-schematron 非空断言 ([36d5cbf](https://github.com/jacobbubu/openxml-ts/commit/36d5cbf6cd837268869b38e1599f18c32f9caba0))

## [1.1.0](https://github.com/jacobbubu/openxml-ts/compare/v1.0.0...v1.1.0) (2026-05-22)


### Features

* **facade:** Epic-96 三个文档门面新增 changeDocumentType + documentType ([bad4d28](https://github.com/jacobbubu/openxml-ts/commit/bad4d280ed26782a20e7281f644c3024b8130d72))
* **facade:** Epic-96 三个文档门面新增 changeDocumentType + documentType（[#273](https://github.com/jacobbubu/openxml-ts/issues/273)） ([e6291cc](https://github.com/jacobbubu/openxml-ts/commit/e6291cc6bd3771b468fc4a1c15dfffd263ff6fdb))
* **packaging:** Epic-96 文档门面 changeDocumentType ([#273](https://github.com/jacobbubu/openxml-ts/issues/273)) ([cf53fb8](https://github.com/jacobbubu/openxml-ts/commit/cf53fb8f33b76b14387f14d4120430fc6b763d3e))
* **streaming:** Epic-97 流式 API 封装层直连 + OpenXmlDomReader ([6235ac5](https://github.com/jacobbubu/openxml-ts/commit/6235ac5e96bf4c030227dfefabfc1049ef6cac0a))
* **streaming:** Epic-97 流式 API 封装层直连 + OpenXmlDomReader ([#274](https://github.com/jacobbubu/openxml-ts/issues/274)) ([afeedf1](https://github.com/jacobbubu/openxml-ts/commit/afeedf1514f840378ee0598f5cb9ab6519acac4e))


### Bug Fixes

* **api:** 提交 Epic-97 重新生成的 streaming api 报告 ([#274](https://github.com/jacobbubu/openxml-ts/issues/274)) ([c909d06](https://github.com/jacobbubu/openxml-ts/commit/c909d066d333053e9056e6aa3bbce81fabbfe843))

## [1.0.0](https://github.com/jacobbubu/openxml-ts/compare/v0.16.0...v1.0.0) (2026-05-22)


### Features

* **element:** Epic-92 Strict 度量值单位换算 — ST_UniversalMeasure → twips ([6abac87](https://github.com/jacobbubu/openxml-ts/commit/6abac871ac1ae58a37888dc54acb544c02a7d781))
* **element:** Epic-92 Strict 度量值单位换算 — ST_UniversalMeasure → twips ([#263](https://github.com/jacobbubu/openxml-ts/issues/263)) ([3beae6c](https://github.com/jacobbubu/openxml-ts/commit/3beae6c7efa2d324ceaeda487615b2bfec76f360))
* **element:** Epic-95 Features 扩展性体系 — IFeatureCollection + FeatureCollection + OpenXmlElement.features ([6bcecc3](https://github.com/jacobbubu/openxml-ts/commit/6bcecc34ed07df54281d4eae261aa32ecb7232b9))
* **element:** Epic-95 Features 扩展性体系 — 移植 IFeatureCollection + FeatureCollection + OpenXmlElement.features ([#275](https://github.com/jacobbubu/openxml-ts/issues/275)) ([5e6c914](https://github.com/jacobbubu/openxml-ts/commit/5e6c9142d993a2c74c9938568ed9f445b968adb0))
* **validation:** Epic-93 OpenXmlValidator 版本定向校验（FileFormatVersions targeting） ([8199d3e](https://github.com/jacobbubu/openxml-ts/commit/8199d3ee0b5fc9bcad61f20e6884845291257afc))
* **validation:** Epic-93 版本定向校验（FileFormatVersions targeting）([#271](https://github.com/jacobbubu/openxml-ts/issues/271)) ([46f9a95](https://github.com/jacobbubu/openxml-ts/commit/46f9a95e6378af17ab9be131f1a07ccd9cb5941c))
* **values:** Epic-94 补齐 13 个缺失值类型公开面，修复 codegen 映射 ([#272](https://github.com/jacobbubu/openxml-ts/issues/272)) ([b24888f](https://github.com/jacobbubu/openxml-ts/commit/b24888fcc22c15e2a70a2f6a88202056828f6f2f))
* **values:** Epic-94 补齐 13 个缺失值类型公开面（OnOffValue/TrueFalseValue/DoubleValue/Base64BinaryValue 等） ([3cd81d1](https://github.com/jacobbubu/openxml-ts/commit/3cd81d1e7d1a029d1980880fcd476d7fe8daafe1))


### Bug Fixes

* biome format package.json files 字段改为单行（Epic-95 [#275](https://github.com/jacobbubu/openxml-ts/issues/275)） ([bdf8a6a](https://github.com/jacobbubu/openxml-ts/commit/bdf8a6acad472d3a208534b388f9727251781bd2))
* **format:** package.json "files" 字段改为单行（biome 格式要求）([#271](https://github.com/jacobbubu/openxml-ts/issues/271)) ([fd67bfa](https://github.com/jacobbubu/openxml-ts/commit/fd67bfab46a346c0e3c53b9c6267a16814a3610c))
* **test:** Epic-92 strict-measure.test.ts 排除浏览器测试（node:fs 不可用） ([06d83f6](https://github.com/jacobbubu/openxml-ts/commit/06d83f61ef31fe4a09ae6cb9f106ed4919aa8dc0))


### Documentation

* .NET SDK 公开 API 对齐审查报告（1.0 门禁）([#268](https://github.com/jacobbubu/openxml-ts/issues/268)) ([e2452f3](https://github.com/jacobbubu/openxml-ts/commit/e2452f3620746a5cccf42495f909bec81447e29f))
* api-stability.md 增加「与 .NET SDK 的对齐边界」声明 ([#270](https://github.com/jacobbubu/openxml-ts/issues/270)) ([dd085b8](https://github.com/jacobbubu/openxml-ts/commit/dd085b8ff541377d35fa983bddac2cb16ace0e43))
* api-stability.md 增加「与 .NET SDK 的对齐边界」声明 ([#270](https://github.com/jacobbubu/openxml-ts/issues/270)) ([81a4b9a](https://github.com/jacobbubu/openxml-ts/commit/81a4b9a108319673b58573ff73b15b753a7d4b94))
* 新增 .NET SDK 公开 API 对齐审查报告（1.0 门禁）([#268](https://github.com/jacobbubu/openxml-ts/issues/268)) ([f19d0d2](https://github.com/jacobbubu/openxml-ts/commit/f19d0d2a4542a6c138d52304317f4d729be060f7))


### Chore

* 锁定 1.0 正式版 ([98a18cd](https://github.com/jacobbubu/openxml-ts/commit/98a18cd84c2d4bb95627e069585502208c0ce5c1))

## [0.16.0](https://github.com/jacobbubu/openxml-ts/compare/v0.15.0...v0.16.0) (2026-05-21)


### Features

* **deserialize:** Epic-89 Strict 命名空间反序列化归一化 — 完整校验 ([82ce433](https://github.com/jacobbubu/openxml-ts/commit/82ce4338247b42d9506e9bcbeb60d122ae7e843e))
* **deserialize:** Epic-89 Strict 命名空间反序列化归一化 — 完整校验 ([#255](https://github.com/jacobbubu/openxml-ts/issues/255)) ([7122203](https://github.com/jacobbubu/openxml-ts/commit/7122203e9a5c5a20f745703fb6f42f9af2c2eb77))
* **schematron:** Epic-90 完成 943/948 schematron 语义规则覆盖 ([681f842](https://github.com/jacobbubu/openxml-ts/commit/681f84245ab93e30ec818d324a575e2d099c66d6))
* **schematron:** Epic-90 完成 943/948 schematron 语义规则覆盖 ([fdbab90](https://github.com/jacobbubu/openxml-ts/commit/fdbab90f87ee072425379897f21edf4fe3d49050)), closes [#257](https://github.com/jacobbubu/openxml-ts/issues/257)


### Bug Fixes

* **codegen:** 版本条件性 RequiredValidator 不再塌成无条件必填 ([#261](https://github.com/jacobbubu/openxml-ts/issues/261)) ([6ae08a6](https://github.com/jacobbubu/openxml-ts/commit/6ae08a631e8869c999be2d1919dc45836550d386))
* **codegen:** 版本条件性 RequiredValidator 不再塌成无条件必填 ([#261](https://github.com/jacobbubu/openxml-ts/issues/261)) ([84fe836](https://github.com/jacobbubu/openxml-ts/commit/84fe836d0fee2a500f6b39188b2d16630bd1975a))
* **test:** 修复 CI lint 与浏览器测试配置 ([#255](https://github.com/jacobbubu/openxml-ts/issues/255)) ([e231a88](https://github.com/jacobbubu/openxml-ts/commit/e231a8874545f33e5d8809e349583ac1a5141379))

## [0.15.0](https://github.com/jacobbubu/openxml-ts/compare/v0.14.0...v0.15.0) (2026-05-21)


### Features

* **deserialize:** Epic-86 上下文感知反序列化 — 按父元素 schema 消歧同名元素 ([aaf6be9](https://github.com/jacobbubu/openxml-ts/commit/aaf6be99205727bffd54747f0c6b9f8162b94487))
* **deserialize:** Epic-86 上下文感知反序列化 — 按父元素 schema 消歧同名元素 ([#248](https://github.com/jacobbubu/openxml-ts/issues/248)) ([139eac4](https://github.com/jacobbubu/openxml-ts/commit/139eac4851675156e3c738ef4855363513a50b57))
* **element:** Epic-88 OpenXmlElement API 完整性审计与补齐（对齐 .NET SDK 元素方法）([#252](https://github.com/jacobbubu/openxml-ts/issues/252)) ([#253](https://github.com/jacobbubu/openxml-ts/issues/253)) ([aebf21d](https://github.com/jacobbubu/openxml-ts/commit/aebf21d879de92935a37449e331cc62fecda74fb))
* **validation:** Epic-85 schematron 跨 Part 语义约束 — 完成 912/948 全覆盖 ([#246](https://github.com/jacobbubu/openxml-ts/issues/246)) ([#247](https://github.com/jacobbubu/openxml-ts/issues/247)) ([3021be4](https://github.com/jacobbubu/openxml-ts/commit/3021be468fdcb5b3001a14664cf9a5527a76f9b8))


### Bug Fixes

* **test:** Epic-86 context-aware-deserialize 测试排除出浏览器跑批 ([88c7498](https://github.com/jacobbubu/openxml-ts/commit/88c74986b189fd3855e64f26b86deca6f1519782))
* **validation:** Epic-87 Strict 文档 validator 误报必填属性缺失归零 ([#251](https://github.com/jacobbubu/openxml-ts/issues/251)) ([2ae4fc8](https://github.com/jacobbubu/openxml-ts/commit/2ae4fc868c13aff72bbbf82c0bc897840a1f49bc))

## [0.14.0](https://github.com/jacobbubu/openxml-ts/compare/v0.13.0...v0.14.0) (2026-05-21)


### Features

* **validation:** Epic-84 schematron 语义约束 — 按 SDK 类别忠实移植（[#244](https://github.com/jacobbubu/openxml-ts/issues/244)） ([#245](https://github.com/jacobbubu/openxml-ts/issues/245)) ([336b91a](https://github.com/jacobbubu/openxml-ts/commit/336b91a2fba47377c33cd4ad7b0ff35aa1f7b392))


### Documentation

* **audit:** Epic-83 便捷扩展层审计与定性标注（[#240](https://github.com/jacobbubu/openxml-ts/issues/240)） ([#241](https://github.com/jacobbubu/openxml-ts/issues/241)) ([6d97bbd](https://github.com/jacobbubu/openxml-ts/commit/6d97bbd4b1629ce947015bab85cd54d5d24e3088))

## [0.13.0](https://github.com/jacobbubu/openxml-ts/compare/v0.12.0...v0.13.0) (2026-05-21)


### Features

* **markup-compat:** Epic-81 Markup Compatibility (MC) 协商处理 ([#236](https://github.com/jacobbubu/openxml-ts/issues/236)) ([#237](https://github.com/jacobbubu/openxml-ts/issues/237)) ([b090268](https://github.com/jacobbubu/openxml-ts/commit/b0902689b0cb44a4d85f47b6b9868ecbfc08e182))
* **markup-compat:** Epic-82 MC 协商接入文档打开路径（openAsync 自动协商） ([ba7760d](https://github.com/jacobbubu/openxml-ts/commit/ba7760d5d28d20539db7db19b108a935a048a0aa))
* **markup-compat:** Epic-82 MC 协商接入文档打开路径（openAsync 自动协商）([#238](https://github.com/jacobbubu/openxml-ts/issues/238)) ([99f4108](https://github.com/jacobbubu/openxml-ts/commit/99f4108fdd37944bb86d12cd85707f981808baa0))
* **streaming:** Epic-80 流式 API — OpenXmlPartReader + OpenXmlPartWriter ([#235](https://github.com/jacobbubu/openxml-ts/issues/235)) ([42064e7](https://github.com/jacobbubu/openxml-ts/commit/42064e7d025b48497fde5352e29fbf65080a76de))
* **validation:** Epic-79 OpenXmlValidator Phase 2 — schematron 语义规则 ([2f5ad30](https://github.com/jacobbubu/openxml-ts/commit/2f5ad303c9e434cc61e2e4b86f65f34fe50f47be))
* **validation:** Epic-79 OpenXmlValidator Phase 2 — schematron 语义规则 ([#231](https://github.com/jacobbubu/openxml-ts/issues/231)) ([2f5ad30](https://github.com/jacobbubu/openxml-ts/commit/2f5ad303c9e434cc61e2e4b86f65f34fe50f47be))
* **validation:** Epic-79 OpenXmlValidator Phase 2 — schematron 语义规则 ([#231](https://github.com/jacobbubu/openxml-ts/issues/231)) ([4a7d3fe](https://github.com/jacobbubu/openxml-ts/commit/4a7d3fee5e8b3571aca7eb56f7be31e28a0f6656))

## [0.12.0](https://github.com/jacobbubu/openxml-ts/compare/v0.11.0...v0.12.0) (2026-05-21)


### Features

* **chart:** Epic-65 Chart c: 命名空间 codegen 基建 + openxml-ts/chart subpath ([cd2122f](https://github.com/jacobbubu/openxml-ts/commit/cd2122f232225cb41518a19582d971388fe899fd))
* **chart:** Epic-65 Chart c: 命名空间 codegen 基建 + openxml-ts/chart subpath ([#204](https://github.com/jacobbubu/openxml-ts/issues/204)) ([d4f5566](https://github.com/jacobbubu/openxml-ts/commit/d4f55663fba544513a23fd2a391aad88b7e14c39))
* **chart:** Epic-66 ChartPart typed part + 跨命名空间 registry 解析 ([cdc2d98](https://github.com/jacobbubu/openxml-ts/commit/cdc2d98f3ab2f9e7d9964b437d0acd94b453bd86))
* **chart:** Epic-66 ChartPart typed part + 跨命名空间 registry 解析 ([#207](https://github.com/jacobbubu/openxml-ts/issues/207)) ([f9e103f](https://github.com/jacobbubu/openxml-ts/commit/f9e103fb39b1cb9509f29d418ca0a6bf0f66c1bf))
* **codegen:** Epic-68 drawing-family 4 命名空间 codegen（picture/spreadsheetDrawing/wordprocessingDrawing/chartDrawing）([#209](https://github.com/jacobbubu/openxml-ts/issues/209)) ([1f1acf3](https://github.com/jacobbubu/openxml-ts/commit/1f1acf3c42167326538f4c8646288b07cee5f547))
* **codegen:** Epic-68 drawing-family 4 命名空间 codegen（picture/xdr/wp/cdr） ([fcc26f0](https://github.com/jacobbubu/openxml-ts/commit/fcc26f0e250d9fb60e6076a62a0124e60f884d2f))
* **codegen:** Epic-69 OMML math m: 命名空间 codegen + openxml-ts/math subpath ([d7b5e2d](https://github.com/jacobbubu/openxml-ts/commit/d7b5e2d3a547807859f3374125b3b88264efa23f))
* **codegen:** Epic-69 OMML math m: 命名空间 codegen（133 类）+ openxml-ts/math subpath ([#211](https://github.com/jacobbubu/openxml-ts/issues/211)) ([ca845a2](https://github.com/jacobbubu/openxml-ts/commit/ca845a2f6dc93e3f2a6fa60ed2f7f9ecb1df419c))
* **codegen:** Epic-70 P1 officeDocument/drawing 残余命名空间 codegen（8 namespaces） ([c437205](https://github.com/jacobbubu/openxml-ts/commit/c437205a54f5ffe945a3d4bd86b443a0a68bf691))
* **codegen:** Epic-70 P1 officeDocument/drawing 残余命名空间 codegen（8 namespaces）([#213](https://github.com/jacobbubu/openxml-ts/issues/213)) ([2270ac4](https://github.com/jacobbubu/openxml-ts/commit/2270ac4e18081a32a22180fcc2ba9fae1c6a7e0d))
* **codegen:** Epic-71 VML legacy 命名空间 codegen（vml + office:office/excel/word/powerpoint） ([dfe780f](https://github.com/jacobbubu/openxml-ts/commit/dfe780fae50a72b2313e603ceb29b3d4ac3aab13))
* **codegen:** Epic-71 VML legacy 命名空间 codegen（vml + office:office/excel/word/powerpoint）([#215](https://github.com/jacobbubu/openxml-ts/issues/215)) ([d929f55](https://github.com/jacobbubu/openxml-ts/commit/d929f551d148c4203321e7125105222b23c0e335))
* **codegen:** Epic-74 DrawingML diagram (SmartArt dgm:) codegen + openxml-ts/diagram subpath ([25fc92d](https://github.com/jacobbubu/openxml-ts/commit/25fc92d0669870fb4ae4b23963a269c1e7c57bce))
* **codegen:** Epic-74 DrawingML diagram (SmartArt dgm:) codegen + openxml-ts/diagram subpath ([#221](https://github.com/jacobbubu/openxml-ts/issues/221)) ([d515d20](https://github.com/jacobbubu/openxml-ts/commit/d515d20c6ac5ee1029a5e09bd94a41b229edf84f))
* **codegen:** Epic-75 Office 扩展命名空间 codegen（cx/x14/w14/x15/p14/a14，6 个） ([7521953](https://github.com/jacobbubu/openxml-ts/commit/75219535cb06b3ab977c01ca0ebbdbef4fa6df14))
* **codegen:** Epic-75 Office 扩展命名空间 codegen（cx/x14/w14/x15/p14/a14，6 个）([#223](https://github.com/jacobbubu/openxml-ts/issues/223)) ([7521953](https://github.com/jacobbubu/openxml-ts/commit/75219535cb06b3ab977c01ca0ebbdbef4fa6df14))
* **codegen:** Epic-75 Office 扩展命名空间 codegen（cx/x14/w14/x15/p14/a14，6 个）([#223](https://github.com/jacobbubu/openxml-ts/issues/223)) ([2ad0a6a](https://github.com/jacobbubu/openxml-ts/commit/2ad0a6a5d6c4befb1a3007bcb4450913c2dfc63d))
* **codegen:** Epic-76 批量 codegen 剩余全部扩展命名空间 → openxml-ts/office-ext 统一入口 ([1eeda86](https://github.com/jacobbubu/openxml-ts/commit/1eeda86db32fe331a46100511320d0c0c7730fb2))
* **codegen:** Epic-76 批量 codegen 剩余全部扩展命名空间 → openxml-ts/office-ext 统一入口（155 schema 全覆盖） ([2003a2e](https://github.com/jacobbubu/openxml-ts/commit/2003a2edd7a96938ebe6a576a2ac289b9c74011d))
* **codegen:** Epic-77 Part 类层 codegen — 补齐 SDK 全部 typed Part 类（97 个） ([db9e3c7](https://github.com/jacobbubu/openxml-ts/commit/db9e3c74ba9d7b88f9b6bba8b4d2d963825a0f76))
* **codegen:** Epic-77 Part 类层 codegen — 补齐 SDK 全部 typed Part 类（97 个）([#227](https://github.com/jacobbubu/openxml-ts/issues/227)) ([e007f70](https://github.com/jacobbubu/openxml-ts/commit/e007f70c60e4ae6f10d1d84d055b07f83f47e30e))
* **parts:** Epic-72 docProps typed Part（ExtendedFilePropertiesPart / CustomFilePropertiesPart）([#217](https://github.com/jacobbubu/openxml-ts/issues/217)) ([#218](https://github.com/jacobbubu/openxml-ts/issues/218)) ([40f699d](https://github.com/jacobbubu/openxml-ts/commit/40f699d62a264ca084c2021efa11169efc3393df))
* **parts:** Epic-73 CustomXmlPart + CustomXmlPropertiesPart typed Parts（P1 收尾 [#219](https://github.com/jacobbubu/openxml-ts/issues/219)） ([#220](https://github.com/jacobbubu/openxml-ts/issues/220)) ([61fec6b](https://github.com/jacobbubu/openxml-ts/commit/61fec6ba7a2cc32637c8cce04b00e1cd94e5b322))
* **validation:** Epic-78 OpenXmlValidator Phase 1 — 结构(Particle) + 属性校验 ([#230](https://github.com/jacobbubu/openxml-ts/issues/230)) ([e314c6c](https://github.com/jacobbubu/openxml-ts/commit/e314c6c2fabf134d39b0eac39df8017b8515fe5e))


### Bug Fixes

* biome format 新增 test 文件（Epic-75 [#223](https://github.com/jacobbubu/openxml-ts/issues/223)） ([f3b8c99](https://github.com/jacobbubu/openxml-ts/commit/f3b8c9920de0c460fc6bc1b3f664190e2c8b11d2))
* package.json files 数组格式化为单行（biome canonical）([#204](https://github.com/jacobbubu/openxml-ts/issues/204)) ([6a23168](https://github.com/jacobbubu/openxml-ts/commit/6a23168e30aa16157247e610cec44d8a69963e66))
* **ppt:** 恢复 Epic-75 误删的 ppt/index.ts 导出（slide-transition/hidden + docProps/customXml parts）([#223](https://github.com/jacobbubu/openxml-ts/issues/223)) ([58f4280](https://github.com/jacobbubu/openxml-ts/commit/58f42804fcdfc2156792a2c39a6b4b0818e0ce4e))

## [0.11.0](https://github.com/jacobbubu/openxml-ts/compare/v0.10.0...v0.11.0) (2026-05-20)


### Features

* **excel:** Epic-28 命名范围 + 修 codegen 无前缀属性 qname 解析 bug ([#118](https://github.com/jacobbubu/openxml-ts/issues/118)) ([37b9385](https://github.com/jacobbubu/openxml-ts/commit/37b938535b45c6cf4df1d5d6d5451874ef453c00))
* **excel:** Epic-28 命名范围（addDefinedName / removeDefinedName / listDefinedNames） + 顺手修 codegen 无前缀属性 qname 解析 bug ([#118](https://github.com/jacobbubu/openxml-ts/issues/118)) ([4d5d6b2](https://github.com/jacobbubu/openxml-ts/commit/4d5d6b2bc28e05f08c78c1b71a93b57b82534a53))
* **excel:** Epic-32 Excel 冻结窗格便捷层 setFreezePanes/getFreezePanes ([#126](https://github.com/jacobbubu/openxml-ts/issues/126)) ([368ecd3](https://github.com/jacobbubu/openxml-ts/commit/368ecd3973c805ebe8cef599cbccca626749478b))
* **excel:** Epic-32 Excel 冻结窗格便捷层 setFreezePanes/getFreezePanes ([#126](https://github.com/jacobbubu/openxml-ts/issues/126)) ([357f277](https://github.com/jacobbubu/openxml-ts/commit/357f2775b9175b614a774e5652dec30716881b7f))
* **excel:** Epic-33 列宽 / 行高便捷层 setColumnWidth + setRowHeight ([#128](https://github.com/jacobbubu/openxml-ts/issues/128)) ([6b90eac](https://github.com/jacobbubu/openxml-ts/commit/6b90eac67eb397902e7f03bfecd96da759479c85))
* **excel:** Epic-33 列宽 / 行高便捷层 setColumnWidth + setRowHeight ([#128](https://github.com/jacobbubu/openxml-ts/issues/128)) ([3d761cb](https://github.com/jacobbubu/openxml-ts/commit/3d761cb9ee416aacab7cc0d675167810ac48df2b))
* **excel:** Epic-44 Excel 内建数字格式应用 helper setBuiltInNumberFormat ([#153](https://github.com/jacobbubu/openxml-ts/issues/153)) ([2749fc9](https://github.com/jacobbubu/openxml-ts/commit/2749fc98c05c14698e36a238d0861a161466aec2))
* **excel:** Epic-44 Excel 内建数字格式应用 helper setBuiltInNumberFormat ([#153](https://github.com/jacobbubu/openxml-ts/issues/153)) ([6a8e54e](https://github.com/jacobbubu/openxml-ts/commit/6a8e54e3e07c375b99124dca0ef2d6dbf5bb3c0e))
* **excel:** Epic-45 Cell.value typed 访问器 ([a97024a](https://github.com/jacobbubu/openxml-ts/commit/a97024a4e98b7c782596f79329b2e08314a2955a))
* **excel:** Epic-45 Cell.value typed 访问器 ([#155](https://github.com/jacobbubu/openxml-ts/issues/155)) ([2d1798c](https://github.com/jacobbubu/openxml-ts/commit/2d1798c3d20ad4433278357a7017753d67c18aa3))
* **excel:** Epic-49 Cell.formula / cachedValue 独立访问器模块 ([486265d](https://github.com/jacobbubu/openxml-ts/commit/486265d92860efe4c45872bff0a4d02750f76e83))
* **excel:** Epic-49 Cell.formula / cachedValue 独立访问器模块 ([#165](https://github.com/jacobbubu/openxml-ts/issues/165)) ([486265d](https://github.com/jacobbubu/openxml-ts/commit/486265d92860efe4c45872bff0a4d02750f76e83))
* **excel:** Epic-49 Cell.formula / cachedValue 独立访问器模块 ([#165](https://github.com/jacobbubu/openxml-ts/issues/165)) ([2daabcd](https://github.com/jacobbubu/openxml-ts/commit/2daabcd9c38aba89224d214a724c13386cf4e404))
* **excel:** Epic-53 Excel mergeCells 合并单元格 helper ([#172](https://github.com/jacobbubu/openxml-ts/issues/172)) ([#176](https://github.com/jacobbubu/openxml-ts/issues/176)) ([b29986c](https://github.com/jacobbubu/openxml-ts/commit/b29986c644b1e1d1fec11da14141f177a9315e2a))
* **excel:** Epic-58 Excel 数据验证 helper（addCellListValidation / addCellRangeValidation） ([d32677f](https://github.com/jacobbubu/openxml-ts/commit/d32677ffbc0f31b5a7447780279d53a1ae0d2f92))
* **excel:** Epic-58 Excel 数据验证 helper（addCellListValidation / addCellRangeValidation）([#182](https://github.com/jacobbubu/openxml-ts/issues/182)) ([dfb48c1](https://github.com/jacobbubu/openxml-ts/commit/dfb48c1fffd3156ac64b01eddb80bd92ec5e0a08))
* **excel:** Epic-62 Excel Sheet 视觉元数据访问器（tabColor / state / activeTab） ([2502513](https://github.com/jacobbubu/openxml-ts/commit/25025135017d3326c29ec65d54ed51912f489c2b))
* **excel:** Epic-62 Excel Sheet 视觉元数据访问器（tabColor / state / activeTab） ([#191](https://github.com/jacobbubu/openxml-ts/issues/191)) ([eeb72f1](https://github.com/jacobbubu/openxml-ts/commit/eeb72f114e09ee2df9e2f7b85ecf7a8af5e632ff))
* **parts:** Epic-29 跨子系统文档元数据 CoreProperties ([#120](https://github.com/jacobbubu/openxml-ts/issues/120)) ([26d9b0c](https://github.com/jacobbubu/openxml-ts/commit/26d9b0cf87941ca4d1a8f2bba9ca031183540c1b))
* **parts:** Epic-29 跨子系统文档元数据（CoreProperties：title / author / created） ([#120](https://github.com/jacobbubu/openxml-ts/issues/120)) ([74a2164](https://github.com/jacobbubu/openxml-ts/commit/74a2164f30cac5997f40b7b9bc8b1e8a18357749))
* **ppt:** Epic-27 PPT 演讲者注释 ([#116](https://github.com/jacobbubu/openxml-ts/issues/116)) ([6a0e2d3](https://github.com/jacobbubu/openxml-ts/commit/6a0e2d3a1b92c51e8d85ed32dcd013a27d6d165b))
* **ppt:** Epic-27 PPT 演讲者注释（setSlideNotes / getSlideNotes 门面） ([#116](https://github.com/jacobbubu/openxml-ts/issues/116)) ([2a770f3](https://github.com/jacobbubu/openxml-ts/commit/2a770f3419d80f65d124d035bcf7e4f86659d9eb))
* **ppt:** Epic-37 PPT 幻灯片标题访问器 Slide.title ([#137](https://github.com/jacobbubu/openxml-ts/issues/137)) ([e308f59](https://github.com/jacobbubu/openxml-ts/commit/e308f59a4ef4d98611ea82d6043e95f3dfa22019))
* **ppt:** Epic-37 PPT 幻灯片标题访问器 Slide.title ([#137](https://github.com/jacobbubu/openxml-ts/issues/137)) ([b3a77fa](https://github.com/jacobbubu/openxml-ts/commit/b3a77fa37dccc5e1418e205f9eb8e612bec81c11))
* **ppt:** Epic-39 DrawingML Run 格式访问器 bold/italic/underline/fontSize/color ([#143](https://github.com/jacobbubu/openxml-ts/issues/143)) ([db975f9](https://github.com/jacobbubu/openxml-ts/commit/db975f93fa60135c14b8d8f1c8e04e52ecd37005))
* **ppt:** Epic-39 DrawingML Run 格式访问器 bold/italic/underline/fontSize/color ([#143](https://github.com/jacobbubu/openxml-ts/issues/143)) ([87c9bd4](https://github.com/jacobbubu/openxml-ts/commit/87c9bd4d3ac71ffcd668c8967ca53dc7bead5c9a))
* **ppt:** Epic-42 DrawingML Paragraph 段落格式访问器 alignment/leftMargin/indent ([#149](https://github.com/jacobbubu/openxml-ts/issues/149)) ([2c8c539](https://github.com/jacobbubu/openxml-ts/commit/2c8c539c69e25247c209540dbe3c5b9a2a793316))
* **ppt:** Epic-42 DrawingML Paragraph 段落格式访问器 alignment/leftMargin/indent ([#149](https://github.com/jacobbubu/openxml-ts/issues/149)) ([0572adf](https://github.com/jacobbubu/openxml-ts/commit/0572adf8342456fc5bc0d0da71366b51d24f0511))
* **ppt:** Epic-47 PPT 幻灯片背景色访问器 Slide.backgroundColorHex ([d1ebd33](https://github.com/jacobbubu/openxml-ts/commit/d1ebd333de971328683b146ad0bd943f9b2894a8))
* **ppt:** Epic-47 PPT 幻灯片背景色访问器 Slide.backgroundColorHex ([#156](https://github.com/jacobbubu/openxml-ts/issues/156)) ([7c08fe6](https://github.com/jacobbubu/openxml-ts/commit/7c08fe6c36e4bf34d647b55250667fdb40a561a1))
* **ppt:** Epic-48 Shape 无障碍属性访问器（name / altTitle / altDescription） ([60cf534](https://github.com/jacobbubu/openxml-ts/commit/60cf53497cc562db86e29bbf8046b4379029f3b6))
* **ppt:** Epic-48 Shape 无障碍属性访问器（name / altTitle / altDescription）([#158](https://github.com/jacobbubu/openxml-ts/issues/158)) ([807d3ba](https://github.com/jacobbubu/openxml-ts/commit/807d3ba661cff5577987325592b80dd84c2a8f87))
* **ppt:** Epic-51 PPT Slide 演讲者注释自由函数访问器 ([bf0e566](https://github.com/jacobbubu/openxml-ts/commit/bf0e5665ace87e7273c24339177e659b68988b74))
* **ppt:** Epic-51 PPT Slide 演讲者注释自由函数访问器 ([#164](https://github.com/jacobbubu/openxml-ts/issues/164)) ([3a54749](https://github.com/jacobbubu/openxml-ts/commit/3a54749612f4d260bc35c9fe39af08c684c9b52a))
* **ppt:** Epic-52 Shape 定位与尺寸访问器（position / size） ([7a80e4d](https://github.com/jacobbubu/openxml-ts/commit/7a80e4d23f927a72b63cae9f570197873a9637eb))
* **ppt:** Epic-52 Shape 定位与尺寸访问器（position / size）([#166](https://github.com/jacobbubu/openxml-ts/issues/166)) ([7b105e0](https://github.com/jacobbubu/openxml-ts/commit/7b105e0fea3b8ff73eca72395b676f3cc16f2819))
* **ppt:** Epic-55 PPT addSlide 新增幻灯片 helper ([#173](https://github.com/jacobbubu/openxml-ts/issues/173)) ([2fdd0a6](https://github.com/jacobbubu/openxml-ts/commit/2fdd0a6c1dfcfa1ef000f13e18e1389fb7b8d56b))
* **ppt:** Epic-55 PPT addSlide 新增幻灯片 helper (重做 [#179](https://github.com/jacobbubu/openxml-ts/issues/179)) ([e4a72f2](https://github.com/jacobbubu/openxml-ts/commit/e4a72f2905239b5dcb59c2a85e69ec12b45bda7e))
* **ppt:** Epic-56 DrawingML Picture.crop 图片裁剪访问器 ([c684a89](https://github.com/jacobbubu/openxml-ts/commit/c684a89f72d45d6d0f4150b9b4b910787263fa92))
* **ppt:** Epic-56 DrawingML Picture.crop 图片裁剪访问器 ([#175](https://github.com/jacobbubu/openxml-ts/issues/175)) ([39010f2](https://github.com/jacobbubu/openxml-ts/commit/39010f293541e5a5179db2de123b815f698b5dae))
* **ppt:** Epic-59 Slide.transition 切换效果访问器 ([46ed856](https://github.com/jacobbubu/openxml-ts/commit/46ed85649178b2c777253084e0c68546f85c15d8))
* **ppt:** Epic-59 Slide.transition 切换效果访问器 ([#183](https://github.com/jacobbubu/openxml-ts/issues/183)) ([5362e62](https://github.com/jacobbubu/openxml-ts/commit/5362e62f7b1363e4d315bc2c9ad6d4130d9faacf))
* **ppt:** Epic-60 Shape 旋转与翻转访问器 rotationDegrees/flipHorizontal/flipVertical (重做 [#187](https://github.com/jacobbubu/openxml-ts/issues/187)) ([8584d31](https://github.com/jacobbubu/openxml-ts/commit/8584d315c0568a4408dfd710e38b6529e95c8cd8))
* **ppt:** Epic-60 Shape 旋转与翻转访问器（重做 [#187](https://github.com/jacobbubu/openxml-ts/issues/187)） ([00cf7dc](https://github.com/jacobbubu/openxml-ts/commit/00cf7dc151473352c3f9be9c0b03c8b501e11463))
* **ppt:** Epic-63 PPT Slide.hidden 隐藏幻灯片访问器 ([e5b0921](https://github.com/jacobbubu/openxml-ts/commit/e5b09217bb715441cbcd54b64d4e283730b8c4c4))
* **ppt:** Epic-63 PPT Slide.hidden 隐藏幻灯片访问器 ([#197](https://github.com/jacobbubu/openxml-ts/issues/197)) ([71f364e](https://github.com/jacobbubu/openxml-ts/commit/71f364e37c59f0917ad62ed16b406f4b380f4c42))
* **word:** Epic-26 Word 页眉页脚 ([#113](https://github.com/jacobbubu/openxml-ts/issues/113)) ([d7b68ab](https://github.com/jacobbubu/openxml-ts/commit/d7b68ab16683b287c60b928a76244d5163e1e4c2))
* **word:** Epic-26 Word 页眉页脚（HeaderPart / FooterPart + addHeader / addFooter） ([#113](https://github.com/jacobbubu/openxml-ts/issues/113)) ([1094531](https://github.com/jacobbubu/openxml-ts/commit/109453115ea003426c656490ecc32ba9b4894570))
* **word:** Epic-30 Word 段落对齐 + 缩进访问器 ([#122](https://github.com/jacobbubu/openxml-ts/issues/122)) ([a9a86b3](https://github.com/jacobbubu/openxml-ts/commit/a9a86b3c054fe1ffc32198ba483944a931dfb741))
* **word:** Epic-30 Word 段落对齐 + 缩进访问器 ([#122](https://github.com/jacobbubu/openxml-ts/issues/122)) ([4b86429](https://github.com/jacobbubu/openxml-ts/commit/4b86429665580da5caea0fd7a86dc4747585dd89))
* **word:** Epic-31 Word 段落间距访问器 Paragraph.spacing ([#124](https://github.com/jacobbubu/openxml-ts/issues/124)) ([c6cf216](https://github.com/jacobbubu/openxml-ts/commit/c6cf21610d14ef8524b5b7f44523f5b40a2d0b75))
* **word:** Epic-31 Word 段落间距访问器 Paragraph.spacing ([#124](https://github.com/jacobbubu/openxml-ts/issues/124)) ([98922e0](https://github.com/jacobbubu/openxml-ts/commit/98922e0049bd7bbfca7bc2c39f52e404a141fba4))
* **word:** Epic-34 Word 页码字段助手 createPageNumberRun / createTotalPagesRun ([#130](https://github.com/jacobbubu/openxml-ts/issues/130)) ([016873d](https://github.com/jacobbubu/openxml-ts/commit/016873d94b30451cc7e6d582ea3d27b606347cb8))
* **word:** Epic-34 Word 页码字段助手 createPageNumberRun / createTotalPagesRun ([#130](https://github.com/jacobbubu/openxml-ts/issues/130)) ([d6bdb20](https://github.com/jacobbubu/openxml-ts/commit/d6bdb20b78e53e7d72160115e00838942200d004))
* **word:** Epic-35 Word 段落制表位访问器 Paragraph.tabStops ([#132](https://github.com/jacobbubu/openxml-ts/issues/132)) ([bfbda94](https://github.com/jacobbubu/openxml-ts/commit/bfbda94f77edde5642b52d5d16221d0ef7117b90))
* **word:** Epic-35 Word 段落制表位访问器 Paragraph.tabStops ([#132](https://github.com/jacobbubu/openxml-ts/issues/132)) ([7eb9e13](https://github.com/jacobbubu/openxml-ts/commit/7eb9e134ed7979cb608b5f11ae7dee6d2de13f6d))
* **word:** Epic-36 Word 表格单元格底纹访问器 TableCell.shading ([#134](https://github.com/jacobbubu/openxml-ts/issues/134)) ([175d8e9](https://github.com/jacobbubu/openxml-ts/commit/175d8e909ce0386ea3a9c8c81683ffa9beb08f35))
* **word:** Epic-36 Word 表格单元格底纹访问器 TableCell.shading ([#134](https://github.com/jacobbubu/openxml-ts/issues/134)) ([d1ee780](https://github.com/jacobbubu/openxml-ts/commit/d1ee7800c44a1cfc9ff917002446fd0de298fa14))
* **word:** Epic-38 Word Run 格式访问器 bold/italic/underline/fontSize/color ([#141](https://github.com/jacobbubu/openxml-ts/issues/141)) ([64174d7](https://github.com/jacobbubu/openxml-ts/commit/64174d7c4aa6c3fa7af8cd0ccb905b57b819b18c))
* **word:** Epic-38 Word Run 格式访问器 bold/italic/underline/fontSize/color ([#141](https://github.com/jacobbubu/openxml-ts/issues/141)) ([1dc40e0](https://github.com/jacobbubu/openxml-ts/commit/1dc40e06a2cf83b860169e7d8f3aa5b322124938))
* **word:** Epic-40 Word 段落样式 ID 访问器 Paragraph.styleId ([#145](https://github.com/jacobbubu/openxml-ts/issues/145)) ([722c649](https://github.com/jacobbubu/openxml-ts/commit/722c64968efd787c4b47ccd2814163052d52de99))
* **word:** Epic-40 Word 段落样式 ID 访问器 Paragraph.styleId ([#145](https://github.com/jacobbubu/openxml-ts/issues/145)) ([3906a7e](https://github.com/jacobbubu/openxml-ts/commit/3906a7eef05a37a0b6ca4ee168e063089dd40fa0))
* **word:** Epic-41 Word Run 样式 ID 访问器 Run.styleId ([#147](https://github.com/jacobbubu/openxml-ts/issues/147)) ([882b2ab](https://github.com/jacobbubu/openxml-ts/commit/882b2ab06524386079d9e55349efb92601ffb8ea))
* **word:** Epic-41 Word Run 样式 ID 访问器 Run.styleId ([#147](https://github.com/jacobbubu/openxml-ts/issues/147)) ([e04d0ef](https://github.com/jacobbubu/openxml-ts/commit/e04d0efdc0e3e9369d8c62f4bbc2b184dc333cde))
* **word:** Epic-43 Word Paragraph 分页控制访问器 keepNext/keepLines/pageBreakBefore ([#151](https://github.com/jacobbubu/openxml-ts/issues/151)) ([496e754](https://github.com/jacobbubu/openxml-ts/commit/496e75490ebd656c42f10244d6449dd40e67e703))
* **word:** Epic-43 Word Paragraph 分页控制访问器 keepNext/keepLines/pageBreakBefore ([#151](https://github.com/jacobbubu/openxml-ts/issues/151)) ([6217fa4](https://github.com/jacobbubu/openxml-ts/commit/6217fa47b38d05e36e1811c8d9cff3f7ca8d310d))
* **word:** Epic-46 Word Style 创建 helper（createParagraphStyle / createCharacterStyle） ([1743ab4](https://github.com/jacobbubu/openxml-ts/commit/1743ab422d47decd1babae0341cd82dc05a189ba))
* **word:** Epic-46 Word Style 创建 helper（createParagraphStyle / createCharacterStyle）([#157](https://github.com/jacobbubu/openxml-ts/issues/157)) ([86e1687](https://github.com/jacobbubu/openxml-ts/commit/86e1687acb8145e2da332a0a99bf4bac391d3d4b))
* **word:** Epic-50 Word Run fontFamily 访问器（rFonts） ([f2b4cf7](https://github.com/jacobbubu/openxml-ts/commit/f2b4cf70e0fcd9a32e290fc5a55ae6551c9e46a8))
* **word:** Epic-50 Word Run fontFamily 访问器（rFonts）([#163](https://github.com/jacobbubu/openxml-ts/issues/163)) ([5f2a0d4](https://github.com/jacobbubu/openxml-ts/commit/5f2a0d4cfe0df9523346265fae089811d92d636f))
* **word:** Epic-54 Paragraph.numbering 编号访问器 ([#173](https://github.com/jacobbubu/openxml-ts/issues/173)) ([#177](https://github.com/jacobbubu/openxml-ts/issues/177)) ([68aab75](https://github.com/jacobbubu/openxml-ts/commit/68aab756d76225c63d39239beba34542a99bfb96))
* **word:** Epic-57 Word 页眉 / 页脚文本简化访问器 ([#181](https://github.com/jacobbubu/openxml-ts/issues/181)) ([#189](https://github.com/jacobbubu/openxml-ts/issues/189)) ([9f66205](https://github.com/jacobbubu/openxml-ts/commit/9f66205dbf17fd9c47c7e55055a850dc9d0a89fb))
* **word:** Epic-61 Word Section 页面设置 helper（pageSize / pageMargin / orientation）([#190](https://github.com/jacobbubu/openxml-ts/issues/190)) ([#194](https://github.com/jacobbubu/openxml-ts/issues/194)) ([f0e04dd](https://github.com/jacobbubu/openxml-ts/commit/f0e04ddcc7f1b268bb11ccb087c496a658cf4022))
* **word:** Epic-64 Word 脚注 helper（addFootnote / FootnotesPart） ([2faa553](https://github.com/jacobbubu/openxml-ts/commit/2faa553c62df02ffa54ffdfe7ef4e9bfc1df66d0))
* **word:** Epic-64 Word 脚注 helper（addFootnote / FootnotesPart）([#193](https://github.com/jacobbubu/openxml-ts/issues/193)) ([d92cff9](https://github.com/jacobbubu/openxml-ts/commit/d92cff913eb23722d3860def941fdc2f4f331cb2))


### Bug Fixes

* **api:** silence tsdoc-param-tag-with-invalid-name (opts.x param names trigger) ([7e5017c](https://github.com/jacobbubu/openxml-ts/commit/7e5017ce32f2b1527810fd852ff9f30f18fb55e0))
* **excel:** remove multi-line TSDoc code spans causing api-extractor warnings ([#128](https://github.com/jacobbubu/openxml-ts/issues/128)) ([870d721](https://github.com/jacobbubu/openxml-ts/commit/870d721cc5717f7bcd78a576409800076d373579))
* **ppt:** add shape-rotation bare-import to ppt/index.ts ([#184](https://github.com/jacobbubu/openxml-ts/issues/184)) ([4032ee4](https://github.com/jacobbubu/openxml-ts/commit/4032ee48148216656a29f2085b0d71a807aae4e6))
* **ppt:** replace Iterator.find with manual loop (Node 20 兼容) ([#137](https://github.com/jacobbubu/openxml-ts/issues/137)) ([3b66d07](https://github.com/jacobbubu/openxml-ts/commit/3b66d07823a7087a86773bbe012ca16fa0d7916e))
* **word:** constrain OnOff helper generic to OpenXmlElement ([#141](https://github.com/jacobbubu/openxml-ts/issues/141)) ([35af59e](https://github.com/jacobbubu/openxml-ts/commit/35af59ebe7bcfe56359d98988bb73ce3af21771b))
* **word:** narrow lineRule cast to exclude undefined (exactOptionalPropertyTypes) ([#124](https://github.com/jacobbubu/openxml-ts/issues/124)) ([99fc3f0](https://github.com/jacobbubu/openxml-ts/commit/99fc3f0e78d24def2a62a5f6b1f2c30adeef2ffc))


### Documentation

* 1.0 RC README 便捷 API 速查矩阵 ([fb57f87](https://github.com/jacobbubu/openxml-ts/commit/fb57f8725e5fb03ccd13af60bec28a794c8d2fbe))
* 1.0 RC README 便捷 API 速查矩阵（Word/Excel/PPT helper 层） ([4394c58](https://github.com/jacobbubu/openxml-ts/commit/4394c5859fc48c95655bc8f7b5d8fca95bce2e5f))

## [0.10.0](https://github.com/jacobbubu/openxml-ts/compare/v0.9.0...v0.10.0) (2026-05-19)


### Features

* **excel:** Epic-25 Cell.formula / cachedValue 访问器 ([#111](https://github.com/jacobbubu/openxml-ts/issues/111)) ([329c4f4](https://github.com/jacobbubu/openxml-ts/commit/329c4f48d64e599debf1a18fdbf304b4ed2651b4))
* **excel:** Epic-25 Cell.formula / Cell.cachedValue 访问器 ([#111](https://github.com/jacobbubu/openxml-ts/issues/111)) ([c640ccd](https://github.com/jacobbubu/openxml-ts/commit/c640ccd41c6e0a8889adf9baaadac4a4ff625aa6))
* **ppt:** Epic-24 PPT 文本访问器 ([#109](https://github.com/jacobbubu/openxml-ts/issues/109)) ([d6fe526](https://github.com/jacobbubu/openxml-ts/commit/d6fe526e3f49fc0f611ab089ab8e244ec01de541))
* **ppt:** Epic-24 PPT 文本访问器（Slide / Shape / Paragraph / Run.text） ([#109](https://github.com/jacobbubu/openxml-ts/issues/109)) ([acbf71e](https://github.com/jacobbubu/openxml-ts/commit/acbf71ec8969223a768257df7186513cf6d593d7))
* **word:** Epic-23 Word 表格合并单元格 ([#106](https://github.com/jacobbubu/openxml-ts/issues/106)) ([a32ff38](https://github.com/jacobbubu/openxml-ts/commit/a32ff38a0ad9174001a81e5ce723999408f47682))
* **word:** Epic-23 Word 表格合并单元格 mergeDocumentTableCells ([#106](https://github.com/jacobbubu/openxml-ts/issues/106)) ([2b61b91](https://github.com/jacobbubu/openxml-ts/commit/2b61b91d6349895803a26e82905e3368fdac5d54))

## [0.9.0](https://github.com/jacobbubu/openxml-ts/compare/v0.8.0...v0.9.0) (2026-05-19)


### Features

* **ppt:** Epic-17 PPT 表格便捷层 ([#94](https://github.com/jacobbubu/openxml-ts/issues/94)) ([831a44f](https://github.com/jacobbubu/openxml-ts/commit/831a44fea639a8ca6fd17d5631bc649bbd2d586f))
* **ppt:** Epic-17 PPT 表格便捷层（createSlideTable + cell 文本访问器） ([#94](https://github.com/jacobbubu/openxml-ts/issues/94)) ([67253e0](https://github.com/jacobbubu/openxml-ts/commit/67253e0ab4f293b68f0484083dd43b696e4f640b))
* **ppt:** Epic-20 PPT 表格合并单元格 ([#100](https://github.com/jacobbubu/openxml-ts/issues/100)) ([ddb0aef](https://github.com/jacobbubu/openxml-ts/commit/ddb0aefefb42c4ca6e78f1eda8140f2ed7e501ed))
* **ppt:** Epic-20 PPT 表格合并单元格 mergeSlideTableCells ([#100](https://github.com/jacobbubu/openxml-ts/issues/100)) ([a4ff921](https://github.com/jacobbubu/openxml-ts/commit/a4ff9210e8e052c3a2c78b02cd73af138c1158d9))
* **word:** Epic-15 Word 超链接助手 ([#89](https://github.com/jacobbubu/openxml-ts/issues/89)) ([9e34018](https://github.com/jacobbubu/openxml-ts/commit/9e34018b17db6ca7c02d7e142481d37f0c92eeb7))
* **word:** Epic-15 Word 超链接助手（addHyperlinkRelationship + createHyperlinkRun） ([#89](https://github.com/jacobbubu/openxml-ts/issues/89)) ([5d2bf2f](https://github.com/jacobbubu/openxml-ts/commit/5d2bf2fad86acd80050575f9c6215563cafa8719))
* **word:** Epic-16 Word 书签助手 ([#92](https://github.com/jacobbubu/openxml-ts/issues/92)) ([95ea031](https://github.com/jacobbubu/openxml-ts/commit/95ea03117edf09a89a59080049862e20ca55e23c))
* **word:** Epic-16 Word 书签助手——闭环 Epic-15 内部超链接 ([#92](https://github.com/jacobbubu/openxml-ts/issues/92)) ([4bba4ed](https://github.com/jacobbubu/openxml-ts/commit/4bba4ed7925d7b6b7e7261c82d2b5330566518b6))
* **word:** Epic-18 Word 注释便捷层 ([#96](https://github.com/jacobbubu/openxml-ts/issues/96)) ([0eee220](https://github.com/jacobbubu/openxml-ts/commit/0eee2201496e30ee47b860c4a1c63bfd643e374e))
* **word:** Epic-18 Word 注释便捷层（CommentsPart + addComment 门面） ([#96](https://github.com/jacobbubu/openxml-ts/issues/96)) ([8ec5e43](https://github.com/jacobbubu/openxml-ts/commit/8ec5e435b770acbb30e8f95b3963ff944fc2f44d))
* **word:** Epic-19 Word 修订追踪 ([#98](https://github.com/jacobbubu/openxml-ts/issues/98)) ([5ab235e](https://github.com/jacobbubu/openxml-ts/commit/5ab235e435644300d3028ce27eba58d0f01ede98))
* **word:** Epic-19 Word 修订追踪（createInsertedRun / createDeletedRun + nextRevisionId） ([#98](https://github.com/jacobbubu/openxml-ts/issues/98)) ([5cd4a39](https://github.com/jacobbubu/openxml-ts/commit/5cd4a39241217dc98108eb97e56059ba23db6984))
* **word:** Epic-21 Word 表格便捷层 ([#102](https://github.com/jacobbubu/openxml-ts/issues/102)) ([9c15145](https://github.com/jacobbubu/openxml-ts/commit/9c151451cab038159d0b12718c74d82f552b4999))
* **word:** Epic-21 Word 表格便捷层（createDocumentTable + cell 文本访问器） ([#102](https://github.com/jacobbubu/openxml-ts/issues/102)) ([bd675e3](https://github.com/jacobbubu/openxml-ts/commit/bd675e38b24164da3e49d30105c0b7c1e7ff01e0))
* **word:** Epic-22 Word 列表样式 ([#104](https://github.com/jacobbubu/openxml-ts/issues/104)) ([624fb3a](https://github.com/jacobbubu/openxml-ts/commit/624fb3a69ab224c358c47383a6dcad626ce26942))
* **word:** Epic-22 Word 列表样式（NumberingPart + addNumberingDefinition + createListParagraph） ([#104](https://github.com/jacobbubu/openxml-ts/issues/104)) ([8c5481c](https://github.com/jacobbubu/openxml-ts/commit/8c5481c64af85e5495d23405b377b970fbf8d9e8))

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
