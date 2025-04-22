## HIFINI 音乐磁场 定时自动签到

利用 Github Actions 定时任务实现自动签到。

[![HIFINI-Auto-Checkin](https://github.com/ewigl/hifini-auto-checkin/actions/workflows/Checkin.yml/badge.svg)](https://github.com/ewigl/hifini-auto-checkin/actions/workflows/Checkin.yml)

### 环境变量

- **Environments**: `HIFINI`
- **Secrets**: `COOKIE`

### 使用方法

1. Fork 此仓库。
2. 在 fork 后的仓库中启用 Workflows。
3. 配置环境变量。

详细文档: https://ewigl.github.io/notes/posts/programming/github-actions/

### 注意事项

根据 [Github 的政策](https://docs.github.com/zh/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/disabling-and-enabling-a-workflow?tool=webui)，当 60 天内未发生仓库活动时，将自动禁用定时 Workflow。需要再次手动启用。

### 相关推荐

- [HIFINI 音乐磁场 增强](https://github.com/ewigl/hifini-enhanced)：一键自动回帖，汇总网盘链接，自动填充网盘提取码。
