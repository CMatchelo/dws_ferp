import styles from "./ChipWIthIcon.module.css";

interface FilterChipBox {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ChipWithIcon = ({ onClick, children, className }: FilterChipBox) => {
  return (
    <div onClick={onClick} className={`${styles.filterChip} ${className || ""}`}>
      {children}
    </div>
  );
};
