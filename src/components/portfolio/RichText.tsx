export function RichText({ value }: { value: unknown }) {
  const html = String(value || '')

  if (!html) {
    return null
  }

  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
}
