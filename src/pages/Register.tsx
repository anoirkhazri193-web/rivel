import { useState } from 'react'
import { supabase } from '../supabase'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          username: username,
        })
        .eq('id', data.user.id)

      if (profileError) {
        console.error(profileError)
        setMessage('Compte créé, mais le nom d’utilisateur n’a pas pu être enregistré.')
        setLoading(false)
        return
      }
    }

    setMessage(
      'Compte créé. Vérifiez votre e-mail pour confirmer votre compte.'
    )

    setLoading(false)
  }

  return (
    <main>
      <h1>Créer un compte</h1>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

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
          {loading ? 'Création...' : 'Créer mon compte'}
        </button>

        <p>
          Déjà un compte ? <a href="/login">Se connecter</a>
        </p>

        {message && <p>{message}</p>}
      </form>
    </main>
  )
}

export default Register