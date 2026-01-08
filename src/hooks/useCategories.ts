import { useEffect } from "react";
import { CategoriesApi } from "../api/categories.api";
import { useAppData } from "../context/AppDataContext";

export function useCategories() {
  const { setCategories, setLoading, setError } = useAppData();

  useEffect(() => {
    CategoriesApi.getAll()
      .then((res) => setCategories(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [setCategories, setError, setLoading]);
}
