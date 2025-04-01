import { HiOutlineMenu } from "react-icons/hi";
import CustomSearchField from "./CustomSearchField";
import styles from "./style.module.css";

const TopNav = () => {
  return (
    <div className={styles.main}>
      <div className={styles.body}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button className={styles.logoBtn}>IMDb</button>
          <label className={`${styles.menuBase} ${styles.menuIcon}`}>
            <HiOutlineMenu />
          </label>
        </div>
        <CustomSearchField />
        <div className={styles.line} />
        <label className={`${styles.menuBase} ${styles.menuLabel}`}>Sign In</label>
        <button className={styles.useAppBtn}>Use App</button>
      </div>
    </div>
  );
};

export default TopNav;
