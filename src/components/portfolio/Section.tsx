import { motion } from 'framer-motion'
import { sectionReveal } from './motion'

type SectionProps = {
  id: string
  title: string
  copy: string
  children: React.ReactNode
}

export function Section({ id, title, copy, children }: SectionProps) {
  return (
    <motion.section
      className="shell section"
      id={id}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{copy}</p>
        </div>
      </div>
      {children}
    </motion.section>
  )
}
