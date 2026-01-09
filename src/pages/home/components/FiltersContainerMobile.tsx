import { useState } from "react";
import { ArrowDownIcon, ArrowsUpDown } from "../../../utils/icons";
import styles from "./filtersContainerMobile.module.css";
import { useAppData } from "../../../context/AppDataContext";
import { FilterListMobile } from "./FilterListMobile";
import { ChipWithIcon } from "../../../components/ChipWIthIcon";

export const FiltesrContainerMobile = () => {
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openAuthors, setOpenAuthors] = useState<boolean>(false);
  const { authors, categories, newestFirst, setNewestFirst } = useAppData();

  const openList = (type: "authors" | "categories") => {
    if (type === "authors") {
      setOpenAuthors((prev) => !prev);
      setOpenCategories(false);
    }

    if (type === "categories") {
      setOpenCategories((prev) => !prev);
      setOpenAuthors(false);
    }
  };

  const changeOrder = () => {
    setNewestFirst((prev) => !prev);
  };

  return (
    <div className={styles.filterArea}>
      <div className={styles.topRow}>
        <ChipWithIcon onClick={() => openList("categories")}>
          Categories <ArrowDownIcon size={24} />
        </ChipWithIcon>
        <ChipWithIcon onClick={() => openList("authors")}>
          Author <ArrowDownIcon size={24} />
        </ChipWithIcon>
        <div onClick={changeOrder} className={styles.orderLabel}>
          {newestFirst ? <>Newest</> : <>Oldest</>} First{" "}
          <ArrowsUpDown size={18} />
        </div>
      </div>

      {openCategories && (
        <div className={styles.overlay}>
          <FilterListMobile items={categories} isAuthor={false} />
        </div>
      )}

      {openAuthors && (
        <div className={styles.overlay}>
          <FilterListMobile items={authors} isAuthor={true} />
        </div>
      )}
    </div>
  );
};
