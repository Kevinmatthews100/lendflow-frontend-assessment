export type Product = {
  id: string
  guid: string
  in_stock: boolean
  on_sale: boolean
  name: string
  picture: string
  gender: string
  categories: string[]
  color: string
  price: string
  priceAsNumberInCents: number
  description: string
}

export type ProductFilter = Partial<
  Omit<Product, 'description' | 'picture' | 'price' | 'categories'> & {
    includesCategories: string[]
    minimumPrice: number
    maximumPrice: number
  }
>
