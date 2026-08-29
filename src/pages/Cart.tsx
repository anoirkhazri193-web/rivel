import { useEffect, useState } from 'react'
import './Cart.css'

type CartItem = {
  name: string
  price: number
  category: string
  imageUrl: string | null
  quantity: number
}

function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])

  function loadCart() {
    const storedCart = localStorage.getItem('rivel-cart')

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    } else {
      setCart([])
    }
  }

  useEffect(() => {
    loadCart()

    window.addEventListener('cartUpdated', loadCart)

    return () => {
      window.removeEventListener('cartUpdated', loadCart)
    }
  }, [])

  function updateQuantity(index: number, quantity: number) {
    const updatedCart = [...cart]

    if (quantity <= 0) {
      updatedCart.splice(index, 1)
    } else {
      updatedCart[index].quantity = quantity
    }

    setCart(updatedCart)
    localStorage.setItem(
      'rivel-cart',
      JSON.stringify(updatedCart)
    )

    window.dispatchEvent(new Event('cartUpdated'))
  }

  function removeItem(index: number) {
    const updatedCart = cart.filter(
      (_, itemIndex) => itemIndex !== index
    )

    setCart(updatedCart)

    localStorage.setItem(
      'rivel-cart',
      JSON.stringify(updatedCart)
    )

    window.dispatchEvent(new Event('cartUpdated'))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="cart">
      <div className="cart-header">
        <span>VOTRE COMMANDE</span>
        <h1>Panier</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Votre panier est vide.</h2>

          <p>
            Découvrez notre collection et ajoutez vos articles préférés.
          </p>

          <a href="/shop">
            Retour à la boutique →
          </a>
        </div>
      ) : (
        <div
          style={{
            maxWidth: '1000px',
            margin: '40px auto',
            padding: '0 20px',
          }}
        >
          {cart.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px 0',
                borderBottom: '1px solid #e5e5e5',
              }}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              )}

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: '0 0 6px',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    color: '#999',
                  }}
                >
                  {item.category}
                </p>

                <h3
                  style={{
                    margin: '0 0 8px',
                    fontFamily: 'Georgia, serif',
                    fontWeight: 400,
                  }}
                >
                  {item.name}
                </h3>

                <p style={{ margin: '0 0 10px' }}>
                  {item.price.toFixed(2)} TND
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(index, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(index, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <strong>
                {(item.price * item.quantity).toFixed(2)} TND
              </strong>
            </div>
          ))}

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '30px',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            Total : {total.toFixed(2)} TND
          </div>
        </div>
      )}
    </main>
  )
}

export default Cart