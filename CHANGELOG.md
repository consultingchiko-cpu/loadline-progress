# Changelog

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
