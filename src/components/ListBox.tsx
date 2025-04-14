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
