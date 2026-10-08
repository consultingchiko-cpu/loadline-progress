# Loadline

Loadline is an **independent project** derived in part from MIT-licensed source code originally published in the NProgress repository. It is not the original repository, does not claim ownership of its name or GitHub assets, and preserves the original MIT notice in `License.md`.

## Prototype improvements

- Modern `package.json` exports.
- CommonJS compatibility through `require`.
- ESM entry point for modern consumers.
- TypeScript declarations.
- CSS subpath export: `loadline-progress/style.css`.
- Original API preserved as the compatibility target.
- Lifecycle events: `start`, `progress`, `done`, `fail`, and `remove`.
- Native Promise support and legacy jQuery-style `.always()` compatibility.
- SSR-safe no-DOM behavior and timer cleanup.
- Accessible `progressbar` markup with live `aria-valuenow` updates.
- `prefers-reduced-motion` support and a visible error state.
- Optional React, Vue, and Svelte adapters.

## Usage

```js
import Loadline from 'loadline-progress';
import 'loadline-progress/style.css';

Loadline.start();
// ... after navigation or work completes
Loadline.done();
```

## Important status

This is an unpublished technical prototype, not a claim to the original project's identity, trademark, repository, npm package, stars, forks, or community assets. Before commercial distribution, perform license, trademark, security, browser, and accessibility review.

## Demo

A local interactive demo is available at `demo/index.html`. It demonstrates navigation, known percentages, minimal mode, and mounting inside a custom parent.

Local preview command:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

The prototype is intentionally not published to npm or presented as the original NProgress package.

## Optional framework adapters

The package includes opt-in adapters under `loadline-progress/integrations/react`, `loadline-progress/integrations/vue`, and `loadline-progress/integrations/svelte`. React, Vue, and Svelte remain peer requirements of the consuming application and are not runtime dependencies of the core package.

## Verification

Run `npm test` for the 24 compatibility and v0.2 behavior tests, `npm run typecheck` for the TypeScript declarations, and `npm run bench` for the local DOM benchmark. The benchmark is a regression signal, not a cross-browser performance claim.

## Market-test hypothesis

The first demand test should target frontend developers and small agencies with one simple question: **Would a maintained, typed, framework-friendly progress bar save you enough maintenance time to adopt it?**

Suggested success thresholds before contacting the original maintainer or spending on branding:

- 20 qualified developer conversations.
- 5 people willing to install a preview package.
- 3 concrete requests for framework integrations or accessibility fixes.
- 1 paid support/design-partnership signal.
