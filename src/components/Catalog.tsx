import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { products } from '../data/products'
import type { Brand } from '../data/products'
import { ProductCard } from './ProductCard'

interface Props {
  activeBrand: Brand
}

export function Catalog({ activeBrand }: Props) {
  const filtered = useMemo(
    () => (activeBrand === 'TODOS' ? products : products.filter((p) => p.brand === activeBrand)),
    [activeBrand]
  )

  return (
    <section className="max-w-screen-xl mx-auto px-5 md:px-10 pb-24 pt-10">
      {/* Section label */}
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-black leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '0.02em' }}
        >
          {activeBrand === 'TODOS' ? 'COLECCIÓN COMPLETA' : activeBrand}
        </h2>
        <span className="text-[11px] text-black/30 tracking-widest font-medium">
          {filtered.length} {filtered.length === 1 ? 'PRENDA' : 'PRENDAS'}
        </span>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-black/20 text-sm tracking-widest py-24">
          SIN PRODUCTOS EN ESTA CATEGORÍA
        </p>
      )}
    </section>
  )
}
