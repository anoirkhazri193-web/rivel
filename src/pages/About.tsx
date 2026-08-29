import './About.css'

function About() {
  return (
    <main className="about">
      <section className="about-intro">
        <span>NOTRE HISTOIRE</span>

        <h1>
          La mode qui vous ressemble.
        </h1>

        <p>
          Nous créons des pièces pensées pour celles et ceux
          qui souhaitent exprimer leur personnalité avec style.
        </p>
      </section>

      <section className="about-content">
        <div>
          <h2>Notre philosophie</h2>
          <p>
            Chaque pièce est choisie avec attention.
            Nous privilégions la qualité, le style et
            l'expérience de nos clients.
          </p>
        </div>

        <div>
          <h2>Le sur mesure</h2>
          <p>
            Vous avez une idée particulière ?
            Notre service de création sur mesure vous permet
            de créer une pièce adaptée à vos envies.
          </p>
        </div>
      </section>
    </main>
  )
}

export default About