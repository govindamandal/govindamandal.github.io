import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
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
  const groupedSkills = categoryOrder
    .map((category) => ({
      category,
      skills: skills.filter((skill) => String(skill.category || 'Other') === category)
    }))
    .filter((group) => group.skills.length)

  return (
    <Section id="skills" title="Skills" copy="Skills are grouped by practical engineering areas and show strength from 1 to 10.">
      <div className="skills-groups">
        {groupedSkills.map((group) => (
          <article className="card skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div className="skill-list">
              {group.skills.map((skill, index) => (
                <SkillMeter skill={skill} key={skill._id || index} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function SkillMeter({ skill }: { skill: PortfolioItem }) {
  const proficiency = Math.max(1, Math.min(10, Number(skill.proficiency || 5)))
  const percent = proficiency * 10

  return (
    <div className="skill-meter">
      <div className="skill-meter-head">
        <span className="skill-name">
          <SkillIcon skill={skill} />
          <strong>{itemTitle(skill)}</strong>
        </span>
        <span>{proficiency}/10</span>
      </div>
      <div className="skill-track" aria-label={`${itemTitle(skill)} proficiency ${percent}%`}>
        <span style={{ width: `${percent}%` }} />
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
