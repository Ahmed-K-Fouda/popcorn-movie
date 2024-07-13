import { useState, useEffect } from "react";
export function useLocalStorageState(initialstate, key) {
  const [value, setValue] = useState(function () {
    const storedWatched = localStorage.getItem(key);
    return storedWatched ? JSON.parse(storedWatched) : initialstate;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
