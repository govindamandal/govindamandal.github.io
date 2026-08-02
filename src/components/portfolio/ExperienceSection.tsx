import { motion } from 'framer-motion'
import { ExternalLink, MapPin } from 'lucide-react'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { InteractiveCard } from './InteractiveCard'
import { cardReveal, staggerGroup } from './motion'
import { RichText } from './RichText'
import { Section } from './Section'

export function ExperienceSection({ experiences }: { experiences: PortfolioItem[] }) {
  const sortedExperiences = [...experiences].sort((first, second) => compareStartDate(second.startDate, first.startDate))

  return (
    <Section id="experience" title="Experience" copy="Keep your current role, previous roles, and client engagements updated without redeploying the site.">
      <motion.div className="timeline" variants={staggerGroup} initial="visible" animate="visible">
        {sortedExperiences.map((experience, index) => (
          <InteractiveCard as="article" className="card timeline-item motion-card" key={experience._id || index} variants={cardReveal}>
            <div className="experience-date">
              <span>{formatMonth(String(experience.startDate || ''))}</span>
              <span>{experience.currentlyWorking ? 'Present' : formatMonth(String(experience.endDate || ''))}</span>
            </div>
            <div className="experience-content">
              <div className="experience-company-row">
                <CompanyLogo experience={experience} />
                <div>
                  <h3>{String(experience.position || itemTitle(experience))}</h3>
                  <CompanyLink experience={experience} />
                </div>
              </div>
              {experience.location ? (
                <p className="experience-location muted"><MapPin size={16} /> {String(experience.location)}</p>
              ) : null}
              <RichText value={experience.description} />
              {toArray(experience.responsibilities).length ? (
                <ul className="experience-list">
                  {toArray(experience.responsibilities).slice(0, 4).map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              ) : null}
              {toArray(experience.technologies).length ? (
                <div className="tag-row">
                  {toArray(experience.technologies).slice(0, 8).map((technology) => (
                    <span className="tag" key={technology}>{technology}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </InteractiveCard>
        ))}
      </motion.div>
    </Section>
  )
}

function CompanyLogo({ experience }: { experience: PortfolioItem }) {
  const logo = String(experience.logo || '')
  const company = String(experience.company || itemTitle(experience))

  if (logo) {
    return <img className="company-logo" src={logo} alt={`${company} logo`} />
  }

  return <span className="company-logo company-logo-fallback">{company.slice(0, 2).toUpperCase()}</span>
}

function CompanyLink({ experience }: { experience: PortfolioItem }) {
  const company = String(experience.company || experience.role || '')
  const companyUrl = String(experience.companyUrl || '')

  if (companyUrl) {
    return (
      <a className="experience-company-link muted" href={companyUrl} target="_blank" rel="noreferrer">
        {company || companyUrl} <ExternalLink size={15} />
      </a>
    )
  }

  return <p className="muted">{company}</p>
}

function compareStartDate(first: unknown, second: unknown) {
  return monthTime(first) - monthTime(second)
}

function monthTime(value: unknown) {
  const text = String(value || '')
  const parsed = Date.parse(`${text}-01`)
  return Number.isNaN(parsed) ? 0 : parsed
}

function formatMonth(value: string) {
  if (!value) {
    return ''
  }

  const parsed = new Date(`${value}-01T00:00:00`)
  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return parsed.toLocaleDateString('en', { month: 'short', year: 'numeric' })
}
