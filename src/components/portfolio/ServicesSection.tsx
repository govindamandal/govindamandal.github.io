import { motion } from 'framer-motion'
import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { cardReveal, staggerGroup } from './motion'
import { RichText } from './RichText'
import { Section } from './Section'

export function ServicesSection({ services }: { services: PortfolioItem[] }) {
  return (
    <Section id="services" title="Services" copy="Practical engineering services I can provide for product teams, agencies, companies, and client projects.">
      <motion.div className="grid three" variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        {services.map((service, index) => (
          <motion.article className="card service-card motion-card" key={service._id || index} variants={cardReveal}>
            <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{itemTitle(service)}</h3>
            <RichText value={service.description} />
            <div className="tag-row">
              {toArray(service.technologies).slice(0, 5).map((technology) => (
                <span className="tag" key={technology}>{technology}</span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}
