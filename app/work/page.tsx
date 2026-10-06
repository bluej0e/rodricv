import type { Metadata } from 'next'
import Link from 'next/link'
import SiteNav from '../components/SiteNav'
import Flow from '../components/work/Flow'
import Closing from '../components/Closing'
import { engine, projects, workIntro } from '../../lib/work'

export const metadata: Metadata = {
  title: 'Work — Rodrigo Viola',
  description: 'GTM systems I built: an enrichment waterfall, an agentic campaign desk and an email-infrastructure control plane, each rebuilt as a live demo.',
}

function Card({ p }: { p: (typeof projects)[number] }) {
  return (
    <li className="wcard">
      <Link href={`/work/${p.slug}/`} className="wcard__link">
        <span className="wcard__head">
          <span className="wcard__title">{p.title}</span>
          <span className="wcard__when">{p.period}</span>
        </span>
        <span className="wcard__tag">{p.tagline}</span>
        <span className="wcard__body">{p.card}</span>
        <span className="wcard__cta">Case study and live demo →</span>
      </Link>
    </li>
  )
}

export default function WorkIndex() {
  const flagship = projects.filter((p) => p.tier === 'flagship')
  const supporting = projects.filter((p) => p.tier === 'supporting')
  return (
    <>
      <SiteNav current="work" />
      <main>
        <header className="cvhead">
          <div className="wrap">
            <h1 className="cvhead__name">Work</h1>
            <p className="cvhead__role">Systems that replace manual go-to-market work</p>
            <p className="cvhead__summary work__intro">{workIntro}</p>
          </div>
        </header>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">One engine, three services</h2>
            <p className="work__lede">
              The three flagship tools are one outbound system. Enrichment finds the person, the campaign desk decides
              who to reach and what to say, and email ops makes sure the mail arrives.
            </p>
            <Flow lanes={engine} label="Enrichment Ops feeds Campaign Desk, which sends through Email Ops" />
            <ul className="wcards">
              {flagship.map((p) => <Card p={p} key={p.slug} />)}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section__title">Supporting tools</h2>
            <ul className="wcards">
              {supporting.map((p) => <Card p={p} key={p.slug} />)}
            </ul>
          </div>
        </section>
      </main>
      <Closing />
    </>
  )
}
