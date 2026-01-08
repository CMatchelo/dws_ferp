import type { Category } from "../types/category";
import { http } from "./http";

export const CategoriesApi = {
  getAll: () => http.get<Category[]>("/categories")
}