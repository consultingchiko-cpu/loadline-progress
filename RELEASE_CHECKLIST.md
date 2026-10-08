# Loadline 0.2.0 Release Checklist

## Completed locally

| Area | Status | Evidence |
|---|---|---|
| Core API compatibility | Complete | 19 legacy tests pass |
| v0.2 features | Complete | Events, fail, Promise, SSR, ARIA, timer cleanup tests pass |
| TypeScript declarations | Complete | `npm run typecheck` passes |
| ESM and CommonJS package imports | Complete | Installed tarball tested in a separate project |
| React/Vue/Svelte adapters | Added | Syntax checked; framework-specific consumer tests remain recommended |
| Browser smoke test | Complete | Chromium headless loaded the public Sandbox Demo |
| Dependency audit | Complete | `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities |
| Packaging | Complete | `npm pack --dry-run` lists 12 release files |
| Accessibility baseline | Complete | progressbar roles and `aria-valuenow` are tested |
| Reduced motion | Complete | CSS media rule and runtime duration handling added |
| Performance benchmark | Complete with caveat | 1,000 DOM updates: old ~80.4 ms, v0.2 ~91.1 ms in jsdom; this is not a cross-browser claim |

## Required before public release

1. Create or select the official GitHub organization/account.
2. Confirm the final trademark and domain name for Loadline.
3. Review MIT attribution and third-party notices with counsel if commercial distribution is planned.
4. Publish the repository and configure branch protection, CI, and security reporting.
5. Create/verify the npm account and enable 2FA for publishing.
6. Run a real browser matrix (Chromium, Firefox, WebKit/Safari where available).
7. Run adapter tests in actual React, Vue 3, and Svelte applications.
8. Publish a release candidate first, gather feedback, then publish `0.2.0`.

## Publication commands

These commands are intentionally not run in the sandbox because they publish to external public services:

```bash
git remote add origin <OFFICIAL_GITHUB_REPOSITORY>
git push -u origin master
npm publish --access public
```

Do not execute them until the official account, repository, domain, and public-release decision are confirmed.
