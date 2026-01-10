import { useAppData } from "../../../context/AppDataContext";
import { ArticleCard } from "../../../components/ArticleCard";
import styles from "./mostRecent.module.css";

export const MostRecent = () => {
  const { filteredPosts } = useAppData();

  return (
    <section className={styles.recentContainer}>
      <h2>Last articles</h2>
      <div className={styles.recentArea}>
        {filteredPosts.slice(0, 3).map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
