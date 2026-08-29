import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import './Shop.css'
import { supabase } from '../supabase'

type Product = {
  name: string
  price: number
  category: string
  description: string | null
  image_url: string | null
  images: string[] | null
}

function Shop() {
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
        console.error('SHOP PRODUCTS ERROR:', error)
        setError(error.message)
      } else {
        setProducts(data || [])
      }

      setLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <main className="shop-page">

      <div className="shop-header">
        <p>NOTRE BOUTIQUE</p>
        <h1>Tous nos produits</h1>
      </div>

      {loading && (
        <p className="shop-message">
          Chargement des produits...
        </p>
      )}

      {error && (
        <p className="shop-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="shop-message">
              Aucun produit disponible.
            </p>
          ) : (
            <div className="shop-products-container">
              {products.map((product, index) => (
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
          )}
        </>
      )}
    </main>
  )
}

export default Shop