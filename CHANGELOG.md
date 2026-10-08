# Changelog

## 0.2.1 — 2026-10-08

- Updated development tooling to Mocha 12 and removed known development-dependency audit findings.
- Added repository, homepage, issue tracker, keywords, and Node engine metadata.
- Added `verify` and `prepublishOnly` checks.
- Added `SECURITY.md` with vulnerability-reporting guidance.
- Clarified independent-project status and pre-1.0 release limitations.

## 0.2.0 — Prototype

- Added lifecycle events: `start`, `progress`, `done`, `fail`, and `remove`.
- Added `fail()` for failed navigation or requests.
- Added native Promise support while preserving jQuery-style `.always()` compatibility.
- Added SSR-safe no-DOM behavior.
- Added accessible `progressbar` and live status markup with `aria-valuenow` updates.
- Added `prefers-reduced-motion` handling.
- Added timer cleanup on `remove()`.
- Added optional React, Vue, and Svelte adapters.
- Added a minimal DOM benchmark.
- Preserved the legacy API methods and zero runtime dependencies.
