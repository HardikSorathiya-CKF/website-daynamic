export function preloadImage(src) {
  if (!src || typeof window === 'undefined') return;

  const image = new Image();
  image.decoding = 'async';
  image.src = src;
}
