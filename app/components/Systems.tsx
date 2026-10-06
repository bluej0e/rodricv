import Link from 'next/link'
import { systems } from '../../lib/content'
import { tools } from '../../lib/work'
import Section from './Section'

export default function Systems() {
  return (
    <Section n="02" title="Selected systems" id="systems" aside={<Link href="/work/" className="link-arrow">See them live →</Link>}>
      <ul className="systems">
        {systems.map((s) => {
          const tool = tools.find((t) => t.slug === s.slug)
          return (
            <li className="system" key={s.title}>
              <h3 className="system__title">{s.title}</h3>
              <p className="system__summary">{s.summary}</p>
              {tool && <a className="system__more" href={tool.url} target="_blank" rel="noreferrer">{tool.name} demo ↗</a>}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
