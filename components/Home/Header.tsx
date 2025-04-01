"use client";

import MovieCard from "./MovieCard";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

const Header = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);

  return (
    <div className={styles.main}>
      <div className={styles.carousel}>
        <h1>Welcome to IMDb Clone Web Application!</h1>
      </div>
      <div className={styles.menu}>
        {movies.map((movie) => (
          <MovieCard key={movie?._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Header;
