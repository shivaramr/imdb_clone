import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  bio: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

export default mongoose.models.Actor || mongoose.model("Actor", actorSchema);
