import { useState, useEffect } from 'react'
import { BRANDS } from '../data/products'
import type { Brand } from '../data/products'

interface Props {
  activeBrand: Brand
  onBrandChange: (b: Brand) => void
  onCoverClick: () => void
}

export function Header({ activeBrand, onBrandChange, onCoverClick }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e8e8e8' : '1px solid transparent',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-5 md:px-10">
        {/* Top row */}
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            onClick={onCoverClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '12px' }}
            aria-label="Ir al inicio"
          >
            <img
              src="/images/products/logo.jpeg"
              alt="Athena Brand logo"
              style={{ height: '54px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
            <span
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', color: '#0a0a0a', letterSpacing: '0.04em', lineHeight: 1, userSelect: 'none' }}
            >
              ATHENA BRAND
            </span>
          </button>

          {/* IG link */}
          <a
            href="https://www.instagram.com/_athena_brand/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-black/40 hover:text-black transition-colors duration-200 text-[11px] tracking-widest font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @_athena_brand
          </a>
        </div>

        {/* Brand filter row */}
        <nav style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #e8e8e8', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {BRANDS.map((brand) => {
            const isActive = brand === activeBrand
            return (
              <button
                key={brand}
                onClick={() => onBrandChange(brand)}
                style={{
                  position: 'relative',
                  flexShrink: 0,
                  padding: '14px 22px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  whiteSpace: 'nowrap',
                  color: isActive ? '#0a0a0a' : '#b0b0b0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                  outline: 'none',
                }}
              >
                {brand}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#0a0a0a',
                    borderRadius: '2px 2px 0 0',
                  }} />
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
