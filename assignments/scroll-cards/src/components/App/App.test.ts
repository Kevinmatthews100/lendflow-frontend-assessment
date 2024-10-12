import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn()
}))

vi.stubGlobal(`IntersectionObserver`, MockIntersectionObserver)

describe('app component', () => {
  test('selects first card on mount', () => {
    const wrapper = mount(App)

    const firstCard = wrapper.find('#card-0')
    const firstCardHasSelectedClass = firstCard.classes().includes('selected')

    expect(firstCardHasSelectedClass).toBeTruthy()
  })
})
