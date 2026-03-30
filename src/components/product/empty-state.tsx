interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No products found" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-6xl mb-4" role="img" aria-label="Search icon">
        🔍
      </div>
      <h3 className="text-xl font-semibold text-text-main mb-2">{message}</h3>
      <p className="text-text-muted text-center max-w-md mb-4">
        Try adjusting your filters or search terms to find what you're looking
        for.
      </p>
    </div>
  );
}
