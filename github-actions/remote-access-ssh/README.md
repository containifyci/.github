# remote-access-ssh

> **ℹ️ Note: Only support Ubuntu Github runners.**

This GitHub Actions make it able to to use ssh to access the Github Workflow job.

This Action does following things:

- starts a ssh server
- add the public ssh key from the specified `github_user` to the authorized_keys
- start ngrok proxy to enable ssh access from the internet

## Prerequisite

- [ngrok](https://ngrok.com/) account with an auth token

## Usage

```yaml
name: SSHD Action

on:
  workflow_dispatch:
    inputs:
      github_user:
        type: string
        description: The Github user account to setup its public key for ssh authentication (required)
        required: true
jobs:
  remote:
    name: Remote Access
    runs-on: ubuntu-latest
    steps:
      - name: SSH Access
        uses: containifyci/.github/github-actions/remote-access-ssh@v2
        with:
          github_user: ${{ github.event.inputs.github_user }}
          ngrok_auth_token: ${{ secrets.NGROK_AUTH_TOKEN }}
          timeout: 5m
```

## Customizing

| Name             | Type   | Description                                                                                                                       | Required/Default/Used as |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| github_user      | String | The name of the github user to use the public keys for authentication.                                                            | Yes                      |
| ngrok_auth_token | String | The ngrok auth token to setup the ngrok proxy. Can be found at https://dashboard.ngrok.com/get-started/your-authtoken             | Yes                      |
| timeout          | String | The duration to block the Github Workflow execution. Possible values are xs: x seconds, xm: x minutes, xh: x hour and xd: x days. | No/10m                   |
