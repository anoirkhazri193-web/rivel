import { useState } from 'react'

type ProductCardProps = {
  name: string
  price: string
  category: string
  imageUrl: string | null
  images?: string[]
}

type CartItem = {
  name: string
  price: number
  category: string
  imageUrl: string | null
  quantity: number
}

function ProductCard({
  name,
  price,
  category,
  imageUrl,
  images = [],
}: ProductCardProps) {
  const allImages =
    images.length > 0
      ? images
      : imageUrl
        ? [imageUrl]
        : []

  const [currentImage, setCurrentImage] = useState(0)
  const [added, setAdded] = useState(false)

  function nextImage() {
    if (allImages.length <= 1) return

    setCurrentImage((current) =>
      current === allImages.length - 1 ? 0 : current + 1
    )
  }

  function previousImage() {
    if (allImages.length <= 1) return

    setCurrentImage((current) =>
      current === 0 ? allImages.length - 1 : current - 1
    )
  }

  function addToCart() {
    const storedCart = localStorage.getItem('rivel-cart')

    let cart: CartItem[] = []

    try {
      cart = storedCart ? JSON.parse(storedCart) : []
    } catch {
      cart = []
    }

    const existingItem = cart.find(
      (item) => item.name === name
    )

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        name,
        price: Number(price),
        category,
        imageUrl: allImages[0] || null,
        quantity: 1,
      })
    }

    localStorage.setItem(
      'rivel-cart',
      JSON.stringify(cart)
    )

    window.dispatchEvent(new Event('cartUpdated'))

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <article
      className="product-card"
      style={{
        width: '100%',
        minWidth: 0,
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
        boxSizing: 'border-box',
      }}
    >
      {/* IMAGE */}
      <div
        className="product-card-image"
        style={{
          position: 'relative',
          width: '100%',
          height: '360px',
          background: '#f3f0ea',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {allImages.length > 0 ? (
          <img
            src={allImages[currentImage]}
            alt={`${name} - image ${currentImage + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              letterSpacing: '4px',
              color: '#ffffff',
            }}
          >
            {category}
          </span>
        )}

        {/* ARROWS */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previousImage}
              aria-label="Image précédente"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                fontSize: '22px',
                lineHeight: 1,
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Image suivante"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                fontSize: '22px',
                lineHeight: 1,
              }}
            >
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {allImages.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              padding: '5px 8px',
              borderRadius: '20px',
              background: 'rgba(0,0,0,0.25)',
            }}
          >
            {allImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Afficher l'image ${index + 1}`}
                style={{
                  width: '7px',
                  height: '7px',
                  padding: 0,
                  border: 'none',
                  borderRadius: '50%',
                  background:
                    index === currentImage
                      ? '#ffffff'
                      : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div
        style={{
          padding: '22px',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            display: 'block',
            marginBottom: '8px',
            color: '#999999',
            fontSize: '10px',
            letterSpacing: '3px',
          }}
        >
          {category}
        </span>

        <h3
          style={{
            margin: '0 0 8px',
            fontFamily: 'Georgia, serif',
            fontSize: '21px',
            fontWeight: 400,
            color: '#111111',
          }}
        >
          {name}
        </h3>

        <p
          style={{
            margin: '0 0 20px',
            fontSize: '16px',
            fontWeight: 600,
            color: '#222222',
          }}
        >
          {price} TND
        </p>

        <button
          type="button"
          onClick={addToCart}
          style={{
            width: '100%',
            padding: '13px',
            background: added ? '#777777' : '#111111',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          {added
            ? 'Ajouté au panier ✓'
            : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard