import styles from "./filtersArea.module.css";

interface FilterChipBox {
  onClick: () => void;
  children: React.ReactNode;
}

export const FilterChip = ({ onClick, children }: FilterChipBox) => {
  return (
    <div onClick={onClick} className={styles.filterChip}>
      {children}
    </div>
  );
};
