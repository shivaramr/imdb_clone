"use client";

import Image from "next/image";
import styles from "./style.module.css";

const CustomSearchField = () => {
  const handleSearch = () => {
    console.log("hi");
  };

  return (
    <div className={styles.searchFieldMain}>
      <input type="text" placeholder="Search here"/>
      <button className={styles.searchButton} onClick={handleSearch}>
        <Image src="https://cdn-icons-png.flaticon.com/16/149/149852.png" alt="Search" height={18} width={18}/>
      </button>
    </div>
  );
};

export default CustomSearchField;
