import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>RIVEL</h2>
          <p>
            Mode, accessoires et créations sur mesure.
          </p>
        </div>

        <div className="footer-links">
          <a href="/boutique">Boutique</a>
          <a href="/sur-mesure">Sur mesure</a>
          <a href="/contact">Contact</a>
          <a href="/connexion">Mon compte</a>
        </div>

        <div className="footer-social">
          <span>Instagram</span>
          <span>TikTok</span>
          <span>Facebook</span>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 RIVEL — Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer