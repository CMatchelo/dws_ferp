import type { Author } from "../types/author";
import { http } from "./http";

export const AuthorsApi = {
  getAll: () => http.get<Author[]>("/authors")
}