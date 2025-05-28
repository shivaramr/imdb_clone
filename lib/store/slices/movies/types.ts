// Define Movie types
export type Movie = {
  _id: string;
  name: string;
  year: number;
  plot: string;
  poster: string;
  producer: { _id: string; name: string };
  actors: { _id: string; name: string }[];
};

export type MovieState = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
};
