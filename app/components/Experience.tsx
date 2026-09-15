import { experience, pipelineLine } from '../../lib/content'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <h2 className="section__title">Experience</h2>
        <ol className="jobs">
          {experience.map((job) => (
            <li className="job" key={job.company}>
              <div className="job__head">
                <h3 className="job__role">
                  {job.role} <span className="job__at">—</span>{' '}
                  <span className="job__company">{job.company}</span>
                </h3>
                <p className="job__when">
                  {job.period} · {job.place}
                </p>
              </div>
              <p className="job__description">{job.description}</p>
              {job.showPipeline && <p className="job__pipeline">{pipelineLine}</p>}
              <ul className="job__work">
                {job.work.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
