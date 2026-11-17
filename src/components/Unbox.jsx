import { media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function Unbox() {
  return (
    <section className="section unbox" id="unbox">
      <div className="unbox-grid">
        <div className="unbox-copy">
          <h2>set in a cajon</h2>
          <p className="lead">watch it bloom.</p>
        </div>
        <VideoFrame src={media.setupVideo} poster={media.setupPoster} event="setup_video" portrait
          fallback="unboxing video coming soon" badge="ai-enhanced preview" />
      </div>
    </section>
  )
}
