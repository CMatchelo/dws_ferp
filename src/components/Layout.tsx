import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useAuthors } from "../hooks/useAuthors";
import { useCategories } from "../hooks/useCategories";
import { usePosts } from "../hooks/usePosts";

export default function Layout() {
  useAuthors()
  useCategories()
  usePosts()
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
