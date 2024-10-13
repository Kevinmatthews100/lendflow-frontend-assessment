import { describe, expect, test } from 'vitest'
import { productService } from '.'
import { ProductFilter } from './types'

describe('product service', () => {
  test('equality filters are correctly applied', () => {
    const filters: ProductFilter = {
      id: '623398f9108d565a308d04bd',
      guid: '4f40c20f-2104-4f74-9948-da6e94dc4d14',
      name: 'nisi adipisicing',
      in_stock: false,
      on_sale: false,
      gender: 'female',
      color: 'yellow'
    }

    const results = productService.getWithFilters(filters)
    const firstResult = results[0]

    expect(firstResult.id).toEqual('623398f9108d565a308d04bd')
    expect(firstResult.guid).toEqual('4f40c20f-2104-4f74-9948-da6e94dc4d14')
    expect(firstResult.name).toEqual('nisi adipisicing')
    expect(firstResult.in_stock).toEqual(false)
    expect(firstResult.on_sale).toEqual(false)
    expect(firstResult.gender).toEqual('female')
    expect(firstResult.color).toEqual('yellow')
  })

  test('category filter is correctly applied', () => {
    const filters: ProductFilter = {
      includesCategories: ['shirts']
    }

    const results = productService.getWithFilters(filters)
    const categories = results.map((p) => p.categories)

    expect(categories.some((c) => !c.includes('shirts'))).toBeFalsy()
  })

  test('minimum price filter is correctly applied', () => {
    const filters: ProductFilter = {
      minimumPrice: 5000
    }

    const results = productService.getWithFilters(filters)
    const prices = results.map((p) => p.priceAsNumberInCents)

    expect(prices.some((p) => p < 5000)).toBeFalsy()
  })

  test('maximum price filter is correctly applied', () => {
    const filters: ProductFilter = {
      maximumPrice: 5000
    }

    const results = productService.getWithFilters(filters)
    const prices = results.map((p) => p.priceAsNumberInCents)

    expect(prices.some((p) => p > 5000)).toBeFalsy()
  })
})
