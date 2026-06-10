import { ArrowUpRight } from 'lucide-react'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { Section } from './Section'

export function WorkSection({ projects }: { projects: PortfolioItem[] }) {
  return (
    <Section id="work" title="Selected Work" copy="Company, client, and personal work can all live here with clear role-based case-study framing.">
      <div className="grid two">
        {projects.map((project, index) => (
          <article className={`card work-card ${project.featured || index === 0 ? 'featured' : ''}`} key={project._id || index}>
            <p className="muted">{String(project.company || project.role || 'Project')}</p>
            <h3>{itemTitle(project)}</h3>
            <p>{String(project.description || 'Add details from the admin panel.')}</p>
            <div className="tag-row">
              {toArray(project.technologies).slice(0, 6).map((technology) => (
                <span className="tag" key={technology}>{technology}</span>
              ))}
            </div>
            {project.liveUrl ? (
              <p>
                <a className="button ghost" href={String(project.liveUrl)} target="_blank" rel="noreferrer">
                  Visit project <ArrowUpRight size={16} />
                </a>
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  )
}
