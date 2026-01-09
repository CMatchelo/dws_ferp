import { SearchIcon } from "../utils/icons";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.dentsuLogo} src="./public/dentsuLogo.png" />
      <caption className={styles.dentsuMotto}>World Services</caption>
      <div className={styles.searchContainer}>
        <SearchIcon size={24} />
      </div>
    </div>
  );
}
