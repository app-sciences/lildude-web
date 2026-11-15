import { PATENT_PENDING } from '../config.js'

// One scene, three modes: 'anim' (looping animation), 'rest' and 'down' (still images for reduced motion).
// Only the heel end of the pedal (the solid part of the footboard) is pressed; the toe is not.
function Scene({ mode }) {
  const anim = mode === 'anim'
  const down = mode === 'down'
  const cls = (c) => (anim ? c : undefined)
  const label = down
    ? 'Heel of the pedal pressed: the lower cymbal drops away and the top cymbal rings free'
    : anim
      ? 'Animation: pressing only the heel of the pedal drops the lower cymbal, so the top cymbal rings free as a ride or a crash'
      : 'Pedal at rest: two cymbals closed as a regular hi-hat'
  return (
    <svg viewBox="0 0 220 260" className="hh-svg" role="img" aria-label={label}>
      <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        {/* stand and cymbals */}
        <line x1="110" y1="14" x2="110" y2="205" />
        <g className={cls('hh-top')}><ellipse cx="110" cy="58" rx="70" ry="10" /></g>
        {(anim || down) && (
          <ellipse className={cls('hh-ghost')} cx="110" cy="84" rx="70" ry="10" strokeDasharray="3 9" opacity={down ? 0.45 : undefined} />
        )}
        <g className={cls('hh-low')} transform={down ? 'translate(0 70)' : undefined}>
          <ellipse cx="110" cy="84" rx="70" ry="10" />
        </g>
        {/* pedal: base, hinge, footboard (heel end solid) */}
        <path d="M18 248h150" />
        <path d="M62 248l8-12 8 12" />
        <g className={cls('hh-board')} transform={down ? 'rotate(7 70 236)' : undefined}>
          <path d="M22 224h118a6 6 0 0 1 0 12H22a6 6 0 0 1 0-12z" />
          <path d="M100 224h40a6 6 0 0 1 0 12h-40z" fill="currentColor" />
        </g>
        {/* motion cues */}
        {(anim || down) && <path className={cls('hh-arrow-heel')} d="M133 182v24m-9-10 9 10 9-10" />}
        {(anim || down) && <path className={cls('hh-arrow-drop')} d="M186 100v48m-9-11 9 11 9-11" />}
      </g>
    </svg>
  )
}

const REST = <><strong>at rest</strong> the two cymbals close as a regular hi-hat.</>
const DOWN = <><strong>heel down</strong> press only the heel of the pedal and the lower cymbal drops away. the top one rings free as a ride or a crash.</>

export function HiHatAnim() {
  return (
    <div className="hh-anim">
      <Scene mode="anim" />
      <div className="hh-caps" aria-hidden="true">
        <p className="hh-cap hh-cap-a">{REST}</p>
        <p className="hh-cap hh-cap-b">{DOWN}</p>
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

      <HiHatAnim />

      <div className="hihat-grid">
        <figure className="hihat-fig"><Scene mode="rest" /><figcaption>{REST}</figcaption></figure>
        <figure className="hihat-fig"><Scene mode="down" /><figcaption>{DOWN}</figcaption></figure>
      </div>

      <p className="hihat-note">so you don’t need to carry extra cymbals for ride and crash. a smaller bag, a bigger kit.</p>
    </section>
  )
}
