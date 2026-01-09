import { useEffect, useState } from "react";
import type { Post } from "../../types/post";
import { useNavigate, useParams } from "react-router-dom";
import { PostsApi } from "../../api/posts.api";
import styles from "./index.module.css";
import { formatDate } from "../../utils/dateFormatter";
import { ChipWithIcon } from "../../components/ChipWIthIcon";
import { BackArronIcon } from "../../utils/icons";
import { MostRecent } from "./components/MostRecent";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    PostsApi.getOne(id)
      .then((res) => setPost(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error when loading, try again later</div>;
  if (!post) return <div>Post not found</div>;

  const backToMenu = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <ChipWithIcon className={styles.chipBack} onClick={backToMenu}>
          <BackArronIcon size={16} />
          Back
        </ChipWithIcon>
      <div className={styles.postArea}>
        <h2>{post.title}</h2>
        <div className={styles.postInfosContainer}>
          <div className={styles.writterPic}>
            <img src={post.author.profilePicture} alt="Author Photo" />
          </div>
          <div className={styles.postInfos}>
            <span>
              Written by: <strong>{post.author.name}</strong>
            </span>
            <span className={styles.postDate}>
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
        <img
          className={styles.imgCover}
          src={post.thumbnail_url}
          alt="Post Cover"
        />
        <span className="bodySmall">{post.content}</span>
        <MostRecent />
      </div>
    </div>
  );
}
