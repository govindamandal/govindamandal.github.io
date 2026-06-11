import type { ReactNode } from 'react'

export type PortfolioItem = Record<string, unknown> & {
  _id?: string
  title?: string
  name?: string
  company?: string
  role?: string
  description?: string
  summary?: string
  category?: string
  liveUrl?: string
  technologies?: string[] | string
  isPublic?: boolean
  featured?: boolean
}

export type SiteData = {
  profile?: PortfolioItem | null
  siteSettings?: PortfolioItem | null
  services: PortfolioItem[]
  experiences: PortfolioItem[]
  projects: PortfolioItem[]
  skills: PortfolioItem[]
  certifications: PortfolioItem[]
  courses: PortfolioItem[]
  testimonials: PortfolioItem[]
}

export type FieldConfig = {
  name: string
  label: string
  type?: 'text' | 'textarea' | 'url' | 'number' | 'checkbox' | 'file'
  placeholder?: string
  accept?: string
  multiple?: boolean
}

export type CollectionConfig = {
  key: string
  label: string
  icon: ReactNode
  fields: FieldConfig[]
}
