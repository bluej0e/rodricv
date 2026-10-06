import { skills, education, languages } from '../../lib/content'
import Section from './Section'

export default function Stack() {
  return (
    <>
      <Section n="03" title="Skills" id="skills">
        <dl className="rows">
          {skills.map((g) => (
            <div className="row" key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section n="04" title="Education and languages" id="education">
        <dl className="rows">
          {education.map((e) => (
            <div className="row" key={e.school}>
              <dt>{e.period}</dt>
              <dd>{e.degree}, {e.school}</dd>
            </div>
          ))}
          <div className="row">
            <dt>Languages</dt>
            <dd>{languages}</dd>
          </div>
        </dl>
      </Section>
    </>
  )
}
