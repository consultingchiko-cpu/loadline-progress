// Optional Svelte adapter. Pass a readable store or subscribe-compatible value.
import Loadline from '../src/index.mjs';

export function loadlineAction(node, { store }) {
  const unsubscribe = store.subscribe((value) => value ? Loadline.start() : Loadline.done());
  return { destroy() { unsubscribe(); Loadline.remove(); } };
}
