let lenis = null;
const listeners = new Set();

function notifyScroll(y) {
  listeners.forEach((fn) => fn(y));
}

export function setLenis(instance) {
  lenis = instance;

  if (lenis) {
    lenis.on('scroll', ({ scroll }) => notifyScroll(scroll));
    notifyScroll(lenis.scroll);
  }
}

export function subscribeScroll(fn) {
  listeners.add(fn);

  if (lenis) {
    fn(lenis.scroll);
  } else {
    fn(window.scrollY);
  }

  if (!lenis) {
    const onScroll = () => fn(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      listeners.delete(fn);
      window.removeEventListener('scroll', onScroll);
    };
  }

  return () => listeners.delete(fn);
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
