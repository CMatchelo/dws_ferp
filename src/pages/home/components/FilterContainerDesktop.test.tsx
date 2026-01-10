import { expect, it, vi } from "vitest";
import { FilterContainerDesktop } from "./FilterContainerDesktop";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

vi.mock("../utils/checkDevice", () => {
  return {
    useIsMobile: vi.fn(),
  };
});

const mockSetSelectedCategories = vi.fn();
const mockSetSelectedAuthors = vi.fn();

vi.mock("../../../context/AppDataContext", () => ({
  useAppData: () => ({
    authors: [
      { id: "auth1", name: "John Doe" },
      { id: "auth2", name: "Jane Smith" },
    ],
    categories: [
      { id: "cat1", name: "tech" },
      { id: "cat2", name: "sports" },
    ],
    setSelectedCategories: mockSetSelectedCategories,
    setSelectedAuthors: mockSetSelectedAuthors,
  }),
}));

it("displays categories and authors", () => {
  render(<FilterContainerDesktop />);

  expect(screen.getByText("tech")).toBeInTheDocument();
  expect(screen.getByText("sports")).toBeInTheDocument();

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Smith")).toBeInTheDocument();
});

it("toggles an item when clicked", () => {
  render(<FilterContainerDesktop />);
  const cat = screen.getByText("tech");

  fireEvent.click(cat);
  expect(cat).toHaveAttribute("aria-selected", "true");

  fireEvent.click(cat);
  expect(cat).toHaveAttribute("aria-selected", "false");
});

it("applies filters when button clicked", () => {
  render(<FilterContainerDesktop />);

  const cat = screen.getByText("tech")
  fireEvent.click(cat)
  
  const btn = screen.getByRole("button", { name: /apply filters/i })

  fireEvent.click(btn)

  expect(mockSetSelectedCategories).toHaveBeenCalledWith(["cat1"])
})
