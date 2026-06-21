import { useCallback } from 'react'
import { toast } from 'sonner'
import type { Product } from '../data/products'

const IG_CHAT_URL = 'https://ig.me/m/_athena_brand'

export function useInstagramChat() {
  return useCallback((product: Product) => {
    const productUrl = `${window.location.origin}${window.location.pathname}#${product.id}`

    const message = [
      `holaa, estoy interesado en esta prenda quiero mas informacion`,
      ``,
      `${product.brand} — ${product.name}`,
      product.size ? `Talla disponible: ${product.size}` : null,
      `Precio: ${product.price}`,
      ``,
      `Ver prenda: ${productUrl}`,
    ]
      .filter((line) => line !== null)
      .join('\n')

    // Abrir Instagram inmediatamente (sincrónico) para que el browser no lo bloquee como popup
    window.open(IG_CHAT_URL, '_blank', 'noopener,noreferrer')

    // Clipboard y toast después (async, no afecta la apertura del chat)
    navigator.clipboard.writeText(message).catch(() => {})

    toast.success('¡Chat abierto! Pega el mensaje en Instagram', {
      description: 'El mensaje con el link de la prenda está en tu portapapeles.',
      duration: 4500,
    })
  }, [])
}
