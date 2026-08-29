import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Admin() {
  const [checking, setChecking] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setChecking(false)
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!error && profile?.role === 'admin') {
        setIsAdmin(true)
      }

      setChecking(false)
    }

    checkAdmin()
  }, [])

  if (checking) {
    return <p>Vérification...</p>
  }

  if (!isAdmin) {
    return <p>Accès refusé.</p>
  }

  return (
    <main
      style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '20px',
      }}
    >
      <h1>Administration</h1>

      <p>
        Bienvenue dans votre espace administrateur.
      </p>

      <section
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        <div
          style={{
            padding: '25px',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
          }}
        >
          <h2>Produits</h2>

          <p>Ajouter et gérer les produits de la boutique.</p>

          <a href="/admin/products">
            <button type="button">
              Gérer les produits
            </button>
          </a>
        </div>

        <div
          style={{
            padding: '25px',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
          }}
        >
          <h2>Commandes</h2>

          <p>Consulter et gérer les commandes.</p>

          <button type="button" disabled>
            Bientôt disponible
          </button>
        </div>

        <div
          style={{
            padding: '25px',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
          }}
        >
          <h2>Utilisateurs</h2>

          <p>Consulter les comptes utilisateurs.</p>

          <button type="button" disabled>
            Bientôt disponible
          </button>
        </div>
      </section>
    </main>
  )
}

export default Admin