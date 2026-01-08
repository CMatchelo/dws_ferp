import type { Post } from "../../../types/post";
import { formatDate } from "../../../utils/dateFormatter";
import styles from "./articleCard.module.css";
import { CategoryChip } from "./CategoryChip";

interface ArticleCardProps {
  post: Post;
}

export const ArticleCard = ({ post }: ArticleCardProps) => {
  return (
    <div className={styles.postCard}>
      <img src={post.thumbnail_url} />
      <div className={styles.postDetails}>
        <div className={styles.postInfo}>
          <span className={styles.caption}>{formatDate(post.createdAt)}</span>
          <span className={styles.dot} />
          <span className={styles.caption}>{post.author.name.trim().split(" ").pop()}</span>
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
