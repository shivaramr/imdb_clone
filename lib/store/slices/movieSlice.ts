import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define Movie interface
interface Movie {
  _id: string;
  name: string;
  year: number;
  plot: string;
  poster: string;
  producer: { _id: string; name: string };
  actors: { _id: string; name: string }[];
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

// ✅ Fetch all movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch("/api/movies"); // Using Fetch instead of Axios
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return response.json(); // Convert response to JSON
});

// ✅ Add a new movie
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData: {
    name: string;
    year: number;
    plot: string;
    poster: string;
    producer: string;
    actors: string[];
  }) => {
    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return response.json();
  }
);

// ✅ Update an existing movie
export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, updatedData }: { id: string; updatedData: Partial<Movie> }) => {
    const response = await fetch(`/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return response.json();
  }
);

// ✅ Delete a movie
export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id: string) => {
  const response = await fetch(`/api/movies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete movie");
  }

  toast.success("Movie deleted successfully!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
  return id; // Return the deleted movie's ID
});

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
