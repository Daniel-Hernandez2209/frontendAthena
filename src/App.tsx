import { useRef, useState } from 'react'
import { Toaster } from 'sonner'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Gallery } from './components/Gallery'
import { Catalog } from './components/Catalog'
import type { Brand } from './data/products'

export default function App() {
  const [activeBrand, setActiveBrand] = useState<Brand>('TODOS')
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollToCover = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0a0a0a',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#ffffff',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '13px',
            borderRadius: '6px',
          },
        }}
      />

      <div ref={heroRef}>
        <Hero />
      </div>

      <Header
        activeBrand={activeBrand}
        onBrandChange={setActiveBrand}
        onCoverClick={scrollToCover}
      />

      <Catalog activeBrand={activeBrand} />

      <Gallery />
    </>
  )
}
