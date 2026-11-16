import { useState } from 'react'
import { track } from '../analytics.js'

// A YouTube Short embedded as a click-to-play card. Nothing is requested from YouTube until the visitor
// presses play (faster page, and no third-party tracking before they choose to watch).
export default function YouTubeFrame({ id, title, label, event }) {
  const [on, setOn] = useState(false)
  return (
    <div className="video-frame video-portrait video-dark yt-frame">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <button className="yt-play" aria-label={`play: ${title}`} onClick={() => { setOn(true); event && track(event + '_play') }}>
          <span className="yt-play-icon" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#000"><path d="M8 5v14l11-7z" /></svg>
          </span>
          <span className="yt-play-label">{label}</span>
        </button>
      )}
    </div>
  )
}
