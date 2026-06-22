import type { Product } from '../data/products'

const WA_NUMBER = '573106229118' // 57 = Colombia

export function openWhatsApp(product: Product) {
  const productUrl = `${window.location.origin}${window.location.pathname}#${product.id}`

  const message = [
    `Hola! estoy interesado en esta prenda y quiero más información`,
    ``,
    `*${product.brand} — ${product.name}*`,
    product.size ? `Talla: ${product.size}` : null,
    `Precio: ${product.price}`,
    ``,
    `Ver prenda: ${productUrl}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
