import type { Post, NewPost } from './types'

const post: Post = {
  id: 3,
  title: 'This post requires an id',
  content: 'Post content!'
}

const postWithOptionalId: NewPost = {
  title: 'This post does not require an id',
  content: 'Post content!'
}

// @ts-expect-error Not allowed, id is required for type `Post`
delete post.id

console.log('We can optionally assign an id to postWithOptionalId!')
postWithOptionalId.id = 4
console.log(postWithOptionalId)

console.log('We can also delete it!')
delete postWithOptionalId.id
console.log(postWithOptionalId)
