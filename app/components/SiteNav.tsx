import Link from 'next/link'

export default function SiteNav({ current }: { current: 'cv' | 'work' }) {
  return (
    <nav className="sitenav" aria-label="Site">
      <div className="wrap sitenav__inner">
        <Link href="/" className="sitenav__home">Rodrigo Viola</Link>
        <span className="sitenav__links">
          <Link href="/" aria-current={current === 'cv' ? 'page' : undefined}>cv</Link>
          <Link href="/work/" aria-current={current === 'work' ? 'page' : undefined}>work</Link>
        </span>
      </div>
    </nav>
  )
}
