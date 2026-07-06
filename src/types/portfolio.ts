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
  type?: 'text' | 'textarea' | 'editor' | 'url' | 'number' | 'range' | 'checkbox' | 'file' | 'month' | 'date' | 'radio'
  placeholder?: string
  accept?: string
  multiple?: boolean
  options?: Array<{ label: string; value: string | boolean }>
  min?: number
  max?: number
  disabledWhen?: {
    field: string
    value: string | boolean | number
  }
}

export type CollectionConfig = {
  key: string
  label: string
  icon: ReactNode
  fields: FieldConfig[]
}
