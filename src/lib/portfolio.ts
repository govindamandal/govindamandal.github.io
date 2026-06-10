import type { PortfolioItem } from '../types/portfolio'

export function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String)
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

export function itemTitle(item: PortfolioItem) {
  return String(item.title || item.name || item.company || item.email || 'Untitled')
}

export function normalizePayload(item: PortfolioItem) {
  const payload: PortfolioItem = { ...item }
  delete payload._id

  for (const key of ['technologies', 'techStack', 'gallery', 'highlights', 'responsibilities', 'skills']) {
    if (typeof payload[key] === 'string') {
      payload[key] = toArray(payload[key])
    }
  }

  for (const key of ['displayOrder', 'proficiency']) {
    if (payload[key] !== undefined && payload[key] !== '') {
      payload[key] = Number(payload[key])
    }
  }

  return payload
}
