export interface Post {
  id: number
  title: string
  content: string | null
}

export type NewPost = { id?: number } & Omit<Post, 'id'>
