"use client";

import { use, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { AppDispatch, RootState } from "@/lib/store/store";
import { deleteMovie, fetchMovies } from "@/lib/store/slices/movies/middleware";
import { dummyMovie, getConfirmAlertProps } from "./utils";
import styles from "./style.module.css";

const MoviePage2 = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);

  const movie = useMemo(() => movies.find((item) => item._id === id) || dummyMovie, [id, movies]);

  const handleClickDelete = useCallback(() => {
    dispatch(deleteMovie(movie?._id)).then((res) => {
      if (res?.type?.includes("fulfilled")) {
        router.push(`/`);
      }
    });
  }, [dispatch, movie?._id, router]);

  const handleDelete = useCallback(() => {
    confirmAlert(getConfirmAlertProps({ movie, handleClickDelete }));
  }, [movie, handleClickDelete]);

  return (
    <div className={styles.moviePageMain}>
      <div>
        {movie?.poster ? (
          <Image src={movie?.poster} alt={movie?.name} height={640} width={480} />
        ) : (
          <div />
        )}
      </div>
      <div>
        <h1>I {movie?.name}</h1>
        <p>
          <span>Year:</span> {movie?.year}
        </p>
        <p>
          <span>Plot:</span> {movie?.plot}
        </p>
        <p>
          <span>Producer:</span> {movie?.producer?.name}
        </p>
        <p>
          <span>Actors:</span>
          {movie?.actors
            ? movie?.actors?.map((actor, idx) => (
                <span key={actor?._id || idx}>
                  {idx > 0 ? ", " : " "}
                  {actor?.name}
                </span>
              ))
            : null}
        </p>
        <div className={styles.actions}>
          <MdOutlineEdit />
          <MdDelete onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage2;
