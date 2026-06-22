import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '../data/products'
import { openWhatsApp } from '../hooks/useWhatsApp'
import { Lightbox } from './Lightbox'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const mainImg = product.images[0]
  const hoverImg = product.images[1]

  return (
    <>
      <motion.article
        id={product.id}
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 38 }}
        style={{ display: 'flex', flexDirection: 'column' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image — click abre lightbox */}
        <div
          onClick={() => !product.sold && setLightboxOpen(true)}
          style={{ position: 'relative', overflow: 'hidden', background: '#f3f3f3', aspectRatio: '3/4', cursor: product.sold ? 'default' : 'zoom-in' }}
        >
          {/* Imagen principal */}
          <img
            src={mainImg}
            alt={product.name}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              opacity: hovered && hoverImg ? 0 : 1,
              transition: 'opacity 0.35s ease',
            }}
            loading="lazy"
          />

          {/* Imagen hover */}
          {hoverImg && (
            <img
              src={hoverImg}
              alt={product.name}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.35s ease',
              }}
              loading="lazy"
            />
          )}

          {/* Badge */}
          {product.badge && !product.sold && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px', zIndex: 5,
              background: product.badge.startsWith('-') ? '#e53e3e' : '#0a0a0a',
              color: '#fff', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.12em', padding: '3px 8px',
            }}>
              {product.badge}
            </span>
          )}

          {/* Sold */}
          {product.sold && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.72)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5,
            }}>
              <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 600 }}>AGOTADO</span>
            </div>
          )}

          {/* Icono zoom */}
          {!product.sold && hovered && (
            <div style={{
              position: 'absolute', top: '10px', right: '10px', zIndex: 5,
              background: 'rgba(255,255,255,0.85)', borderRadius: '50%',
              width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
              </svg>
            </div>
          )}

          {/* CTA WhatsApp — click NO abre lightbox */}
          {!product.sold && (
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); openWhatsApp(product) }}
                style={{
                  width: '100%', background: '#25D366', color: '#fff',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
                  padding: '13px 0', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                CONSULTAR VÍA WHATSAPP
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ paddingTop: '11px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.35)', fontWeight: 600, marginBottom: '3px' }}>{product.brand}</p>
          <p style={{ fontSize: '14px', color: '#0a0a0a', fontWeight: 500 }}>{product.name}</p>
          {product.size && <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', marginTop: '2px' }}>{product.size}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600 }}>{product.price}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.35)', textDecoration: 'line-through' }}>{product.originalPrice}</span>
            )}
          </div>
        </div>
      </motion.article>

      {/* Lightbox carousel */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={product.images}
            startIndex={hovered && hoverImg ? 1 : 0}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
