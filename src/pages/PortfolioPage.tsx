import { useEffect, useState } from 'react'
import { PublicLayout } from '../components/layout/PublicLayout'
import { ContactSection } from '../components/portfolio/ContactSection'
import { ExperienceSection } from '../components/portfolio/ExperienceSection'
import { HeroSection } from '../components/portfolio/HeroSection'
import { SkillsSection } from '../components/portfolio/SkillsSection'
import { WorkSection } from '../components/portfolio/WorkSection'
import { fallbackData } from '../data/fallbackData'
import { apiFetch } from '../lib/api'
import type { SiteData } from '../types/portfolio'

export function PortfolioPage() {
  const [site, setSite] = useState<SiteData>(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch<SiteData>('/api/public/site')
      .then((data) => setSite({ ...fallbackData, ...data }))
      .catch(() => setSite(fallbackData))
      .finally(() => setLoading(false))
  }, [])

  const profile = site.profile || fallbackData.profile!
  const settings = site.siteSettings || fallbackData.siteSettings!
  const projects = site.projects.length ? site.projects : fallbackData.projects
  const skills = site.skills.length ? site.skills : fallbackData.skills
  const experiences = site.experiences.length ? site.experiences : fallbackData.experiences

  return (
    <PublicLayout profile={profile}>
      <HeroSection
        profile={profile}
        settings={settings}
        projectCount={projects.length}
        experienceCount={experiences.length}
        skillCount={skills.length}
        loading={loading}
      />
      <WorkSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection skills={skills} />
      <ContactSection email={String(profile.email || '')} />
    </PublicLayout>
  )
}
