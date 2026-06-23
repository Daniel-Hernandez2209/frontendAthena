# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server en http://localhost:5173
npm run build      # tsc + vite build (producción)
npm run lint       # eslint
npm run preview    # previsualizar build local
```

No hay tests configurados.

## Stack

React 19 + Vite 8 + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite`) + Framer Motion + Sonner (toasts) + Vercel Analytics.

Tailwind v4 no usa `tailwind.config.js` — la configuración va directamente en `src/index.css` con `@import "tailwindcss"`. Los estilos responsive que no se pueden expresar en clases Tailwind se escriben como CSS en `index.css` usando media queries normales.

## Arquitectura

**Sin backend.** Todo el contenido vive en dos archivos de datos:

- `src/data/products.ts` — array `products[]`, tipo `Product`, constante `COVER_IMAGE` y array `BRANDS` para los filtros. Para agregar un producto: poner las fotos en `public/images/products/` y añadir una entrada al array.
- `src/data/gallery.ts` — array `galleryItems[]` para el Lookbook. Cada item es `type: 'images'` (ciclan en hover) o `type: 'video'` (ruta a `public/images/videos/`). El campo `span: 'wide'` ocupa 2 columnas en el grid.

**Flujo de estado:** `App.tsx` es el único componente con estado (`activeBrand`). Lo pasa hacia abajo a `Header` (para los filtros) y a `Catalog` (para filtrar productos). No hay contexto global ni store.

**Estilos:** mezcla de inline styles (para valores dinámicos o únicos) y clases Tailwind (para layout y utilidades repetidas). Las clases CSS nombradas (`.gallery-grid`, `.card-whatsapp-cta`, `.lightbox-prev`, etc.) viven en `src/index.css` y se usan para comportamiento responsive que depende de media queries o `@media (hover: none)`.

**WhatsApp CTA:** `src/hooks/useWhatsApp.ts` construye el mensaje y abre `wa.me`. El número está hardcodeado como `WA_NUMBER = '573106229118'`. La URL de imagen que se incluye en el mensaje apunta a `https://urban-crown.vercel.app` (dominio de producción en Vercel).

**Lightbox:** se abre desde `ProductCard` al hacer click en la imagen. Navega con teclado (←/→/Esc) y con botones prev/next. En móvil (≤600px) los botones se reposicionan como elementos `fixed` en la parte inferior via CSS.

**Videos en Gallery:** usan `IntersectionObserver` para disparar `.play()` cuando el elemento entra al viewport. Si el navegador bloquea el autoplay, se muestra un botón play superpuesto.

## Estética (mantener consistente)

- Fondo: `#0a0a0a` (hero/dark) y `#ffffff` (catálogo/galería)
- Tipografía títulos: `Bebas Neue` con `letterSpacing: '0.04em'`
- Tipografía body: `Inter`
- Animaciones: `type: 'spring', stiffness: 380, damping: 38` con Framer Motion
- No usar colores fuera de la paleta CSS vars definidas en `:root` de `index.css`

## Deploy

Vercel con `vercel.json` (rewrite SPA). El comando de build es `npm run build`. El dominio de producción es `urban-crown.vercel.app`.
