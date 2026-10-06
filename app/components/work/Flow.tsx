import type { FlowLane } from '../../../lib/work'

/** An architecture diagram as lanes left to right; stacks top to bottom on a phone. */
export default function Flow({ lanes, label }: { lanes: FlowLane[]; label: string }) {
  return (
    <figure className="flow" aria-label={label}>
      {lanes.map((lane, i) => (
        <div className="flow__step" key={lane.label}>
          {i > 0 && <span className="flow__arrow" aria-hidden="true" />}
          <div className="flow__lane">
            <p className="flow__label">{lane.label}</p>
            <ul className="flow__nodes">
              {lane.nodes.map((n) => (
                <li className="flow__node" key={n.name}>
                  <span className="flow__name">{n.name}</span>
                  {n.note && <span className="flow__note">{n.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </figure>
  )
}
