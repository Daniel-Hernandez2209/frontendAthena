import { motion } from 'framer-motion'
import type { Brand } from '../data/products'
import { BRANDS } from '../data/products'

interface Props {
  active: Brand
  onChange: (b: Brand) => void
}

export function BrandFilter({ active, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      {BRANDS.map((brand) => {
        const isActive = brand === active
        return (
          <button
            key={brand}
            onClick={() => onChange(brand)}
            className="relative px-4 py-1.5 text-xs font-medium tracking-widest transition-colors duration-200 outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-sm"
            style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.35)' }}
          >
            {isActive && (
              <motion.span
                layoutId="brand-pill"
                className="absolute inset-0 rounded-sm"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
              />
            )}
            <span className="relative z-10">{brand}</span>
          </button>
        )
      })}
    </div>
  )
}
