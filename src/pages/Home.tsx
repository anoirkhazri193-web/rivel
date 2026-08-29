import './Home.css'

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <span>COLLECTION 2026</span>

          <h1>
            Votre style.
            <br />
            Votre identité.
          </h1>

          <p>
            Découvrez nos vêtements et accessoires.
          </p>

          <div className="hero-buttons">
            <a href="/boutique" className="btn">
              Découvrir la boutique
            </a>

            <a href="/sur-mesure" className="btn btn-outline">
              Création sur mesure
            </a>
          </div>
        </div>
      </section>

      <section className="categories">
        <div>
          <span>01</span>
          <h2>Vêtements</h2>
          <a href="/boutique">Découvrir →</a>
        </div>

        <div>
          <span>02</span>
          <h2>Bijoux</h2>
          <a href="/boutique">Découvrir →</a>
        </div>

        <div>
          <span>03</span>
          <h2>Sur mesure</h2>
          <a href="/sur-mesure">Créer →</a>
        </div>
      </section>
    </main>
  )
}

export default Home