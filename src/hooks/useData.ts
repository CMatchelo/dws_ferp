import { useEffect } from "react";
import { PostsApi } from "../api/posts.api";
import { CategoriesApi } from "../api/categories.api";
import { AuthorsApi } from "../api/authors.api";
import { useAppData } from "../context/AppDataContext";

export function useData() {
  const { setPosts, setCategories, setAuthors, setLoading, setError } =
    useAppData();

  useEffect(() => {
    Promise.all([
      PostsApi.getAll(),
      CategoriesApi.getAll(),
      AuthorsApi.getAll(),
    ])
      .then(([posts, categories, authors]) => {
        setPosts(posts.data);
        setCategories(categories.data);
        setAuthors(authors.data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [setPosts, setCategories, setAuthors, setError, setLoading]);
}
