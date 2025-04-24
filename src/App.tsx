import { useState } from 'react';

import NavBar from './components/NavBar';
import Content from './components/Content';

import ListBox from './components/ListBox';
import DetailsBox from './components/DetailsBox';
import WatchedBox from './components/WatchedBox';

import { WatchedMovieType } from './types';
import { useMovies, useLocalStorageState } from './hooks';
import './App.styles.css';

export default function App() {
  const [query, setQuery] = useState('');
  const { status, movies, error } = useMovies(query);

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const [watchedMovies, setWatchedMovies] = useLocalStorageState<
    WatchedMovieType[]
  >('watchedMovies', []);

  const numResults = movies.length;

  const selectedWatchedMovie =
    watchedMovies.find((movie) => movie.imdbID === selectedMovieId) ?? null;

  function handleQuery(query: string) {
    setQuery(query);
  }

  function handleSelectMovie(id: string) {
    setSelectedMovieId((currentId) => (id === currentId ? null : id));
  }

  function handleAddWatched(movie: WatchedMovieType) {
    setWatchedMovies([...watchedMovies, movie]);
  }

  function handleCloseDetails() {
    setSelectedMovieId(null);
  }

  function handleDeleteWatched(id: string) {
    const moviesToSet = watchedMovies.filter((movie) => movie.imdbID !== id);
    setWatchedMovies(moviesToSet);
  }

  return (
    <div className="app">
      <NavBar query={query} onQuery={handleQuery} numResults={numResults} />
      <Content>
        <ListBox
          status={status}
          movies={movies}
          error={error}
          onSelectMovie={handleSelectMovie}
        />
        {selectedMovieId ? (
          <DetailsBox
            movieId={selectedMovieId}
            watchedMovie={selectedWatchedMovie}
            onAddWatched={handleAddWatched}
            onCloseDetails={handleCloseDetails}
          />
        ) : (
          <WatchedBox
            watchedMovies={watchedMovies}
            onDeleteWatched={handleDeleteWatched}
          />
        )}
      </Content>
    </div>
  );
}
