import { media } from '../config.js'
import { track } from '../analytics.js'

export default function Tuning() {
  return (
    <section className="section tuning" id="tuning">
      <div className="tuning-grid">
        <div className="tuning-copy">
          <h2>tuned to 55 hz</h2>
          <p className="lead-left">
            that’s the low thump of a bass drum. acoustic tube turns cajon into a resonator - the air inside rings right where a kick drum lives.
          </p>
          <p>
            same trick as a ported speaker: punchy, fast, real low end that cuts through.
          </p>
        </div>
        <div className="tuning-video">
          <video
            className="frameless"
            poster={media.tuningCutout}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="the tuned cajon"
            onPlay={() => track('tuning_video_play')}
          >
            <source src={media.tuningAlpha} type='video/webm; codecs="vp9"' />
            <source src={media.tuningBlack} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
