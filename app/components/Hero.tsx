import { profile, summary } from '../../lib/content'

export default function Hero() {
  return (
    <header className="cvhead">
      <div className="wrap">
        <h1 className="cvhead__name">{profile.name}</h1>
        <p className="cvhead__role">{profile.role}</p>

        <p className="cvhead__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <span className="sep" aria-hidden="true">·</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/rodrigoviola</a>
          <span className="sep" aria-hidden="true">·</span>
          <a href={profile.github} target="_blank" rel="noreferrer">github.com/bluej0e</a>
        </p>
        <p className="cvhead__where">
          {profile.location}
          <span className="sep" aria-hidden="true">·</span>
          {profile.citizenship}
        </p>

        <h2 className="section__title cvhead__sumtitle">Summary</h2>
        <p className="cvhead__summary">{summary}</p>
      </div>
    </header>
  )
}
