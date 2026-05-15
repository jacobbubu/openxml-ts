import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts", "src/**/*.test.ts"],
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/index.ts",
        // 纯类型/接口声明文件——运行时无代码可覆盖
        "src/packaging/interfaces/package.ts",
        "src/packaging/interfaces/part.ts",
        "src/packaging/interfaces/properties.ts",
        "src/packaging/interfaces/relationship.ts",
      ],
    },
  },
});
