import { useSearchParams } from "../hooks/useSearchParams";

interface CategorySelectProps {
  placeholder?: string;
}

export function CategorySelect({ placeholder = "All Categories" }: CategorySelectProps) {
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("category") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    params.delete("page");

    const newUrl = params.size
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <select
      value={categoryValue}
      onChange={(e) => handleChange(e.target.value)}
      className="glass-panel px-4 py-3 text-text-main outline-none text-base cursor-pointer appearance-none"
    >
      <option value="" className="bg-surface">
        {placeholder}
      </option>
      <option value="electronics" className="bg-surface">
        Electronics
      </option>
      <option value="clothing" className="bg-surface">
        Clothing
      </option>
      <option value="home" className="bg-surface">
        Home
      </option>
      <option value="outdoors" className="bg-surface">
        Outdoors
      </option>
    </select>
  );
}
