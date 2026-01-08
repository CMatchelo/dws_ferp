import { useAppData } from "../../context/AppDataContext";
import { ArticleCard } from "./components/ArticleCard";
import { FiltesrArea } from "./components/FiltersArea";
import styles from "./index.module.css";

export default function Home() {
  const { filteredPosts, loading, error } = useAppData();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error when loading</p>;

  console.log(filteredPosts);
  return (
    <div>
      <FiltesrArea />
      <div className={styles.postsArea}>
        {filteredPosts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
