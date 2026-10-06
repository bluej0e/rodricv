export default function Section({ n, title, id, children, aside }: { n: string; title: string; id: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <div className="section__head">
          <h2 className="section__title" id={`${id}-h`}><span className="section__n">§ {n}</span> {title}</h2>
          {aside}
        </div>
        {children}
      </div>
    </section>
  )
}
