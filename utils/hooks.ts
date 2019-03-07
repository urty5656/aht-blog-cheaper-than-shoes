import { useLayoutEffect } from 'react';

export function useScrollLock(target?: HTMLElement) {
  useLayoutEffect(() => {
    const realTarget = target || document.body;
    realTarget.style.overflow = 'hidden';
    return () => {
      realTarget.style.overflow = null;
    };
  }, []);
}
