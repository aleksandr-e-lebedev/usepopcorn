import { useState } from 'react';

import Box from '@/components/Box';
import ToggleButton from '@/components/ToggleButton';
import List from '@/components/List';
import ListItem from '@/components/ListItem';

import { WatchedMovieType } from '@/types';
import './WatchedBox.styles.css';

function getAverage(arr: number[]) {
  return Number(arr.reduce((acc, cur) => acc + cur / arr.length, 0).toFixed(2));
}

function getTotal(arr: number[]) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

interface WatchedSummaryProps {
  watchedMovies: WatchedMovieType[];
}

function WatchedSummary({ watchedMovies }: WatchedSummaryProps) {
  const movies = watchedMovies;

  const avgImdbRating = getAverage(movies.map((movie) => movie.imdbRating));
  const avgUserRating = getAverage(movies.map((movie) => movie.userRating));
  const totalRuntime = getTotal(watchedMovies.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2 className="summary__title">Movies you watched</h2>
      <div className="summary__info">
        <p className="summary__text">
          <span>#️⃣</span>
          <span>{movies.length} movies</span>
        </p>
        <p className="summary__text">
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p className="summary__text">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p className="summary__text">
          <span>⏳</span>
          <span>{totalRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

interface WatchedMovieProps {
  movie: WatchedMovieType;
}

function WatchedMovie({ movie }: WatchedMovieProps) {
  return (
    <div className="watched-movie">
      <img
        className="watched-movie__image"
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3 className="watched-movie__title">{movie.title}</h3>
      <div className="watched-movie__description">
        <p className="watched-movie__text">
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p className="watched-movie__text">
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p className="watched-movie__text">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button type="button" className="watched-movie__delete-button">
          X
        </button>
      </div>
    </div>
  );
}

interface WatchedMovieListProps {
  watchedMovies: WatchedMovieType[];
}

function WatchedMovieList({ watchedMovies }: WatchedMovieListProps) {
  const movies = watchedMovies;

  return (
    <List className="watched-movie-list">
      {movies.map((movie) => (
        <ListItem key={movie.imdbID} className="watched-movie-list__item">
          <WatchedMovie movie={movie} />
        </ListItem>
      ))}
    </List>
  );
}

interface WatchedBoxProps {
  watchedMovies: WatchedMovieType[];
}

export default function WatchedBox({ watchedMovies }: WatchedBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Box className="watched-box">
      <ToggleButton
        className="watched-box__toggle-button"
        isOpen={isOpen}
        onToggle={handleToggle}
      />
      {isOpen && (
        <div className="watched-box__container">
          <WatchedSummary watchedMovies={watchedMovies} />
          <WatchedMovieList watchedMovies={watchedMovies} />
        </div>
      )}
    </Box>
  );
}
