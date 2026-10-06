import Link from 'next/link'
import { systems } from '../../lib/content'

export default function Systems() {
  return (
    <section className="section" id="systems">
      <div className="wrap">
        <h2 className="section__title">Selected systems <Link href="/work/" className="section__aside">all work →</Link></h2>
        <ul className="systems">
          {systems.map((s) => (
            <li className="system" key={s.title}>
              <h3 className="system__title">{s.title}</h3>
              <p className="system__summary">{s.summary}</p>
              <p className="system__more"><Link href={`/work/${s.slug}/`}>Case study and live demo →</Link></p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
