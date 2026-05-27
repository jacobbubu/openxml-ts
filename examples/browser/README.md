# 浏览器示例

这些 HTML 文件不依赖任何打包工具。直接 HTTP 服务即可运行。

## 本地运行

```bash
# 1. 构建（如果还没构建）
pnpm build

# 2. 启动静态文件服务（任选其一）
npx serve .
# 或 python3 -m http.server 8080

# 3. 浏览器打开
open http://localhost:3000/examples/browser/replace.html
open http://localhost:3000/examples/browser/create.html
open http://localhost:3000/examples/browser/validate.html
```

## 使用 CDN（无需本地构建）

将 HTML 中的 import 从 `../../dist/` 改为 `https://esm.sh/openxml-ts@1.8.0/`：

```html
<script type="module">
  import { WordprocessingDocument, Text } from "https://esm.sh/openxml-ts@1.8.0/word";
  import { OpenXmlValidator, registerConstraints } from "https://esm.sh/openxml-ts@1.8.0/validation";
</script>
```

## 示例

| 文件 | 功能 |
|------|------|
| `replace.html` | 上传模板 → 替换占位符 → 下载 |
| `create.html` | 纯浏览器创建 docx → 下载 |
| `validate.html` | 拖拽上传 → 校验 → 展示错误列表 |
