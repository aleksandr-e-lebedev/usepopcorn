import { useState, useEffect } from 'react';

import Box from '@/components/Box';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import ToggleButton from '@/components/ToggleButton';
import StarRating from '@/components/StarRating';

import { MovieDetailsType, WatchedMovieType } from '@/types';
import { useDocumentTitle, useDetails } from '@/hooks';
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

  useDocumentTitle(`Movie | ${movie.title}`);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'Escape'.toLowerCase()) onCloseDetails();
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseDetails]);

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

interface DetailsBoxProps {
  movieId: string;
  watchedMovie: WatchedMovieType | null;
  onAddWatched: (movie: WatchedMovieType) => void;
  onCloseDetails: () => void;
}

export default function DetailsBox(props: DetailsBoxProps) {
  const { movieId, watchedMovie, onAddWatched, onCloseDetails } = props;

  const [isOpen, setIsOpen] = useState(true);
  const { status, movie, error } = useDetails(movieId);

  const isLoading = status === 'loading';
  const isLoaded = status === 'success';

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
