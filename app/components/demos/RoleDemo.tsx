'use client'

import { useMemo, useState } from 'react'
import { pct } from './shared'

/* Campaign names are the only link between a sequencer campaign and a role:
   "(Recruiter) - Client - Role". Parse, group, and derive rates from raw counts. */

const SAMPLE = `(Marta) - Acme Robotics - Senior Backend Engineer | 412 | 19 | 8
(MARTA) - Acme Robotics - Senior Backend Engineer - copy | 198 | 7 | 3
(Luis) - Acme Robotics - Senior Backend Engineer | 305 | 12 | 22
(Priya) - Fernwood Health - Data Engineer | 520 | 31 | 9
(priya)- Fernwood Health -Data Engineer - copy - copy | 140 | 6 | 2
(Tomas) Bluefin Capital - Staff Platform Engineer | 260 | 9 | 4
(Tomas) - Staff DevOps | 180 | 5 | 3
(Ana) (to Marta) - Bluefin Capital - Tech Lead | 95 | 4 | 1
Q3 outreach test | 300 | 6 | 5
(Luis) - Kestrel Labs - ML Engineer | 610 | 44 | 41`

interface Line { name: string; sent: number; replies: number; bounces: number }
type Parsed =
  | { ok: true; line: Line; recruiter: string; client: string; role: string; copy: boolean }
  | { ok: false; line: Line; reason: string; rename?: string }

function parse(line: Line): Parsed {
  // Strip copy suffixes before splitting, or "copy" becomes part of the role title.
  let name = line.name.trim()
  let copy = false
  while (/\s*-\s*copy$/i.test(name)) { name = name.replace(/\s*-\s*copy$/i, ''); copy = true }

  const m = name.match(/^\(([^)]+)\)\s*(.*)$/)
  if (!m) return { ok: false, line, reason: 'no (Recruiter) prefix' }
  const recruiter = m[1].trim().toLowerCase()
  const rest = m[2]
  if (rest.startsWith('(')) return { ok: false, line, reason: 'extra parenthesised note after the prefix; would file the role under a client called "' + rest.split(/\s*-\s*/)[0] + '"' }
  if (!rest.startsWith('-')) {
    const parts = rest.split(/\s*-\s*/).filter(Boolean)
    // Pure punctuation fix: the delimiter after the prefix is missing.
    if (parts.length >= 2) return { ok: false, line, reason: 'missing " - " after the recruiter', rename: `(${m[1]}) - ${parts.join(' - ')}` }
    return { ok: false, line, reason: 'no client or role' }
  }
  const parts = rest.replace(/^-\s*/, '').split(/\s*-\s*/).filter(Boolean)
  if (parts.length < 2) return { ok: false, line, reason: 'no client in the name; not guessing one' }
  return { ok: true, line, recruiter, client: parts[0], role: parts.slice(1).join(' - '), copy }
}

function readLines(text: string): Line[] {
  return text.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const [name, sent, replies, bounces] = l.split('|').map((x) => x.trim())
    return { name, sent: Number(sent) || 0, replies: Number(replies) || 0, bounces: Number(bounces) || 0 }
  })
}

export default function RoleDemo() {
  const [text, setText] = useState(SAMPLE)
  const { roles, unattributed, coverage, total } = useMemo(() => {
    const parsed = readLines(text).map(parse)
    const byRole = new Map<string, { client: string; role: string; recruiters: Set<string>; campaigns: number; copies: number; sent: number; replies: number; bounces: number }>()
    for (const p of parsed) {
      if (!p.ok) continue
      const k = `${p.client.toLowerCase()}|${p.role.toLowerCase()}`
      const r = byRole.get(k) ?? { client: p.client, role: p.role, recruiters: new Set(), campaigns: 0, copies: 0, sent: 0, replies: 0, bounces: 0 }
      r.recruiters.add(p.recruiter); r.campaigns++; if (p.copy) r.copies++
      r.sent += p.line.sent; r.replies += p.line.replies; r.bounces += p.line.bounces
      byRole.set(k, r)
    }
    const total = parsed.reduce((s, p) => s + p.line.sent, 0)
    const attributed = parsed.filter((p) => p.ok).reduce((s, p) => s + p.line.sent, 0)
    return { roles: Array.from(byRole.values()), unattributed: parsed.filter((p): p is Extract<Parsed, { ok: false }> => !p.ok), coverage: total ? attributed / total : 0, total }
  }, [text])

  return (
    <div className="demo">
      <div className="role-grid">
        <label className="role-input">
          <span className="demo__h">Campaigns <span className="demo__sub">name | sent | replies | bounces</span></span>
          <textarea value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} rows={11} />
          <span className="demo__bar demo__bar--tight"><button className="btn" type="button" onClick={() => setText(SAMPLE)}>Reset</button></span>
        </label>

        <div>
          <div className="kpis">
            <div className="kpi"><span className="kpi__v">{pct(coverage)}</span><span className="kpi__l">of {total.toLocaleString()} sends attributed</span></div>
            <div className="kpi"><span className="kpi__v">{roles.length}</span><span className="kpi__l">roles</span></div>
          </div>
          <div className="tbl-scroll">
            <table className="tbl">
              <thead><tr><th>Role</th><th>Campaigns</th><th>Sent</th><th>Reply</th><th>Bounce</th></tr></thead>
              <tbody>
                {roles.map((r) => {
                  const bounce = r.sent ? r.bounces / r.sent : 0
                  return (
                    <tr key={r.client + r.role}>
                      <td><strong>{r.role}</strong><br /><span className="dim">{r.client} · {Array.from(r.recruiters).join(', ')}</span></td>
                      <td>{r.campaigns}{r.copies ? <span className="dim"> ({r.copies} copy)</span> : ''}</td>
                      <td>{r.sent}</td>
                      <td>{r.sent ? pct(r.replies / r.sent) : '—'}</td>
                      <td className={bounce > 0.05 ? 'bad' : ''}>{r.sent ? pct(bounce) : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {unattributed.length > 0 && (
        <>
          <h4 className="demo__h">Unattributed, with the reason</h4>
          <ul className="unattr">
            {unattributed.map((u, i) => (
              <li key={i}>
                <span className="mono">{u.line.name}</span>
                <span className="dim">{u.reason} · {u.line.sent} sends</span>
                {u.rename && (
                  <span className="unattr__fix">
                    rename → <span className="mono">{u.rename}</span>
                    <button className="btn btn--small" type="button" onClick={() => setText((t) => t.split('\n').map((l) => (l.split('|')[0].trim() === u.line.name ? l.replace(u.line.name, u.rename!) : l)).join('\n'))}>Apply rename</button>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="demo__hint">Rates are derived from summed counts. Only the bounce rate over the 5% deliverability line gets colour.</p>
    </div>
  )
}
