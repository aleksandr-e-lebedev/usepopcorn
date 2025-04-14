import { useState } from 'react';

import Box from './Box';
import ToggleButton from './ToggleButton';
import StarRating from './StarRating';

import { OmdbMovieDetails, MovieDetailsType, WatchedMovieType } from '@/types';
import { tempMovieDetailsData, tempWatchedMovie } from '../../temp/data';
import './DetailsBox.styles.css';

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

function MovieDetails() {
  const movie: MovieDetailsType = convertMovieDetails(tempMovieDetailsData);
  const watchedMovie: WatchedMovieType | null = tempWatchedMovie;
  const userRating = 0;

  function handleSetRating() {
    return;
  }

  function handleAddButtonClick() {
    return;
  }

  return (
    <div className="movie-details">
      <header className="movie-details__header">
        <button type="button" className="movie-details__back-button">
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

export default function DetailsBox() {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Box className="details-box">
      <ToggleButton
        className="details-box__toggle-button"
        isOpen={isOpen}
        onToggle={handleToggle}
      />
      {isOpen && <MovieDetails />}
    </Box>
  );
}
