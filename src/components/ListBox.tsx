import { useState } from 'react';

import Box from './Box';
import ToggleButton from './ToggleButton';
import List from './List';
import ListItem from './ListItem';

import { MovieType } from '@/types';
import './ListBox.styles.css';

interface MovieProps {
  movie: MovieType;
}

function Movie({ movie }: MovieProps) {
  return (
    <div className="movie">
      <img
        className="movie__image"
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3 className="movie__title">{movie.title}</h3>
      <p className="movie__description">
        <span>🗓</span>
        <span className="movie__year">{movie.year}</span>
      </p>
    </div>
  );
}

interface MovieListProps {
  movies: MovieType[] | null;
}

function MovieList({ movies }: MovieListProps) {
  return (
    <List className="movie-list">
      {movies?.map((movie) => (
        <ListItem key={movie.imdbID} className="movie-list__item">
          <Movie movie={movie} />
        </ListItem>
      ))}
    </List>
  );
}

interface ListBoxProps {
  movies: MovieType[];
}

export default function ListBox({ movies }: ListBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Box className="list-box">
      <ToggleButton
        className="list-box__toggle-button"
        isOpen={isOpen}
        onToggle={handleToggle}
      />
      {isOpen && <MovieList movies={movies} />}
    </Box>
  );
}
