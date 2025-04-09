import { OmdbMovie, OmdbMovieDetails, WatchedMovieType } from '@/types';

/* OMDb API Data */

export const tempMovieData: OmdbMovie[] = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Back to the Future',
    Year: '1985',
    imdbID: 'tt0088763',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmM3ZjE0NzctNjBiOC00MDZmLTgzMTUtNGVlOWFlOTNiZDJiXkEyXkFqcGc@._V1_SX300.jpg',
  },
];

export const tempMovieDetailsData: OmdbMovieDetails = {
  Title: 'The Matrix',
  Year: '1999',
  Rated: 'R',
  Released: '31 Mar 1999',
  Runtime: '136 min',
  Genre: 'Action, Sci-Fi',
  Director: 'Lana Wachowski, Lilly Wachowski',
  Writer: 'Lilly Wachowski, Lana Wachowski',
  Actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss',
  Plot: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
  Language: 'English',
  Country: 'United States, Australia',
  Awards: 'Won 4 Oscars. 42 wins & 52 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.7/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '83%',
    },
    {
      Source: 'Metacritic',
      Value: '73/100',
    },
  ],
  Metascore: '73',
  imdbRating: '8.7',
  imdbVotes: '2,124,695',
  imdbID: 'tt0133093',
  Type: 'movie',
  DVD: 'N/A',
  BoxOffice: '$172,076,928',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};

/* App Data */

export const tempWatchedData: WatchedMovieType[] = [
  {
    title: 'Inception',
    year: '2010',
    imdbID: 'tt1375666',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    title: 'Back to the Future',
    year: '1985',
    imdbID: 'tt0088763',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const tempWatchedMovie: WatchedMovieType = {
  title: 'The Matrix',
  year: '1999',
  imdbID: 'tt0133093',
  poster:
    'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg',
  runtime: 136,
  imdbRating: 8.7,
  userRating: 10,
};
