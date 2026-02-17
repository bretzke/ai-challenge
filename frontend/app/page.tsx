import { Product } from '@/types/product'
import ProductList from '@/components/ProductList'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: 'no-store', // SSR - sempre buscar dados frescos
    })

    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }

    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Esta página usa SSR (Server-Side Rendering)
// A função é executada no servidor a cada requisição
export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-slate-800">Produtos do E-commerce</h1>
        <p className="text-gray-600 text-lg">
          Esta página utiliza Server-Side Rendering (SSR) - dados são buscados no servidor a cada requisição
        </p>
      </div>

      <ProductList products={products} />
    </div>
  )
}
