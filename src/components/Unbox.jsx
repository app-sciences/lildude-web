import { media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function Unbox() {
  return (
    <section className="section unbox" id="unbox">
      <h2>everything comes out of the box</h2>
      <p className="lead">one box, every piece. watch it unpack and come together.</p>
      <VideoFrame src={media.setupVideo} poster={media.setupPoster} event="setup_video"
        fallback="unboxing video coming soon" />
    </section>
  )
}
