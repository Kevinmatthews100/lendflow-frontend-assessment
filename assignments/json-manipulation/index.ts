import { productService } from './productService'

type Part2Options = {
  ignoreDuplicateCategories: boolean
}

/**
 * @description Which products are out of stock, not on sale, and under $20?
 */
const part1 = () =>
  productService
    .getWithFilters({ in_stock: false, on_sale: false, maximumPrice: 2000 })
    .map((product) => product.name)

/**
 * @description What is the most commonly used category?
 */
const part2 = ({ ignoreDuplicateCategories }: Part2Options) => {
  const categories = productService.getAll().flatMap((product) => {
    if (ignoreDuplicateCategories) {
      return [...new Set(product.categories)]
    }

    return product.categories
  })

  const frequencyMap = new Map<string, number>()

  for (const category of categories) {
    const currentCount = frequencyMap.get(category) ?? 0
    frequencyMap.set(category, currentCount + 1)
  }

  const categoryCountAsSortedArray = Array.from(frequencyMap, ([category, count]) => ({
    category,
    count
  })).sort((a, b) => b.count - a.count)

  return categoryCountAsSortedArray[0]?.category
}

/**
 * @description What is the average price of sale items?
 */
const part3 = () => {
  const onSaleProducts = productService.getAll()

  const averagePriceInCents =
    onSaleProducts.reduce((total, product) => (total += product.priceAsNumberInCents), 0) /
    onSaleProducts.length

  return `$${averagePriceInCents / 100}`
}

/**
 * @description How many women’s products are out of stock, broken down by color?
 */
const part4 = () => {
  const colors = productService
    .getWithFilters({ in_stock: false, gender: 'female' })
    .map((p) => p.color)

  const frequencyMap = new Map<string, number>()

  for (const color of colors) {
    const currentCount = frequencyMap.get(color) ?? 0
    frequencyMap.set(color, currentCount + 1)
  }

  return Object.fromEntries(frequencyMap)
}

console.log('Part 1:', part1())
console.log('Part 2a:', part2({ ignoreDuplicateCategories: false }))
console.log('Part 2b:', part2({ ignoreDuplicateCategories: true }))
console.log('Part 3:', part3())
console.log('Part 4:', part4())
