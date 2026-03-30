interface ProductsErrorFallbackProps {
  error: Error;
  onRetry?: () => void;
}

/**
 * ProductsErrorFallback - Error UI for product list failures
 */
export function ProductsErrorFallback({ error, onRetry }: ProductsErrorFallbackProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold text-text-main mb-2">Failed to load products</h3>
      <p className="text-text-muted text-center max-w-md mb-6">
        {error.message || 'Something went wrong while fetching products.'}
      </p>
      <button onClick={handleRetry} className="btn-primary">
        Try Again
      </button>
    </div>
  );
}
