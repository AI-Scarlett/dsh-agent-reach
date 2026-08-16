# Agent Reach for DSH

Agent Reach for DSH 是一个轻量、安全边界清晰的 DeepSeek Harness Skill 适配插件。
它把 [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) 的联网能力
使用规则挂载到 DSH Skill 目录，使标准/代码 Agent 能发现并按需调用已安装的
Agent Reach CLI 与上游工具。

## 能做什么

- 为网页、GitHub、X/Twitter、Reddit、YouTube、Bilibili、小红书、RSS、V2EX、
  LinkedIn、Facebook、Instagram、雪球和播客提供统一的能力路由说明；
- 使用 `agent-reach doctor --json` 区分可用、需配置和未启用渠道；
- 将只读采集、认证渠道和外部安装边界明确告诉 DSH Agent；
- 在标准 DSH Skill 机制中工作，不修改 DSH 源码，也不替换官方 Skill 清单。

## 重要边界

本仓库是 **DSH 适配层**，不是 Agent Reach Python 运行时：

- 商城安装只挂载 Skill，不会执行 `pip`、`pipx`、Homebrew 或系统安装；
- 不会自动安装浏览器扩展或上游 CLI；
- 不会读取、保存或上传 Cookie、OAuth 凭据和 API Key；
- Agent Reach CLI、Python 3.10+ 和所选渠道依赖需要用户另行安装与授权；
- 第三方平台内容与登录状态仍受各平台规则和账号风险约束。

上游运行时安装说明：
[Agent Reach Installation Guide](https://github.com/Panniantong/Agent-Reach/blob/93ae1d18c37b707dec053c7c4f9d91cd8ef8943d/docs/install.md)。

## DSH 安装

插件商城发布后，在 DSH 中生成安装计划并确认即可。固定 GitHub Commit 会由商城
校验；安装目标不使用浮动分支。

手动开发验证：

```bash
dsh plugin --profile web add /absolute/path/to/dsh-agent-reach
dsh --profile web --dump-config
```

真实 Profile 的安装仍应通过 DSH 的计划、确认、备份、健康检查和失败回滚流程完成。

## 来源

- 上游项目：`Panniantong/Agent-Reach`
- 上游版本：`1.5.0`
- 核验 Commit：`93ae1d18c37b707dec053c7c4f9d91cd8ef8943d`
- 上游许可证：MIT
- 本适配层许可证：MIT

详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) 和
[SECURITY.md](SECURITY.md)。
