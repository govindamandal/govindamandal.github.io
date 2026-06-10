import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { Section } from './Section'

export function SkillsSection({ skills }: { skills: PortfolioItem[] }) {
  return (
    <Section id="skills" title="Skills" copy="Group skills by frontend, backend, databases, tools, cloud, CMS, or anything that fits your profile.">
      <div className="grid three">
        {skills.map((skill, index) => (
          <article className="card skill-card" key={skill._id || index}>
            <strong>{itemTitle(skill)}</strong>
            <span className="muted">{String(skill.category || 'Skill')}</span>
          </article>
        ))}
      </div>
    </Section>
  )
}
