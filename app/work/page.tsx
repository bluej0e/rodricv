import type { Metadata } from 'next'
import SiteNav from '../components/SiteNav'
import Closing from '../components/Closing'
import { oneOffs, toolkit, tools, workIntro, type Tool } from '../../lib/work'

export const metadata: Metadata = {
  title: 'Work — Rodrigo Viola',
  description: 'Live demos of the RevOps tools I built: a campaign desk, an enrichment waterfall and an email-infrastructure control plane.',
}

function Shot({ t }: { t: Tool }) {
  return (
    <a className="shot" href={t.url} target="_blank" rel="noreferrer" aria-label={`Open the ${t.name} demo`}>
      <span className="shot__bar" aria-hidden="true">
        <i /><i /><i />
        <span className="shot__url">{t.url.replace('https://', '').replace(/\/.*$/, '')}</span>
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.shot} alt={t.shotAlt} loading="lazy" width={1600} height={1000} />
    </a>
  )
}

function ToolBlock({ t, n }: { t: Tool; n: number }) {
  return (
    <article className="tool" id={t.slug}>
      <div className="tool__text">
        <p className="eyebrow"><span className="eyebrow__n">{String(n).padStart(2, '0')}</span> {t.kicker}</p>
        <h3 className="tool__name">{t.name}</h3>
        <p className="tool__summary">{t.summary}</p>
        {t.points.length > 0 && (
          <ul className="ticks">
            {t.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}
        <p className="chips">{t.stack.map((s) => <span key={s}>{s}</span>)}</p>
        <a className="button" href={t.url} target="_blank" rel="noreferrer">Open the live demo <span aria-hidden="true">↗</span></a>
      </div>
      <Shot t={t} />
    </article>
  )
}

export default function Work() {
  return (
    <>
      <SiteNav current="work" />
      <main>
        <header className="hero hero--work">
          <div className="wrap wrap--wide">
            <p className="eyebrow">Selected work</p>
            <h1 className="hero__title">Tools that replace manual go-to-market work</h1>
            <p className="hero__lede">{workIntro}</p>
          </div>
        </header>

        <section className="section" aria-labelledby="toolkit">
          <div className="wrap wrap--wide">
            <div className="toolkit">
              <div>
                <p className="eyebrow">The system</p>
                <h2 className="toolkit__title" id="toolkit">{toolkit.name}</h2>
                <p className="toolkit__summary">{toolkit.summary}</p>
              </div>
              <div className="pipeline" aria-label="How the toolkit fits together">
                {toolkit.flow.map((step, i) => (
                  <span key={step} className="pipeline__step">
                    {i > 0 && <span className="pipeline__arrow" aria-hidden="true">↓</span>}
                    <span className={`pipeline__node ${step === 'Smartlead' ? 'is-vendor' : ''}`}>{step}</span>
                  </span>
                ))}
              </div>
              <a className="link-arrow" href={toolkit.url} target="_blank" rel="noreferrer">Open the toolkit launcher ↗</a>
            </div>
            <div className="tools">
              {tools.map((t, i) => <ToolBlock key={t.slug} t={t} n={i + 1} />)}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="also">
          <div className="wrap wrap--wide">
            <p className="eyebrow">One-off tools</p>
            <h2 className="section__heading" id="also">Also built</h2>
            <div className="minis">
              {oneOffs.map((t) => (
                <article className="mini" key={t.slug}>
                  <Shot t={t} />
                  <p className="eyebrow">{t.kicker}</p>
                  <h3 className="mini__name">{t.name}</h3>
                  <p className="mini__summary">{t.summary}</p>
                  <p className="chips">{t.stack.map((s) => <span key={s}>{s}</span>)}</p>
                  <a className="link-arrow" href={t.url} target="_blank" rel="noreferrer">Open the live demo ↗</a>
                </article>
              ))}
            </div>
            <p className="fineprint">
              Every demo runs on sample data. Company names, people, domains and numbers are fictional, and
              outside services (sequencers, data providers, AI models) are switched off.
            </p>
          </div>
        </section>
      </main>
      <Closing />
    </>
  )
}
