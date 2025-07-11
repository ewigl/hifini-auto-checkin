## HIFITI 音乐磁场 定时自动签到

利用 Github Actions 定时任务实现自动签到，支持多账号同时签到。

[![HIFINI-Auto-Checkin](https://github.com/ewigl/hifini-auto-checkin/actions/workflows/Checkin.yml/badge.svg)](https://github.com/ewigl/hifini-auto-checkin/actions/workflows/Checkin.yml)

### 仓库变量

- **ACCOUNTS**：账户信息，**多个**账户配置示例如下。推荐使用 [JSON 格式化工具](https://jsoneditoronline.org/) 进行编辑以避免格式出错。

  登陆 HIFITI 后，打开浏览器控制台，输入 `document.cookie`，回车，在字符串上右键，“复制字符串内容”即可得到 Cookie。

  **不要使用网站右上角的“退出”按钮退出登录！这会使 Cookie 失效，如果需要多个账户签到，可以使用无痕模式登录新账号或使用多个浏览器。**

  ```json
  [
    {
      "name": "这里填写账户备注",
      "cookie": "这里填写 Cookie"
    },
    {
      "name": "第 N 个账号",
      "cookie": "这里填写 Cookie"
    }
  ]
  ```

### 使用方法

1. Fork 此仓库。
2. 在 fork 后的仓库中启用 Actions。
3. 配置仓库变量。

详细文档: https://ewigl.github.io/notes/posts/programming/github-actions/

### 注意事项

根据 [GitHub 的政策](https://docs.github.com/zh/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/disabling-and-enabling-a-workflow?tool=webui)，当 60 天内未发生仓库活动时，GitHub 会自动禁用 Actions 定时任务。需要再次手动启用。

### 相关推荐

- [HIFITI 音乐磁场 增强](https://github.com/ewigl/hifiti-enhanced)：一键自动回帖，汇总网盘链接，自动填充网盘提取码。
