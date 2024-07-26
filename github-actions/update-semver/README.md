# semver-release

A custom GitHub Action to update Major and Minor version tags when a semantic version is released

## What does it do?

Whenever you create a release of you repository, the major and minor tagged versions will be updated to point
to the commit of your recent tag. For example, if you release version `v1.1.1`, the other two tags `v1` and `v1.1` will
be updated accordingly.

## When to use it?

You can use this Action to update the major and minor releases of your repository. Example use cases:

- a custom GitHub Action or reusable workflow repository
- a helm chart repository
- a Terraform module repository
- a code library or module repository

This operation will let the customers of your repo keep their reference up-to-date without
changing anything. And of course, your customer can always stick to a patch version (e.g. `v1.1.1`) if they'd like to.

<img width="868" alt="release" src="https://user-images.githubusercontent.com/6447444/202710910-9f822bf0-cb27-4508-91c8-54c221dbe51c.png">

## Limitation

With the current implementation, this Action only takes care of updating the major and minor release ref.
It doesn't build or compile your code repository. Feel free to raise an issue or contribute new features when
you see the needs.

## Usage

Create a new workflow file `.github/workflows/publish.yml` for example:

```yaml
name: Publish

on:
  release:
    types: [published, edited]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        with:
          ref: ${{ github.event.release.tag_name }}

      - uses: goflink/github-actions/semver-release@v1
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

## Development

Install packages

```shell
npm install
```

Build distribution

```shell
npm run build
```

The Action code will be built and released to `dist/` directory. You will need to commit and push it.

## Troubleshooting

If you encounter an error like `Error: error:0308010C:digital envelope routines::unsupported` when running the build action, you may need to set the `NODE_OPTIONS` environment variable to `--openssl-legacy-provider` to use the legacy OpenSSL provider.

```bash
ncc: Version 0.25.1
ncc: Compiling file index.js
Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:80:19)
    ....
  opensslErrorStack: [
    'error:03000086:digital envelope routines::initialization error',
    'error:0308010C:digital envelope routines::unsupported'
  ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
```

Solution could be.
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
from [Stackoverflow](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported)
