import { useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'


function Tile({ src, n, onOpen }) {
  const [failed, setFailed] = useState(false)
  return (
    <button className="tile" onClick={() => { track('gallery_image_open', { index: n + 1 }); onOpen(src) }} aria-label={`Open photo ${n + 1}`}
>
      {failed ? <span className="tile-art" /> : (
        <img src={src} alt={`lildude cajon drumset photo ${n + 1}`} loading="lazy"
          onError={() => setFailed(true)} />
      )}
    </button>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section gallery" id="gallery">
      <h2>see it up close</h2>
      <p className="lead">a closer look at the kit.</p>

      <div className="tiles">
        {media.images.map((src, n) => <Tile key={src} src={src} n={n} onOpen={setOpen} />)}
      </div>

      {open && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <img src={open} alt="" />
        </div>
      )}
    </section>
  )
}
