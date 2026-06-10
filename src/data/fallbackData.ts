import type { SiteData } from '../types/portfolio'

export const fallbackData: SiteData = {
  profile: {
    name: 'Govinda Mandal',
    title: 'Full-Stack Developer',
    summary:
      'I build clean, scalable web applications for companies and client teams, with a focus on practical engineering, polished interfaces, and maintainable systems.',
    location: 'India',
    email: 'hello@example.com',
    linkedInUrl: 'https://www.linkedin.com/',
    resumeUrl: ''
  },
  siteSettings: {
    key: 'default',
    headline: 'Full-stack developer building dynamic products for real businesses.',
    subheadline:
      'A dynamic portfolio powered by MongoDB, Vercel APIs, Cloudflare R2, and a custom admin panel.',
    availability: 'Available for meaningful web work'
  },
  experiences: [
    {
      title: 'Professional Experience',
      company: 'Client and company projects',
      role: 'Full-Stack Developer',
      startDate: '2020',
      description:
        'Add your real jobs from the admin panel. Each role can include company, dates, responsibilities, technologies, and public visibility.'
    }
  ],
  projects: [
    {
      title: 'Dynamic Portfolio Platform',
      role: 'Creator',
      description:
        'A custom portfolio and admin CMS where jobs, skills, projects, certifications, and profile content can be managed without code changes.',
      technologies: ['React', 'Vite', 'Vercel', 'MongoDB', 'Cloudflare R2'],
      featured: true
    }
  ],
  skills: [
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Cloudflare R2', category: 'Storage' }
  ],
  certifications: [],
  courses: [],
  testimonials: []
}
