# golangci-lint

This GitHub Action runs `golangci-lint` on your Go project, ensuring code quality and enforcing linting rules. It supports using the official `golangci-lint-action` as well as a custom linter binary if a `.custom-gcl.yml` configuration file is present in your repository.

## Features
- Uses the official [`golangci-lint-action`](https://github.com/golangci/golangci-lint-action)
- Supports golangci-lint [plugins](https://golangci-lint.run/plugins/module-plugins/)
- Configurable linting version and working directory

## Inputs

| Name               | Description                                                 | Default Value             | Required |
|--------------------|-------------------------------------------------------------|---------------------------|----------|
| `version`         | The `golangci-lint` version to use                          | `latest`                  | ❌       |
| `custom-gcl-binary` | Path to the custom `golangci-lint` binary                   | `./build/custom-gcl`      | ❌       |
| `skip-cache`      | Whether to skip cache (`true`/`false`)                      | `true`                    | ❌       |
| `working-directory` | Directory to run `golangci-lint` in                        | `.`                       | ❌       |

## Usage

Add the following to your GitHub Actions workflow:

```yaml
name: Lint
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run GolangCI-Lint
        uses: your-org/golangci-lint-action@v1
        with:
          version: "latest"
          working-directory: "./"
          skip-cache: "false"
```

## How It Works
- If `.custom-gcl.yml` is **not** present, the action runs `golangci-lint-action@v6` with the specified inputs.
- If `.custom-gcl.yml` **is** present, it installs `golangci-lint` and runs the custom linter binary.

## License
This GitHub Action is licensed under the [MIT License](LICENSE).

