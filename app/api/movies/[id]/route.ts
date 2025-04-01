import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/utils/dbConnect";
import Movie from "@/lib/models/Movie";
import Actor from "@/lib/models/Actor";
import Producer from "@/lib/models/Producer";

// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//   await dbConnect();

//   const { id } = await params;

//   if (!id) {
//     return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
//   }

//   // Find the movie by its ID and populate related fields
//   const movieToDelete = await Movie.findById(id).populate("producer").populate("actors");

//   if (!movieToDelete) {
//     return NextResponse.json({ error: "Movie not found" }, { status: 404 });
//   }

//   // Remove the movie ID from the producer's movie list
//   const producer = movieToDelete.producer;
//   if (producer) {
//     producer.movies = producer.movies.filter((movieId: any) => movieId.toString() !== id);
//     await producer.save();
//   }

//   // Remove the movie ID from each actor's movie list
//   for (const actor of movieToDelete.actors) {
//     actor.movies = actor.movies.filter((movieId: any) => movieId.toString() !== id);
//     await actor.save();
//   }

//   // Delete the movie using findByIdAndDelete
//   await Movie.findByIdAndDelete(id);

//   return NextResponse.json({ message: "Movie deleted successfully" }, { status: 200 });
// }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params; // ✅ Correctly access the ID from params

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
