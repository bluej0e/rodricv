import { skills, education, languages } from '../../lib/content'

export default function Stack() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <h2 className="section__title">Skills</h2>
        <dl className="stack">
          {skills.map((g) => (
            <div className="stack__row" key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <h2 className="section__title section__title--second">Education</h2>
        <dl className="stack">
          {education.map((e) => (
            <div className="stack__row" key={e.school}>
              <dt>{e.period}</dt>
              <dd>
                {e.degree}, {e.school}
              </dd>
            </div>
          ))}
        </dl>

        <h2 className="section__title section__title--second">Languages</h2>
        <p className="languages">{languages}</p>
      </div>
    </section>
  )
}
