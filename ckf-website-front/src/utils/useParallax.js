import { useEffect } from 'react';

const SECTION_SELECTOR =
  'main section:not(.hero-section):not(.page-breadcrumb):not(.no-parallax)';

function shouldSkipParallax(pathname) {
  return (
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/case-studies')
  );
}

function getParallaxSections() {
  return [...document.querySelectorAll(SECTION_SELECTOR)].filter(
    (el) =>
      !el.closest(
        '.service-detail-page, .services-page, .about-page, .contact-page, .home-page, .case-studies-page, .case-study-detail-page'
      )
  );
}

export function useParallax(pathname = '') {
  useEffect(() => {
    if (
      shouldSkipParallax(pathname) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined;
    }

    const motion = new Map();
    let frame = 0;
    let active = true;

    const animate = () => {
      if (!active) return;

      getParallaxSections().forEach((el) => {
        const top = el.getBoundingClientRect().top;
        const target = (top - window.innerHeight * 0.42) * 0.08;
        const current = motion.get(el) ?? target;
        const next = current + (target - current) * 0.12;

        motion.set(el, next);
        el.style.transform = `translate3d(0, ${next}px, 0)`;
      });

      document.querySelectorAll('.parallax-bg:not(.page-breadcrumb)').forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (bottom > 0 && top < window.innerHeight) {
          el.style.backgroundPosition = `center calc(50% + ${top * 0.14}px)`;
        }
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      active = false;
      cancelAnimationFrame(frame);
      getParallaxSections().forEach((el) => {
        el.style.transform = '';
      });
      motion.clear();
    };
  }, [pathname]);
}
