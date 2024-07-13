import { useState, useEffect, useRef } from "react";

const KEY = "fcbdbf5a";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const controllerRef = useRef(null);

  useEffect(() => {
    // Reset the AbortController on each query change
    controllerRef.current = new AbortController();

    setIsLoading(true);
    setTimeout(() => {
      async function fetchMovies() {
        try {
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controllerRef.current.signal }
          );
          if (!response.ok)
            throw new Error(
              "something went wrong with fetch movies please try again"
            );
          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }

        if (query.length < 3) {
          setMovies([]);
          setError("");
          return;
        }
      }
      fetchMovies();
    }, 200);

    return () => {
      controllerRef.current.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
