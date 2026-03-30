import { useCallback } from "react";

interface ProductsErrorFallbackProps {
  error: Error;
  onRetry?: () => void;
}

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV;

export function ProductsErrorFallback({
  error,
  onRetry,
}: ProductsErrorFallbackProps) {
  const handleRetry = useCallback(() => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }, [onRetry]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4" role="img" aria-label="Warning icon">
        ⚠️
      </div>
      <h3 className="text-xl font-semibold text-text-main mb-2">
        Failed to load products
      </h3>
      <p className="text-text-muted text-center max-w-md mb-6">
        {isDevelopment
          ? error.message || "Something went wrong while fetching products."
          : "Something went wrong while fetching products. Please try again."}
      </p>
      {isDevelopment && error.stack && (
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-text-muted hover:text-text-main mb-2">
            Stack trace (development only)
          </summary>
          <pre className="bg-surface-hover p-4 rounded-lg text-xs overflow-auto text-text-muted">
            {error.stack}
          </pre>
        </details>
      )}
      <button
        type="button"
        onClick={handleRetry}
        className="btn-primary"
        aria-label="Retry loading products"
      >
        Try Again
      </button>
    </div>
  );
}
