import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteNav from '../../components/SiteNav'
import Flow from '../../components/work/Flow'
import Closing from '../../components/Closing'
import Demo from '../../components/demos/Demo'
import { getProject, projects } from '../../../lib/work'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug)
  return p ? { title: `${p.title} — Rodrigo Viola`, description: `${p.tagline}. ${p.card}` } : {}
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug)
  if (!p) notFound()
  const i = projects.indexOf(p)
  const next = projects[(i + 1) % projects.length]

  return (
    <>
      <SiteNav current="work" />
      <main>
        <header className="cvhead">
          <div className="wrap">
            <p className="case__back"><Link href="/work/">← All work</Link><span className="tag">{p.tier === 'flagship' ? 'flagship' : 'supporting'} · {String(i + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}</span></p>
            <h1 className="cvhead__name">{p.title}</h1>
            <p className="cvhead__role">{p.tagline}</p>
            <p className="case__meta">{p.period}<span className="sep" aria-hidden="true">·</span>{p.stack.join(', ')}</p>
          </div>
        </header>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">The problem</h2>
            {p.problem.map((para) => <p className="case__p" key={para}>{para}</p>)}
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">How it works</h2>
            <p className="case__p">{p.how}</p>
            <Flow lanes={p.flow} label={`${p.title} architecture`} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">Try it</h2>
            <p className="case__p">{p.demoIntro}</p>
            <dl className="guide">
              <div><dt>What you see</dt><dd>{p.demoGuide.look}</dd></div>
              <div><dt>Try this</dt><dd>{p.demoGuide.try}</dd></div>
              <div><dt>What it shows</dt><dd>{p.demoGuide.shows}</dd></div>
            </dl>
            <p className="demo__notice"><span className="tag">sample data</span> Runs in your browser. People, domains, vendors and numbers are fictional.</p>
          </div>
          <div className="wrap wrap--wide">
            <Demo which={p.slug} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">Design decisions</h2>
            <ol className="decisions">
              {p.decisions.map((d) => (
                <li className="decision" key={d.title}>
                  <h3 className="decision__title">{d.title}</h3>
                  <p className="decision__body">{d.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">What it changed</h2>
            <ul className="job__work">
              {p.outcomes.map((o) => <li key={o}>{o}</li>)}
            </ul>
            <p className="case__next">
              Next: <Link href={`/work/${next.slug}/`}>{next.title}</Link> — {next.tagline.toLowerCase()}
            </p>
          </div>
        </section>
      </main>
      <Closing />
    </>
  )
}
