# Loadline

Loadline is an **independent, dependency-free progress bar** for web applications. It is derived in part from MIT-licensed source code originally published in the NProgress repository; it is not the original project and does not claim its name, repository, package, stars, forks, or community assets. See `License.md` and `NOTICE.md`.

## Included in v0.2.1

- CommonJS and modern ESM entry points.
- TypeScript declarations and package export maps.
- CSS subpath export: `loadline-progress/style.css`.
- Lifecycle events: `start`, `progress`, `done`, `fail`, and `remove`.
- Native Promise support and legacy jQuery-style `.always()` compatibility.
- SSR-safe no-DOM behavior and timer cleanup.
- Accessible `progressbar` markup with live `aria-valuenow` updates.
- `prefers-reduced-motion` support and a visible error state.
- Optional React, Vue, and Svelte adapters.
- Production-oriented package metadata, verification scripts, and security policy.

## Usage

```js
import Loadline from 'loadline-progress';
import 'loadline-progress/style.css';

Loadline.start();
// ... after navigation or work completes
Loadline.done();
```

## Optional framework adapters

The package includes opt-in adapters under `loadline-progress/integrations/react`, `loadline-progress/integrations/vue`, and `loadline-progress/integrations/svelte`. React, Vue, and Svelte remain peer requirements of the consuming application and are not runtime dependencies of the core package.

## Demo

A local interactive demo is available at `demo/index.html`.

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

## Verification

```bash
npm ci
npm run verify
npm run bench
npm pack --dry-run
```

`npm run verify` runs the test suite, TypeScript checking, and a production-dependency audit. The benchmark is a regression signal, not a cross-browser performance claim.

## Release status

This is a pre-1.0 release candidate for technical evaluation. Before positioning it as a mature commercial product, complete browser-matrix testing, accessibility review with assistive technology, trademark review, and user validation. The package is intentionally independent from the original NProgress project.

## Support and security

Please see `SECURITY.md` for responsible vulnerability reporting and open a GitHub issue for normal bugs or feature requests.
