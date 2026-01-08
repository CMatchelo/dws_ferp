import { useAppData } from "../../context/AppDataContext";
import { ArticleCard } from "./components/ArticleCard";
import styles from "./index.module.css"

export default function Home() {
  const { posts, loading, error } = useAppData();

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error when loading</p>;

  console.log(posts)
  return (
    <div className={styles.postsArea}>
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  );
}
