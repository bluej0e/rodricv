'use client'

import { Fragment, useMemo, useState } from 'react'
import { pct, unit, usd } from './shared'

/* A personal-email waterfall: cache → caller email → paid providers in order.
   First accepted answer wins; every attempt is logged with what it cost. */

type Billing = 'credit' | 'flat'
interface Provider { slug: string; name: string; price: number; billing: Billing; hitRate: number; workShare: number }

const PROVIDERS: Provider[] = [
  { slug: 'quarry', name: 'Quarry', price: 0.0075, billing: 'credit', hitRate: 0.38, workShare: 0.45 },
  { slug: 'ledger', name: 'Ledger', price: 0.085, billing: 'credit', hitRate: 0.42, workShare: 0 },
  { slug: 'beacon', name: 'Beacon', price: 0.04, billing: 'credit', hitRate: 0.3, workShare: 0.1 },
  { slug: 'meridian', name: 'Meridian', price: 0, billing: 'flat', hitRate: 0.45, workShare: 0 },
]

const FIRST = ['Ana', 'Ben', 'Carla', 'Dev', 'Elena', 'Femi', 'Grace', 'Hugo', 'Ines', 'Jon', 'Kira', 'Leo', 'Maya', 'Nico', 'Olga', 'Pablo', 'Quinn', 'Rosa', 'Sam', 'Tara', 'Uma', 'Vik', 'Wren', 'Yara']
const LAST = ['Lind', 'Okafor', 'Reyes', 'Patel', 'Novak', 'Adeyemi', 'Hart', 'Moreau', 'Silva', 'Berg', 'Tanaka', 'Rossi', 'Cohen', 'Duarte', 'Ivanova', 'Ruiz', 'Shaw', 'Lopez', 'Keane', 'Nair', 'Osei', 'Kumar', 'Ellis', 'Haddad']

interface Person { name: string; url: string; key: string; company: string; callerEmail: string | null }

const PEOPLE: Person[] = FIRST.map((f, i) => {
  const l = LAST[i]
  const slug = `${f}-${l}`.toLowerCase()
  // The way URLs really arrive: protocol, www and trailing slash all vary.
  const forms = [`https://www.linkedin.com/in/${slug}/`, `http://linkedin.com/in/${slug}`, `https://linkedin.com/in/${slug}/`, `http://www.linkedin.com/in/${slug}`]
  const company = ['northwind', 'lumenlabs', 'harborai', 'quillstack'][i % 4]
  const callerEmail = i % 7 === 2 ? `${f.toLowerCase()}.${l.toLowerCase()}@gmail.example` : i % 7 === 5 ? `${f.toLowerCase()}@${company}.example` : null
  return { name: `${f} ${l}`, url: forms[i % 4], key: `/in/${slug}`, company, callerEmail }
})

// Already in the cache before the first run, stored under whatever URL form they first arrived with.
const SEEDED_CACHE: Record<string, { email: string; stored: string }> = Object.fromEntries(
  [3, 8, 11, 16, 20].map((i) => {
    const p = PEOPLE[i]
    const [f, l] = p.name.toLowerCase().split(' ')
    return [p.key, { email: `${f}${l[0]}@outlook.example`, stored: p.url.replace('https://', 'http://').replace(/\/$/, '') + '/' }]
  }),
)

const normalise = (url: string) => {
  const m = url.toLowerCase().match(/linkedin\.com(\/in\/[^/?#]+)/)
  return m ? m[1] : url
}

type Outcome = 'hit' | 'miss' | 'rejected' | 'skipped'
interface Attempt { step: string; outcome: Outcome; cost: number; note?: string }
interface Row { person: Person; answer: string | null; source: string; cost: number; attempts: Attempt[] }

interface CacheEntry { email: string | null; stored: string }

function enrich(p: Person, cache: Map<string, CacheEntry>, normalised: boolean): Row {
  const attempts: Attempt[] = []
  const lookupKey = normalised ? p.key : p.url
  const cached = normalised
    ? cache.get(p.key)
    : Array.from(cache.values()).find((c) => c.stored === p.url)
  if (cached) {
    attempts.push({ step: 'cache', outcome: cached.email ? 'hit' : 'miss', cost: 0, note: cached.email ? undefined : 'known not-found, inside retry window' })
    return { person: p, answer: cached.email, source: cached.email ? 'cache' : 'cache (negative)', cost: 0, attempts }
  }
  attempts.push({ step: 'cache', outcome: 'miss', cost: 0, note: normalised ? undefined : `no row stored as "${lookupKey}"` })

  if (p.callerEmail) {
    const domain = p.callerEmail.split('@')[1]
    if (/^(gmail|outlook|yahoo|icloud)\./.test(domain)) {
      attempts.push({ step: 'caller email', outcome: 'hit', cost: 0, note: 'consumer mailbox' })
      return done(p, cache, p.callerEmail, 'caller email', attempts, lookupKey)
    }
    attempts.push({ step: 'caller email', outcome: 'rejected', cost: 0, note: 'matches company domain' })
  }

  for (const pr of PROVIDERS) {
    const r = unit(`${p.key}:${pr.slug}`)
    if (r < pr.hitRate) {
      const [f, l] = p.name.toLowerCase().split(' ')
      const isWork = unit(`${p.key}:${pr.slug}:type`) < pr.workShare
      if (isWork) {
        // Charged on a hit, so a work address we throw away still cost money.
        attempts.push({ step: pr.name, outcome: 'rejected', cost: pr.price, note: `${f}@${p.company}.example is a work address` })
        continue
      }
      const email = `${f}.${l}${Math.floor(r * 90 + 10)}@${['gmail', 'proton', 'outlook'][Math.floor(r * 3)]}.example`
      attempts.push({ step: pr.name, outcome: 'hit', cost: pr.price })
      PROVIDERS.slice(PROVIDERS.indexOf(pr) + 1).forEach((rest) => attempts.push({ step: rest.name, outcome: 'skipped', cost: 0 }))
      return done(p, cache, email, pr.name, attempts, lookupKey)
    }
    attempts.push({ step: pr.name, outcome: 'miss', cost: 0 })
  }
  cache.set(normalised ? p.key : p.url, { email: null, stored: p.url })
  return { person: p, answer: null, source: 'not found', cost: sum(attempts), attempts }
}

function done(p: Person, cache: Map<string, CacheEntry>, email: string, source: string, attempts: Attempt[], key: string): Row {
  cache.set(key, { email, stored: p.url })
  return { person: p, answer: email, source, cost: sum(attempts), attempts }
}

const sum = (a: Attempt[]) => a.reduce((s, x) => s + x.cost, 0)

const freshCache = () => new Map<string, CacheEntry>(Object.entries(SEEDED_CACHE).map(([k, v]) => [k, { email: v.email, stored: v.stored }]))

export default function EnrichmentDemo() {
  const [normalised, setNormalised] = useState(true)
  const [cache, setCache] = useState(freshCache)
  const [runs, setRuns] = useState<Row[][]>([])
  const [open, setOpen] = useState<string | null>(null)

  const run = () => {
    const next = new Map(cache)
    const rows = PEOPLE.map((p) => enrich(p, next, normalised))
    setCache(next)
    setRuns((r) => [...r, rows])
  }
  const reset = () => { setCache(freshCache()); setRuns([]); setOpen(null) }

  const last = runs[runs.length - 1]
  const board = useMemo(() => {
    if (!last) return []
    return ['cache', 'caller email', ...PROVIDERS.map((p) => p.name)].map((step) => {
      const a = last.flatMap((r) => r.attempts.filter((x) => x.step === step && x.outcome !== 'skipped'))
      const hits = a.filter((x) => x.outcome === 'hit').length
      const spend = a.reduce((s, x) => s + x.cost, 0)
      const pr = PROVIDERS.find((p) => p.name === step)
      return { step, tries: a.length, hits, rejected: a.filter((x) => x.outcome === 'rejected').length, spend, pr }
    })
  }, [last])

  const total = last ? last.reduce((s, r) => s + r.cost, 0) : 0
  const found = last ? last.filter((r) => r.answer).length : 0

  return (
    <div className="demo">
      <div className="demo__bar">
        <button className="btn btn--primary" onClick={run}>{runs.length === 0 ? 'Run the batch' : 'Run it again'}</button>
        <button className="btn" onClick={reset} disabled={runs.length === 0}>Reset</button>
        <label className="toggle">
          <input type="checkbox" checked={normalised} onChange={(e) => setNormalised(e.target.checked)} />
          Normalise LinkedIn URLs before the cache lookup
        </label>
      </div>

      {runs.length > 0 && (
        <div className="kpis">
          <div className="kpi"><span className="kpi__v">{found}/{PEOPLE.length}</span><span className="kpi__l">found, run {runs.length}</span></div>
          <div className="kpi"><span className="kpi__v">{usd(total)}</span><span className="kpi__l">this run cost</span></div>
          <div className="kpi"><span className="kpi__v">{found ? usd(total / found, 3) : '—'}</span><span className="kpi__l">cost per answer</span></div>
          {runs.length > 1 && (
            <div className="kpi"><span className="kpi__v">{runs.map((r) => usd(r.reduce((s, x) => s + x.cost, 0))).join(' → ')}</span><span className="kpi__l">every run so far</span></div>
          )}
        </div>
      )}

      {runs.length === 0 && (
        <p className="demo__hint">
          24 people, 5 already in the cache under older URL forms. Providers in order:{' '}
          {PROVIDERS.map((p) => `${p.name} (${p.billing === 'flat' ? 'flat fee, $0 marginal' : usd(p.price, p.price < 0.01 ? 4 : 3) + ' per hit'})`).join(', ')}.
        </p>
      )}

      {last && (
        <>
          <h4 className="demo__h">Provider scoreboard, this run</h4>
          <div className="tbl-scroll">
            <table className="tbl">
              <thead><tr><th>Step</th><th>Tried</th><th>Hits</th><th>Rejected</th><th>Hit rate</th><th>Spend</th><th>Per answer</th></tr></thead>
              <tbody>
                {board.map((b) => (
                  <tr key={b.step}>
                    <td>{b.step}</td>
                    <td>{b.tries}</td>
                    <td>{b.hits}</td>
                    <td>{b.rejected || ''}</td>
                    <td>{b.tries ? pct(b.hits / b.tries, 0) : '—'}</td>
                    <td>{b.pr ? usd(b.spend, 3) : 'free'}</td>
                    <td>{!b.hits ? '—' : !b.pr ? 'free' : b.pr.billing === 'flat' ? '$0 (flat fee)' : usd(b.spend / b.hits, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="demo__h">People <span className="demo__sub">click a row for its attempt log</span></h4>
          <div className="tbl-scroll">
            <table className="tbl tbl--rows">
              <thead><tr><th>Person</th><th>URL as received</th><th>Answer</th><th>From</th><th>Cost</th></tr></thead>
              <tbody>
                {last.map((r) => (
                  <Fragment key={r.person.key}>
                    <tr onClick={() => setOpen(open === r.person.key ? null : r.person.key)} className={open === r.person.key ? 'is-open' : ''} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(open === r.person.key ? null : r.person.key)}>
                      <td>{r.person.name}</td>
                      <td className="mono dim">{r.person.url.replace(/^https?:\/\//, '')}</td>
                      <td className="mono">{r.answer ?? <span className="dim">—</span>}</td>
                      <td>{r.source}</td>
                      <td>{r.cost ? usd(r.cost, 3) : '$0'}</td>
                    </tr>
                    {open === r.person.key && (
                      <tr className="tbl__detail">
                        <td colSpan={5}>
                          <ol className="attempts">
                            {r.attempts.map((a, i) => (
                              <li key={i} className={`attempt attempt--${a.outcome}`}>
                                <span>{a.step}</span><span className="attempt__o">{a.outcome}</span>
                                <span>{a.cost ? usd(a.cost, 4) : ''}</span>
                                <span className="dim">{a.note}</span>
                              </li>
                            ))}
                          </ol>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
