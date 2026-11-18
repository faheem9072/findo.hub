/**
 * Utility to ensure all product images are served as lightweight CDN/static URLs
 * rather than heavy Base64 strings that cause Fast Origin Transfer limits.
 */
export function sanitizeProduct<T = any>(product: T): T {
  if (!product) return product;

  let images = (product as any).images;
  if (typeof images === 'string') {
    try {
      images = JSON.parse(images);
    } catch {
      images = [images];
    }
  }

  if (!Array.isArray(images)) {
    images = [images || '/logo.jpeg'];
  }

  const cleanImages = images.map((img: any, idx: number) => {
    if (typeof img === 'string' && img.startsWith('data:image')) {
      return idx === 0
        ? `/images/products/${(product as any).slug}.jpg`
        : `/images/products/${(product as any).slug}-${idx}.jpg`;
    }
    return typeof img === 'string' ? img : '/logo.jpeg';
  });

  return {
    ...product,
    images: JSON.stringify(cleanImages),
  };
}

export function sanitizeProducts<T = any>(products: T[]): T[] {
  if (!Array.isArray(products)) return [];
  return products.map(sanitizeProduct);
}
