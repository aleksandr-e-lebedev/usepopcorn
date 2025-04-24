import { useState, useEffect } from 'react';

import { OmdbMovie, MovieType } from '@/types';
import { OMDB_API_KEY, DEFAULT_ERROR_MESSAGE } from '@/config';

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

export function useMovies(query: string) {
  const [status, setStatus] = useState<Status>('idle');
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [error, setError] = useState<Error | null>(null);

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

  return { status, movies, error };
}
