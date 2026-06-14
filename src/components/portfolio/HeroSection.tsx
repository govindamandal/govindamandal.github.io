import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, MapPin } from 'lucide-react'
import type { PortfolioItem } from '../../types/portfolio'
import { RichText } from './RichText'

const DEFAULT_ROLES = [
  'Full Stack Developer',
  'AI Full Stack Engineer',
  'AI Software Engineer',
  'Senior Full Stack Developer',
  'Cloud-Native Backend Engineer'
]

type HeroSectionProps = {
  profile: PortfolioItem
  settings: PortfolioItem
  serviceCount: number
  projectCount: number
  experienceCount: number
  skillCount: number
  loading: boolean
}

export function HeroSection({
  profile,
  settings,
  serviceCount,
  projectCount,
  experienceCount,
  skillCount,
  loading
}: HeroSectionProps) {
  const name = String(profile.name || 'Govinda Mandal')
  const title = String(profile.title || 'Full-stack developer')
  const summary = settings.subheadline || profile.summary || ''
  const headline = String(settings.headline || DEFAULT_ROLES.join(' | '))
  const roles = useMemo(() => parseRoles(headline), [headline])
  const [roleIndex, setRoleIndex] = useState(0)
  const avatarUrl = String(profile.avatarUrl || '')
  const location = String(profile.location || '')
  const linkedInUrl = String(profile.linkedInUrl || '')
  const githubUrl = String(profile.githubUrl || '')
  const activeRole = roles[roleIndex] || title

  useEffect(() => {
    setRoleIndex(0)
  }, [roles])

  useEffect(() => {
    if (roles.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [roles])

  return (
    <section className="shell hero">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <span className="eyebrow">
          <span className="status-dot" />
          {String(settings.availability || 'Available for meaningful web work')}
        </span>
        <h1 className="hero-heading">
          <span className="hero-heading-prefix">Building scalable products as a</span>
          <span className="role-rotator" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeRole}
                className="role-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {activeRole}
              </motion.span>
            </AnimatePresence>
            <span key={`${activeRole}-line`} className="role-underline" aria-hidden="true" />
          </span>
        </h1>
        <RichText value={summary} />
        <div className="profile-meta" aria-label="Profile links">
          {location ? (
            <span><MapPin size={18} /> {location}</span>
          ) : null}
          {linkedInUrl ? (
            <a href={linkedInUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} /> LinkedIn</a>
          ) : null}
          {githubUrl ? (
            <a href={githubUrl} target="_blank" rel="noreferrer"><ExternalLink size={18} /> GitHub</a>
          ) : null}
        </div>
        <div className="hero-actions">
          <a className="button" href="#services">
            View services <ArrowUpRight size={18} />
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
        <div className="profile-card">
          {avatarUrl ? (
            <img className="profile-avatar" src={avatarUrl} alt={name} />
          ) : (
            <div className="profile-avatar profile-avatar-fallback" aria-hidden="true">
              {name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <strong>{name}</strong>
            <span>{title}</span>
          </div>
        </div>
        <div className="panel-top">
          <strong>Portfolio CMS</strong>
          <span className="muted">{loading ? 'Syncing' : 'Live'}</span>
        </div>
        <div className="metric-grid">
          <div className="metric"><strong>{serviceCount}</strong><span>Services offered</span></div>
          <div className="metric"><strong>{projectCount}+</strong><span>Projects and case studies</span></div>
          <div className="metric"><strong>{experienceCount}</strong><span>Experience entries</span></div>
          <div className="metric"><strong>{skillCount}</strong><span>Skills tracked</span></div>
          <div className="metric"><strong>100%</strong><span>Admin managed content</span></div>
        </div>
      </motion.aside>
    </section>
  )
}

function parseRoles(value: string) {
  const roles = value
    .split('|')
    .map((role) => role.trim())
    .filter(Boolean)

  if (roles.length > 1) {
    return roles
  }

  if (!value || value.toLowerCase().includes('building scalable cloud-native products')) {
    return DEFAULT_ROLES
  }

  return roles.length ? roles : DEFAULT_ROLES
}
