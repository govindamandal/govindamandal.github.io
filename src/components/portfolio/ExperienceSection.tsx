import { motion } from 'framer-motion'
import { itemTitle } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { cardReveal, staggerGroup } from './motion'
import { RichText } from './RichText'
import { Section } from './Section'

export function ExperienceSection({ experiences }: { experiences: PortfolioItem[] }) {
  return (
    <Section id="experience" title="Experience" copy="Keep your current role, previous roles, and client engagements updated without redeploying the site.">
      <motion.div className="timeline" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.16 }}>
        {experiences.map((experience, index) => (
          <motion.article className="card timeline-item motion-card" key={experience._id || index} variants={cardReveal}>
            <div className="muted">{String(experience.startDate || '')} {experience.endDate ? `- ${experience.endDate}` : ''}</div>
            <div>
                  <h3>{String(experience.position || itemTitle(experience))}</h3>
                  <p className="muted">{String(experience.company || experience.role || '')}</p>
                  <RichText value={experience.description} />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
