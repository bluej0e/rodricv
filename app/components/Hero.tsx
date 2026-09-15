import { profile, pipeline } from '../../lib/content'

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <p className="hero__name">{profile.name}</p>
        <h1 className="hero__role">{profile.role}</h1>
        <p className="hero__positioning">{profile.positioning}</p>

        <div
          className="pipeline"
          role="img"
          aria-label="Outbound engine stages: job posting, prefilter, classify, find contacts, enrich, send"
        >
          {pipeline.map((step, i) => (
            <div className="pipeline__step" key={step.stage}>
              <span className="pipeline__stage">{step.stage}</span>
              <span className="pipeline__note">{step.note}</span>
              {i < pipeline.length - 1 && <span className="pipeline__rule" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <p className="pipeline__caption">One system I owned end to end. Details below.</p>

        <div className="hero__meta">
          <span>{profile.location}</span>
          <span>{profile.citizenship}</span>
        </div>

        <div className="hero__links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </header>
  )
}
