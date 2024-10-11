import type { Product, ProductFilter } from './types'
import products from './data/products.json'

const getAll = (): Product[] => {
  // In a real world app, validation can be done to ensure type correctness
  // Caching could also be a possibility if this map is expensive and called often!
  return products.map((product) => ({
    ...product,
    priceAsNumberInCents: Number(product.price.slice(1)) * 100
  })) as Product[]
}

const getWithFilters = (productFilter: ProductFilter): Product[] => {
  const products = getAll()

  const hasFilter = (filter: keyof ProductFilter) => productFilter.hasOwnProperty(filter)

  // These keys we can filter by a simple inequality check, i.e. `!==`
  const simpleComparisonKeys = ['id', 'guid', 'in_stock', 'on_sale', 'name', 'gender', 'picture']

  return products.filter((product) => {
    for (const key of simpleComparisonKeys) {
      if (hasFilter(key as keyof ProductFilter)) {
        if (product[key] !== productFilter[key]) {
          return false
        }
      }
    }

    // These keys (categories, min and max price) require more custom logic
    if (hasFilter('categories')) {
      if (!productFilter.categories?.some((c) => product.categories.includes(c))) {
        return false
      }
    }

    // hasFilter is not sufficent alone here because typescript will not allow us to apply
    // `>` and `<` to a number and undefined.
    if (hasFilter('minimumPrice') && productFilter.minimumPrice) {
      if (product.priceAsNumberInCents < productFilter.minimumPrice) {
        return false
      }
    }

    if (hasFilter('maximumPrice') && productFilter.maximumPrice) {
      if (product.priceAsNumberInCents > productFilter.maximumPrice) {
        return false
      }
    }

    return true
  })
}

export const productService = {
  getAll,
  getWithFilters
}
