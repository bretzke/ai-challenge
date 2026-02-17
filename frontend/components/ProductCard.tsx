import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="card">
      <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>{product.name}</h3>
      <p style={{ marginBottom: '1rem', color: '#666' }}>{product.description}</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong style={{ fontSize: '1.5rem', color: '#27ae60' }}>
          R$ {product.price.toFixed(2)}
        </strong>
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
        <span style={{ color: '#666' }}>Categoria: </span>
        <strong>{product.category}</strong>
      </div>

      <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
        <span style={{ color: '#666' }}>Estoque: </span>
        <strong style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
          {product.stock} unidades
        </strong>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button
          className="btn btn-primary"
          onClick={() => onEdit(product)}
          style={{ flex: 1 }}
        >
          Editar
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(product.id)}
          style={{ flex: 1 }}
        >
          Excluir
        </button>
      </div>
    </div>
  )
}
