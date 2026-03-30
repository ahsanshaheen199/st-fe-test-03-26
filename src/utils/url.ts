export function updateSearchParams(
  updates: (params: URLSearchParams) => void,
): void {
  const params = new URLSearchParams(window.location.search);
  updates(params);

  const newUrl = params.size
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.pushState({}, "", newUrl);

  // Trigger popstate to notify all listeners (useSearchParams hook)
  window.dispatchEvent(new Event("popstate"));
}
