import { useAppData } from "../../context/AppDataContext";
import { ArticleCard } from "../../components/ArticleCard";
import { FiltesrContainerMobile } from "./components/FiltersContainerMobile";
import styles from "./index.module.css";
import { FilterContainerDesktop } from "./components/FilterContainerDesktop";

export default function Home() {
  const { filteredPosts, loading, error } = useAppData();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error when loading</p>;

  return (
    <div className={styles.postsContainer}>
      <FiltesrContainerMobile />
      <div className={styles.mainDesktop}>
        <FilterContainerDesktop />
        <div className={styles.postsArea}>
          {filteredPosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
