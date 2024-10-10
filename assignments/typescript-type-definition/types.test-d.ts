import { describe, expectTypeOf, test } from 'vitest'
import type { NewPost } from './types'

describe('newpost type', () => {
  test('id of newpost type is optional', () => {
    const postWithOptionalId: NewPost = {
      title: 'This post does not require an id',
      content: 'Post content!'
    }

    expectTypeOf(postWithOptionalId).toMatchTypeOf<NewPost>()

    postWithOptionalId.id = 4

    expectTypeOf(postWithOptionalId).toMatchTypeOf<NewPost>()
  })
})
