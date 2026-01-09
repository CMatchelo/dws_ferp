import { useState } from "react";
import { useAppData } from "../../../context/AppDataContext";
import type { Author } from "../../../types/author";
import type { Category } from "../../../types/category";
import { FIlterIcon } from "../../../utils/icons";
import styles from "./filterContainerDektop.module.css";

const ItemList = ({ item, onClick }: { item: Author | Category, onClick: () => void }) => {
  return <div onClick={onClick} className={styles.itemLine}>{item.name}</div>;
};

export const FilterContainerDesktop = () => {
  const { authors, categories, setSelectedAuthors, setSelectedCategories } = useAppData();

  const [localAuthors, setLocalAuthors] = useState<string[]>([]);
  const [localCategories, setLocalACategories] = useState<string[]>([]);

  const selectCategory = (id: string, isAuthor: boolean) => {
    if (isAuthor) {
      setLocalAuthors((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id])
    } else {
      setLocalACategories((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id])
    }
  };

  const applyFilter = () => {
    setSelectedAuthors(localAuthors)
    setSelectedCategories(localCategories)
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersArea}>
        <div className={styles.filtersTitle}>
          <FIlterIcon size={20} /> Filters
        </div>
        <div className={styles.categoriesArea}>
          <h3>Categories</h3>
          {categories.map((cat) => (
            <ItemList onClick={() => selectCategory(cat.id, false)} item={cat} key={cat.id} />
          ))}
        </div>
        <div className={styles.categoriesArea}>
          <h3>Authors</h3>
          {authors.map((author) => (
            <ItemList onClick={() => selectCategory(author.id, true)} item={author} key={author.id} />
          ))}
        </div>
        <button onClick={applyFilter}>Apply filters</button>
      </div>
    </div>
  );
};
