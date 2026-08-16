# Security

This package is a data-only DSH Skill adapter. It intentionally ships no host
JavaScript and declares no package lifecycle scripts.

Installing the adapter does not install or configure Agent Reach. The upstream
runtime can execute external commands, access arbitrary networks, write under
its own home directory, and use optional API keys, OAuth sessions, or cookies.
Those capabilities require a separate user-controlled installation and should
be treated as high permission.

Report adapter issues through this repository. Report upstream runtime issues
to [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach/issues).
