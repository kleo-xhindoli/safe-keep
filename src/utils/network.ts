const PING_INTERVAL_MS = 10000;
const PING_URL = "https://ipv4.icanhazip.com";

let _isOnline = window.navigator?.onLine ?? true;

export function isOnline() {
  return _isOnline;
}

export function awaitableOffline<T>(promise: Promise<T>) {
  if (isOnline()) return promise;

  return Promise.resolve(null);
}

export function onNetworkChange(
  listener: (newStatus: "online" | "offline") => void
) {
  const onlineListener = () => {
    if (!_isOnline) {
      _isOnline = true;
      listener("online");
    }
  };

  const offlineListener = () => {
    if (_isOnline) {
      _isOnline = false;
      listener("offline");
    }
  };

  window.addEventListener("online", onlineListener);
  window.addEventListener("offline", offlineListener);

  let interval = window.setInterval(async () => {
    try {
      await fetch(`${PING_URL}?_t=${Math.floor(Math.random() * 10000)}`);
      onlineListener();
    } catch (e) {
      offlineListener();
      console.log(e);
    }
  }, PING_INTERVAL_MS);

  return () => {
    clearInterval(interval);
    window.removeEventListener("online", onlineListener);
    window.removeEventListener("offline", offlineListener);
  };
}
