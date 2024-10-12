import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('card component', () => {
  test('has selected class when focused', () => {
    const wrapper = mount(Card, { props: { isInFocus: true, cardText: 'Card 1' } })

    const hasSelectedClass = wrapper.classes().includes('selected')

    expect(hasSelectedClass).toBeTruthy()
  })

  test('does not have selected class when not focused', () => {
    const wrapper = mount(Card, { props: { isInFocus: false, cardText: 'Card 1' } })

    const hasSelectedClass = wrapper.classes().includes('selected')

    expect(hasSelectedClass).toBeFalsy()
  })
})
