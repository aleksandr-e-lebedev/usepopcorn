import { WatchedMovieType } from '@/types';
import './WatchedBox.styles.css';

interface WatchedSummaryProps {
  watchedMovies: WatchedMovieType[];
}

function getAverage(arr: number[]) {
  return Number(arr.reduce((acc, cur) => acc + cur / arr.length, 0).toFixed(2));
}

function getTotal(arr: number[]) {
  return arr.reduce((acc, cur) => acc + cur, 0);
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
