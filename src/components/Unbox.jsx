import { media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function Unbox() {
  return (
    <section className="section unbox" id="unbox">
      <div className="unbox-grid">
        <div className="unbox-copy">
          <h2>everything comes out of the box</h2>
          <p className="lead">one box, every piece. watch it unpack and come together, as often as you like.</p>
        </div>
        <VideoFrame src={media.setupVideo} poster={media.setupPoster} event="setup_video" portrait
          fallback="unboxing video coming soon" badge="ai-enhanced preview" />
      </div>
    </section>
  )
}
