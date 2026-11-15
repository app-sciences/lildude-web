import { PATENT_PENDING } from '../config.js'

function Stand({ dropped }) {
  const low = dropped ? 150 : 82
  return (
    <svg viewBox="0 0 180 250" width="100%" role="img"
      aria-label={dropped ? 'heel pressed: lower cymbal drops away, top cymbal rings free' : 'pedal at rest: two cymbals closed as a hi-hat'}>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="90" y1="14" x2="90" y2="205" />
        <ellipse cx="90" cy="58" rx="62" ry="9" />
        {dropped && <ellipse cx="90" cy="82" rx="62" ry="9" strokeDasharray="3 9" opacity=".45" />}
        <ellipse cx="90" cy={low} rx="62" ry="9" />
        {dropped && <path d="M156 92v44m-9-11 9 11 9-11" strokeWidth="4" />}
        <path d="M20 232h140" />
        <path d="M22 232v-14h34v14" fill={dropped ? 'currentColor' : 'none'} />
        {dropped && <path d="M39 184v22m-8-9 8 9 8-9" strokeWidth="4" />}
      </g>
    </svg>
  )
}

// Looping animation: rest -> heel pressed, lower cymbal drops, top cymbal rings free -> back to rest.
function Anim() {
  return (
    <div className="hh-anim">
      <svg viewBox="0 0 220 260" className="hh-svg" role="img"
        aria-label="Animation: pressing the heel of the pedal drops the lower cymbal, so the top cymbal rings free as a ride or a crash">
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="110" y1="14" x2="110" y2="205" />
          <g className="hh-top"><ellipse cx="110" cy="58" rx="70" ry="10" /></g>
          <ellipse className="hh-ghost" cx="110" cy="84" rx="70" ry="10" strokeDasharray="3 9" />
          <g className="hh-low"><ellipse cx="110" cy="84" rx="70" ry="10" /></g>
          <path d="M20 236h180" />
          <g className="hh-heel">
            <path d="M24 236v-16h40v16" />
            <path className="hh-arrow-heel" d="M44 186v22m-9-9 9 9 9-9" />
          </g>
          <path className="hh-arrow-drop" d="M186 100v48m-9-11 9 11 9-11" />
        </g>
      </svg>
      <div className="hh-caps" aria-hidden="true">
        <p className="hh-cap hh-cap-a"><strong>at rest</strong> the two cymbals close as a regular hi-hat.</p>
        <p className="hh-cap hh-cap-b"><strong>heel down</strong> punch the heel of the pedal and the lower cymbal drops away. the top one rings free as a ride or a crash.</p>
      </div>
    </div>
  )
}

export default function HiHat() {
  return (
    <section className="section hihat" id="hihat">
      <div className="hihat-head">
        <span className="pill">new</span>
        {PATENT_PENDING && <span className="pill pill-solid">patent pending</span>}
      </div>
      <h2>one hi-hat, three voices</h2>
      <p className="lead">drop the heel, free the top cymbal. pending patent pending.</p>
      <Anim />
      <div className="hihat-grid">
        <figure className="hihat-fig">
          <Stand dropped={false} />
          <figcaption><strong>at rest</strong> the two cymbals close as a regular hi-hat.</figcaption>
        </figure>
        <figure className="hihat-fig">
          <Stand dropped />
          <figcaption><strong>heel down</strong> punch the heel of the pedal and the lower cymbal drops away. the top one rings free as a ride or a crash.</figcaption>
        </figure>
      </div>
      <p className="hihat-note">so you don’t need to carry extra cymbals for ride and crash. a smaller bag, a bigger kit.</p>
    </section>
  )
}
