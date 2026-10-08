// Optional Vue 3 adapter. Install Vue separately in the consuming app.
import { watch, onBeforeUnmount } from 'vue';
import Loadline from '../src/index.mjs';

export function useLoadline(isLoading) {
  const stop = watch(isLoading, (value) => value ? Loadline.start() : Loadline.done(), { immediate: true });
  onBeforeUnmount(() => { stop(); Loadline.remove(); });
  return Loadline;
}
