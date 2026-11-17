import { useEffect, useState } from 'react'
import { track } from '../analytics.js'

const ITEMS = [
  { id: 'unbox', label: 'unpack' },
  { id: 'vibes', label: 'why lildude' },
  { id: 'tuning', label: '55 hz' },
  { id: 'hihat', label: 'magic hi-hat', isNew: true },
  { id: 'story', label: 'story' },
  { id: 'gallery', label: 'photos' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false) // white bar once we leave the hero
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('header.hero')
    const onScroll = () => setSolid(window.scrollY > (hero ? hero.offsetHeight - 80 : 40))
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)

    // highlight the section crossing the middle of the viewport
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;[...ITEMS.map((i) => i.id), 'join'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    // nothing highlighted while the hero is on screen
    const heroIo = hero && new IntersectionObserver(([e]) => e.intersectionRatio > 0.5 && setActive(''), { threshold: [0.5] })
    heroIo && heroIo.observe(hero)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); io.disconnect(); heroIo && heroIo.disconnect() }
  }, [])

  const go = (id) => { setOpen(false); track('nav_click', { item: id }) }

  return (
    <nav className={`nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`} aria-label="sections">
      <div className="nav-left">
        <a className="nav-brand" href="#top" onClick={() => go('top')} aria-label="lildude, back to top">
          <img src={solid ? '/lildude-black.svg' : '/lildude-white.svg'} alt="" />
        </a>
      </div>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
        <span className="nav-toggle-bars" aria-hidden="true" />
        <span className="nav-toggle-text">{open ? 'close' : 'menu'}</span>
      </button>
      <ul className="nav-links" id="nav-links">
        {ITEMS.map((i) => (
          <li key={i.label}>
            <a href={`#${i.id}`} onClick={() => go(i.id)} aria-current={active === i.id && !i.dup ? 'true' : undefined}
              className={i.isNew ? 'is-feature' : undefined}>
              {i.label}
              {i.isNew && <span className="nav-new">new</span>}
            </a>
          </li>
        ))}
        <li>
          <a className="nav-cta" href="#join" onClick={() => go('join')} aria-current={active === 'join' ? 'true' : undefined}>
            join the list
          </a>
        </li>
      </ul>
    </nav>
  )
}
