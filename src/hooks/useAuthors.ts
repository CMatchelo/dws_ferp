import { useEffect } from "react";
import { AuthorsApi } from "../api/authors.api";
import { useAppData } from "../context/AppDataContext";

export function useAuthors() {

  const { setAuthors, setLoading, setError } =
      useAppData();

  useEffect(() => {
    AuthorsApi.getAll()
      .then((res) => setAuthors(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [setAuthors, setLoading, setError]);

}
