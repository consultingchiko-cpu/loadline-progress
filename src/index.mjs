import { createRequire } from 'node:module';

// The legacy engine remains CommonJS to preserve the original API and browser compatibility.
// This ESM entry point makes modern bundlers and Node ESM consumers able to import it.
const require = createRequire(import.meta.url);
const Loadline = require('./loadline.cjs');

export default Loadline;
export { Loadline };
