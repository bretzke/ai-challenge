'use client'

import { Product } from '@/types/product'
import { useState } from 'react'
import ProductCard from './ProductCard'
import ProductForm from './ProductForm'

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products: initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProducts(products.filter(p => p.id !== id))
      } else {
        alert('Erro ao excluir produto')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Erro ao excluir produto')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormSubmit = async (productData: any) => {
    try {
      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`
      
      const method = editingProduct ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (res.ok) {
        const updatedProduct = await res.json()
        
        if (editingProduct) {
          setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
        } else {
          setProducts([...products, updatedProduct])
        }
        
        setShowForm(false)
        setEditingProduct(null)
        
        // Recarregar a página para atualizar dados do SSR
        window.location.reload()
      } else {
        alert('Erro ao salvar produto')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Erro ao salvar produto')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (products.length === 0) {
    return (
      <>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-gray-500">
            Nenhum produto encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            Comece adicionando um novo produto!
          </p>
          {!showForm && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              onClick={() => setShowForm(true)}
            >
              Adicionar Produto
            </button>
          )}
        </div>
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
      </>
    )
  }

  return (
    <>
      {!showForm && (
        <div className="text-center my-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition-colors text-lg"
            onClick={() => setShowForm(true)}
          >
            Adicionar Produto
          </button>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  )
}
