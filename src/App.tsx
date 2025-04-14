import NavBar from './components/NavBar';
import Content from './components/Content';

import ListBox from './components/ListBox';
import DetailsBox from './components/DetailsBox';
import WatchedBox from './components/WatchedBox';

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
  const selectedMovieId = movies.at(1)?.imdbID;
  const watchedMovies = tempWatchedData;

  function handleQuery() {
    return;
  }

  return (
    <div className="app">
      <NavBar query={query} onQuery={handleQuery} numResults={movies.length} />
      <Content>
        <ListBox movies={movies} />
        {selectedMovieId ? (
          <DetailsBox />
        ) : (
          <WatchedBox watchedMovies={watchedMovies} />
        )}
      </Content>
    </div>
  );
}
