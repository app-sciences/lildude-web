import { useState } from 'react'
import { track } from '../analytics.js'

// A framed video with a fallback label (shown until the file exists) and an optional disclosure badge.
export default function VideoFrame({ src, poster, fallback, badge, event, portrait }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`video-frame ${portrait ? 'video-portrait' : ''}`}>
      {failed && <div className="video-fallback">{fallback}</div>}
      {!failed && (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
          onPlay={() => event && track(event + '_play')}
          onEnded={() => event && track(event + '_complete')}
        />
      )}
      {badge && <span className="badge">{badge}</span>}
    </div>
  )
}
