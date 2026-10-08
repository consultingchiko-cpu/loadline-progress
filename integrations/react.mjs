// Optional React adapter. Install React separately in the consuming app.
import { useEffect } from 'react';
import Loadline from '../src/index.mjs';

export function useLoadlineNavigation(isLoading) {
  useEffect(() => {
    if (isLoading) Loadline.start();
    else Loadline.done();
    return () => Loadline.remove();
  }, [isLoading]);
}
