import Header from "./Header";
import { renderWithProviders } from "../utils/renderWithProviders";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { useIsMobile } from "../utils/checkDevice";
import { expect, it, vi } from "vitest";
import { filterPosts } from "../utils/filterPosts";

vi.mock("../utils/checkDevice", () => {
  return {
    useIsMobile: vi.fn(),
  };
});

const mockPosts = [
  {
    id: "1",
    title: "React Basics",
    author: { id: "1", name: "John Doe" },
    categories: [{ id: "a", name: "Frontend" }],
    createdAt: "2026-01-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Vue Guide",
    author: { id: "2", name: "Jane Smith" },
    categories: [{ id: "a", name: "Frontend" }],
    createdAt: "2026-01-02T10:00:00Z",
  },
  {
    id: "3",
    title: "Node.js Overview",
    author: { id: "3", name: "Alice Brown" },
    categories: [{ id: "b", name: "Backend" }],
    createdAt: "2026-01-03T10:00:00Z",
  },
];

const mockedUseIsMobile = useIsMobile as unknown as ReturnType<typeof vi.fn>;

it("hides search area in mobile", async () => {
  mockedUseIsMobile.mockReturnValue(true);

  renderWithProviders(<Header />);

  await waitFor(() => {
    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });
});

it("toggle search area when search icon clicked", () => {
  mockedUseIsMobile.mockReturnValue(true);
  renderWithProviders(<Header />);
  const searchButton = screen.getByLabelText("Search");

  fireEvent.click(searchButton);
  expect(screen.queryByRole("searchbox")).toBeInTheDocument();

  fireEvent.click(searchButton);
  expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
});

it("displays search area in desktop", async () => {
  mockedUseIsMobile.mockReturnValue(false);

  renderWithProviders(<Header />);

  expect(await screen.findByRole("searchbox")).toBeInTheDocument();
});

it("filters by title searched", () => {
  const result = filterPosts({
    posts: mockPosts,
    search: "react",
    selectedAuthors: [],
    selectedCategories: [],
    newestFirst: true,
  });

  expect(result[0].title).toMatch(/react/i);
});

it("filters by author", () => {
  const result = filterPosts({
    posts: mockPosts,
    selectedAuthors: ["1"],
    selectedCategories: [],
    search: "",
    newestFirst: true,
  });

  expect(result).toHaveLength(1);
  expect(result[0].author.id).toBe("1");
});

it("filters by category", () => {
  const result = filterPosts({
    posts: mockPosts,
    selectedAuthors: [],
    selectedCategories: ["a"],
    search: "",
    newestFirst: true,
  });

  expect(result).toHaveLength(2);
  expect(result[0].author.id).toBe("2");
});
