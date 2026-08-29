function Categories() {
  return (
    <section
      style={{
        width: '100%',
        padding: '80px 20px',
        background: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {/* TITLE */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <p
          style={{
            margin: '0 0 10px',
            fontSize: '11px',
            letterSpacing: '3px',
            color: '#999',
          }}
        >
          EXPLOREZ
        </p>

        <h2
          style={{
            margin: 0,
            fontFamily: 'Georgia, serif',
            fontSize: '38px',
            fontWeight: 400,
            color: '#111',
          }}
        >
          Nos catégories
        </h2>
      </div>

      {/* CARDS */}
      <div
        style={{
          width: '100%',
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* VÊTEMENTS */}
        <div
          style={{
            minHeight: '180px',
            background: '#f5f1e8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: '12px',
            }}
          >
            👗
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#111',
            }}
          >
            Vêtements
          </h3>

          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#777',
            }}
          >
            Découvrir →
          </p>
        </div>

        {/* BIJOUX */}
        <div
          style={{
            minHeight: '180px',
            background: '#f5f1e8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: '12px',
            }}
          >
            💍
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#111',
            }}
          >
            Bijoux
          </h3>

          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#777',
            }}
          >
            Découvrir →
          </p>
        </div>

        {/* ACCESSOIRES */}
        <div
          style={{
            minHeight: '180px',
            background: '#f5f1e8',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: '12px',
            }}
          >
            👜
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#111',
            }}
          >
            Accessoires
          </h3>

          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#777',
            }}
          >
            Découvrir →
          </p>
        </div>

        {/* SUR MESURE */}
        <div
          style={{
            minHeight: '180px',
            background: '#111',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
          }}
        >
          <div
            style={{
              fontSize: '40px',
              marginBottom: '12px',
            }}
          >
            ✨
          </div>

          <h3
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 400,
              color: '#fff',
            }}
          >
            Sur mesure
          </h3>

          <p
            style={{
              margin: '8px 0 0',
              fontSize: '11px',
              color: '#ccc',
            }}
          >
            Créer votre pièce →
          </p>
        </div>
      </div>
    </section>
  )
}

export default Categories