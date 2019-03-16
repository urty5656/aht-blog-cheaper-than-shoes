import { useEffect } from 'react';

export function useScrollLock(target?: HTMLElement) {
  useEffect(() => {
    const realTarget = target || document.body;
    realTarget.style.overflow = 'hidden';
    return () => {
      realTarget.style.overflow = null;
    };
  }, []);
}
