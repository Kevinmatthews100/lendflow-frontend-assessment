export interface Post {
  id: number
  title: string
  content: string | null
}

/**
 * @description Construct a type with the properties of `Type`, with properties of `Keys`
 * set to optional
 */
export type WithOptionalKeys<Type, Keys extends keyof Type> = {
  [k in Keys]?: Type[k]
} & Omit<Type, Keys>

export type NewPost = WithOptionalKeys<Post, 'id'>
