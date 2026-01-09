import { useEffect } from "react";
import { PostsApi } from "../api/posts.api";
import { useAppData } from "../context/AppDataContext";

export function usePosts() {
  const { setPosts, setLoading, setError } = useAppData();

  useEffect(() => {
    PostsApi.getAll()
      .then((res) => {
        console.log("API posts:", res.data.map(p => p.createdAt));
        setPosts(res.data)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [setPosts, setError, setLoading]);

}
