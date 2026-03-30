import { Search, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "../hooks/useSearchParams";
import { updateSearchParams } from "../utils/url";

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

  // Update URL only when debounced value changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentUrlSearch = params.get("search") || "";

    // Only update if debounced value actually differs from URL
    if (debouncedValue === currentUrlSearch) {
      return;
    }

    updateSearchParams((params) => {
      if (debouncedValue === "") {
        params.delete("search");
      } else {
        params.set("search", debouncedValue);
      }
      // Reset page when search changes
      params.delete("page");
    });
  }, [debouncedValue]);

  // Handle clear button click
  const handleClear = useCallback(() => {
    setLocalValue("");
  }, []);

  return (
    <div
      role="search"
      className="glass-panel flex items-center px-4 py-3 flex-1 max-w-[400px]"
    >
      <Search size={20} className="mr-3 text-text-muted" aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        role="searchbox"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="bg-transparent border-none text-text-main outline-none w-full text-base"
        aria-label="Search products"
      />
      {localValue && (
        <button
          type="button"
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
