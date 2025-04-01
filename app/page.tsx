"use client"

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Body from "@/components/Home/Body";
import Header from "@/components/Home/Header";
import { fetchMovies } from "@/lib/store/slices/movieSlice";
import { AppDispatch } from "@/lib/store/store";
import styles from "./page.module.css";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <Header />
      <Body />
    </div>
  );
}
