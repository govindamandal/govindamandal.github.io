import { X } from 'lucide-react'
import { useState } from 'react'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { RichText } from './RichText'
import { Section } from './Section'

export function ProjectsSection({ projects }: { projects: PortfolioItem[] }) {
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null)

  return (
    <Section id="projects" title="Projects" copy="A selected view of company, client, and personal projects. Click any card to see the role, stack, links, and gallery.">
      <div className="grid two">
        {projects.map((project, index) => (
          <button className="card project-card" key={project._id || index} type="button" onClick={() => setActiveProject(project)}>
            <ProjectImage project={project} />
            <div className="project-card-body">
              <p className="muted">{String(project.company || project.client || project.yourRole || project.role || 'Project')}</p>
              <h3>{itemTitle(project)}</h3>
              <RichText value={project.description || 'Add details from the admin panel.'} />
              <div className="tag-row">
                {toArray(project.techStack || project.technologies).slice(0, 5).map((technology) => (
                  <span className="tag" key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeProject ? (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      ) : null}
    </Section>
  )
}

function ProjectImage({ project }: { project: PortfolioItem }) {
  const image = String(project.image || project.imageUrl || '')

  if (!image) {
    return <div className="project-image project-image-empty">{itemTitle(project).slice(0, 2).toUpperCase()}</div>
  }

  return <img className="project-image" src={image} alt={itemTitle(project)} />
}

function ProjectModal({ project, onClose }: { project: PortfolioItem; onClose: () => void }) {
  const gallery = [project.image || project.imageUrl, ...toArray(project.gallery)].filter(Boolean).map(String)

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="project-modal card">
        <div className="modal-head">
          <div>
            <p className="muted">{String(project.company || project.client || 'Project detail')}</p>
            <h2 id="project-modal-title">{itemTitle(project)}</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close project details" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {gallery.length ? (
          <div className="gallery">
            {gallery.map((image) => (
              <img src={image} alt={itemTitle(project)} key={image} />
            ))}
          </div>
        ) : (
          <div className="gallery-empty">Project gallery images will appear here after you upload them.</div>
        )}

        <div className="project-detail-grid">
          <div>
            <h3>Overview</h3>
            <RichText value={project.description} />
          </div>
          <div>
            <h3>My Role</h3>
            <p>{String(project.yourRole || project.role || 'Add your contribution from admin.')}</p>
          </div>
        </div>

        <div className="tag-row">
          {toArray(project.techStack || project.technologies).map((technology) => (
            <span className="tag" key={technology}>{technology}</span>
          ))}
        </div>

        <div className="admin-actions">
          {project.liveUrl ? <a className="button" href={String(project.liveUrl)} target="_blank" rel="noreferrer">Live project</a> : null}
          {project.githubUrl ? <a className="button secondary" href={String(project.githubUrl)} target="_blank" rel="noreferrer">Source code</a> : null}
        </div>
      </div>
    </div>
  )
}
