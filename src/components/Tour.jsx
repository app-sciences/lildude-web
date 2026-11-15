import { useEffect, useRef, useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'
import { HiHatAnim } from './HiHat.jsx'

// Video tour: a drawer that slides in from the right and walks through the videos, one per step.
const STEPS = [
  { id: 'unpack', title: 'unpack it', note: 'one box, every piece. watch it come together.',
    src: media.setupVideo, poster: media.setupStart, ratio: '720 / 892' },
  { id: 'tuning', title: 'tuned to 55 hz', note: 'a port tube turns the cajon into a bass drum resonator.',
    src: media.tuningVideo, poster: media.tuningPoster, ratio: '798 / 720' },
  { id: 'hihat', title: 'the magic hi-hat', note: 'press the heel, the lower hat drops, the top one rings free. (video coming soon)' },
]

export function SkipIcon({ flip }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="currentColor" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 5v14M20 5v14" fill="none" />
      <path d="M8.5 5.5l9 6.5-9 6.5z" />
    </svg>
  )
}

export default function Tour({ open, onClose }) {
  const [i, setI] = useState(0)
  const closeRef = useRef(null)
  const step = STEPS[i]
  const last = i === STEPS.length - 1

  useEffect(() => {
    if (!open) return
    setI(0)
    closeRef.current?.focus()
    track('tour_open')
    const onKey = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open, onClose])

  const go = (n) => { setI(n); track('tour_step', { step: STEPS[n].id }) }

  return (
    <>
      <div className={`tour-scrim ${open ? 'is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`tour ${open ? 'is-open' : ''}`} role="dialog" aria-label="video tour"
        aria-hidden={!open} inert={open ? undefined : ''}>
        <div className="tour-head">
          <span>video tour · {i + 1} / {STEPS.length}</span>
          <button ref={closeRef} className="tour-close" onClick={onClose}>close</button>
        </div>
        <h2 className="tour-title">{step.title}</h2>
        <p className="tour-note">{step.note}</p>
        <div className="tour-stage">
          {open && step.src && (
            <video key={step.id} src={step.src} poster={step.poster} autoPlay muted playsInline controls
              style={{ aspectRatio: step.ratio }}
              onEnded={() => { if (!last) go(i + 1); else track('tour_complete') }} />
          )}
          {open && !step.src && <HiHatAnim />}
        </div>
        <div className="tour-nav">
          <button className="tour-btn" onClick={() => go(i - 1)} disabled={i === 0} aria-label="previous video"><SkipIcon flip /></button>
          <span className="tour-dots" aria-hidden="true">
            {STEPS.map((s, n) => <i key={s.id} className={n === i ? 'on' : ''} />)}
          </span>
          {last
            ? <a className="btn btn-primary" href="#join" onClick={onClose}>join the list</a>
            : <button className="tour-btn" onClick={() => go(i + 1)} aria-label="next video"><SkipIcon /></button>}
        </div>
      </aside>
    </>
  )
}
