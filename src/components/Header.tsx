import { useEffect, useState } from "react";
import { SearchIcon } from "../utils/icons";
import styles from "./Header.module.css";
import { useAppData } from "../context/AppDataContext";
import { useIsMobile } from "../utils/checkDevice";

export default function Header() {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const { termSearched, setTermSearched } = useAppData();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
  }, [isMobile]);

  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div
          className={`${styles.logoContainer} ${
            openSearch ? styles.logoHiddenMobile : ""
          }`}
        >
          <img className={styles.dentsuLogo} src="./dentsuLogo.png" />
          <caption className={styles.dentsuMotto}>World Services</caption>
        </div>
        <div
          className={`${
            openSearch ? styles.searchContainerActive : styles.searchContainer
          }`}
        >
          {openSearch && (
            <input
              value={termSearched}
              onChange={(e) => setTermSearched(e.target.value)}
              placeholder="Search..."
            ></input>
          )}
          <div
            className={styles.searchIcon}
            onClick={
              isMobile ? () => setOpenSearch((prev) => !prev) : undefined
            }
          >
            <SearchIcon size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
