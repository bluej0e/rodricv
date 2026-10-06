'use client'

import { useState } from 'react'

/* The morning verdict: a test's numbers read against the campaign's own rules.
   Arithmetic, not a model — the same numbers always give the same answer. */

interface Rules {
  minSends: number
  minDials: number
  positive: { kill: number; scale: number }
  connect: { kill: number; scale: number }
  maxBounce: number
  bounceAfter: number
  scaleMeetings: number
}

const RULES: Rules = {
  minSends: 300,
  minDials: 150,
  positive: { kill: 0.005, scale: 0.015 },
  connect: { kill: 0.04, scale: 0.1 },
  maxBounce: 0.04,
  bounceAfter: 100,
  scaleMeetings: 3,
}

type Verdict = 'scale' | 'keep' | 'kill' | 'wait'
const LABEL: Record<Verdict, string> = { scale: 'Scale it', keep: 'Keep testing', kill: 'Kill it', wait: 'Not enough data' }

/** null = the desk has no source for this count yet. Never treated as zero. */
interface Numbers { sent: number | null; bounced: number | null; positive: number | null; dials: number | null; connects: number | null; meetings: number | null }
type Channels = { email: boolean; call: boolean }

type LineState = 'crossed' | 'clear' | 'too-early' | 'unknown' | 'off'
interface Line { rule: string; state: LineState; seen: string }

const p = (x: number) => `${Number((x * 100).toFixed(2))}%`

function rate(sample: number | null, min: number, count: number | null, unit: string, test: (r: number) => boolean): { state: LineState; seen: string; r?: number } {
  if (sample === null || count === null) return { state: 'unknown', seen: 'not counted yet' }
  if (sample < min) return { state: 'too-early', seen: `${sample} of ${min} ${unit}` }
  const r = count / sample
  return { state: test(r) ? 'crossed' : 'clear', seen: `${p(r)} after ${sample} ${unit}`, r }
}

function judge(ch: Channels, n: Numbers) {
  const off = { state: 'off' as LineState, seen: 'channel not used' }
  const posKill = ch.email ? rate(n.sent, RULES.minSends, n.positive, 'sends', (r) => r < RULES.positive.kill) : off
  const conKill = ch.call ? rate(n.dials, RULES.minDials, n.connects, 'dials', (r) => r < RULES.connect.kill) : off
  const bounce = ch.email ? rate(n.sent, RULES.bounceAfter, n.bounced, 'sends', (r) => r > RULES.maxBounce) : off
  const posScale = ch.email ? rate(n.sent, RULES.minSends, n.positive, 'sends', (r) => r > RULES.positive.scale) : off
  const conScale = ch.call ? rate(n.dials, RULES.minDials, n.connects, 'dials', (r) => r > RULES.connect.scale) : off
  const meet = n.meetings === null ? { state: 'unknown' as LineState, seen: 'not counted yet' } : { state: (n.meetings >= RULES.scaleMeetings ? 'crossed' : 'clear') as LineState, seen: `${n.meetings} booked` }

  const lines: { kill: Line[]; scale: Line[] } = {
    kill: [
      { rule: `Bounce rate over ${p(RULES.maxBounce)} (after ${RULES.bounceAfter} sends)`, ...bounce },
      { rule: `Positive replies under ${p(RULES.positive.kill)} after ${RULES.minSends} sends`, ...posKill },
      { rule: `Connect rate under ${p(RULES.connect.kill)} after ${RULES.minDials} dials`, ...conKill },
    ],
    scale: [
      { rule: `${RULES.scaleMeetings}+ meetings from the test batch`, ...meet },
      { rule: `Positive replies over ${p(RULES.positive.scale)} after ${RULES.minSends} sends`, ...posScale },
      { rule: `Connect rate over ${p(RULES.connect.scale)} after ${RULES.minDials} dials`, ...conScale },
    ],
  }

  const x = (l: { state: LineState }) => l.state === 'crossed'
  const judged = (l: { state: LineState }) => l.state === 'crossed' || l.state === 'clear'

  // First match wins, in this order.
  if (x(bounce)) return { v: 'kill' as Verdict, why: `Bounce rate is ${bounce.seen}. A bounce kill beats everything else: it is burning the sending domains.`, lines, decided: [lines.kill[0].rule] }
  if (x(meet)) return { v: 'scale' as Verdict, why: `${n.meetings} meetings clear the bar of ${RULES.scaleMeetings} on their own, whatever the rates say.`, lines, decided: [lines.scale[0].rule] }
  if (x(posScale) || x(conScale)) {
    const parts = [x(posScale) && `email at ${posScale.seen}`, x(conScale) && `calls at ${conScale.seen}`].filter(Boolean)
    const stop = x(posScale) && x(conKill) ? ` Stop the calls: ${conKill.seen} is under their kill line.` : x(conScale) && x(posKill) ? ` Stop the email: ${posKill.seen} is under its kill line.` : ''
    return { v: 'scale' as Verdict, why: `Scale on ${parts.join(' and ')}.${stop}`, lines, decided: [x(posScale) && lines.scale[1].rule, x(conScale) && lines.scale[2].rule].filter(Boolean) as string[] }
  }
  const emailKills = x(posKill), callKills = x(conKill)
  if ((!ch.email || emailKills) && (!ch.call || callKills) && (emailKills || callKills)) {
    return { v: 'kill' as Verdict, why: `Every channel the campaign uses is under its kill line: ${[emailKills && `email ${posKill.seen}`, callKills && `calls ${conKill.seen}`].filter(Boolean).join(', ')}.`, lines, decided: [emailKills && lines.kill[1].rule, callKills && lines.kill[2].rule].filter(Boolean) as string[] }
  }
  const pending = [
    ch.email && posKill.state === 'too-early' && `email has ${posKill.seen}`,
    ch.email && posKill.state === 'unknown' && 'email is not counted yet',
    ch.call && conKill.state === 'too-early' && `calls have ${conKill.seen}`,
    ch.call && conKill.state === 'unknown' && 'calls are not counted yet',
    meet.state === 'unknown' && 'meetings are not counted yet',
  ].filter(Boolean) as string[]
  if (judged(posKill) || judged(conKill)) {
    const said = [judged(posKill) && `email at ${posKill.seen} sits ${emailKills ? 'under its kill line' : 'between its lines'}`, judged(conKill) && `calls at ${conKill.seen} sit ${callKills ? 'under their kill line' : 'between their lines'}`].filter(Boolean)
    return { v: 'keep' as Verdict, why: `${cap(said.join(', and '))}${pending.length ? `; ${pending.join(', ')}` : ''}.`, lines, decided: [] as string[] }
  }
  return { v: 'wait' as Verdict, why: `${cap(pending.join(', ') || 'nothing is counted yet')}.`, lines, decided: [] as string[] }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const PRESETS: { name: string; ch: Channels; n: Numbers }[] = [
  { name: 'Too early', ch: { email: true, call: true }, n: { sent: 180, bounced: 3, positive: 2, dials: 60, connects: 4, meetings: 0 } },
  { name: 'Strong email', ch: { email: true, call: false }, n: { sent: 420, bounced: 6, positive: 9, dials: null, connects: null, meetings: 1 } },
  { name: 'Burning domains', ch: { email: true, call: false }, n: { sent: 250, bounced: 17, positive: 4, dials: null, connects: null, meetings: 0 } },
  { name: 'Email works, calls don\'t', ch: { email: true, call: true }, n: { sent: 500, bounced: 8, positive: 11, dials: 200, connects: 5, meetings: 1 } },
  { name: 'Meetings, flat rates', ch: { email: true, call: true }, n: { sent: 340, bounced: 5, positive: 3, dials: 160, connects: 9, meetings: 4 } },
  { name: 'Dead test', ch: { email: true, call: true }, n: { sent: 600, bounced: 10, positive: 1, dials: 220, connects: 4, meetings: 0 } },
  { name: 'Meetings not tracked', ch: { email: true, call: false }, n: { sent: 360, bounced: 5, positive: 3, dials: null, connects: null, meetings: null } },
]

const FIELDS: { key: keyof Numbers; label: string; channel: keyof Channels | null }[] = [
  { key: 'sent', label: 'Emails sent', channel: 'email' },
  { key: 'bounced', label: 'Bounced', channel: 'email' },
  { key: 'positive', label: 'Positive replies', channel: 'email' },
  { key: 'dials', label: 'Dials', channel: 'call' },
  { key: 'connects', label: 'Connects', channel: 'call' },
  { key: 'meetings', label: 'Meetings', channel: null },
]

const STATE_LABEL: Record<LineState, string> = { crossed: 'crossed', clear: 'not crossed', 'too-early': 'below minimum', unknown: 'unknown', off: '—' }

export default function CampaignDemo() {
  const [preset, setPreset] = useState(0)
  const [ch, setCh] = useState<Channels>(PRESETS[0].ch)
  const [n, setN] = useState<Numbers>(PRESETS[0].n)
  const r = judge(ch, n)

  const load = (i: number) => { setPreset(i); setCh(PRESETS[i].ch); setN(PRESETS[i].n) }
  const setField = (k: keyof Numbers, v: string) => { setPreset(-1); setN((o) => ({ ...o, [k]: v === '' ? null : Math.max(0, Math.floor(Number(v))) })) }

  return (
    <div className="demo">
      <div className="chips" role="group" aria-label="Scenarios">
        {PRESETS.map((s, i) => (
          <button key={s.name} className={`chip ${preset === i ? 'is-on' : ''}`} aria-pressed={preset === i} onClick={() => load(i)}>{s.name}</button>
        ))}
      </div>

      <div className="verdict-grid">
        <div>
          <h4 className="demo__h">Test numbers <span className="demo__sub">empty = not counted</span></h4>
          <div className="demo__bar demo__bar--tight">
            {(['email', 'call'] as const).map((c) => (
              <label className="toggle" key={c}>
                <input type="checkbox" checked={ch[c]} onChange={(e) => { setPreset(-1); setCh((o) => ({ ...o, [c]: e.target.checked })) }} />
                {c === 'email' ? 'Email channel' : 'Call channel'}
              </label>
            ))}
          </div>
          <div className="fields">
            {FIELDS.map((f) => (
              <label key={f.key} className={`field ${f.channel && !ch[f.channel] ? 'is-off' : ''}`}>
                <span>{f.label}</span>
                <input type="number" min={0} inputMode="numeric" value={n[f.key] ?? ''} placeholder="—" disabled={Boolean(f.channel && !ch[f.channel])} onChange={(e) => setField(f.key, e.target.value)} />
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className={`verdict verdict--${r.v}`} aria-live="polite">
            <span className="verdict__label">{LABEL[r.v]}</span>
            <p className="verdict__why">{r.why}</p>
          </div>
          {(['kill', 'scale'] as const).map((k) => (
            <div key={k} className="lines-block">
              <h4 className="demo__h">{k === 'kill' ? 'Kill lines' : 'Scale lines'}</h4>
              <ul className={`lines lines--${k}`}>
                {r.lines[k].map((l) => (
                  <li key={l.rule} className={`line line--${l.state} ${r.decided.includes(l.rule) ? 'is-decider' : ''}`}>
                    <span className="line__rule">{l.rule}</span>
                    <span className="line__seen">{l.state === 'off' ? '' : l.seen}</span>
                    <span className="line__state">{STATE_LABEL[l.state]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="demo__hint">The verdict recommends. A person still makes the call to scale or kill, and the morning check logs every change.</p>
    </div>
  )
}
