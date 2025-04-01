/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/utils/dbConnect";
import Movie from "@/lib/models/Movie";
import Actor from "@/lib/models/Actor";
import Producer from "@/lib/models/Producer";

export async function GET() {
  await dbConnect();
  const movies = await Movie.find().populate("producer").populate("actors").populate("plot").populate("poster");
  
  return NextResponse.json(movies);
}

export async function POST(req: Request) {
  await dbConnect();
  const { name, year, producer, actors, plot, poster } = await req.json();

  // Check if producer exists, else create
  let existingProducer = await Producer.findOne({ name: producer });
  if (!existingProducer) {
    existingProducer = await Producer.create({ name: producer, movies: [] });
  }

  // Check if actors exist, else create
  const actorIds = await Promise.all(
    actors?.map(async (actorName: string) => {
      let existingActor = await Actor.findOne({ name: actorName });
      if (!existingActor) {
        existingActor = await Actor.create({ name: actorName, movies: [] });
      }
      return existingActor._id;
    })
  );

  const newMovie = await Movie.create({
    name,
    year,
    plot,
    poster,
    producer: existingProducer._id,
    actors: actorIds,
  });

  existingProducer.movies.push(newMovie._id);
  await existingProducer.save();

  for (const actorId of actorIds) {
    const actor = await Actor.findById(actorId);
    if (actor) {
      actor.movies.push(newMovie._id);
      await actor.save();
    }
  }

  return NextResponse.json(newMovie, { status: 200 });
}

export async function DELETE(req: Request) {
  await dbConnect();

  // Extract the movie ID from the request URL
  const url = new URL(req.url); // Use the URL constructor to parse the URL
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL path
  
  if (!id) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }
  
  // Find the movie by its ID
  const movieToDelete = await Movie.findById(id).populate('producer').populate('actors');

  if (!movieToDelete) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  // Remove the movie ID from the producer's movie list
  const producer = movieToDelete.producer;
  if (producer) {
    producer.movies = producer.movies.filter((movieId: any) => movieId.toString() !== id);
    await producer.save();
  }

  // Remove the movie ID from each actor's movie list
  for (const actor of movieToDelete.actors) {
    actor.movies = actor.movies.filter((movieId: any) => movieId.toString() !== id);
    await actor.save();
  }

  // Delete the movie
  await movieToDelete.remove();

  return NextResponse.json({ message: 'Movie deleted successfully' }, { status: 200 });
}
