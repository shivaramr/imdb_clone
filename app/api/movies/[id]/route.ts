import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/utils/dbConnect";
import Movie from "@/lib/models/Movie";
import Actor from "@/lib/models/Actor";
import Producer from "@/lib/models/Producer";

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url); // ✅ Parse the URL
  const id = url.pathname.split("/").pop(); // ✅ Extract the last segment as the movie ID

  if (!id) {
    return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
  }

  const movieToDelete = await Movie.findById(id).populate("producer").populate("actors");

  if (!movieToDelete) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  // Remove the movie reference from Producer
  if (movieToDelete.producer) {
    await Producer.updateOne({ _id: movieToDelete.producer }, { $pull: { movies: id } });
  }

  // Remove the movie reference from all Actors
  await Actor.updateMany({ _id: { $in: movieToDelete.actors } }, { $pull: { movies: id } });

  // Delete the movie
  await Movie.findByIdAndDelete(id);

  return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 });
}
