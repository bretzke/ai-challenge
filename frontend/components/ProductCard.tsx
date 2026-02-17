import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-slate-800">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      
      <div className="mb-4">
        <strong className="text-2xl text-green-600">
          R$ {product.price.toFixed(2)}
        </strong>
      </div>

      <div className="text-sm mb-2">
        <span className="text-gray-600">Categoria: </span>
        <strong className="text-slate-800">{product.category}</strong>
      </div>

      <div className="text-sm mb-4">
        <span className="text-gray-600">Estoque: </span>
        <strong className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
          {product.stock} unidades
        </strong>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          onClick={() => onDelete(product.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
