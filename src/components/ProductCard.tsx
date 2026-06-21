import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { useInstagramChat } from '../hooks/useInstagramChat'

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false)
  const openChat = useInstagramChat()

  const mainImg = product.images[0]
  const hoverImg = product.images[1]

  return (
    <motion.article
      id={product.id}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !product.sold && openChat(product)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#f3f3f3', aspectRatio: '3/4' }}>

        {/* Imagen principal */}
        <img
          src={mainImg}
          alt={product.name}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
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
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
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

        {/* CTA */}
        {!product.sold && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}>
            <div style={{
              width: '100%', background: '#0a0a0a', color: '#fff',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em',
              padding: '13px 0', textAlign: 'center',
            }}>
              CONSULTAR VÍA INSTAGRAM
            </div>
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
  )
}
