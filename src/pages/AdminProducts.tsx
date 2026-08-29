import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

type Product = {
  name: string
  price: number
  category: string
  description: string | null
  image_url: string | null
  images: string[] | null
}

const emptyForm = {
  name: '',
  price: '',
  category: 'Vêtements',
  description: '',
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [name, setName] = useState(emptyForm.name)
  const [price, setPrice] = useState(emptyForm.price)
  const [category, setCategory] = useState(emptyForm.category)
  const [description, setDescription] = useState(emptyForm.description)
  const [newImages, setNewImages] = useState<File[]>([])

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function loadProducts() {
    setLoadingProducts(true)

    const { data, error } = await supabase
      .from('products')
      .select('name, price, category, description, image_url, images')

    if (error) {
      console.error('PRODUCTS ERROR:', error)
      setMessage(error.message)
      setProducts([])
    } else {
      setProducts(data || [])
    }

    setLoadingProducts(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function resetForm() {
    setName('')
    setPrice('')
    setCategory('Vêtements')
    setDescription('')
    setNewImages([])
    setEditingProduct(null)
    setShowForm(false)
    setMessage('')
  }

  function startAddProduct() {
    resetForm()
    setShowForm(true)
  }

  function startEditProduct(product: Product) {
    setEditingProduct(product)
    setName(product.name)
    setPrice(String(product.price))
    setCategory(product.category)
    setDescription(product.description || '')
    setNewImages([])
    setMessage('')
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function makeSafeFileName(file: File) {
    const safeFileName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9.-]/g, '-')

    return `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${safeFileName}`
  }

  async function uploadImages(files: File[]) {
    const uploadedPaths: string[] = []
    const imageUrls: string[] = []

    for (const file of files) {
      const fileName = makeSafeFileName(file)

      const { error } = await supabase.storage
        .from('products')
        .upload(fileName, file)

      if (error) {
        if (uploadedPaths.length > 0) {
          await supabase.storage
            .from('products')
            .remove(uploadedPaths)
        }

        throw error
      }

      uploadedPaths.push(fileName)

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)

      imageUrls.push(data.publicUrl)
    }

    return {
      imageUrls,
      uploadedPaths,
    }
  }

  function getStoragePathFromUrl(url: string) {
    const marker = '/storage/v1/object/public/products/'

    if (!url.includes(marker)) {
      return null
    }

    return decodeURIComponent(url.split(marker)[1])
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name || !price) {
      setMessage('Veuillez remplir les champs obligatoires.')
      return
    }

    if (newImages.length > 3) {
      setMessage('Vous pouvez choisir 3 images maximum.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      // AJOUT D'UN PRODUIT
      if (!editingProduct) {
        const uploaded = await uploadImages(newImages)

        const { error } = await supabase
          .from('products')
          .insert({
            name,
            price: Number(price),
            category,
            description,
            image_url: uploaded.imageUrls[0] || null,
            images: uploaded.imageUrls,
          })

        if (error) {
          if (uploaded.uploadedPaths.length > 0) {
            await supabase.storage
              .from('products')
              .remove(uploaded.uploadedPaths)
          }

          throw error
        }

        setMessage('Produit ajouté avec succès !')
      }

      // MODIFICATION D'UN PRODUIT
      else {
        let imageUrls = editingProduct.images || []

        if (newImages.length > 0) {
          const uploaded = await uploadImages(newImages)

          imageUrls = uploaded.imageUrls

          // supprimer les anciennes images
          const oldPaths = (editingProduct.images || [])
            .map(getStoragePathFromUrl)
            .filter((path): path is string => Boolean(path))

          if (oldPaths.length > 0) {
            await supabase.storage
              .from('products')
              .remove(oldPaths)
          }
        }

        const { error } = await supabase
          .from('products')
          .update({
            name,
            price: Number(price),
            category,
            description,
            image_url: imageUrls[0] || null,
            images: imageUrls,
          })
          .eq('name', editingProduct.name)

        if (error) {
          throw error
        }

        setMessage('Produit modifié avec succès !')
      }

      await loadProducts()

      setName('')
      setPrice('')
      setCategory('Vêtements')
      setDescription('')
      setNewImages([])
      setEditingProduct(null)
      setShowForm(false)
    } catch (error) {
      console.error('PRODUCT ERROR:', error)

      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("Une erreur s'est produite.")
      }
    } finally {
      setLoading(false)
    }
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(
      `Supprimer le produit "${product.name}" ?`
    )

    if (!confirmed) {
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const paths = (product.images || [])
        .map(getStoragePathFromUrl)
        .filter((path): path is string => Boolean(path))

      if (paths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('products')
          .remove(paths)

        if (storageError) {
          throw storageError
        }
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('name', product.name)

      if (error) {
        throw error
      }

      setProducts((current) =>
        current.filter((item) => item !== product)
      )

      setMessage('Produit supprimé avec succès !')
    } catch (error) {
      console.error('DELETE PRODUCT ERROR:', error)

      if (error instanceof Error) {
        setMessage(error.message)
      } else {
        setMessage("Une erreur s'est produite.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1>Gestion des produits</h1>
          <p>Ajoutez, modifiez ou supprimez vos produits.</p>
        </div>

        <button
          type="button"
          onClick={startAddProduct}
        >
          Ajouter un produit
        </button>
      </div>

      {showForm && (
        <section
          style={{
            marginBottom: '40px',
            padding: '25px',
            border: '1px solid #e5e5e5',
            borderRadius: '16px',
          }}
        >
          <h2>
            {editingProduct
              ? 'Modifier le produit'
              : 'Ajouter un produit'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>Images du produit</label>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => {
                  const selectedFiles = Array.from(
                    event.target.files || []
                  ).slice(0, 3)

                  setNewImages(selectedFiles)
                }}
                style={{
                  display: 'block',
                  marginTop: '8px',
                }}
              />

              <p>
                {editingProduct
                  ? 'Sélectionnez de nouvelles images pour remplacer les anciennes.'
                  : 'Maximum 3 images.'}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Nom du produit</label>

              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginTop: '8px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
             <label>Prix (TND)</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginTop: '8px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Catégorie</label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginTop: '8px',
                }}
              >
                <option value="Vêtements">Vêtements</option>
                <option value="Bijoux">Bijoux</option>
                <option value="Accessoires">Accessoires</option>
                <option value="Sur mesure">Sur mesure</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Description</label>

              <textarea
                rows={5}
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  marginTop: '8px',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
              }}
            >
              <button type="submit" disabled={loading}>
                {loading
                  ? 'Enregistrement...'
                  : editingProduct
                    ? 'Enregistrer les modifications'
                    : 'Publier le produit'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
              >
                Annuler
              </button>
            </div>
          </form>
        </section>
      )}

      {message && (
        <p style={{ marginBottom: '25px' }}>
          {message}
        </p>
      )}

      <section>
        <h2>Produits</h2>

        {loadingProducts ? (
          <p>Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p>Aucun produit disponible.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
              marginTop: '20px',
            }}
          >
            {products.map((product, index) => {
              const previewImage =
                product.images?.[0] || product.image_url

              return (
                <article
                  key={`${product.name}-${index}`}
                  style={{
                    border: '1px solid #e5e5e5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#fff',
                  }}
                >
                  <div
                    style={{
                      height: '260px',
                      background: '#eee',
                    }}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Pas d'image
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '18px' }}>
                    <p
                      style={{
                        margin: '0 0 8px',
                        fontSize: '11px',
                        letterSpacing: '2px',
                        color: '#999',
                      }}
                    >
                      {product.category}
                    </p>

                    <h3
                      style={{
                        margin: '0 0 8px',
                        fontFamily: 'Georgia, serif',
                        fontWeight: 400,
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      style={{
                        margin: '0 0 18px',
                        fontWeight: 600,
                      }}
                    >
                      {product.price.toFixed(2)} TND
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => startEditProduct(product)}
                      >
                        Modifier
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteProduct(product)}
                        disabled={loading}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminProducts