import { useState } from 'react'
import { supabase } from '../supabase'

function AdminProductForm() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Vêtements')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name || !price || !image) {
      setMessage('Veuillez remplir les champs obligatoires.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const fileName = `${Date.now()}-${image.name}`

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, image)

      if (uploadError) {
        throw uploadError
      }

      const { data: imageData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      const { error: productError } = await supabase
        .from('products')
        .insert({
          name,
          price: Number(price),
          category,
          description,
          image_url: imageData.publicUrl,
        })

      if (productError) {
        throw productError
      }

      setName('')
      setPrice('')
      setCategory('Vêtements')
      setDescription('')
      setImage(null)

      const fileInput = document.getElementById(
        'product-image'
      ) as HTMLInputElement

      if (fileInput) {
        fileInput.value = ''
      }

      setMessage('Produit ajouté avec succès !')
    } catch (error) {
      console.error(error)
      setMessage("Une erreur s'est produite.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{
      maxWidth: '700px',
      margin: '80px auto',
      padding: '40px',
      background: '#ffffff',
      borderRadius: '20px',
      boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
    }}>

      <h1 style={{
        fontFamily: 'Georgia, serif',
        fontSize: '38px',
        fontWeight: 400,
        marginBottom: '35px',
      }}>
        Ajouter un produit
      </h1>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '22px' }}>
          <label>Image du produit</label>

          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(event) => {
              setImage(event.target.files?.[0] || null)
            }}
            style={{
              display: 'block',
              marginTop: '10px',
            }}
          />
        </div>

        <div style={{ marginBottom: '22px' }}>
          <label>Nom du produit</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Robe Élégance"
            style={{
              width: '100%',
              padding: '13px',
              marginTop: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '22px' }}>
          <label>Prix (DT)</label>

          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="89"
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '13px',
              marginTop: '8px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '22px' }}>
          <label>Catégorie</label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            style={{
              width: '100%',
              padding: '13px',
              marginTop: '8px',
            }}
          >
            <option value="Vêtements">Vêtements</option>
            <option value="Bijoux">Bijoux</option>
            <option value="Accessoires">Accessoires</option>
            <option value="Sur mesure">Sur mesure</option>
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label>Description</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description du produit..."
            rows={5}
            style={{
              width: '100%',
              padding: '13px',
              marginTop: '8px',
              boxSizing: 'border-box',
              resize: 'vertical',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            background: '#111111',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'wait' : 'pointer',
            fontSize: '14px',
          }}
        >
          {loading ? 'Publication...' : 'Publier le produit'}
        </button>

        {message && (
          <p style={{
            marginTop: '20px',
            textAlign: 'center',
          }}>
            {message}
          </p>
        )}

      </form>
    </section>
  )
}

export default AdminProductForm