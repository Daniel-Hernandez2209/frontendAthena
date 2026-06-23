import { useEffect, useRef, useState } from 'react'
import { galleryItems } from '../data/gallery'
import type { GalleryItem } from '../data/gallery'

function VideoItem({ item }: { item: GalleryItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        src={item.video}
        loop
        muted
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* Botón play/pausa visible en móvil cuando no reproduce */}
      {!playing && (
        <button
          onClick={handlePlayClick}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </button>
      )}
      {/* Tap para pause cuando está reproduciendo */}
      {playing && (
        <button
          onClick={handlePlayClick}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            background: 'transparent', border: 'none', cursor: 'pointer',
          }}
        />
      )}
    </div>
  )
}

function ImageItem({ item }: { item: GalleryItem }) {
  const [idx, setIdx] = useState(0)
  const images = item.images ?? []

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <img
      src={images[idx]}
      alt={item.caption ?? ''}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s ease' }}
      loading="lazy"
    />
  )
}

export function Gallery() {
  return (
    <section style={{ background: '#ffffff', padding: 'clamp(40px, 8vw, 80px) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(26px, 3vw, 36px)', color: '#0a0a0a', letterSpacing: '0.04em', margin: 0 }}>
            LOOKBOOK
          </h2>
          <p style={{ fontSize: '11px', color: '#b0b0b0', letterSpacing: '0.18em', fontWeight: 500, margin: 0 }}>
            TEMPORADA 2025
          </p>
        </div>

        {/* Grid responsive */}
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={item.span === 'wide' ? 'gallery-item gallery-item--wide' : 'gallery-item'}
            >
              {item.type === 'video' && item.video ? (
                <VideoItem item={item} />
              ) : (
                <ImageItem item={item} />
              )}
              {item.caption && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 14px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)', pointerEvents: 'none' }}>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500, margin: 0, textTransform: 'uppercase' }}>{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a
            href="https://www.instagram.com/_athena_brand/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid #0a0a0a', color: '#0a0a0a', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', padding: '12px 28px', textDecoration: 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            VER MÁS EN INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  )
}
