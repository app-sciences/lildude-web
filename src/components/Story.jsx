import { media, PROTOTYPE_YOUTUBE_ID } from '../config.js'
import VideoFrame from './VideoFrame.jsx'
import YouTubeFrame from './YouTubeFrame.jsx'

export default function Story() {
  return (
    <section className="section story" id="story">
      <h2>how lildude got here</h2>
      <article className="story-block">
        <h3>where it started</h3>
        <p>the first prototype, raw, rough and real.</p>
        {PROTOTYPE_YOUTUBE_ID
          ? <YouTubeFrame id={PROTOTYPE_YOUTUBE_ID} title="lildude: the first prototype" label="watch the first prototype" event="prototype_video" />
          : <VideoFrame src={media.prototypeVideo} poster={media.prototypePoster} event="prototype_video" fallback="prototype video coming soon" />}
      </article>
      <article className="story-block">
        <h3>where we are now</h3>
        <p>this site is the first public look at lildude. the previews here are, for now, ai-enhanced, not finished production units.</p>
      </article>
      <p className="story-note">
        our campaign pays for the first production run, so we can start manufacturing right away and fill orders from a sizable waiting list. get on the list or be square.
      </p>
    </section>
  )
}
