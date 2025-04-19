import { useState, useEffect } from 'react';

import NavBar from './components/NavBar';
import Content from './components/Content';

import ListBox from './components/ListBox';
import DetailsBox from './components/DetailsBox';
import WatchedBox from './components/WatchedBox';

import { OmdbMovie, MovieType, WatchedMovieType } from './types';
import { OMDB_API_KEY, DEFAULT_ERROR_MESSAGE } from '@/config';
import './App.styles.css';

type Status = 'idle' | 'loading' | 'success';

interface SuccessResponse {
  Response: 'True';
  Search: OmdbMovie[];
  totalResults: string;
}

interface ErrorResponse {
  Response: 'False';
  Error: string;
}

type OmdbResponse = SuccessResponse | ErrorResponse;

function convertMovies(movies: OmdbMovie[]): MovieType[] {
  return movies.map((movie) => ({
    title: movie.Title,
    year: movie.Year,
    imdbID: movie.imdbID,
    poster: movie.Poster,
  }));
}

export default function App() {
  const [query, setQuery] = useState('');

  const [status, setStatus] = useState<Status>('idle');
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [watchedMovies, setWatchedMovies] = useState<WatchedMovieType[]>([]);

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
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setStatus('loading');
        setError(null);

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }

        const omdbResponse = (await response.json()) as OmdbResponse;

        if (omdbResponse.Response === 'True') {
          setStatus('success');
          setMovies(convertMovies(omdbResponse.Search));
        } else {
          throw new Error(omdbResponse.Error);
        }
      } catch (err) {
        setStatus('idle');
        setMovies([]);

        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(err);
          }
        } else {
          setError(new Error(DEFAULT_ERROR_MESSAGE));
        }
      }
    }

    if (!query) {
      setStatus('idle');
      setMovies([]);
      setError(null);
      return;
    }

    void fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

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
