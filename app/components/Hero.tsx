import { profile, summary } from '../../lib/content'
import Halftone from './Halftone'

export default function Hero() {
  const site = profile.site.replace('https://', '')
  return (
    <header className="hero">
      <div className="wrap hero__grid">
        <div>
          <p className="eyebrow">Curriculum vitae</p>
          <h1 className="hero__title hero__title--name">{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <ul className="contact">
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/rodrigoviola</a></li>
            <li><a href={profile.github} target="_blank" rel="noreferrer">github.com/bluej0e</a></li>
            <li className="print-only"><a href={`${profile.site}/work/`}>{site}/work</a></li>
          </ul>
          <p className="hero__where">{profile.location}</p>
          <p className="hero__where">{profile.citizenship}</p>
          <p className="hero__actions">
            <a className="button" href={profile.pdf} download>Download PDF <span aria-hidden="true">↓</span></a>
            <a className="button button--ghost" href="/work/">See the work <span aria-hidden="true">→</span></a>
          </p>
        </div>
        <Halftone />
      </div>
      <div className="wrap">
        <p className="hero__lede">{summary}</p>
      </div>
    </header>
  )
}
