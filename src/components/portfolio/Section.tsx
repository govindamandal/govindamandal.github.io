type SectionProps = {
  id: string
  title: string
  copy: string
  children: React.ReactNode
}

export function Section({ id, title, copy, children }: SectionProps) {
  return (
    <section className="shell section" id={id}>
      <div className="section-head">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-copy">{copy}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
