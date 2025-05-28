import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addMovie, deleteMovie, fetchMovies, updateMovie } from "./middleware";
import { Movie, MovieState } from "./types";

// Initial state
const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// Create movie slice
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.movies = state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
        state.movies = state.movies.filter((movie) => movie._id !== action.payload);
      });
  },
});

export default movieSlice.reducer;
