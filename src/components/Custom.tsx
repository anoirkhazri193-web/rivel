import './Custom.css'

function Custom() {
  return (
    <section className="custom-section">
      <div className="custom-wrapper">

        {/* HEADER */}
        <div className="custom-header">
          <span className="custom-eyebrow">
            SUR MESURE
          </span>

          <h2>
            Parlons de votre projet
          </h2>

          <p>
            Une idée, une envie ou une création particulière ?
            Partagez votre projet avec nous.
          </p>
        </div>

        {/* FORM */}
        <form className="custom-form">

          {/* NOM / PRÉNOM */}
          <div className="custom-row">

            <div className="custom-field">
              <label htmlFor="nom">
                NOM
              </label>

              <input
                id="nom"
                name="nom"
                type="text"
                placeholder="Votre nom"
              />
            </div>

            <div className="custom-field">
              <label htmlFor="prenom">
                PRÉNOM
              </label>

              <input
                id="prenom"
                name="prenom"
                type="text"
                placeholder="Votre prénom"
              />
            </div>

          </div>

          {/* EMAIL / TÉLÉPHONE */}
          <div className="custom-row">

            <div className="custom-field">
              <label htmlFor="email">
                E-MAIL
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
              />
            </div>

            <div className="custom-field">
              <label htmlFor="telephone">
                TÉLÉPHONE
              </label>

              <input
                id="telephone"
                name="telephone"
                type="tel"
                placeholder="+216"
              />
            </div>

          </div>

          {/* TYPE + PROJECT */}
          <div className="custom-bottom">

            {/* TYPE DE CRÉATION */}
            <div className="custom-type">
              <label>
                TYPE DE CRÉATION
              </label>

              <div className="custom-options">

                <label className="custom-option">
                  <input
                    type="radio"
                    name="type"
                    value="Vêtements"
                  />
                  <span>Vêtements</span>
                </label>

                <label className="custom-option">
                  <input
                    type="radio"
                    name="type"
                    value="Bijoux"
                  />
                  <span>Bijoux</span>
                </label>

                <label className="custom-option">
                  <input
                    type="radio"
                    name="type"
                    value="Accessoires"
                  />
                  <span>Accessoires</span>
                </label>

                <label className="custom-option">
                  <input
                    type="radio"
                    name="type"
                    value="Autre"
                  />
                  <span>Autre</span>
                </label>

              </div>
            </div>

            {/* VOTRE PROJET */}
            <div className="custom-project">

              <label htmlFor="projet">
                VOTRE PROJET
              </label>

              <textarea
                id="projet"
                name="projet"
                placeholder="Décrivez votre idée..."
                rows={5}
              />

            </div>

          </div>

          {/* SUBMIT */}
          <div className="custom-submit-wrapper">

            <button
              type="submit"
              className="custom-submit"
            >
              <span>
                Envoyer ma demande
              </span>

              <strong>
                →
              </strong>
            </button>

          </div>

        </form>

      </div>
    </section>
  )
}

export default Custom