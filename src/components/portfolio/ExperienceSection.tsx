import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { RichText } from './RichText'
import { Section } from './Section'

export function ExperienceSection({ experiences }: { experiences: PortfolioItem[] }) {
  return (
    <Section id="experience" title="Experience" copy="Keep your current role, previous roles, and client engagements updated without redeploying the site.">
      <div className="timeline">
        {experiences.map((experience, index) => (
          <article className="card timeline-item" key={experience._id || index}>
            <div className="muted">{String(experience.startDate || '')} {experience.endDate ? `- ${experience.endDate}` : ''}</div>
            <div>
                  <h3>{String(experience.position || itemTitle(experience))}</h3>
                  <p className="muted">{String(experience.company || experience.role || '')}</p>
                  <RichText value={experience.description} />
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
