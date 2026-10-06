let bootstrapPromise = null;

export function loadBootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }
  return bootstrapPromise;
}
