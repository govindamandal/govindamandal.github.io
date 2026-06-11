import { itemTitle, toArray } from '../../lib/portfolio'
import type { PortfolioItem } from '../../types/portfolio'
import { RichText } from './RichText'
import { Section } from './Section'

export function ServicesSection({ services }: { services: PortfolioItem[] }) {
  return (
    <Section id="services" title="Services" copy="Practical engineering services I can provide for product teams, agencies, companies, and client projects.">
      <div className="grid three">
        {services.map((service, index) => (
          <article className="card service-card" key={service._id || index}>
            <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
            <h3>{itemTitle(service)}</h3>
            <RichText value={service.description} />
            <div className="tag-row">
              {toArray(service.technologies).slice(0, 5).map((technology) => (
                <span className="tag" key={technology}>{technology}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
