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
  Product & { minimumPrice: number; maximumPrice: number } & Omit<
      Product,
      'description' | 'picture' | 'price'
    >
>
