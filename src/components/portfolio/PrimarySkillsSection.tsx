import { motion } from 'framer-motion'
import * as Tooltip from '@radix-ui/react-tooltip'
import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { InteractiveCard } from './InteractiveCard'
import { cardReveal, staggerGroup } from './motion'
import { Section } from './Section'

export function PrimarySkillsSection({ skills }: { skills: PortfolioItem[] }) {
  const primarySkills = skills.filter((skill) => skill.isPrimary === true && String(skill.status || 'active') === 'active')

  if (!primarySkills.length) {
    return null
  }

  return (
    <Section id="primary-skills" title="Primary Skills" copy="Core technologies I use most often for full stack, cloud-native, and AI-assisted product engineering.">
      <Tooltip.Provider delayDuration={120} skipDelayDuration={80}>
        <motion.div className="primary-skills-strip" variants={staggerGroup} initial="visible" animate="visible">
          {primarySkills.map((skill, index) => (
            <PrimarySkillTooltip skill={skill} key={skill._id || index} />
          ))}
        </motion.div>
      </Tooltip.Provider>
    </Section>
  )
}

function PrimarySkillTooltip({ skill }: { skill: PortfolioItem }) {
  const label = itemTitle(skill)

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <InteractiveCard
          as="button"
          aria-label={label}
          className="primary-skill-chip motion-card"
          type="button"
          variants={cardReveal}
          whileHover={{ y: -8, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
          whileFocus={{ y: -8, scale: 1.08, transition: { duration: 0.2, ease: 'easeOut' } }}
        >
          <SkillIcon skill={skill} />
        </InteractiveCard>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="skill-tooltip" side="top" align="center" sideOffset={10}>
          {label}
          <Tooltip.Arrow className="skill-tooltip-arrow" width={10} height={5} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
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
