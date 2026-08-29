
import { useEffect, useState } from 'react'
import './Navbar.css'
import { supabase } from '../supabase'

type CartItem = {
  quantity: number
}

function Navbar() {
  const [username, setUsername] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setUsername(null)
        setIsAdmin(false)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, role')
        .eq('id', user.id)
        .single()

      setUsername(profile?.username ?? null)
      setIsAdmin(profile?.role === 'admin')
      setLoading(false)
    }

    function updateCartCount() {
      const storedCart = localStorage.getItem('rivel-cart')

      if (!storedCart) {
        setCartCount(0)
        return
      }

      try {
        const cart: CartItem[] = JSON.parse(storedCart)

        const totalQuantity = cart.reduce(
          (sum, item) => sum + Number(item.quantity || 0),
          0
        )

        setCartCount(totalQuantity)
      } catch {
        setCartCount(0)
      }
    }

    loadUser()
    updateCartCount()

    window.addEventListener('cartUpdated', updateCartCount)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('cartUpdated', updateCartCount)
    }
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()

    setUsername(null)
    setIsAdmin(false)
    setMenuOpen(false)
    setMobileMenuOpen(false)

    window.location.href = '/'
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        <a
          href="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
        >
          RIVEL
        </a>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Ouvrir le menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        <nav className="navbar-menu">
          <a href="/" className="nav-link">
            Accueil
          </a>

          <a href="/shop" className="nav-link">
            Boutique
          </a>

          <a href="/custom" className="nav-link">
            Sur mesure
          </a>

          <a href="/about" className="nav-link">
            À propos
          </a>

          <a href="/contact" className="nav-link">
            Contact
          </a>
        </nav>

        {mobileMenuOpen && (
          <nav className="mobile-menu">
            <a href="/" onClick={closeMobileMenu}>
              Accueil
            </a>

            <a href="/shop" onClick={closeMobileMenu}>
              Boutique
            </a>

            <a href="/custom" onClick={closeMobileMenu}>
              Sur mesure
            </a>

            <a href="/about" onClick={closeMobileMenu}>
              À propos
            </a>

            <a href="/contact" onClick={closeMobileMenu}>
              Contact
            </a>
          </nav>
        )}

        <div className="navbar-actions">
          {!loading && (
            <>
              {username ? (
                <div className="account-menu">
                  <button
                    type="button"
                    className="account-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {username}

                    <span className="account-arrow">
                      {menuOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {menuOpen && (
                    <div className="account-dropdown">
                      {isAdmin && (
                        <a
                          href="/admin"
                          className="account-dropdown-item"
                          onClick={() => setMenuOpen(false)}
                        >
                          Administration
                        </a>
                      )}

                      <button
                        type="button"
                        className="account-dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <a href="/login" className="login-button">
                  Connexion
                </a>
              )}
            </>
          )}

          <a href="/cart" className="cart-button">
            <span>Panier</span>
            <span className="cart-count">{cartCount}</span>
          </a>
        </div>

      </div>
    </header>
  )
}

export default Navbar

