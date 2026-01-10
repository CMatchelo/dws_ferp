// utils/filterPosts.ts
export interface Author {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  author: Author;
  categories: Category[];
  createdAt: string; // ISO string
}

interface FilterPostsParams {
  posts: Post[];
  selectedAuthors: string[]; // ids
  selectedCategories: string[]; // ids
  search: string;
  newestFirst: boolean;
}

export function filterPosts({
  posts,
  selectedAuthors,
  selectedCategories,
  search,
  newestFirst,
}: FilterPostsParams): Post[] {
  let filtered = posts.filter((post) => {
    const authorMatch =
      selectedAuthors.length === 0 || selectedAuthors.includes(post.author.id);

    const categoryMatch =
      selectedCategories.length === 0 ||
      post.categories.some((cat) => selectedCategories.includes(cat.id));

    const searchMatch =
      search.trim() === "" ||
      post.title.toLowerCase().includes(search.toLowerCase());

    return authorMatch && categoryMatch && searchMatch;
  });

  filtered.sort((a, b) => {
    return newestFirst
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return filtered;
}
