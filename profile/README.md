<p align="center">
  <img src="logo.svg" alt="ContainifyCI Logo" width="125" height="150">
</p>

<h1 align="center">ContainifyCI</h1>

<p align="center"><strong>Stop debugging your pipeline. Start shipping your code.</strong></p>

<p align="center">Containerized CI/CD pipelines defined in Go — identical builds on your laptop and in CI.</p>

<p align="center">
  <a href="https://github.com/containifyci/engine-ci"><img src="https://img.shields.io/github/stars/containifyci/engine-ci?style=flat&label=Stars" alt="GitHub Stars"></a>&nbsp;
  <a href="https://github.com/containifyci/engine-ci/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="License"></a>&nbsp;
  <a href="https://github.com/containifyci/engine-ci/releases"><img src="https://img.shields.io/github/v/release/containifyci/engine-ci" alt="Latest Release"></a>&nbsp;
  <img src="https://img.shields.io/badge/Go-1.25+-00ADD8?logo=go&logoColor=white" alt="Go Version">
</p>

<p align="center">
  <a href="https://github.com/containifyci/engine-ci"><strong>Get Started</strong></a> &nbsp;&bull;&nbsp;
  <a href="#the-old-way-vs-the-containifyci-way">See the Difference</a> &nbsp;&bull;&nbsp;
  <a href="#ecosystem">Ecosystem</a> &nbsp;&bull;&nbsp;
  <a href="#under-the-hood">Technical Deep Dive</a>
</p>

---

## Your builds should just work

Every team hits the same wall. The build passes on your laptop but breaks in CI. A new developer joins and loses a day setting up their environment. A silent version mismatch ships a broken artifact to production.

**You end up debugging your pipeline instead of building your product.**

ContainifyCI eliminates this entire class of problems. Define your pipeline in Go, run it in containers, and get identical results everywhere — your machine, your teammate's machine, and CI.

```
engine-ci run
```

One command. No YAML. No drift. No surprises.

---

## The old way vs. the ContainifyCI way

<table>
<tr>
<th width="50%">Without ContainifyCI</th>
<th width="50%">With ContainifyCI</th>
</tr>
<tr>
<td>

- Hundreds of lines of YAML nobody wants to touch
- "Works on my machine" but fails in CI
- New developers spend hours setting up tooling
- Different tool versions across environments
- Pipeline logic scattered across shell scripts
- Debugging means push-and-pray

</td>
<td>

- Pipeline defined in **real, testable code**
- **Identical builds** on every machine, every time
- New developers run **one command** and they're ready
- Tool versions **pinned in containers** automatically
- All build logic in **one place**, version-controlled
- **Debug locally** before you push

</td>
</tr>
</table>

---

## How it works

<table>
<tr>
<td width="33%" align="center">

### Define

Write your build pipeline in Go — a real language with types, tests, and your IDE's full support. No more guessing if your YAML is valid.

</td>
<td width="33%" align="center">

### Containerize

Every step runs inside a container with pinned tool versions. What runs on your laptop is exactly what runs in CI.

</td>
<td width="33%" align="center">

### Ship

One binary, zero dependencies. Works anywhere Docker or Podman runs — macOS, Linux, GitHub Actions, or your own infrastructure.

</td>
</tr>
</table>

---

## Why teams choose ContainifyCI

**Builds that never drift** — Containers lock down every tool version. The "but it works on my laptop" conversation is over.

**Onboard in minutes, not days** — New team members run `engine-ci run` and get the exact same build as everyone else. No setup wikis. No tribal knowledge.

**One tool for every language** — Go, Java, Python, and more through a modular extension system. Your team learns one workflow regardless of the stack.

**Security built in, not bolted on** — Container image scanning, secret management, and automated dependency updates are part of the pipeline — not afterthoughts.

**Fast by default** — Build steps run in parallel where possible. No configuration needed — ContainifyCI figures out what can run concurrently.

**No vendor lock-in** — Works with Docker and Podman. Runs in GitHub Actions, GitLab CI, or any environment with a container runtime. Your pipeline is yours.

---

## Get started in 30 seconds

```bash
# 1. Install
go install github.com/containifyci/engine-ci@latest

# 2. Initialize your project
engine-ci init

# 3. Build — same result everywhere
engine-ci run
```

`engine-ci init` creates a `.containifyci/containifyci.go` file — your entire build pipeline in a single Go file that you can read, test, and version-control like any other code.

---

## Real-world example

Here's how [dunebot](https://github.com/containifyci/dunebot) — a real ContainifyCI project — defines its entire build and CI pipeline.

**1. Define your build** — `.containifyci/containifyci.go`

```go
package main

import (
    "os"

    "github.com/containifyci/engine-ci/client/pkg/build"
    "github.com/containifyci/engine-ci/protos2"
)

func main() {
    os.Chdir("../")
    opts := build.NewGoServiceBuild("dunebot")
    opts.Application = "dunebot"
    opts.File = "main.go"
    opts.Properties = map[string]*build.ListValue{
        "goreleaser": build.NewList("true"),
    }
    build.Serve(opts)
}
```

That's the entire build definition. Linting, testing, building, container image scanning, and release automation — all handled by `engine-ci`.

**2. Wire it into GitHub Actions** — `.github/workflows/pull-request.yaml`

```yaml
name: Pull Request
on:
  pull_request:
    branches: [main]

jobs:
  build:
    name: Build
    uses: containifyci/.github/.github/workflows/pull-request.yml@v1
    secrets: inherit
```

**3. Add a release workflow** — `.github/workflows/release.yaml`

```yaml
name: Release
on:
  push:
    branches: [main]
    paths-ignore: ['.github/**']

jobs:
  build-and-release:
    uses: containifyci/.github/.github/workflows/release.yml@v1
    secrets: inherit
```

That's it. **One Go file** for your build logic. **Two tiny YAML files** to connect it to GitHub Actions. The same `engine-ci run` command works locally and in CI — no divergence, no surprises.

> See the full working example at [containifyci/dunebot/.github/workflows](https://github.com/containifyci/dunebot/tree/main/.github/workflows)

---

## Ecosystem

ContainifyCI is more than a build engine. It's a growing toolkit for modern CI/CD.

### Build Engine

| | Project | Description |
|---|---|---|
| | [**engine-ci**](https://github.com/containifyci/engine-ci) | The core — containerized CI/CD pipelines defined in Go |
| | [**engine-java**](https://github.com/containifyci/engine-java) | Java & Maven build support |
| | [**engine-python**](https://github.com/containifyci/engine-python) | Python build support |

### Automation & Security

| | Project | Description |
|---|---|---|
| | [**dunebot**](https://github.com/containifyci/dunebot) | GitHub App that auto-reviews and merges dependency PRs |
| | [**feller**](https://github.com/containifyci/feller) | Secret management for GitHub Actions (Google Secret Manager, dotenv, and more) |
| | [**secret-operator**](https://github.com/containifyci/secret-operator) | One-time secret retrieval for secure cloud provisioning |

### Developer Tools

| | Project | Description |
|---|---|---|
| | [**go-self-update**](https://github.com/containifyci/go-self-update) | Add auto-update capabilities to any Go CLI |
| | [**dependabot-templater**](https://github.com/containifyci/dependabot-templater) | Auto-generate Dependabot configs for multi-folder repos |

---

<details>
<summary><h2 id="under-the-hood">Under the Hood</h2></summary>

### Why Go instead of YAML?

Most CI tools force you into YAML or a proprietary DSL. ContainifyCI takes a different approach: your pipeline is Go code.

| | YAML pipelines | Go pipelines (ContainifyCI) |
|---|---|---|
| **Error detection** | Runtime — fails mid-build | Compile time — fails before build starts |
| **Testing** | Manual / none | Unit tests with `go test` |
| **IDE support** | Syntax highlighting only | Full autocomplete, refactoring, go-to-definition |
| **Reuse** | Copy-paste snippets | Import packages, call functions |
| **Debugging** | Push and pray | Run locally, set breakpoints |

### Architecture

```
Your code (.containifyci/containifyci.go)
        |
        v
   engine-ci CLI  ──>  Compiles to single binary
        |
        v
  Container runtime (Docker / Podman)
        |
        v
  Isolated build steps with pinned tool versions
```

**engine-ci** reads your build definition from `.containifyci/containifyci.go`, compiles it into a self-contained binary, and orchestrates containers to execute each build step in isolation. Tool versions are pinned inside the containers — not on the host machine.

Language support is modular. [engine-java](https://github.com/containifyci/engine-java) and [engine-python](https://github.com/containifyci/engine-python) are extensions that plug into the core. Adding support for a new language means writing a Go package that implements the build interface.

### Key integrations

- **Container runtimes** — Docker and Podman, no vendor lock-in
- **Image scanning** — Trivy for automatic vulnerability detection
- **Release automation** — GoReleaser for versioned releases
- **Secret management** — [feller](https://github.com/containifyci/feller) for GitHub Actions secrets
- **Dependency automation** — [dunebot](https://github.com/containifyci/dunebot) for auto-merging Dependabot PRs

</details>

---

## Contributing

ContainifyCI is open-source under the **Apache License 2.0**. We welcome every kind of contribution.

**Use it** — Try engine-ci on your project and tell us what breaks.
**Fix it** — Found a bug? PRs are always welcome.
**Extend it** — Build a language extension and share it with the community.
**Talk about it** — Open issues, start discussions, share your experience.

<p align="center">
  <a href="https://github.com/containifyci"><strong>github.com/containifyci</strong></a>
</p>

<p align="center"><em>Let's make CI/CD better, together.</em></p>
