import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  images: string[]
  startIndex: number
  onClose: () => void
}

export function Lightbox({ images, startIndex, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex)

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Image */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={images[current]}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', display: 'block', borderRadius: '2px' }}
          />
        </AnimatePresence>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={prev}
            style={{
              position: 'absolute', left: '-52px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: '40px', height: '40px', borderRadius: '50%',
              cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >‹</button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={next}
            style={{
              position: 'absolute', right: '-52px', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: '40px', height: '40px', borderRadius: '50%',
              cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >›</button>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ position: 'fixed', bottom: '28px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              style={{
                width: i === current ? '20px' : '6px', height: '6px',
                borderRadius: '999px', background: '#fff',
                opacity: i === current ? 1 : 0.35,
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease', padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '20px', right: '24px',
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
          fontSize: '28px', cursor: 'pointer', lineHeight: 1,
        }}
      >×</button>
    </motion.div>
  )
}
