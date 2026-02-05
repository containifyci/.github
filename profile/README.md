# ContainifyCI

**One binary. Any language. Consistent builds everywhere.**

ContainifyCI is an open-source ecosystem for running containerized CI/CD pipelines. We replace fragile YAML configurations and environment-specific scripts with a single Go binary that builds your projects the same way — locally, in CI, and across teams.

---

## The Problem

CI/CD pipelines are hard to maintain. Different environments drift apart, tools get out of sync, and "works on my machine" becomes "breaks in CI." You end up debugging your pipeline instead of shipping code.

## The Solution

**engine-ci** compiles your entire build pipeline into a single binary. It runs inside containers, uses the exact same tool versions everywhere, and works identically on your laptop and in GitHub Actions.

```bash
# Install
go install github.com/containifyci/engine-ci@latest

# Initialize your project
engine-ci init

# Build — locally or in CI, same result
engine-ci run
```

![Example Build](https://raw.githubusercontent.com/containifyci/engine-ci/main/docs/local-build.gif)

---

## Core Projects

### [engine-ci](https://github.com/containifyci/engine-ci) — The Build Engine

The heart of ContainifyCI. A containerized CI/CD pipeline engine written in Go that supports both Docker and Podman.

- **Declarative builds** — Define your pipeline in Go, not YAML
- **Reproducible** — Containerized execution ensures identical builds everywhere
- **Multi-language** — Go, Java, Python, and more through language extensions
- **Concurrent** — Run build steps in parallel for faster feedback
- **Built-in tooling** — Image scanning (Trivy), release automation (GoReleaser), and more

### [engine-java](https://github.com/containifyci/engine-java) — Java Extension

Adds Maven-based build and packaging support to engine-ci. Use it as a reference for extending engine-ci to any language.

### [engine-python](https://github.com/containifyci/engine-python) — Python Extension

Build Python projects (Flask, FastAPI, etc.) with engine-ci. A minimal example to get started quickly.

---

## DevOps Tooling

### [dunebot](https://github.com/containifyci/dunebot) — PR Automation

A GitHub App that automatically reviews and merges pull requests. Built for Dependabot PRs — keep dependencies up to date without manual intervention.

### [feller](https://github.com/containifyci/feller) — Secret Management for GitHub Actions

A lightweight drop-in for [Teller](https://github.com/tellerops/teller) optimized for GitHub Actions. Supports Google Secret Manager, dotenv providers, and multiple export formats (JSON, YAML, ENV).

### [secret-operator](https://github.com/containifyci/secret-operator) — One-Time Secret Retrieval

Token-based authentication service for securely fetching secrets from GCP Secret Manager during cloud-init. Tokens are time-bound and single-use.

### [go-self-update](https://github.com/containifyci/go-self-update) — Binary Auto-Updates

A Go library for adding self-update capabilities to CLI tools. Checks GitHub releases for new versions, downloads the right binary for your OS/arch, and replaces the running executable.

### [dependabot-templater](https://github.com/containifyci/dependabot-templater) — Dependabot Config Generator

Automatically generates `dependabot.yml` for multi-folder Terraform projects — solving the [missing nested code support](https://github.com/dependabot/dependabot-core/issues/649).

### [oauth2-storage](https://github.com/containifyci/oauth2-storage) — GitHub Token Storage

OAuth service for securely storing and managing GitHub JWT tokens.

---

## Quick Start

**1. Install engine-ci**
```bash
go install github.com/containifyci/engine-ci@latest
```

**2. Initialize your project**
```bash
engine-ci init
```

This creates a `.containifyci/containifyci.go` file — your build definition written in Go.

**3. Run your build**
```bash
engine-ci run
```

That's it. The same command works on macOS, Ubuntu, in GitHub Actions, or anywhere Docker/Podman runs.

---

## Why Go?

We chose Go for pipeline definitions because:

- **Testable** — Write unit tests for your build logic using Go's standard testing framework
- **Type-safe** — Catch configuration errors at compile time, not at runtime
- **Single binary** — No runtime dependencies, no version managers, no "install these 5 tools first"
- **Extensible** — Import packages, write functions, use the full power of a real programming language

---

## Contributing

ContainifyCI is open-source under the **Apache License 2.0**, and we welcome contributions of all kinds.

1. **Fork** the repository you're interested in
2. **Create** a feature branch
3. **Submit** a pull request
4. **Discuss** — open issues, comment on PRs, share ideas

Whether it's a bug fix, a new language extension, or documentation improvements — every contribution matters.

---

**GitHub Organization**: [github.com/containifyci](https://github.com/containifyci)

Let's make CI/CD better, together.
