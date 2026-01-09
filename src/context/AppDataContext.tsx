import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
  newestFirst: boolean;
  termSearched: string;
  setPosts: (posts: Post[]) => void;
  setCategories: (caregories: Category[]) => void;
  setAuthors: (authors: Author[]) => void;
  setLoading: (res: boolean) => void;
  setError: (err: Error | null) => void;
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setNewestFirst: React.Dispatch<React.SetStateAction<boolean>>;
  setTermSearched: React.Dispatch<React.SetStateAction<string>>;
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
  const [newestFirst, setNewestFirst] = useState<boolean>(true);
  const [termSearched, setTermSearched] = useState<string>("");

  const filteredPosts = useMemo(() => {
    const searchTerm = termSearched.trim().toLocaleLowerCase();
    const result = posts.filter((post) => {
      const filterAuthor =
        selectedAuthors.length === 0 ||
        selectedAuthors.includes(post.author.id);

      const filterCategory =
        selectedCategories.length === 0 ||
        post.categories.some((category) =>
          selectedCategories.includes(category.id)
        );

      const filterTitle =
        searchTerm === "" || post.title.toLowerCase().includes(searchTerm);

      return filterAuthor && filterCategory && filterTitle;
    });
    return [...result].sort((a, b) =>
      newestFirst
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [posts, selectedAuthors, selectedCategories, newestFirst, termSearched]);

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
        newestFirst,
        termSearched,
        setPosts,
        setAuthors,
        setSelectedAuthors,
        setCategories,
        setSelectedCategories,
        setLoading,
        setError,
        setNewestFirst,
        setTermSearched,
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
