import { createContext, useContext, useState } from "react";
import type { Post } from "../types/post";
import type { Category } from "../types/category";
import type { Author } from "../types/author";

type AppDataContextType = {
  posts: Post[];
  categories: Category[];
  authors: Author[];
  error: Error | null;
  loading: boolean;
  setPosts: (posts: Post[]) => void;
  setCategories: (caregories: Category[]) => void;
  setAuthors: (authors: Author[]) => void;
  setLoading: (res: boolean) => void;
  setError: (err: Error | null) => void;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <AppDataContext.Provider
      value={{
        posts,
        authors,
        categories,
        error,
        loading,
        setPosts,
        setAuthors,
        setCategories,
        setLoading,
        setError,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("No context found");

  return ctx;
}
