/** A dot-matrix sun: the page's one ornament. Pure SVG, decorative only. */
export default function Halftone() {
  const dots = []
  const size = 15
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - (size - 1) / 2, dy = y - (size - 1) / 2
      const d = Math.sqrt(dx * dx + dy * dy) / ((size - 1) / 2)
      if (d > 1.02) continue
      // Larger dots toward the lower left, like light falling across a sphere.
      const shade = Math.max(0.12, Math.min(1, 1 - ((x - y) / size + d) * 0.55))
      dots.push(<circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r={(shade * 4.2).toFixed(2)} />)
    }
  }
  return (
    <svg className="halftone" viewBox="0 0 150 150" aria-hidden="true">
      {dots}
    </svg>
  )
}
