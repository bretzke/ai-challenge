'use client'

import { Product } from '@/types/product'
import { useState, useEffect } from 'react'

interface ProductFormProps {
  product?: Product | null
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      stock: parseInt(formData.stock),
    })
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>
        {product ? 'Editar Produto' : 'Novo Produto'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome do Produto</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="price">Preço (R$)</label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="category">Categoria</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="stock">Estoque</label>
          <input
            type="number"
            id="stock"
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            {product ? 'Atualizar' : 'Criar'}
          </button>
          <button
            type="button"
            className="btn"
            onClick={onCancel}
            style={{ flex: 1, backgroundColor: '#95a5a6', color: 'white' }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
