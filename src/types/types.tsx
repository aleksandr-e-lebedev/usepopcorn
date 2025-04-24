/* OMDb API Data Types */

export interface OmdbMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OmdbMovieDetails {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: 'True';
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

/* App Data Types */

export interface MovieType {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
}

export interface WatchedMovieType extends MovieType {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface MovieDetailsType {
  actors: string;
  director: string;
  genre: string;
  plot: string;
  poster: string;
  released: string;
  runtime: number;
  title: string;
  year: string;
  imdbID: string;
  imdbRating: number;
}
