import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { cardReveal, staggerGroup } from './motion'
import { RichText } from './RichText'
import { Section } from './Section'

export function ProjectsSection({ projects }: { projects: PortfolioItem[] }) {
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null)

  return (
    <Section id="projects" title="Projects" copy="A selected view of company, client, and personal projects. Click any card to see the role, stack, links, and gallery.">
      <motion.div className="grid two" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }}>
        {projects.map((project, index) => (
          <motion.button
            className="card project-card motion-card"
            key={project._id || index}
            type="button"
            variants={cardReveal}
            whileHover={{ y: -10, scale: 1.045, transition: { duration: 0.24, ease: 'easeOut' } }}
            onClick={() => setActiveProject(project)}
          >
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
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        ) : null}
      </AnimatePresence>
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
    <motion.div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="project-modal card" initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.97 }} transition={{ duration: 0.28, ease: 'easeOut' }}>
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
      </motion.div>
    </motion.div>
  )
}
