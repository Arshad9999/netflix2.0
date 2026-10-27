// Keep unregistering a previously installed CRA worker without registering a new one.
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => registration.unregister()).catch(() => {});
  }
}
