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
