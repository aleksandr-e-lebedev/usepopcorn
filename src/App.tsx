import NavBar from './components/NavBar';

import { OmdbMovie, MovieType } from './types';
import { tempMovieData, tempWatchedData } from '../temp/data';
import './App.styles.css';

function convertMovies(movies: OmdbMovie[]): MovieType[] {
  return movies.map((movie) => ({
    title: movie.Title,
    year: movie.Year,
    imdbID: movie.imdbID,
    poster: movie.Poster,
  }));
}

export default function App() {
  const query = '';
  const movies = convertMovies(tempMovieData);
  const watchedMovies = tempWatchedData;

  function handleQuery() {
    return;
  }

  return (
    <div className="app">
      <NavBar query={query} onQuery={handleQuery} numResults={movies.length} />

      <main>
        <h2>Content</h2>
      </main>
    </div>
  );
}
