import { experience } from '../../lib/content'
import Section from './Section'

export default function Experience() {
  return (
    <Section n="01" title="Experience" id="experience">
      <ol className="jobs">
        {experience.map((job) => (
          <li className="job" key={job.company}>
            <p className="job__when">{job.period} · {job.place}</p>
            <h3 className="job__role">{job.role}, <span className="job__company">{job.company}</span></h3>
            <p className="job__description">{job.description}</p>
            <ul className="ticks">
              {job.work.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
