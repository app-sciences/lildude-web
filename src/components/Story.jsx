import { media } from '../config.js'
import VideoFrame from './VideoFrame.jsx'

export default function Story() {
  return (
    <section className="section story" id="story">
      <h2>how lildude got here</h2>
      <article className="story-block">
        <h3>where it started</h3>
        <p>the first prototype, built by hand. raw, rough and real.</p>
        <VideoFrame src={media.prototypeVideo} poster={media.prototypePoster} event="prototype_video"
          fallback="prototype video coming soon" />
      </article>
      <article className="story-block">
        <h3>where we are now</h3>
        <p>you’re looking at it. this site is the first public look at lildude. the previews here are ai-enhanced, not finished production units.</p>
      </article>
      <p className="story-note">
        our campaign pays for the first production run, so we can start manufacturing right away.
        get on the waiting list and you’ll be first to back it.
      </p>
    </section>
  )
}
