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
      <Section n="04" title="Education" id="education">
        <dl className="rows">
          {education.map((e) => (
            <div className="row" key={e.school}>
              <dt>{e.period}</dt>
              <dd>{e.degree}, {e.school}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section n="05" title="Languages" id="languages">
        <p className="plain">{languages}</p>
      </Section>
    </>
  )
}
