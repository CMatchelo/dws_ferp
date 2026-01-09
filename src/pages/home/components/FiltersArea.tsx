import { useState } from "react";
import { ArrowDownIcon, ArrowsUpDown } from "../../../utils/icons";
import { ChipWithIcon } from "../../../components/ChipWithIcon";
import styles from "./filtersArea.module.css";
import { useAppData } from "../../../context/AppDataContext";
import { FilterList } from "./FilterList";

export const FiltesrArea = () => {
  const [openCategories, setOpenCategories] = useState<boolean>(false);
  const [openAuthors, setOpenAuthors] = useState<boolean>(false);
  const { authors, categories } = useAppData();

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

  return (
    <div className={styles.filterArea}>
      <div className={styles.topRow}>
        <ChipWithIcon onClick={() => openList("categories")}>
          Categories <ArrowDownIcon size={24} />
        </ChipWithIcon>
        <ChipWithIcon onClick={() => openList("authors")}>
          Author <ArrowDownIcon size={24} />
        </ChipWithIcon>
        <div className={styles.orderLabel}>
          Newest First <ArrowsUpDown size={18} />
        </div>
      </div>

      {openCategories && (
        <div className={styles.overlay}>
          <FilterList items={categories} isAuthor={false} />
        </div>
      )}

      {openAuthors && (
        <div className={styles.overlay}>
          <FilterList items={authors} isAuthor={true} />
        </div>
      )}
    </div>
  );
};
