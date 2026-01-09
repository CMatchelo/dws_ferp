import { useAppData } from "../../../context/AppDataContext";
import { ArticleCard } from "../../../components/ArticleCard";
import styles from "./mostRecent.module.css"

export const MostRecent = () => {
  const { filteredPosts } = useAppData();

  return (
    <div className={styles.recentContainer}>
      <h2>Last articles</h2>
      {filteredPosts.slice(0, 3).map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  );
};
