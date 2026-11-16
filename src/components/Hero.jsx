import { useEffect, useRef, useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'
import IntroOverlay from './IntroOverlay.jsx'

const SEEN = 'ld-intro-seen'
function shouldPlayIntro() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  // Any refresh (soft or hard; the browser reports both as "reload") replays it.
  const nav = performance.getEntriesByType?.('navigation')?.[0]
  if (nav?.type === 'reload') return true
  // Otherwise once per visit: skip if it already played in this tab in the last 30 minutes.
  try {
    const t = Number(sessionStorage.getItem(SEEN))
    if (t && Date.now() - t < 30 * 60 * 1000) return false
  } catch { /* storage blocked: still play */ }
  return true
}

export default function Hero() {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const headerRef = useRef(null)
  const [stage, setStage] = useState(() => (shouldPlayIntro() ? 'playing' : 'docked'))
  const [hint, setHint] = useState(false)
  const done = useRef(stage !== 'playing')

  const dock = (reason) => {
    if (done.current) return
    done.current = true
    if (reason !== 'error') track(reason === 'skip' ? 'intro_skip' : 'intro_complete', { reason })
    setStage('docking')
    setTimeout(() => {
      setStage('docked')
      setHint(true)
      setTimeout(() => setHint(false), 9000)
    }, 700)
  }

  useEffect(() => {
    const h = () => dock('tour')
    addEventListener('ld-tour-open', h)
    return () => removeEventListener('ld-tour-open', h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (stage !== 'playing') return
    try { sessionStorage.setItem(SEEN, String(Date.now())) } catch { /* ignore */ }
    // if the visitor scrolls away, tuck the video into its section
    const io = new IntersectionObserver(([e]) => e.intersectionRatio < 0.25 && dock('left'), { threshold: [0.25] })
    io.observe(headerRef.current)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    track('hero_sound_toggle', { sound: v.muted ? 'off' : 'on' })
    if (!v.muted) v.play().catch(() => {})
  }

  return (
    <header className="hero" id="top" ref={headerRef}>
      <div className="hero-bg halftone" aria-hidden="true" />
      <video
        ref={ref}
        className="hero-video"
        src={media.heroVideo}
        poster={media.heroPoster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      <div className="hero-shade" />

      <button className={`mute ${muted ? 'is-muted' : ''}`} onClick={toggle} aria-pressed={!muted}>
        <svg className="mute-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" />
          {muted ? <path d="M17 9l5 6M22 9l-5 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
        </svg>
        {muted
          ? <><span className="mute-long">sound off. tap to hear the groove</span><span className="mute-short">tap for sound</span></>
          : <span>sound on</span>}
      </button>

      <span className="badge badge-hero">ai-enhanced preview</span>

      {(stage === 'playing' || stage === 'docking') && <IntroOverlay docking={stage === 'docking'} onDock={dock} />}
      {hint && <a className="intro-hint" href="#unbox">replay the unpack below</a>}

      <div className={`hero-copy ${stage === 'playing' ? 'is-hidden' : ''}`}>
        <h1>
          <img src="/lildude-white.svg" alt="lildude" className="logo" />
        </h1>
        <p className="tagline">portable, hushed kit in a tuned bass cajon</p>
        <p className="campaign">crowdfunding campaign coming soon. get on the list to back it.</p>
        <p className="tagline2">from sheds to cafés to stadiums <span className="aside">(stadiums not included)</span></p>
        <p className="plus" aria-hidden="true">+</p>
        <p className="impact">
          <span className="sr-only">plus </span>
          <svg className="impact-heart" width="1.1em" height="1.1em" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" /></svg>
          clean water and addiction education for <span className="hl">indigenous</span> communities
        </p>
        <div className="cta-row">
          <a className="btn btn-light" href="#join" onClick={() => track('cta_click', { cta: 'hero_waitlist' })}>join the waiting list</a>
          <a className="btn btn-ghost-light" href="#unbox" onClick={() => track('cta_click', { cta: 'hero_unbox' })}>see it unpack</a>
        </div>
      </div>
    </header>
  )
}
