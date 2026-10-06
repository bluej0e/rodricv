import Link from 'next/link'
import { oneOffs, tools } from '../../lib/work'
import Section from './Section'

/** The tools from /work, short enough for the CV, with the demo URL printed so it survives the PDF. */
export default function Systems() {
  const all = [...tools, ...oneOffs]
  return (
    <Section n="02" title="Selected work" id="work" aside={<Link href="/work/" className="link-arrow">All work →</Link>}>
      <p className="note">Live demos of tools I built, running on sample data.</p>
      <ul className="works">
        {all.map((t) => (
          <li className="works__item" key={t.slug}>
            <p className="works__name">{t.name} <span className="works__kicker">{t.kicker}</span></p>
            <p className="works__line">{t.summary.split('. ')[0]}.</p>
            <a className="works__url" href={t.url} target="_blank" rel="noreferrer">{t.url.replace('https://', '').replace(/\/.*$/, '')}</a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
