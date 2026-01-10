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
      <section aria-labelledby="filters" className={styles.topRow}>
        <ChipWithIcon onClick={() => openList("categories")}>
          Categories <ArrowDownIcon size={18} />
        </ChipWithIcon>
        <ChipWithIcon onClick={() => openList("authors")}>
          Author <ArrowDownIcon size={18} />
        </ChipWithIcon>
        <div onClick={changeOrder} className={styles.orderLabel}>
          {newestFirst ? <>Newest</> : <>Oldest</>} First{" "}
          <ArrowsUpDown size={16} />
        </div>
      </section>

      {openCategories && (
        <section aria-labelledby="filters-authors" className={styles.overlay}>
          <FilterListMobile items={categories} isAuthor={false} />
        </section>
      )}

      {openAuthors && (
        <section aria-labelledby="filters-categories" className={styles.overlay}>
          <FilterListMobile items={authors} isAuthor={true} />
        </section>
      )}
    </div>
  );
};
