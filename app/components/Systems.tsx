import { systems } from '../../lib/content'

export default function Systems() {
  return (
    <section className="section" id="systems">
      <div className="wrap">
        <h2 className="section__title">Selected systems</h2>
        <ul className="systems">
          {systems.map((s) => (
            <li className="system" key={s.title}>
              <h3 className="system__title">{s.title}</h3>
              <p className="system__summary">{s.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
