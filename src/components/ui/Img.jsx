import { getImage } from '../../data/images.js'

/** Responsive, lazy-loaded WebP image with intrinsic size to avoid layout shift. */
export default function Img({ id, alt, sizes = '100vw', priority = false, className = '' }) {
  const image = getImage(id)
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchpriority: 'high' } : {})}
      style={{ backgroundColor: image.color }}
      className={className}
    />
  )
}
