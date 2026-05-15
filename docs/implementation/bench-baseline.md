# 性能基线（Story-1.9）

`pnpm bench` 的首次基线结果。所有数据采集于本地：
**M-series MacBook，Node 20.x / vitest 2.x bench，本地 NVMe**。

合成 1 MB 包：100 个 Part × 10 KB 内容，附带 10 条包级关系。

## NFR-1 阈值对照

| 场景 | 目标 | 测得 | 状态 |
| --- | --- | --- | --- |
| openAsync + 枚举 Parts | ≤ 100 ms p95 | mean **13.6 ms**, p99 25.5 ms | ✅ |
| saveAsBytesAsync 整包透传 | ≤ 200 ms p95 | mean **17.6 ms**, p99 23.8 ms | ✅ |
| createInMemory + saveAsBytesAsync 端到端 | （参考）| mean **19.4 ms**, p99 30.1 ms | ✅ |

## 完整 vitest bench 输出（首次基线 · 2026-05-15）

```
openAsync — 1 MB 包
  · openAsync + 枚举 Parts
    hz 73.55  min 8.85ms  max 25.50ms  mean 13.60ms  p75 14.97ms  p99 25.50ms  rme ±9.80%  samples 37

saveAsBytesAsync — 1 MB 包
  · saveAsBytesAsync 整包透传
    hz 56.83  min 14.37ms max 23.84ms  mean 17.60ms  p75 19.18ms  p99 23.84ms  rme ±5.59%  samples 29

createInMemory + saveAsBytesAsync — 端到端构造
  · 100 个 10KB Part 构造 + ZIP 写出
    hz 51.42  min 13.59ms max 30.12ms  mean 19.45ms  p75 22.67ms  p99 30.12ms  rme ±9.58%  samples 26
```

## 回归判定

- 任一指标 p99 增长 > 50% 视作 release-blocking，PR 必须解释原因；
- mean 增长 > 25% 视作 perf-regression，PR 至少留一条 inline 注释解释原因或申请豁免；
- bench 是非确定性的（rme 偶尔到 ±20%）；小波动不触发回归判定。

跑法：
```bash
pnpm bench         # 一次性
pnpm bench --watch # 改动时持续跑
```

---

## Epic-2 Word 子系统基线（Story-2.10）

`bench/word.bench.ts` 首次基线。合成 fixture：14000 段 `Paragraph × Run × Text`，每行
确定性高熵 token，让 ZIP 压缩后体积接近 element 树规模（约 **1 MB zipped** /
~3 MB 未压缩 XML）。环境同上（M-series MacBook，Node 20.x / vitest 2.x bench）。

### NFR-1.1 / 1.2 阈值对照

| 场景 | 目标（epic-2-prd §NFR-1） | 测得 | 状态 |
| --- | --- | --- | --- |
| openAsync + 主文档 descendants 全量遍历 | ≤ 300 ms p95（1.1） | mean **79.2 ms**, p99 187.4 ms | ✅ |
| 修改 1 个 Text + saveAsBytes 整包写回 | ≤ 200 ms p95（1.2） | mean **101.4 ms**, p99 123.9 ms | ✅ |
| create + 填 14000 段 + saveAsBytes | （参考，端到端） | mean **130.6 ms**, p99 163.5 ms | ✅ |

### 完整 vitest bench 输出（首次基线 · 2026-05-16）

```
WordprocessingDocument.openAsync — 1 MB docx
  · open + 主文档 descendants 遍历
    hz 12.63  min 37.97ms  max 187.38ms  mean 79.21ms  p75 94.87ms  p99 187.38ms  rme ±40.73%  samples 10

element 树 → bytes — 1 MB docx
  · 修改 1 个 Text + saveAsBytes 整包写回
    hz 9.86   min 80.28ms  max 123.92ms  mean 101.38ms p75 115.26ms p99 123.92ms  rme ±10.91%  samples 10

WordprocessingDocument.create — 端到端 14000 段构造
  · create + 填充 + saveAsBytes
    hz 7.66   min 109.77ms max 163.49ms  mean 130.59ms p75 140.30ms p99 163.49ms  rme ±10.41%  samples 10
```

### 回归判定

与 Epic-1 相同：p99 增长 > 50% 视作 release-blocking；mean 增长 > 25% 视作 perf-regression。
bench `rme` 在小样本时可能到 ±40%，单次跑跳水视作噪声，PR review 时连续跑两轮取 mean。

