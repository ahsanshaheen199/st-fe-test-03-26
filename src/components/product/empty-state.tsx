interface EmptyStateProps {
  message?: string;
}

/**
 * EmptyState - Shown when no products match filters
 */
export function EmptyState({ message = "No products found" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-text-main mb-2">{message}</h3>
      <p className="text-text-muted text-center max-w-md">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
    </div>
  );
}
