import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { PortfolioItem } from '../../types/portfolio'

type HeroSectionProps = {
  profile: PortfolioItem
  settings: PortfolioItem
  projectCount: number
  experienceCount: number
  skillCount: number
  loading: boolean
}

export function HeroSection({
  profile,
  settings,
  projectCount,
  experienceCount,
  skillCount,
  loading
}: HeroSectionProps) {
  return (
    <section className="shell hero">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">
          <span className="status-dot" />
          {String(settings.availability || 'Available for meaningful web work')}
        </span>
        <h1>{String(settings.headline || profile.title || 'Full-stack developer')}</h1>
        <p>{String(settings.subheadline || profile.summary || '')}</p>
        <div className="hero-actions">
          <a className="button" href="#work">
            View work <ArrowUpRight size={18} />
          </a>
          <a className="button secondary" href="#contact">
            Contact me
          </a>
          {profile.resumeUrl ? (
            <a className="button ghost" href={String(profile.resumeUrl)} target="_blank" rel="noreferrer">
              Resume
            </a>
          ) : null}
        </div>
      </motion.div>

      <motion.aside className="hero-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="panel-top">
          <strong>Portfolio CMS</strong>
          <span className="muted">{loading ? 'Syncing' : 'Live'}</span>
        </div>
        <div className="metric-grid">
          <div className="metric"><strong>{projectCount}+</strong><span>Projects and case studies</span></div>
          <div className="metric"><strong>{experienceCount}</strong><span>Experience entries</span></div>
          <div className="metric"><strong>{skillCount}</strong><span>Skills tracked</span></div>
          <div className="metric"><strong>100%</strong><span>Admin managed content</span></div>
        </div>
      </motion.aside>
    </section>
  )
}
