import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import './Products.css'
import { supabase } from '../supabase'

type Product = {
  name: string
  price: number
  category: string
  description: string | null
  image_url: string | null
  images: string[] | null
}

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select(
          'name, price, category, description, image_url, images'
        )

      if (error) {
        console.error('PRODUCTS ERROR:', error)
        setError(error.message)
        setLoading(false)
        return
      }

      setProducts(data || [])
      setLoading(false)
    }

    loadProducts()
  }, [])

  const visibleProducts = products.slice(0, 8)

  return (
    <section className="products-section">
      <div className="products-title">
        <p>NOTRE SÉLECTION</p>
        <h2>Nos produits</h2>
      </div>

      {loading && (
        <p className="products-message">
          Chargement des produits...
        </p>
      )}

      {error && (
        <p className="products-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="products-message">
              Aucun produit disponible.
            </p>
          ) : (
            <>
              <div className="products-container">
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={`${product.name}-${index}`}
                    name={product.name}
                    price={product.price.toFixed(2)}
                    category={product.category}
                    imageUrl={product.image_url}
                    images={product.images || []}
                  />
                ))}
              </div>

              {products.length > 8 && (
                <div className="products-more">
                  <a href="/shop">
                    Voir tous les produits
                  </a>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

export default Products