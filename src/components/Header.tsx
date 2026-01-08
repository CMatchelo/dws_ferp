import { SearchIcon } from "../utils/icons";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <h3>dentsu</h3>
      <span>World Services</span>
      <SearchIcon size={24} />
    </div>
  );
}
