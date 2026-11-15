import { useEffect, useRef, useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'

// The assembly video, played once per visit over the hero, muted. When it ends (or is skipped)
// it slides down into the "unbox" section, where visitors can replay it.
export default function IntroOverlay({ docking, onDock }) {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    track('intro_play')
    v.play().catch(() => onDock('blocked')) // autoplay refused: skip straight to the section
    const onKey = (e) => e.key === 'Escape' && onDock('skip')
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSound = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    track('intro_sound_toggle', { sound: v.muted ? 'off' : 'on' })
  }

  return (
    <div className={`intro ${docking ? 'is-docking' : ''}`} role="region" aria-label="how lildude unpacks">
      <div className="intro-card">
        <video
          ref={ref}
          src={media.setupVideo}
          poster={media.setupStart}
          muted
          playsInline
          preload="auto"
          onEnded={() => onDock('complete')}
          onError={() => onDock('error')}
        />
        <button className="intro-skip" onClick={() => onDock('skip')} aria-label="skip the intro video">skip</button>
        <button className="intro-sound" onClick={toggleSound} aria-pressed={!muted}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" />
            {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
          </svg>
          <span>{muted ? 'sound off' : 'sound on'}</span>
        </button>
      </div>
    </div>
  )
}
