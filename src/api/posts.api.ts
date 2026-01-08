import type { Post } from "../types/post";
import { http } from "./http";

export const PostsApi = {
  getAll: () => http.get<Post[]>("/posts"),
  getOne: (id: number) => http.get<Post>(`/posts/${id}`)
}