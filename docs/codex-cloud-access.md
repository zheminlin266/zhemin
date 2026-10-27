# Hosting and DNS access

This document records the Windows CLI setup validated on 2026-10-15 and the
hosting/DNS targets to verify before an authorized operation. This Windows user
uses the official Vercel CLI for hosting and Tencent Cloud CLI (`tccli`) for
DNSPod. These credentials are local to that machine and are not in the repository.

## Codex Cloud boundary

- Development and builds need no hosting or DNS credentials. See
  [codex-handoff.md](./codex-handoff.md) for the development environment.
- A fresh cloud checkout has no Windows CLI login, `codex-zhemin` profile, or
  ignored `.vercel/` project link. The commands and `%USERPROFILE%` paths below
  describe the Windows setup; they are not cloud installation instructions.
- If hosting or DNS work is authorized, configure the required CLI and credentials
  in that environment separately, then verify the account, team, project, domain,
  and effective permissions with read-only queries. Local validation does not
  establish cloud access. Keep the existing `zhemin` project; do not create a
  replacement while linking a new checkout.
- Use managed environment variables for credentials a program must read directly
  or use to sign requests. Network secrets are for credentials sent to specific
  HTTPS services. Never put credential files in the checkout or prepared image,
  print their contents, or pass keys in command arguments. See the official
  [environment variables and network secrets guidance](https://learn.chatgpt.com/docs/environments/cloud-environments#configure-environment-variables-and-network-secrets).
- Repository records describe GitHub automatic deployments with `main` as the
  production branch. Verify the current Vercel Git settings before a push or
  merge that could publish content. Connection setup does not authorize release
  or DNS changes.

## Vercel: Windows setup

- Account: `zheminlin266`
- Team: `zheminlin266s-projects` (`team_FIx5tt9LjeM2AN40JktWrz9i`)
- This directory is linked to project `zhemin` (`prj_72axF2804cBFNlEim1IoTlLLeXmT`).
- CLI: `vercel` (64.2.0 at setup).
- Authentication uses the existing Vercel sign-in. Its permissions follow that
  account; linking a directory to a project does not restrict the token's access.

Read-only checks, run from this repository:

```powershell
vercel whoami
vercel project inspect --non-interactive --scope zheminlin266s-projects
vercel domains inspect zhemin.ltd --scope zheminlin266s-projects
```

If authentication expires, run `vercel login` and complete the browser sign-in.
Do not print the contents of the CLI authentication file.

## Tencent DNSPod: Windows setup

- Domain: `zhemin.ltd`, domain ID `99629455`.
- Main account UIN: `100017546155`.
- API-only subuser: `codex-zhemin-dns` (UIN `100053775976`).
- Custom CAM policy: `CodexZheminDnsRecords`, ID `289928095`.
- Policy source: [codex-dnspod-policy.json](./codex-dnspod-policy.json).
- Named CLI profile: `codex-zhemin`.
- CLI installation: `%USERPROFILE%\.codex\tools\tencentcloud-cli\Scripts\tccli.exe`
  (3.1.182.1 at setup, isolated Python environment).
- Credential file: `%USERPROFILE%\.tccli\codex-zhemin.credential`.
  The `.tccli` directory is restricted to the current Windows user and SYSTEM.
- Setup status: subuser created, policy attached, credentials saved and verified.

The policy permits domain and record queries, record creation, and record
modification for `zhemin.ltd`. It does not permit record deletion or access to
other Tencent products/domains. The scope covers the whole domain, including
existing apex and subdomain records; it is not restricted to `index`.

Read-only checks:

```powershell
$tccli = Join-Path $env:USERPROFILE '.codex\tools\tencentcloud-cli\Scripts\tccli.exe'
& $tccli dnspod DescribeDomain --Domain zhemin.ltd --profile codex-zhemin
& $tccli dnspod DescribeRecordList --Domain zhemin.ltd --profile codex-zhemin
```

When parsing `DescribeDomain` in PowerShell 7, use `ConvertFrom-Json -AsHashtable`:
the response contains both `DnsStatus` and `DNSStatus`, which cannot be represented
by PowerShell's case-insensitive object properties.

Use the absolute executable path in already-running terminals. The installation
directory has also been added to the user PATH for new terminals. Always pass
`--profile codex-zhemin`; do not rely on the default profile. Never print or commit
the credential file, pass keys in command arguments, or enable debug logging that
could expose authentication data. Manage/revoke the dedicated key in Tencent CAM.

## Publishing a subdomain

For a request such as `index.zhemin.ltd`, prepare the page/app first and follow the
repository's approval rules before deployment or DNS writes. Connection setup
alone does not authorize publishing new content.

1. Decide whether the requested hostname should serve an existing project or a
   separate app. For a separate app, work in a separate directory and link its own
   Vercel project; keep this directory linked to `zhemin`.
2. Verify the Vercel team/project before deployment. Attach the requested hostname
   to that project and obtain its current required DNS records from Vercel.
3. Query DNSPod for the requested hostname. Reuse an identical record; stop and
   resolve a conflicting target before modifying it. Use `CreateRecord` or
   `ModifyRecord` with an explicit `SubDomain` and the record values supplied by
   Vercel. Do not copy another project's CNAME target.
4. Keep DNS hosted at DNSPod (`sky.dnspod.net`, `mamie.dnspod.net`). A Vercel
   nameserver mismatch is expected with external DNS; do not switch nameservers
   merely to clear that message. `vercel dns` does not manage DNSPod records.
5. Verify authoritative DNS, Vercel domain verification, HTTPS, and the actual
   deployed page. Allow for DNS propagation before repeating any write.

This setup does not create `index.zhemin.ltd` or change existing website content.

## Validation on 2026-10-15

- Vercel account, linked project, and domain queries succeeded.
- DNSPod `DescribeDomain` returned `zhemin.ltd` / `99629455`.
- DNSPod `DescribeRecordList` returned five existing custom records and two
  nameserver records, all enabled.
- Tencent CAM shows programmatic access only, one directly attached policy
  (`CodexZheminDnsRecords`), and no group memberships.
- The cloud policy JSON exactly matches `codex-dnspod-policy.json`.
- A read-only `cam ListUsers` request using this profile was denied, as expected.
- The credential file inherits access only for the current Windows user and SYSTEM.
- No deployment or DNS write was performed. Write permissions are configured in
  the policy; their execution will be checked during the first authorized publish.

## References

- [Vercel CLI domains](https://vercel.com/docs/cli/domains)
- [Tencent Cloud CLI](https://github.com/TencentCloud/tencentcloud-cli)
- [DNSPod resource-level CAM permissions](https://cloud.tencent.com/document/product/302/105719)
