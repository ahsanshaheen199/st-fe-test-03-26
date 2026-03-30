import { useEffect, useState } from "react";

export function useSearchParams() {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search),
  );

  useEffect(() => {
    const handleUrlChange = () =>
      setValue(new URLSearchParams(window.location.search));

    // Listen for back/forward navigation
    window.addEventListener("popstate", handleUrlChange);

    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  return value;
}
