export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  category: string
  stock: number
}
