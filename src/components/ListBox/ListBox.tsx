import { useState } from 'react';

import Box from '@/components/Box';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import ToggleButton from '@/components/ToggleButton';
import List from '@/components/List';
import ListItem from '@/components/ListItem';

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
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <List className="movie-list">
      {movies?.map((movie) => (
        <ListItem
          key={movie.imdbID}
          className="movie-list__item"
          onClick={() => {
            onSelectMovie(movie.imdbID);
          }}
        >
          <Movie movie={movie} />
        </ListItem>
      ))}
    </List>
  );
}

interface ListBoxProps {
  status: 'idle' | 'loading' | 'success';
  movies: MovieType[];
  error: Error | null;
  onSelectMovie: (id: string) => void;
}

export default function ListBox(props: ListBoxProps) {
  const { status, movies, error, onSelectMovie } = props;

  const [isOpen, setIsOpen] = useState(true);

  const isLoading = status === 'loading';
  const isLoaded = status === 'success';

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Box className="list-box">
      {isLoading && <Loader />}
      {isLoaded && (
        <>
          <ToggleButton
            className="list-box__toggle-button"
            isOpen={isOpen}
            onToggle={handleToggle}
          />
          {isOpen && (
            <MovieList movies={movies} onSelectMovie={onSelectMovie} />
          )}
        </>
      )}
      {!isLoaded && error && <ErrorMessage message={error.message} />}
    </Box>
  );
}
