import { motion } from 'framer-motion'
import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { InteractiveCard } from './InteractiveCard'
import { cardReveal, staggerGroup } from './motion'
import { Section } from './Section'

const categoryOrder = [
  'Backend',
  'Frontend',
  'Database',
  'Messaging & Streaming',
  'Cloud',
  'Observability & Tools',
  'AI Tools',
  'Other'
]

export function SkillsSection({ skills }: { skills: PortfolioItem[] }) {
  const activeSkills = skills.filter((skill) => String(skill.status || 'active') === 'active')
  const groupedSkills = categoryOrder
    .map((category) => ({
      category,
      skills: activeSkills.filter((skill) => String(skill.category || 'Other') === category)
    }))
    .filter((group) => group.skills.length)

  return (
    <Section id="skills" title="Skills" copy="Skills are grouped by practical engineering areas and show strength from 1 to 10.">
      <motion.div className="skills-groups" variants={staggerGroup} initial="visible" animate="visible">
        {groupedSkills.map((group) => (
          <InteractiveCard as="article" className="card skill-group motion-card" key={group.category} variants={cardReveal}>
            <h3>{group.category}</h3>
            <div className="skill-list">
              {group.skills.map((skill, index) => (
                <SkillMeter skill={skill} key={skill._id || index} />
              ))}
            </div>
          </InteractiveCard>
        ))}
      </motion.div>
    </Section>
  )
}

function SkillMeter({ skill }: { skill: PortfolioItem }) {
  const proficiency = Math.max(0, Math.min(100, Number(skill.proficiency || 0)))

  return (
    <div className="skill-meter">
      <div className="skill-meter-head">
        <span className="skill-name">
          <SkillIcon skill={skill} />
          <strong>{itemTitle(skill)}</strong>
        </span>
        <span>{proficiency}%</span>
      </div>
      <div className="skill-track" aria-label={`${itemTitle(skill)} proficiency ${proficiency}%`}>
        <motion.span initial={{ width: 0 }} whileInView={{ width: `${proficiency}%` }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

function SkillIcon({ skill }: { skill: PortfolioItem }) {
  const icon = String(skill.icon || '')
  const label = itemTitle(skill)

  if (icon.startsWith('http')) {
    return <img className="skill-icon" src={icon} alt={`${label} icon`} />
  }

  return <span className="skill-icon skill-icon-fallback">{label.slice(0, 2).toUpperCase()}</span>
}
