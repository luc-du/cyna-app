import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Rechercher..."
      className="hidden lg:block w-40 px-3 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
