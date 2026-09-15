import { systems } from '../../lib/content'

export default function Systems() {
  return (
    <section className="section" id="systems">
      <div className="wrap">
        <h2 className="section__title">What I build</h2>
        <div className="systems">
          {systems.map((s) => (
            <article className="system" key={s.title}>
              <h3 className="system__title">{s.title}</h3>
              <p className="system__summary">{s.summary}</p>
              <dl className="spec">
                {s.detail.map(([label, value]) => (
                  <div className="spec__row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
