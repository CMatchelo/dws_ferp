import { createContext, useContext, useMemo, useState } from "react";
import type { Post } from "../types/post";
import type { Category } from "../types/category";
import type { Author } from "../types/author";

type AppDataContextType = {
  filteredPosts: Post[];
  categories: Category[];
  selectedCategories: string[];
  authors: Author[];
  selectedAuthors: string[];
  error: Error | null;
  loading: boolean;
  setPosts: (posts: Post[]) => void;
  setCategories: (caregories: Category[]) => void;
  setAuthors: (authors: Author[]) => void;
  setLoading: (res: boolean) => void;
  setError: (err: Error | null) => void;
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    if (selectedAuthors.length === 0 && selectedCategories.length === 0) {
      return posts;
    }

    return posts.filter((post) => {
      const filterAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(post.author.id);
      const filterCategory =
        selectedCategories.length === 0 ||
        post.categories.some((category) =>
          selectedCategories.includes(category.id)
        );
      return filterAuthor && filterCategory;
    });
  }, [posts, selectedAuthors, selectedCategories]);

  return (
    <AppDataContext.Provider
      value={{
        authors,
        selectedAuthors,
        filteredPosts,
        categories,
        selectedCategories,
        error,
        loading,
        setPosts,
        setAuthors,
        setSelectedAuthors,
        setCategories,
        setSelectedCategories,
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
