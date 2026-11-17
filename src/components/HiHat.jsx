import { PATENT_PENDING, media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function HiHat() {
  return (
    <section className="section hihat" id="hihat">
      <div className="hihat-inner">
      <div className="hihat-head">
        <span className="pill">new</span>
        {PATENT_PENDING && <span className="pill pill-solid">patent pending</span>}
      </div>
      <h2>one hi-hat, three cymbals</h2>
      <p className="lead">click the heel, use the top cymbal as crash or ride. pending patent pending.</p>

      <div className="hihat-split">
        <VideoFrame src={media.hihatVideo} poster={media.hihatPoster} event="hihat_video" portrait dark loopMuted bare
          badge="ai-enhanced preview" fallback="hi-hat video coming soon" />
        <div className="hihat-copy">
          <p>regular hi-hat.</p>
          <p><strong>heel click:</strong> top hat rings free as a ride or a crash.</p>
          <p className="hihat-note">what else do you need, a gong?</p>
        </div>
      </div>
      </div>
    </section>
  )
}
