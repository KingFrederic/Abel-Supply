const CDN = 'https://images.unsplash.com';

/** Route Unsplash images through the local proxy (avoids CDN hotlink blocks). */
export function proxy(url: string) {
  return `/api/img?src=${encodeURIComponent(url)}`;
}

/** Unsplash photo via proxy. id = long numeric CDN photo id. */
export function unsplash(id: string, w = 1200, q = 80) {
  return proxy(`${CDN}/${id}?auto=format&fit=crop&w=${w}&q=${q}`);
}

/**
 * Picsum photo used as a reliable fallback — served directly by the browser
 * (picsum.photos does not restrict hotlinking by domain).
 * seed keeps the image deterministic across renders.
 */
export function picsum(seed: string, w = 1200, h = 800) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
