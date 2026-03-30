import { CategorySelect } from "./components/category-select";
import { ProductListWrapper } from "./components/product";
import { SearchInput } from "./components/search-input";

function App() {
  return (
    <>
      <div className="min-h-screen p-8">
        {/* Header Section */}
        <header className="glass-panel p-8 mb-8">
          <h1 className="text-4xl font-semibold mb-2">Premium Products</h1>
          <p className="text-text-muted">
            Browse our collection. Handling the flaky API gracefully is part of
            the challenge.
          </p>
        </header>

        {/* Controls Section */}
        <section className="flex gap-4 mb-8">
          <SearchInput placeholder="Search products..." />
          <CategorySelect />
        </section>

        {/* Main Grid Placeholder */}
        <main>
          <ProductListWrapper />
        </main>
      </div>
    </>
  );
}

export default App;
