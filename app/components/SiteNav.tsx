import Link from 'next/link'

export default function SiteNav({ current }: { current: 'cv' | 'work' }) {
  return (
    <nav className="nav" aria-label="Site">
      <div className="wrap wrap--wide nav__inner">
        <Link href="/" className="nav__home"><span className="nav__mark" aria-hidden="true" />Rodrigo Viola</Link>
        <span className="nav__links">
          <Link href="/" aria-current={current === 'cv' ? 'page' : undefined}>CV</Link>
          <Link href="/work/" aria-current={current === 'work' ? 'page' : undefined}>Work</Link>
        </span>
      </div>
    </nav>
  )
}
