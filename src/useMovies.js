import { useState, useEffect } from "react";

const KEY = "fcbdbf5a";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const controller = new AbortController();

  useEffect(
    function () {
      setIsLoading(true);
      setTimeout(() => {
        async function fetchMovies() {
          try {
            setError("");
            const response = await fetch(
              `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
            if (!response.ok)
              throw new Error(
                "something went wrong with fetch movies please try agin"
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
          return function () {
            controller.abort();
          };
        }
        // callback?.();
        // handleCloseSelectMovie();
        fetchMovies();
      }, 200);
    },
    [query]
  );
  return { movies, isLoading, error };
}
