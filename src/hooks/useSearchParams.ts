import { useEffect, useState, useCallback } from "react";

export function useSearchParams() {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search),
  );

  // Create a stable reference to URL update logic
  const updateFromUrl = useCallback(() => {
    setValue(new URLSearchParams(window.location.search));
  }, []);

  useEffect(() => {
    // Listen for back/forward navigation
    window.addEventListener("popstate", updateFromUrl);

    return () => window.removeEventListener("popstate", updateFromUrl);
  }, [updateFromUrl]);

  return value;
}
