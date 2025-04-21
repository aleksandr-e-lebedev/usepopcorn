import { useState, useEffect } from 'react';

import { OmdbMovieDetails, MovieDetailsType } from '@/types';
import { OMDB_API_KEY, DEFAULT_ERROR_MESSAGE } from '@/config';

type Status = 'idle' | 'loading' | 'success';

interface ErrorResponse {
  Response: 'False';
  Error: string;
}

type OmdbResponse = OmdbMovieDetails | ErrorResponse;

function convertMovieDetails(movie: OmdbMovieDetails): MovieDetailsType {
  return {
    actors: movie.Actors,
    director: movie.Director,
    genre: movie.Genre,
    plot: movie.Plot,
    poster: movie.Poster,
    released: movie.Released,
    runtime: parseInt(movie.Runtime, 10),
    title: movie.Title,
    year: movie.Year,
    imdbID: movie.imdbID,
    imdbRating: Number(movie.imdbRating),
  };
}

export function useDetails(movieId: string) {
  const [status, setStatus] = useState<Status>('idle');
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovieDetails() {
      try {
        setStatus('loading');
        setError(null);

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movieId}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }

        const omdbResponse = (await response.json()) as OmdbResponse;

        if (omdbResponse.Response === 'True') {
          setStatus('success');
          setMovie(convertMovieDetails(omdbResponse));
        } else {
          throw new Error(omdbResponse.Error);
        }
      } catch (err) {
        setStatus('idle');
        setMovie(null);

        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(err);
          }
        } else {
          setError(new Error(DEFAULT_ERROR_MESSAGE));
        }
      }
    }

    if (!movieId) {
      setStatus('idle');
      setMovie(null);
      setError(null);
      return;
    }

    void fetchMovieDetails();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return { status, movie, error };
}
