import { useNavigate } from "react-router-dom";
import type { Post } from "../../../types/post";
import { formatDate } from "../../../utils/dateFormatter";
import styles from "./articleCard.module.css";
import { CategoryChip } from "./CategoryChip";

interface ArticleCardProps {
  post: Post;
}

export const ArticleCard = ({ post }: ArticleCardProps) => {

  const navigate = useNavigate()

  const goToPost = (id: string) => {
    navigate(`/${id}`)
  }

  return (
    <div className={styles.postCard} onClick={() => goToPost(post.id)}>
      <img src={post.thumbnail_url} />
      <div className={styles.postDetails}>
        <div className={styles.postInfo}>
          <caption>{formatDate(post.createdAt)}</caption>
          <span className={styles.dot} />
          <caption>{post.author.name.trim().split(" ").pop()}</caption>
        </div>
        <div className={styles.postContent}>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <span className={styles.bodySmall}>{post.content}</span>
        </div>
        <div className={styles.categoryChips}>
          {post.categories.map((cat) => (
            <CategoryChip key={cat.id} category={cat.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
