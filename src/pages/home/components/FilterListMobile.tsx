import { useAppData } from "../../../context/AppDataContext";
import type { Author } from "../../../types/author";
import type { Category } from "../../../types/category";
import { CloseIcon } from "../../../utils/icons";
import { ChipWithIcon } from "../../../components/ChipWIthIcon";
import styles from "./filtersContainerMobile.module.css";

interface FilterListProps {
  items: Author[] | Category[];
  isAuthor: boolean;
}

export const FilterListMobile = ({ items, isAuthor }: FilterListProps) => {
  const {
    setSelectedAuthors,
    setSelectedCategories,
    selectedAuthors,
    authors,
    selectedCategories,
    categories,
  } = useAppData();

  const selectedAuthorsNames = selectedAuthors.map((id) =>
    authors.find((author) => author.id === id)
  );

  const selectedCategoryNames = selectedCategories.map((id) =>
    categories.find((cat) => cat.id === id)
  );

  const selectFilterOption = (id: string) => {
    if (isAuthor) {
      setSelectedAuthors((prev) =>
        prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
      );
    } else {
      setSelectedCategories((prev) =>
        prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
      );
    }
  };

  const cleanList = () => {
    if (isAuthor) setSelectedAuthors([]);
    if (!isAuthor) setSelectedCategories([]);
  };

  return (
    <div className={styles.listItemsContainer}>
      <ul className={styles.itemsList}>
        {items.map((item, index) => (
          <li key={index} onClick={() => selectFilterOption(item.id)}>
            {isAuthor ? item.name.trim().split(" ").pop() : item.name}
          </li>
        ))}
      </ul>
      {selectedAuthorsNames.length > 0 && (
        <ChipWithIcon onClick={() => cleanList()}>
          {isAuthor && selectedAuthorsNames.map(author => author?.name.split(" ").pop()).join(", ")}
          <CloseIcon size={24} />
        </ChipWithIcon>
      )}
      {selectedCategoryNames.length > 0 && (
        <ChipWithIcon onClick={() => cleanList()}>
          {!isAuthor && selectedCategoryNames.map(cat => cat?.name).join(", ")}
          <CloseIcon size={24} />
        </ChipWithIcon>
      )}
    </div>
  );
};
