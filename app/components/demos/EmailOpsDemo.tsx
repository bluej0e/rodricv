'use client'

import { useMemo, useState } from 'react'

/* A registry of domains joined across a mailbox provider and a sequencer,
   reconciled, with a computed "Ready to send" verdict and a guarded DNS fix. */

interface Mailbox { email: string; provisioned: boolean; inSender: boolean; smtpOk: boolean; warmup: number; fromName: boolean; signature: boolean }
interface Domain { domain: string; brand: string; spf: boolean; dkim: boolean; dmarc: boolean; mailboxes: Mailbox[] }

const BRANDS = ['RodCorp', 'RodCorp Legal', 'RodCorp Talent']
const PREFIX = ['try', 'get', 'hello', 'meet', 'team', 'go']

function seedDomains(): Domain[] {
  const out: Domain[] = []
  BRANDS.forEach((brand, b) => {
    PREFIX.forEach((pre, i) => {
      const domain = `${pre}${brand.toLowerCase().replace(/ /g, '')}.example`
      const k = b * 6 + i
      const mailboxes: Mailbox[] = ['alex', 'sam', 'jordan'].map((u, j) => ({
        email: `${u}@${domain}`,
        provisioned: !(k === 7 && j === 2),       // sending with no known source
        inSender: !(k === 4 || k === 13),          // paid for, never loaded into a sender
        smtpOk: !(k === 10 && j === 0),            // broken connection
        warmup: k === 16 ? 71 + j * 4 : 92 + ((k + j) % 7),
        fromName: true,
        signature: !(k === 2 && j === 1),
      }))
      out.push({ domain, brand, spf: k !== 15, dkim: k !== 8, dmarc: !(k === 1 || k === 11), mailboxes })
    })
  })
  return out
}

interface Check { label: string; ok: boolean; detail: string }

function readiness(d: Domain): Check[] {
  const inSender = d.mailboxes.filter((m) => m.inSender)
  const all = (f: (m: Mailbox) => boolean) => inSender.length > 0 && inSender.every(f)
  const bad = (f: (m: Mailbox) => boolean) => inSender.filter((m) => !f(m)).map((m) => m.email.split('@')[0])
  return [
    { label: 'Loaded into sender', ok: inSender.length > 0, detail: inSender.length ? `${inSender.length} of ${d.mailboxes.length} mailboxes` : 'not in any sender yet' },
    { label: 'SMTP/IMAP connected', ok: all((m) => m.smtpOk), detail: bad((m) => m.smtpOk).length ? `connection error: ${bad((m) => m.smtpOk).join(', ')}` : 'all connected' },
    { label: 'Warmed up', ok: all((m) => m.warmup >= 90), detail: `reputation ≥ 90%; lowest ${Math.min(...d.mailboxes.map((m) => m.warmup))}%` },
    { label: 'Sender name set', ok: all((m) => m.fromName), detail: 'on every mailbox' },
    { label: 'Signature set', ok: all((m) => m.signature), detail: bad((m) => m.signature).length ? `missing: ${bad((m) => m.signature).join(', ')}` : 'on every mailbox' },
    { label: 'Auth passing (SPF/DKIM/DMARC)', ok: d.spf && d.dkim && d.dmarc, detail: [!d.spf && 'SPF missing', !d.dkim && 'DKIM missing', !d.dmarc && 'DMARC missing'].filter(Boolean).join(', ') || 'all three pass' },
  ]
}

type Gap = 'ready' | 'not-sending' | 'no-source' | 'broken' | 'auth'
const GAPS: { key: Gap; label: string; tone: string; test: (d: Domain) => boolean }[] = [
  { key: 'ready', label: 'Ready to send', tone: 'ok', test: (d) => readiness(d).every((c) => c.ok) },
  { key: 'not-sending', label: 'Provisioned, not sending', tone: 'warn', test: (d) => d.mailboxes.some((m) => m.provisioned && !m.inSender) },
  { key: 'no-source', label: 'Sending, no source', tone: 'bad', test: (d) => d.mailboxes.some((m) => m.inSender && !m.provisioned) },
  { key: 'broken', label: 'Broken connection', tone: 'bad', test: (d) => d.mailboxes.some((m) => m.inSender && !m.smtpOk) },
  { key: 'auth', label: 'Auth failing', tone: 'bad', test: (d) => !(d.spf && d.dkim && d.dmarc) },
]

/** What only the cross-vendor join can see, per mailbox. Readiness is about the domain; these are about the inventory. */
function gapsFor(d: Domain): string[] {
  return d.mailboxes.flatMap((m) => [
    m.provisioned && !m.inSender ? `${m.email}: paid for, not loaded into a sender` : null,
    m.inSender && !m.provisioned ? `${m.email}: sending, but no mailbox provider has it` : null,
    m.inSender && !m.smtpOk ? `${m.email}: SMTP connection failing` : null,
  ]).filter((x): x is string => x !== null)
}

function fixFor(d: Domain): { name: string; value: string; field: 'spf' | 'dkim' | 'dmarc' } | null {
  if (!d.dmarc) return { field: 'dmarc', name: `_dmarc.${d.domain}`, value: 'v=DMARC1; p=none; rua=mailto:dmarc@reports.example; adkim=r; aspf=r' }
  if (!d.spf) return { field: 'spf', name: d.domain, value: 'v=spf1 include:_spf.mailhost.example ~all' }
  if (!d.dkim) return { field: 'dkim', name: `mh1._domainkey.${d.domain}`, value: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqh…(public key from the mailbox provider)' }
  return null
}

export default function EmailOpsDemo() {
  const [domains, setDomains] = useState(seedDomains)
  const [filter, setFilter] = useState<Gap | null>(null)
  const [selected, setSelected] = useState<string | null>('hellorodcorp.example')
  const [preview, setPreview] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const counts = useMemo(() => GAPS.map((g) => ({ ...g, n: domains.filter(g.test).length })), [domains])
  const shown = filter ? domains.filter(GAPS.find((g) => g.key === filter)!.test) : domains
  const sel = domains.find((d) => d.domain === selected) ?? null
  const checks = sel ? readiness(sel) : []
  const fix = sel ? fixFor(sel) : null

  const approve = () => {
    if (!sel || !fix) return
    setDomains((ds) => ds.map((d) => (d.domain === sel.domain ? { ...d, [fix.field]: true } : d)))
    setLog((l) => [`Created TXT ${fix.name} · re-ran health for ${sel.domain}`, ...l].slice(0, 4))
    setPreview(false)
  }
  const reset = () => { setDomains(seedDomains()); setLog([]); setPreview(false); setFilter(null) }

  return (
    <div className="demo">
      <div className="gaps" role="group" aria-label="Reconciliation">
        {counts.map((g) => (
          <button key={g.key} className={`gap gap--${g.tone} ${filter === g.key ? 'is-on' : ''}`} aria-pressed={filter === g.key} onClick={() => setFilter(filter === g.key ? null : g.key)}>
            <span className="gap__n">{g.n}</span>
            <span className="gap__l">{g.label}</span>
          </button>
        ))}
      </div>

      <div className="eo-grid">
        <div className="tbl-scroll eo-table">
          <table className="tbl tbl--rows">
            <thead><tr><th>Domain</th><th className="hide-sm">Brand</th><th className="hide-sm">Mailboxes</th><th className="hide-sm">Auth</th><th>Verdict</th></tr></thead>
            <tbody>
              {shown.map((d) => {
                const c = readiness(d)
                const ready = c.every((x) => x.ok)
                const missing = c.filter((x) => !x.ok).length
                return (
                  <tr key={d.domain} className={selected === d.domain ? 'is-open' : ''} onClick={() => { setSelected(d.domain); setPreview(false) }} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(d.domain)}>
                    <td className="mono">{d.domain}</td>
                    <td className="hide-sm nowrap">{d.brand}</td>
                    <td className="hide-sm">{d.mailboxes.filter((m) => m.inSender).length}/{d.mailboxes.length} in sender</td>
                    <td className="mono nowrap hide-sm">{['SPF', 'DKIM', 'DMARC'].map((k, i) => <span key={k} className={[d.spf, d.dkim, d.dmarc][i] ? 'dim' : 'bad'}>{i ? ' ' : ''}{k}</span>)}</td>
                    <td><span className={`status status--${ready ? 'ok' : 'bad'}`}>{ready ? 'Ready' : `${missing} missing`}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <aside className="eo-panel" aria-live="polite">
          {sel ? (
            <>
              <p className="eo-panel__title mono">{sel.domain}</p>
              <p className={`status status--${checks.every((c) => c.ok) ? 'ok' : 'bad'}`}>{checks.every((c) => c.ok) ? 'Ready to send' : 'Not ready'}</p>
              <ul className="checks">
                {checks.map((c) => (
                  <li key={c.label} className={c.ok ? 'is-ok' : 'is-bad'}>
                    <span className="checks__mark" aria-hidden="true">{c.ok ? '✓' : '✕'}</span>
                    <span><span className="checks__label">{c.label}</span><span className="checks__detail">{c.detail}</span></span>
                  </li>
                ))}
              </ul>
              {gapsFor(sel).length > 0 && (
                <div className="recon">
                  <p className="recon__h">Reconciliation</p>
                  <ul>{gapsFor(sel).map((g) => <li key={g}>{g}</li>)}</ul>
                </div>
              )}
              {fix && !preview && <button className="btn btn--primary" onClick={() => setPreview(true)}>Preview DNS fix</button>}
              {fix && preview && (
                <div className="dnsfix">
                  <p className="dnsfix__h">Cloudflare change, not yet applied</p>
                  <pre className="dnsfix__rec"><span className="add">+ TXT</span> {fix.name}{'\n'}  &quot;{fix.value}&quot;</pre>
                  <div className="demo__bar demo__bar--tight">
                    <button className="btn btn--primary" onClick={approve}>Approve and apply</button>
                    <button className="btn" onClick={() => setPreview(false)}>Cancel</button>
                  </div>
                </div>
              )}
              {!fix && !checks.every((c) => c.ok) && <p className="demo__hint">Nothing here is a DNS problem. These are fixed in the mailbox provider or the sender, so the app links out instead of offering a button.</p>}
            </>
          ) : <p className="demo__hint">Pick a domain.</p>}
          {log.length > 0 && (
            <ul className="eo-log">{log.map((l, i) => <li key={i} className="mono">{l}</li>)}</ul>
          )}
        </aside>
      </div>
      <div className="demo__bar"><button className="btn" onClick={reset}>Reset</button></div>
    </div>
  )
}
