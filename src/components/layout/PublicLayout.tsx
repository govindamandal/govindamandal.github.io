import { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { PortfolioItem } from '../../types/portfolio'

type PublicLayoutProps = {
  profile: PortfolioItem
  children: React.ReactNode
}

export function PublicLayout({ profile, children }: PublicLayoutProps) {
  const { scrollYProgress } = useScroll()
  const scrollScale = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.25 })
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme
    }

    return 'dark'
  })

  function toggleTheme() {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      localStorage.setItem('portfolio-theme', next)
      return next
    })
  }

  return (
    <div className="public-site" data-theme={theme}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollScale }} />
      <div className="parallax-stage" aria-hidden="true">
        <div className="dot-field" />
        <div className="aurora-mesh" />
        <div className="float-orb orb-a" />
        <div className="float-orb orb-b" />
        <div className="float-orb orb-c" />
        <div className="glass-ribbon ribbon-a" />
        <div className="glass-ribbon ribbon-b" />
        <div className="glass-ribbon ribbon-c" />
      </div>
      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="/">
            <span className="brand-mark">GM</span>
            <span className="brand-name">{String(profile.name || 'Govinda Mandal')}</span>
          </a>
          <div className="nav-actions">
            <nav className="nav-links" aria-label="Primary navigation">
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer">
        <div className="shell">Built and managed dynamically by {String(profile.name || 'Govinda Mandal')}.</div>
      </footer>
    </div>
  )
}
