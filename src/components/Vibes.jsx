import { track } from '../analytics.js'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const items = [
  { href: '#unbox', path: 'M8 7a4 4 0 0 1 8 0M6 9h12a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9a1 1 0 0 1 1-1zM9 15h6',
    title: 'sheds to cafés', text: 'easy to throw around. shed at home, busk in the park, jam at the café.' },
  { href: '#tuning', path: 'M12 3c1.5 2.5 1.5 4.5 0 6.5C10.5 7.5 10.5 5.5 12 3zM12 14.5c1.5 2.5 1.5 4.5 0 6.5-1.5-2-1.5-4 0-6.5zM3 12c2.5-1.5 4.5-1.5 6.5 0C7.5 13.5 5.5 13.5 3 12zM14.5 12c2-1.5 4-1.5 6.5 0-2.5 1.5-4.5 1.5-6.5 0z',
    title: 'volume control', text: 'play loud in spirit, not in decibels. cajon geometry/materials + perforated cymbals keep volume in check.' },
  { href: '#tuning', path: 'M3 18a9 9 0 0 1 18 0M7 18a5 5 0 0 1 10 0M11 18a1 1 0 0 1 2 0',
    title: 'tuned bass cajon', text: 'cajon geometry/materials + an acoustic resonator tunes the cajon to 55 hz, a common bass drum frequency.' },
  { href: '#hihat', path: 'M12 3v17M5 8h14M7 13h10M8 20h8', isNew: true,
    title: 'magic hi-hat', text: 'drop the lower hat -- upper hat becomes a crash or a ride, with a click of the heel.' },
]

function More() {
  return (
    <span className="card-more" aria-hidden="true">
      see more
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  )
}

export default function Vibes() {
  return (
    <section className="section vibes" id="vibes">
      <h2>great pocket, tiny footprint</h2>
      <div className="grid">
        {items.map((i) => (
          <a className="card" key={i.title} href={i.href} onClick={() => track('card_click', { card: i.title })}>
            <svg className="card-icon" width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" {...stroke}><path d={i.path} /></svg>
            <h3>{i.title} {i.isNew && <span className="pill">new</span>}</h3>
            <p>{i.text}</p>
            <More />
          </a>
        ))}
      </div>
      <a className="card card-wide" href="#join" onClick={() => track('card_click', { card: 'drums for every kid' })}>
        <svg className="card-icon" width="56" height="56" viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
        <div>
          <h3>drums for every kid</h3>
          <p>a fraction of the price of a kit. efficiently, responsibly produced in guatemala. a portion of profits supports access to clean water and addiction education for <span className="hl">indigenous</span> communities in Guatemala.</p>
        </div>
        <More />
      </a>
    </section>
  )
}
