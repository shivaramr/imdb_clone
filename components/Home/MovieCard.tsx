import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";

interface MovieCardProps {
  movie: {
    _id: string;
    name: string;
    poster: string;
    plot: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const router = useRouter();
  const { poster, name, plot, _id } = movie || "";

  const onClick = useCallback(() => {
    router.push(`/movie/${_id}`); // Redirect to /new-page
  },[_id, router]);

  return (
    <div className={styles.movieCardMain} onClick={onClick}>
      <Image src={poster} alt={name} height={88} width={64} />
      <div>
        <h3>{name}</h3>
        <p className={styles.plot}>{plot}</p>
      </div>
    </div>
  );
};

export default MovieCard;
