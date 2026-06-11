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
  services: [
    {
      title: 'Full-Stack Web Development',
      description: 'Build responsive, API-driven web applications from polished frontend screens to reliable backend integrations.',
      highlights: ['Frontend implementation', 'Backend/API integration', 'Admin dashboards'],
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Portfolio and Business Websites',
      description: 'Create fast, maintainable websites with dynamic content management and deployment-ready architecture.',
      highlights: ['Dynamic CMS flow', 'Responsive UI', 'Performance-focused delivery'],
      technologies: ['React', 'Vite', 'Vercel']
    }
  ],
  experiences: [
    {
      position: 'Professional Experience',
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
      slug: 'dynamic-portfolio-platform',
      role: 'Creator',
      yourRole: 'Creator',
      description:
        'A custom portfolio and admin CMS where jobs, skills, projects, certifications, and profile content can be managed without code changes.',
      technologies: ['React', 'Vite', 'Vercel', 'MongoDB', 'Cloudflare R2'],
      techStack: ['React', 'Vite', 'Vercel', 'MongoDB', 'Cloudflare R2'],
      gallery: [],
      featured: true
    }
  ],
  skills: [
    { name: 'React', category: 'Frontend', proficiency: 80 },
    { name: 'Node.js', category: 'Backend', proficiency: 80 },
    { name: 'MongoDB', category: 'Database', proficiency: 70 },
    { name: 'REST API', category: 'Messaging & Streaming', proficiency: 80 },
    { name: 'Cloudflare R2', category: 'Cloud', proficiency: 60 },
    { name: 'Git', category: 'Observability & Tools', proficiency: 80 },
    { name: 'Codex', category: 'AI Tools', proficiency: 70 }
  ],
  certifications: [],
  courses: [],
  testimonials: []
}
