export interface Post {
  id: number
  title: string
  content: string | null
}

export type WithOptionalKeys<Type, Key extends keyof Type> = {
  [k in Key]?: Type[k]
} & Omit<Type, Key>

export type NewPost = WithOptionalKeys<Post, 'id'>
