import { useRef } from "react";
import { useKey } from "./useKey";

export function Search({ query, setQuery }) {
  const searchInput = useRef(null);

  useKey("enter", function () {
    if (document.activeElement === searchInput.current) return;

    setQuery("");
    searchInput.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput}
    />
  );
}
