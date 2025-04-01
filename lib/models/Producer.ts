import mongoose from "mongoose";

const producerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  bio: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

export default mongoose.models.Producer || mongoose.model("Producer", producerSchema);
