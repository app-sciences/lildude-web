import { media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function Story() {
  return (
    <section className="section story" id="story">
      <h2>how lildude got here</h2>
      <div className="story-grid">
        <article>
          <h3>where it started</h3>
          <p>the first prototype, built by hand. raw, rough and real.</p>
          <VideoFrame src={media.prototypeVideo} poster={media.prototypePoster} event="prototype_video"
            fallback="prototype video coming soon" />
        </article>
        <article>
          <h3>where we are now</h3>
          <p>an ai-enhanced preview of the product we’re about to make. it is a preview, not a finished production unit.</p>
          <VideoFrame src={media.previewVideo} poster={media.previewPoster} event="preview_video"
            fallback="preview coming soon" badge="ai-enhanced preview" />
        </article>
      </div>
      <p className="story-note">
        our campaign pays for the first production run, so we can start manufacturing right away.
        get on the waiting list and you’ll be first to back it.
      </p>
    </section>
  )
}
