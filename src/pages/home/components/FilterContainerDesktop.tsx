import { useState } from "react";
import { useAppData } from "../../../context/AppDataContext";
import type { Author } from "../../../types/author";
import type { Category } from "../../../types/category";
import { FIlterIcon } from "../../../utils/icons";
import styles from "./filterContainerDektop.module.css";

const ItemList = ({
  item,
  onClick,
  isSelected,
}: {
  item: Author | Category;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <li
      aria-selected={isSelected}
      onClick={onClick}
      className={`${styles.itemLine} ${
        isSelected ? styles.itemLineSelected : ""
      }`}
    >
      {item.name}
    </li>
  );
};

export const FilterContainerDesktop = () => {
  const { authors, categories, setSelectedAuthors, setSelectedCategories } =
    useAppData();

  const [localAuthors, setLocalAuthors] = useState<string[]>([]);
  const [localCategories, setLocalACategories] = useState<string[]>([]);

  const selectCategory = (id: string, isAuthor: boolean) => {
    if (isAuthor) {
      setLocalAuthors((prev) =>
        prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
      );
    } else {
      setLocalACategories((prev) =>
        prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
      );
    }
  };

  const applyFilter = () => {
    setSelectedAuthors(localAuthors);
    setSelectedCategories(localCategories);
  };

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersArea}>
        <div className={styles.filtersTitle}>
          <FIlterIcon size={20} /> Filters
        </div>
        <section
          aria-labelledby="filter-authors"
          className={styles.categoriesArea}
        >
          <h3>Categories</h3>
          {categories.map((cat) => (
            <ItemList
              onClick={() => selectCategory(cat.id, false)}
              item={cat}
              key={cat.id}
              isSelected={localCategories.includes(cat.id)}
            />
          ))}
        </section>
        <section
          aria-labelledby="filter-categories"
          className={styles.categoriesArea}
        >
          <h3>Authors</h3>
          {authors.map((author) => (
            <ItemList
              onClick={() => selectCategory(author.id, true)}
              item={author}
              key={author.id}
              isSelected={localAuthors.includes(author.id)}
            />
          ))}
        </section>
        <button className={styles.applyFilterBtn} onClick={applyFilter}>
          Apply filters
        </button>
      </div>
    </div>
  );
};
