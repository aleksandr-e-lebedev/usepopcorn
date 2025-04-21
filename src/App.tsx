import { useState, useEffect } from 'react';

import NavBar from './components/NavBar';
import Content from './components/Content';

import ListBox from './components/ListBox';
import DetailsBox from './components/DetailsBox';
import WatchedBox from './components/WatchedBox';

import { WatchedMovieType } from './types';
import { useMovies } from './hooks';
import './App.styles.css';

type StoredWatchedMovies = string | null | WatchedMovieType[];

function getWatchedMoviesFromStorage(): WatchedMovieType[] {
  let movies: StoredWatchedMovies = localStorage.getItem('watchedMovies');

  if (movies) {
    movies = JSON.parse(movies) as WatchedMovieType[];
  } else {
    movies = [];
  }

  return movies;
}

function setWatchedMoviesToStorage(movies: WatchedMovieType[]) {
  const moviesToStore = JSON.stringify(movies);
  localStorage.setItem('watchedMovies', moviesToStore);
}

export default function App() {
  const [query, setQuery] = useState('');
  const { status, movies, error } = useMovies(query);

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovieType[]>(
    getWatchedMoviesFromStorage,
  );

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

  useEffect(() => {
    setWatchedMoviesToStorage(watchedMovies);
  }, [watchedMovies]);

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
