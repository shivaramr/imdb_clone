"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useRouter } from "next/navigation";
import styles from "./style.module.css";

const Body = () => {
  const router = useRouter();
  const movies = useSelector((state: RootState) => state.movies.movies);

  const onClick = useCallback(
    (id: string) => {
      router.push(`/movie/${id}`); // Redirect to /new-page
    },
    [router]
  );

  return (
    <>
      {movies.length ? (
        <div className={styles.bodyMain}>
          <div className={styles.bodyTitle}>
            <div className={styles.line} />
            <h1>Top Movies</h1>
          </div>
          <div className={styles.posterRow}>
            {movies.map((movie) => (
              <Image
                src={movie?.poster}
                alt="movieImg"
                key={movie?._id}
                height={240}
                width={240}
                className={styles.circleImage}
                onClick={() => onClick(movie?._id)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Body;
