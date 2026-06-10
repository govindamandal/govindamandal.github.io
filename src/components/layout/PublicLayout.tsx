import type { PortfolioItem } from '../../types/portfolio'

type PublicLayoutProps = {
  profile: PortfolioItem
  children: React.ReactNode
}

export function PublicLayout({ profile, children }: PublicLayoutProps) {
  return (
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="#/">
            <span className="brand-mark">GM</span>
            <span>{String(profile.name || 'Govinda Mandal')}</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="shell">Built and managed dynamically by Govinda Mandal.</div>
      </footer>
    </>
  )
}
