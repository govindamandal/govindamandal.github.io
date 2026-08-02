import { motion } from 'framer-motion'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { InteractiveCard } from './InteractiveCard'
import { cardReveal, staggerGroup } from './motion'
import { RichText } from './RichText'
import { Section } from './Section'

export function ServicesSection({ services }: { services: PortfolioItem[] }) {
  return (
    <Section id="services" title="Services" copy="Practical engineering services I can provide for product teams, agencies, companies, and client projects.">
      <motion.div className="grid three" variants={staggerGroup} initial="visible" animate="visible">
        {services.map((service, index) => (
          <InteractiveCard
            as="article"
            className="card service-card motion-card"
            key={service._id || index}
            variants={cardReveal}
            whileHover={{ y: -12, scale: 1.05, rotateX: 1.5, rotateY: -1.5, transition: { duration: 0.24, ease: 'easeOut' } }}
          >
            <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{itemTitle(service)}</h3>
            <RichText value={service.description} />
            <div className="tag-row">
              {toArray(service.technologies).slice(0, 5).map((technology) => (
                <span className="tag" key={technology}>{technology}</span>
              ))}
            </div>
          </InteractiveCard>
        ))}
      </motion.div>
    </Section>
  )
}
