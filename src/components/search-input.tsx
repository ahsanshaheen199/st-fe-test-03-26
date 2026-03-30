import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "../hooks/useSearchParams";

interface SearchInputProps {
  placeholder?: string;
  debounceDelay?: number;
}

export function SearchInput({
  placeholder = "Search products...",
  debounceDelay = 500,
}: SearchInputProps) {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const [localValue, setLocalValue] = useState(searchValue || "");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced value for API calls
  const debouncedValue = useDebounce({
    value: localValue,
    delay: debounceDelay,
  });

  // Update parent only when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentSearchTerm = inputRef.current?.value;
    if (debouncedValue !== currentSearchTerm) {
      return;
    }
    if (debouncedValue === "") {
      params.delete("search");
    } else {
      params.set("search", debouncedValue);
    }

    params.delete("page");

    // Push new URL without page reload
    const newUrl = params.size
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  }, [debouncedValue]);

  // Handle clear button click
  const handleClear = () => {
    setLocalValue("");
  };

  return (
    <div className="glass-panel flex items-center px-4 py-3 flex-1 max-w-[400px]">
      <Search size={20} className="mr-3 text-text-muted" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="bg-transparent border-none text-text-main outline-none w-full text-base"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="ml-2 text-text-muted hover:text-text-main transition-colors"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
