import styles from "./categoryChip.module.css"

interface CategoryChipProps {
  category: string
}

export const CategoryChip = ({category}: CategoryChipProps) => {
  return (
    <caption className={styles.chipsLabel}>
      {category}
    </caption>
  )
}