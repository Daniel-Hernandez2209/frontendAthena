import { COVER_IMAGE } from '../data/products'

export function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '65vh', minHeight: '420px', maxHeight: '680px', overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Imagen cinemática — recorte intencional estilo banner */}
      <img
        src={COVER_IMAGE}
        alt="Athena Brand portada"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
      />

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 100%)' }} />

      {/* Texto centrado — estilo Dynamo */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(38px, 6vw, 80px)', color: '#ffffff', lineHeight: 1, letterSpacing: '0.08em', margin: 0 }}>
          ATHENA BRAND
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(11px, 1.4vw, 15px)', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.28em', fontWeight: 400, marginTop: '10px' }}>
          MENOS RUIDO MAS ESENCIA
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 'clamp(10px, 1.1vw, 13px)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.28em', fontWeight: 400, marginTop: '6px' }}>
          COLOMBIAN STORE SINCE 2025
        </p>
      </div>

      {/* Trust badges — esquina inferior */}
      <div style={{ position: 'absolute', bottom: '22px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', padding: '0 20px' }}>
        {['100% Prendas Premium', 'Envíos a toda Colombia', 'Atención por Instagram'].map((text) => (
          <span key={text} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', color: '#ffffff', fontSize: '11px', fontWeight: 500, padding: '5px 14px', borderRadius: '999px', letterSpacing: '0.04em' }}>
            <span style={{ fontSize: '8px' }}>✦</span>{text}
          </span>
        ))}
      </div>
    </section>
  )
}
