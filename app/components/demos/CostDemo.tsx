'use client'

import { useState } from 'react'
import { usd } from './shared'

/* Credit-only vendors expose a balance, not usage. Consumption is the
   difference between daily snapshots, and a purchase has to be recognised. */

const SNAPSHOTS = [4200, 3985, 3760, 3602, 3390, 3175, 2960, 7710, 7488, 7301, 7090, 6866, 6640, 6431]
const TOPUP = 5000

function usage(detect: boolean) {
  return SNAPSHOTS.slice(1).map((b, i) => {
    const prev = SNAPSHOTS[i]
    const diff = prev - b
    if (diff >= 0) return { day: i + 2, used: diff, note: '' }
    // Balance went up: someone bought credits. Usage that day is the purchase minus the rise.
    return detect ? { day: i + 2, used: TOPUP - (b - prev), note: `top-up of ${TOPUP.toLocaleString()} detected` } : { day: i + 2, used: diff, note: 'negative usage' }
  })
}

const VENDORS = [
  { name: 'LLM provider A', model: 'tokens', api: 1184.2, invoice: 1201.0 },
  { name: 'LLM provider B', model: 'tokens', api: 642.75, invoice: 655.1 },
  { name: 'Enrichment vendor', model: 'credits', api: 912.0, invoice: 1146.0 },
  { name: 'Email finder', model: 'credits', api: 233.4, invoice: 236.0 },
  { name: 'Verifier', model: 'credits', api: 88.1, invoice: 88.1 },
  { name: 'Automation platform', model: 'executions', api: 49.0, invoice: 49.0 },
  { name: 'CRM', model: 'flat fee', api: 970.0, invoice: 970.0 },
]

export default function CostDemo() {
  const [detect, setDetect] = useState(true)
  const rows = usage(detect)
  const max = Math.max(...rows.map((r) => Math.abs(r.used)))
  const total = rows.reduce((s, r) => s + r.used, 0)

  return (
    <div className="demo">
      <div className="demo__bar">
        <label className="toggle">
          <input type="checkbox" checked={detect} onChange={(e) => setDetect(e.target.checked)} />
          Detect top-ups
        </label>
        <span className="demo__sub">13 days of credits used: <strong className={total < 0 ? 'bad' : ''}>{total.toLocaleString()}</strong></span>
      </div>

      <div className="bars" role="img" aria-label="Daily credit consumption">
        {rows.map((r) => (
          <div className="bars__col" key={r.day} title={`Day ${r.day}: ${r.used} credits${r.note ? ` (${r.note})` : ''}`}>
            <span className="bars__v">{r.used}</span>
            <span className="bars__track">
              <span className={`bars__bar ${r.used < 0 ? 'is-neg' : r.note ? 'is-flag' : ''}`} style={{ height: `${(Math.abs(r.used) / max) * 100}%` }} />
            </span>
            <span className="bars__d">d{r.day}</span>
          </div>
        ))}
      </div>
      <p className="demo__hint">
        {detect
          ? 'Day 8 the balance rose by 4,750. With a 5,000 credit purchase recognised, that day used 250, in line with the rest.'
          : 'Without detection, day 8 reads as −4,750 credits used and wipes out a week of real spend in the monthly total.'}
      </p>

      <h4 className="demo__h">Last month, reconciled against invoices <span className="demo__sub">drift over 15% is flagged</span></h4>
      <div className="tbl-scroll">
        <table className="tbl">
          <thead><tr><th>Vendor</th><th>Billed by</th><th>From API</th><th>Invoice</th><th>Drift</th></tr></thead>
          <tbody>
            {VENDORS.map((v) => {
              const drift = (v.invoice - v.api) / v.invoice
              const flag = Math.abs(drift) > 0.15
              return (
                <tr key={v.name}>
                  <td>{v.name}</td>
                  <td className="dim">{v.model}</td>
                  <td>{usd(v.api)}</td>
                  <td>{usd(v.invoice)}</td>
                  <td>{flag ? <span className="status status--bad">⚠ {(drift * 100).toFixed(0)}%</span> : <span className="dim">{(drift * 100).toFixed(1)}%</span>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="demo__hint">The flagged vendor changed its credit price mid-month. The API kept reporting credits; only the invoice showed the new rate.</p>
    </div>
  )
}
