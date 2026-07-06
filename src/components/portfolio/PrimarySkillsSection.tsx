import { motion } from 'framer-motion'
import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { cardReveal, staggerGroup } from './motion'
import { Section } from './Section'

export function PrimarySkillsSection({ skills }: { skills: PortfolioItem[] }) {
  const primarySkills = skills.filter((skill) => skill.isPrimary === true && String(skill.status || 'active') === 'active')

  if (!primarySkills.length) {
    return null
  }

  return (
    <Section id="primary-skills" title="Primary Skills" copy="Core technologies I use most often for full stack, cloud-native, and AI-assisted product engineering.">
      <motion.div className="primary-skills-strip" variants={staggerGroup} initial="visible" animate="visible">
        {primarySkills.map((skill, index) => (
          <motion.div
            className="primary-skill-chip motion-card"
            key={skill._id || index}
            title={itemTitle(skill)}
            variants={cardReveal}
            whileHover={{ y: -8, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
          >
            <SkillIcon skill={skill} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function SkillIcon({ skill }: { skill: PortfolioItem }) {
  const icon = String(skill.icon || '')
  const label = itemTitle(skill)

  if (icon.startsWith('http')) {
    return <img className="primary-skill-icon" src={icon} alt={`${label} icon`} />
  }

  return <span className="primary-skill-icon primary-skill-icon-fallback">{label.slice(0, 2).toUpperCase()}</span>
}
