import { useEffect, useState } from "react";

interface UseDebounceProps {
  value: string;
  delay?: number;
}

export function useDebounce({ value, delay = 500 }: UseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
