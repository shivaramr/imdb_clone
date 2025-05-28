import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Movie } from "./types";

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
