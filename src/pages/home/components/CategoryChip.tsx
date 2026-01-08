import styles from "./categoryChip.module.css"

interface CategoryChipProps {
  category: string
}

export const CategoryChip = ({category}: CategoryChipProps) => {
  return (
    <div className={styles.categoryChip}>
      {category}
    </div>
  )
}