import { useEffect } from "react";
import { PostsApi } from "../api/posts.api";
import { useAppData } from "../context/AppDataContext";

export function usePosts() {
  const { setPosts, setLoading, setError } = useAppData();

  useEffect(() => {
    PostsApi.getAll()
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [setPosts, setError, setLoading]);

}
