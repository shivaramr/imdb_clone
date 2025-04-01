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
