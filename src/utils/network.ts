export function isOnline() {
  return window.navigator?.onLine ?? true;
}

export function awaitableOffline<T>(promise: Promise<T>) {
  if (isOnline()) return promise;

  return Promise.resolve(null);
}
