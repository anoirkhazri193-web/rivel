import './Hero.css'
function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small-title">
          RIVEL — COLLECTION 2026
        </p>

        <h1>
          Votre style.
          <br />
          Votre histoire.
        </h1>

        <p className="hero-text">
          Découvrez notre collection de vêtements,
          bijoux et accessoires uniques pensés pour vous.
        </p>

        <div className="hero-buttons">

          <a href="/shop" className="hero-btn primary">
            Découvrir la boutique
          </a>

          <a href="/custom" className="hero-btn secondary">
            Création sur mesure
          </a>

        </div>

      </div>

      <div className="hero-visual">
        <span>RIVEL</span>
      </div>

    </section>
  )
}

export default Hero