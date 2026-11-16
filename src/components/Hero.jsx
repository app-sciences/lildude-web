import { useEffect, useRef, useState } from 'react'
import { media } from '../config.js'
import { track } from '../analytics.js'
import { HiHatAnim } from './HiHat.jsx'
import { SkipIcon } from './SkipIcon.jsx'

// EXPERIMENT: the hero is a step-through wizard. Step 0 is the regular front header; "next" slides in
// unpack -> tuning -> hi-hat and then returns to the front. Everything happens inside the first screen.
const STEPS = [
  { id: 'front', label: 'start' },
  { id: 'unpack', label: 'unpack', title: 'unpack it', note: 'one box, every piece. watch it come together.',
    src: media.setupVideo, poster: media.setupStart, ratio: '720 / 892' },
  { id: 'tuning', label: 'tuning', title: 'tuned to 55 hz', note: 'a port tube turns the cajon into a bass drum resonator.',
    src: media.tuningVideo, poster: media.tuningPoster, ratio: '798 / 720' },
  { id: 'hihat', label: 'hi-hat', title: 'the magic hi-hat', note: 'press only the heel and the lower hat drops. the top one rings free as a ride or a crash.', anim: true },
]
const NEXT_LABEL = ['unpack', 'tuning', 'hi-hat', 'back to start']

export default function Hero() {
  const videoRef = useRef(null)
  const headerRef = useRef(null)
  const [muted, setMuted] = useState(true)
  const [step, setStep] = useState(0)
  const [touched, setTouched] = useState(false) // stops the "next" button pulsing once used
  const [inView, setInView] = useState(true)
  const touchX = useRef(null)

  const go = (n, how) => {
    const to = (n + STEPS.length) % STEPS.length
    setStep(to)
    setTouched(true)
    track('hero_step', { step: STEPS[to].id, how })
  }

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.5), { threshold: [0.5] })
    io.observe(headerRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return
      if (e.key === 'ArrowRight') go(step + 1, 'key')
      if (e.key === 'ArrowLeft') go(step - 1, 'key')
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, step])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    track('hero_sound_toggle', { sound: v.muted ? 'off' : 'on' })
    if (!v.muted) v.play().catch(() => {})
  }

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 60) go(step + (dx < 0 ? 1 : -1), 'swipe')
  }

  return (
    <header className={`hero ${step > 0 ? 'is-step' : ''}`} id="top" ref={headerRef}>
      <div className="hero-bg halftone" aria-hidden="true" />
      <video ref={videoRef} className="hero-video" src={media.heroVideo} poster={media.heroPoster}
        autoPlay loop muted playsInline preload="metadata" onError={(e) => (e.currentTarget.style.display = 'none')} />
      <div className="hero-shade" />
      <div className="hero-dim" aria-hidden="true" />

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

      <div className="wiz-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="wiz-track" style={{ transform: `translateX(-${step * 100}%)` }}>
          {STEPS.map((s, i) => (
            <section key={s.id} className="wiz-slide" aria-hidden={step !== i} inert={step !== i ? '' : undefined}
              aria-label={i === 0 ? 'lildude' : s.title}>
              {i === 0 ? (
                <div className="hero-copy">
                  <h1><img src="/lildude-white.svg" alt="lildude" className="logo" /></h1>
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
                    <button className="btn btn-ghost-light" onClick={() => go(1, 'cta')}>see it unpack</button>
                  </div>
                </div>
              ) : (
                <div className="wiz-panel">
                  <div className="wiz-text">
                    <p className="wiz-kicker">{i} / {STEPS.length - 1}</p>
                    <h2>{s.title}</h2>
                    <p>{s.note}</p>
                  </div>
                  <div className="wiz-media">
                    {step === i && s.src && (
                      <video key={s.id} src={s.src} poster={s.poster} autoPlay loop muted playsInline controls
                        style={{ aspectRatio: s.ratio }} />
                    )}
                    {step === i && s.anim && <HiHatAnim />}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <button className="wiz-prev" onClick={() => go(step - 1, 'prev')} aria-label="previous step"><SkipIcon flip /></button>
      <button className={`wiz-next ${touched ? '' : 'is-pulsing'}`} onClick={() => go(step + 1, 'next')}
        aria-label={`next: ${NEXT_LABEL[step]}`}>
        <span className="wiz-next-label">{NEXT_LABEL[step]}</span>
        <SkipIcon />
      </button>
      <div className="wiz-dots" role="group" aria-label="hero steps">
        {STEPS.map((s, i) => (
          <button key={s.id} className={i === step ? 'on' : ''} onClick={() => go(i, 'dot')}
            aria-label={`go to ${s.label}`} aria-current={i === step ? 'step' : undefined} />
        ))}
      </div>
    </header>
  )
}
