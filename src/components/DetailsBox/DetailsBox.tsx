import { useState, useEffect } from 'react';

import Box from '@/components/Box';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import ToggleButton from '@/components/ToggleButton';
import StarRating from '@/components/StarRating';

import { OmdbMovieDetails, MovieDetailsType, WatchedMovieType } from '@/types';
import { OMDB_API_KEY, DEFAULT_ERROR_MESSAGE } from '@/config';
import './DetailsBox.styles.css';

interface MovieDetailsProps {
  movie: MovieDetailsType;
  watchedMovie: WatchedMovieType | null;
  onAddWatched: (movie: WatchedMovieType) => void;
  onCloseDetails: () => void;
}

function MovieDetails(props: MovieDetailsProps) {
  const { movie, watchedMovie, onAddWatched, onCloseDetails } = props;
  const [userRating, setUserRating] = useState(0);

  function handleSetRating(rating: number) {
    setUserRating(rating);
  }

  function handleAddButtonClick() {
    const newWatchedMovie: WatchedMovieType = {
      ...movie,
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseDetails();
  }

  function handleBackButtonClick() {
    onCloseDetails();
  }

  return (
    <div className="movie-details">
      <header className="movie-details__header">
        <button
          type="button"
          className="movie-details__back-button"
          onClick={handleBackButtonClick}
        >
          &larr;
        </button>
        <img
          className="movie-details__image"
          src={movie.poster}
          alt={`Poster of the ${movie.title} movie`}
        />
        <div className="movie-details__overview">
          <h2 className="movie-details__title">{movie.title}</h2>
          <p className="movie-details__text">
            {movie.released} &bull; {movie.runtime} min
          </p>
          <p className="movie-details__text">{movie.genre}</p>
          <p className="movie-details__text">
            <span>⭐</span>
            {movie.imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section className="movie-details__section">
        <div className="movie-details__rating">
          {watchedMovie ? (
            <p className="movie-details__description">
              You rated with movie {watchedMovie.userRating} <span>⭐</span>
            </p>
          ) : (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={handleSetRating}
              />
              {userRating > 0 && (
                <button
                  type="button"
                  className="movie-details__add-button"
                  onClick={handleAddButtonClick}
                >
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p className="movie-details__description">
          <em>{movie.plot}</em>
        </p>
        <p className="movie-details__description">Starring {movie.actors}</p>
        <p className="movie-details__description">
          Directed by {movie.director}
        </p>
      </section>
    </div>
  );
}

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

interface DetailsBoxProps {
  movieId: string;
  watchedMovie: WatchedMovieType | null;
  onAddWatched: (movie: WatchedMovieType) => void;
  onCloseDetails: () => void;
}

export default function DetailsBox(props: DetailsBoxProps) {
  const { movieId, watchedMovie, onAddWatched, onCloseDetails } = props;

  const [isOpen, setIsOpen] = useState(true);

  const [status, setStatus] = useState<Status>('idle');
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const isLoading = status === 'loading';
  const isLoaded = status === 'success';

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

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Box className="details-box">
      {isLoading && <Loader />}
      {isLoaded && movie && (
        <>
          <ToggleButton
            className="details-box__toggle-button"
            isOpen={isOpen}
            onToggle={handleToggle}
          />
          {isOpen && (
            <MovieDetails
              movie={movie}
              watchedMovie={watchedMovie}
              onAddWatched={onAddWatched}
              onCloseDetails={onCloseDetails}
            />
          )}
        </>
      )}
      {!isLoaded && error && <ErrorMessage message={error.message} />}
    </Box>
  );
}
