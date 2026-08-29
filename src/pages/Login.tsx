import { useState } from 'react'
import { supabase } from '../supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('LOGIN ERROR:', error)
      setMessage(error.message)
      setLoading(false)
      return
    }

    // تسجيل الدخول نجح، نرجع للصفحة الرئيسية
    window.location.href = '/'
  }

  return (
    <main>
      <h1>Connexion</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Votre e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p>
          Pas encore de compte ?{' '}
          <a href="/register">Créer un compte</a>
        </p>

        {message && <p>{message}</p>}
      </form>
    </main>
  )
}

export default Login