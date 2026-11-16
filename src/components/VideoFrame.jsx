import { useState } from 'react'
import { track } from '../analytics.js'

// A framed video with a fallback label (shown until the file exists) and an optional disclosure badge.
// loopMuted: silent clips play like a looping gif (no controls). dark: for clips shot on black.
export default function VideoFrame({ src, poster, fallback, badge, event, portrait, dark, loopMuted }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`video-frame ${portrait ? 'video-portrait' : ''} ${dark ? 'video-dark' : ''}`}>
      {failed && <div className="video-fallback">{fallback}</div>}
      {!failed && (
        <video
          src={src}
          poster={poster}
          {...(loopMuted ? { autoPlay: true, loop: true, muted: true } : { controls: true })}
          playsInline
          preload={loopMuted ? 'auto' : 'metadata'}
          onError={() => setFailed(true)}
          onPlay={() => event && track(event + '_play')}
          onEnded={() => event && track(event + '_complete')}
        />
      )}
      {badge && <span className="badge">{badge}</span>}
    </div>
  )
}
