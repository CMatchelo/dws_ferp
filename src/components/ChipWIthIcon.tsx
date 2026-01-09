import styles from "./ChipWIthIcon.module.css";

interface FilterChipProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ChipWithIcon = ({ onClick, children, className }: FilterChipProps) => {
  return (
    <div onClick={onClick} className={`${styles.filterChip} ${className || ""}`}>
      {children}
    </div>
  );
};
