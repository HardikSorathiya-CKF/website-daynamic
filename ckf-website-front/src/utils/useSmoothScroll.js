import { useEffect, useRef } from 'react';
import { setLenis } from './scrollApi';

export function useSmoothScroll(pathname) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    if (window.matchMedia('(pointer: coarse)').matches) {
      return undefined;
    }

    let cancelled = false;
    let frame = 0;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisRef.current = lenis;
      setLenis(lenis);

      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };

      frame = requestAnimationFrame(raf);
    };

    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb) => window.setTimeout(cb, 200);

    const cancelSchedule =
      typeof window.cancelIdleCallback === 'function'
        ? window.cancelIdleCallback
        : window.clearTimeout;

    const scheduleId = schedule(() => {
      initLenis();
    });

    return () => {
      cancelled = true;
      cancelSchedule(scheduleId);
      cancelAnimationFrame(frame);
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);
}
