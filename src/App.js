import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { NavBar } from "./NavBar";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { Search } from "./Search";
import { NumResult } from "./NumResult";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedMovieList } from "./WatchedMovieList";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = "fcbdbf5a";

export default function App() {
  const [query, setQuery] = useState("");

  // const [watched, setWatched] = useState([]);

  const [selectedId, setSelectedId] = useState("");

  // call customshook

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseSelectMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((movies) => movies.filter((watched) => watched.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        {/* component composition */}
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {!isLoading ? <MovieList movies={movies} /> : <Loader />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseSelectMovie={handleCloseSelectMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
