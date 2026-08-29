import './Contact.css'

function Contact() {
  return (
    <main className="contact">
      <div className="contact-header">
        <span>CONTACT</span>
        <h1>Nous contacter</h1>
        <p>
          Une question ? Nous sommes là pour vous répondre.
        </p>
      </div>

      <div className="contact-layout">

        <div className="contact-info">
          <h2>Parlons-nous</h2>

          <p>
            Email
            <br />
            contact@rivel.com
          </p>

          <p>
            Téléphone
            <br />
            +33 6 00 00 00 00
          </p>

          <p>
            Horaires
            <br />
            Lundi – Samedi
          </p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Nom" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Sujet" />

          <textarea
            placeholder="Votre message..."
            rows={7}
          />

          <button type="submit">
            Envoyer
          </button>
        </form>

      </div>
    </main>
  )
}

export default Contact