import { PATENT_PENDING, media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function HiHat() {
  return (
    <section className="section hihat" id="hihat">
      <div className="hihat-head">
        <span className="pill">new</span>
        {PATENT_PENDING && <span className="pill pill-solid">patent pending</span>}
      </div>
      <h2>one hi-hat, three voices</h2>
      <p className="lead">drop the heel, free the top cymbal. pending patent pending.</p>

      <div className="hihat-split">
        <VideoFrame src={media.hihatVideo} poster={media.hihatPoster} event="hihat_video" portrait dark loopMuted
          badge="ai-enhanced preview" fallback="hi-hat video coming soon" />
        <div className="hihat-copy">
          <p><strong>at rest</strong> the two cymbals close as a regular hi-hat.</p>
          <p><strong>heel down</strong> press only the heel of the pedal and the lower cymbal drops away. the top one rings free as a ride or a crash.</p>
          <p className="hihat-note">so you don’t need to carry extra cymbals for ride and crash. a smaller bag, a bigger kit.</p>
        </div>
      </div>
    </section>
  )
}
