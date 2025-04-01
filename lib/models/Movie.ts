import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: String,
  year: Number,
  plot: String,
  poster: String, // URL of the movie poster
  producer: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Actor" }],
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
