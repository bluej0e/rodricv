import { experience } from '../../lib/content'

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <h2 className="section__title">Where</h2>
        <ol className="jobs">
          {experience.map((job) => (
            <li className="job" key={job.company}>
              <div className="job__when">
                <span className="job__period">{job.period}</span>
                <span className="job__place">{job.place}</span>
              </div>
              <div className="job__what">
                <h3 className="job__role">{job.role}</h3>
                <p className="job__company">{job.company}</p>
                <p className="job__description">{job.description}</p>
                {job.work.length > 0 && (
                  <ul className="job__work">
                    {job.work.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
