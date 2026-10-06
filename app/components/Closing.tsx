import { profile } from '../../lib/content'

export default function Closing() {
  return (
    <footer className="closing" id="contact">
      <div className="wrap">
        <p className="eyebrow eyebrow--light">Get in touch</p>
        <p className="closing__line">Looking for GTM engineering, revenue operations and forward-deployed roles. Remote.</p>
        <a className="closing__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <p className="closing__meta">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href="/work/">Work</a>
        </p>
      </div>
    </footer>
  )
}
