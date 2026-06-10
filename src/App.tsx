import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  Medal,
  Settings,
  Sparkles,
  UserRound,
  Wrench
} from 'lucide-react'

type PortfolioItem = Record<string, unknown> & {
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

type SiteData = {
  profile?: PortfolioItem | null
  siteSettings?: PortfolioItem | null
  experiences: PortfolioItem[]
  projects: PortfolioItem[]
  skills: PortfolioItem[]
  certifications: PortfolioItem[]
  courses: PortfolioItem[]
  testimonials: PortfolioItem[]
}

type FieldConfig = {
  name: string
  label: string
  type?: 'text' | 'textarea' | 'url' | 'number' | 'checkbox'
  placeholder?: string
}

type CollectionConfig = {
  key: string
  label: string
  icon: React.ReactNode
  fields: FieldConfig[]
}

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-api.vercel.app'

const fallbackData: SiteData = {
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

const collectionConfigs: CollectionConfig[] = [
  {
    key: 'projects',
    label: 'Projects',
    icon: <FolderKanban size={18} />,
    fields: [
      { name: 'title', label: 'Project title' },
      { name: 'company', label: 'Company or client' },
      { name: 'role', label: 'Your role' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, Node.js, MongoDB' },
      { name: 'liveUrl', label: 'Live URL', type: 'url' },
      { name: 'imageUrl', label: 'Image URL', type: 'url' },
      { name: 'featured', label: 'Featured', type: 'checkbox' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'experiences',
    label: 'Experience',
    icon: <BriefcaseBusiness size={18} />,
    fields: [
      { name: 'title', label: 'Job title' },
      { name: 'company', label: 'Company' },
      { name: 'location', label: 'Location' },
      { name: 'startDate', label: 'Start date' },
      { name: 'endDate', label: 'End date' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'technologies', label: 'Technologies', placeholder: 'React, PHP, MySQL' },
      { name: 'companyUrl', label: 'Company URL', type: 'url' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'skills',
    label: 'Skills',
    icon: <Wrench size={18} />,
    fields: [
      { name: 'name', label: 'Skill name' },
      { name: 'category', label: 'Category' },
      { name: 'proficiency', label: 'Proficiency', type: 'number' },
      { name: 'displayOrder', label: 'Display order', type: 'number' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'certifications',
    label: 'Certifications',
    icon: <Medal size={18} />,
    fields: [
      { name: 'title', label: 'Certification title' },
      { name: 'issuer', label: 'Issuer' },
      { name: 'issuedAt', label: 'Issued at' },
      { name: 'credentialUrl', label: 'Credential URL', type: 'url' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'courses',
    label: 'Courses',
    icon: <GraduationCap size={18} />,
    fields: [
      { name: 'title', label: 'Course title' },
      { name: 'provider', label: 'Provider' },
      { name: 'completedAt', label: 'Completed at' },
      { name: 'courseUrl', label: 'Course URL', type: 'url' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'testimonials',
    label: 'Testimonials',
    icon: <Sparkles size={18} />,
    fields: [
      { name: 'name', label: 'Person name' },
      { name: 'role', label: 'Person role' },
      { name: 'company', label: 'Company' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <UserRound size={18} />,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'title', label: 'Professional title' },
      { name: 'summary', label: 'Summary', type: 'textarea' },
      { name: 'location', label: 'Location' },
      { name: 'email', label: 'Email' },
      { name: 'linkedInUrl', label: 'LinkedIn URL', type: 'url' },
      { name: 'githubUrl', label: 'GitHub URL', type: 'url' },
      { name: 'resumeUrl', label: 'Resume URL', type: 'url' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    key: 'siteSettings',
    label: 'Settings',
    icon: <Settings size={18} />,
    fields: [
      { name: 'key', label: 'Settings key', placeholder: 'default' },
      { name: 'headline', label: 'Hero headline', type: 'textarea' },
      { name: 'subheadline', label: 'Hero subheadline', type: 'textarea' },
      { name: 'availability', label: 'Availability text' },
      { name: 'isPublic', label: 'Published', type: 'checkbox' }
    ]
  }
]

function authHeaders() {
  const token = localStorage.getItem('portfolio_admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set('Content-Type', 'application/json')

  for (const [key, value] of Object.entries(authHeaders())) {
    headers.set(key, value)
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || 'Request failed')
  }

  return response.json()
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String)
  }
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

function itemTitle(item: PortfolioItem) {
  return String(item.title || item.name || item.company || item.email || 'Untitled')
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PortfolioApp />} />
      </Routes>
    </div>
  )
}

function PortfolioApp() {
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
    <>
      <header className="nav">
        <div className="shell nav-inner">
          <a className="brand" href="#/">
            <span className="brand-mark">GM</span>
            <span>{String(profile.name || 'Govinda Mandal')}</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a href="#/admin">Admin</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="shell hero">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow">
              <span className="status-dot" />
              {String(settings.availability || 'Available for meaningful web work')}
            </span>
            <h1>{String(settings.headline || profile.title || fallbackData.siteSettings?.headline)}</h1>
            <p>{String(settings.subheadline || profile.summary || fallbackData.siteSettings?.subheadline)}</p>
            <div className="hero-actions">
              <a className="button" href="#work">
                View work <ArrowUpRight size={18} />
              </a>
              <a className="button secondary" href="#contact">
                Contact me
              </a>
              {profile.resumeUrl ? (
                <a className="button ghost" href={String(profile.resumeUrl)} target="_blank" rel="noreferrer">
                  Resume
                </a>
              ) : null}
            </div>
          </motion.div>

          <motion.aside className="hero-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="panel-top">
              <strong>Portfolio CMS</strong>
              <span className="muted">{loading ? 'Syncing' : 'Live'}</span>
            </div>
            <div className="metric-grid">
              <div className="metric"><strong>{projects.length}+</strong><span>Projects and case studies</span></div>
              <div className="metric"><strong>{experiences.length}</strong><span>Experience entries</span></div>
              <div className="metric"><strong>{skills.length}</strong><span>Skills tracked</span></div>
              <div className="metric"><strong>100%</strong><span>Admin managed content</span></div>
            </div>
          </motion.aside>
        </section>

        <Section id="work" title="Selected Work" copy="Company, client, and personal work can all live here with clear role-based case-study framing.">
          <div className="grid two">
            {projects.map((project, index) => (
              <article className={`card work-card ${project.featured || index === 0 ? 'featured' : ''}`} key={project._id || index}>
                <p className="muted">{String(project.company || project.role || 'Project')}</p>
                <h3>{itemTitle(project)}</h3>
                <p>{String(project.description || 'Add details from the admin panel.')}</p>
                <div className="tag-row">
                  {toArray(project.technologies).slice(0, 6).map((technology) => (
                    <span className="tag" key={technology}>{technology}</span>
                  ))}
                </div>
                {project.liveUrl ? (
                  <p>
                    <a className="button ghost" href={String(project.liveUrl)} target="_blank" rel="noreferrer">
                      Visit project <ArrowUpRight size={16} />
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience" copy="Keep your current role, previous roles, and client engagements updated without redeploying the site.">
          <div className="timeline">
            {experiences.map((experience, index) => (
              <article className="card timeline-item" key={experience._id || index}>
                <div className="muted">{String(experience.startDate || '')} {experience.endDate ? `- ${experience.endDate}` : ''}</div>
                <div>
                  <h3>{itemTitle(experience)}</h3>
                  <p className="muted">{String(experience.company || experience.role || '')}</p>
                  <p>{String(experience.description || '')}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" copy="Group skills by frontend, backend, databases, tools, cloud, CMS, or anything that fits your profile.">
          <div className="grid three">
            {skills.map((skill, index) => (
              <article className="card skill-card" key={skill._id || index}>
                <strong>{itemTitle(skill)}</strong>
                <span className="muted">{String(skill.category || 'Skill')}</span>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Let us build something useful" copy="Messages can be stored in MongoDB through the API, so future inquiries stay available in your backend.">
          <ContactForm email={String(profile.email || '')} />
        </Section>
      </main>

      <footer className="footer">
        <div className="shell">Built and managed dynamically by Govinda Mandal.</div>
      </footer>
    </>
  )
}

function Section({ id, title, copy, children }: { id: string; title: string; copy: string; children: React.ReactNode }) {
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

function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      await apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
      setStatus('Message saved. I will get back to you soon.')
      event.currentTarget.reset()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not send message')
    }
  }

  return (
    <div className="card contact-band">
      <div>
        <h3>Contact</h3>
        <p className="muted">Prefer email? Reach me at {email || 'your configured email'}.</p>
      </div>
      <form className="form" onSubmit={submit}>
        <label className="field"><span>Name</span><input className="input" name="name" required /></label>
        <label className="field"><span>Email</span><input className="input" name="email" type="email" required /></label>
        <label className="field"><span>Message</span><textarea className="textarea" name="message" required /></label>
        <button className="button" type="submit"><Mail size={18} /> Send message</button>
        {status ? <p className="muted">{status}</p> : null}
      </form>
    </div>
  )
}

function AdminApp() {
  const navigate = useNavigate()
  const isAuthed = Boolean(localStorage.getItem('portfolio_admin_token'))

  function logout() {
    localStorage.removeItem('portfolio_admin_token')
    apiFetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    navigate('/admin/login')
  }

  if (!isAuthed) {
    return <LoginPage />
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a className="brand" href="#/"><span className="brand-mark">GM</span><span>Admin CMS</span></a>
        <nav className="admin-nav">
          <NavLink to="/admin"><LayoutDashboard size={18} /> Dashboard</NavLink>
          {collectionConfigs.map((config) => (
            <NavLink key={config.key} to={`/admin/${config.key}`}>{config.icon} {config.label}</NavLink>
          ))}
          <button type="button" onClick={logout}><LogOut size={18} /> Logout</button>
        </nav>
      </aside>
      <main className="admin-main">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          {collectionConfigs.map((config) => (
            <Route key={config.key} path={`/${config.key}`} element={<AdminCollection config={config} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

function LoginPage() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const formData = new FormData(event.currentTarget)
    try {
      const result = await apiFetch<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      })
      localStorage.setItem('portfolio_admin_token', result.token)
      navigate('/admin')
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed')
    }
  }

  return (
    <div className="login-page">
      <form className="card login-card form" onSubmit={submit}>
        <span className="eyebrow">Admin only</span>
        <h1>Sign in</h1>
        <p className="muted">Use the admin credentials you manually insert into MongoDB.</p>
        <label className="field"><span>Email</span><input className="input" name="email" type="email" autoComplete="email" required /></label>
        <label className="field"><span>Password</span><input className="input" name="password" type="password" autoComplete="current-password" required /></label>
        {error ? <p className="error">{error}</p> : null}
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div>
      <span className="eyebrow">Content control center</span>
      <h1>Manage your portfolio dynamically.</h1>
      <p className="section-copy">
        Add jobs, projects, skills, certifications, courses, testimonials, profile data, and site settings here. Public pages update from MongoDB through your Vercel API.
      </p>
      <div className="grid three" style={{ marginTop: 24 }}>
        {collectionConfigs.map((config) => (
          <NavLink className="card small-card" key={config.key} to={`/admin/${config.key}`}>
            {config.icon}<h3>{config.label}</h3><p className="muted">Create, edit, publish, and remove entries.</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function AdminCollection({ config }: { config: CollectionConfig }) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const [status, setStatus] = useState('')
  const isSingleton = config.key === 'profile' || config.key === 'siteSettings'

  const loadItems = useCallback(async () => {
    try {
      const data = await apiFetch<{ items: PortfolioItem[] }>(`/api/admin/${config.key}`)
      setItems(data.items)
      setSelected(data.items[0] || null)
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not load items')
    }
  }, [config.key])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadItems()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadItems])

  const emptyItem = useMemo(() => {
    const initial: PortfolioItem = { isPublic: true }
    if (config.key === 'siteSettings') initial.key = 'default'
    return initial
  }, [config.key])

  async function save(item: PortfolioItem) {
    const payload = normalizePayload(item)
    const path = item._id ? `/api/admin/${config.key}/${item._id}` : `/api/admin/${config.key}`
    const method = item._id ? 'PUT' : 'POST'

    try {
      await apiFetch(path, { method, body: JSON.stringify(payload) })
      setStatus('Saved')
      await loadItems()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not save')
    }
  }

  async function remove(item: PortfolioItem) {
    if (!item._id) return
    try {
      await apiFetch(`/api/admin/${config.key}/${item._id}`, { method: 'DELETE' })
      setStatus('Deleted')
      await loadItems()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not delete')
    }
  }

  return (
    <div>
      <span className="eyebrow">{config.label}</span>
      <h1>Manage {config.label.toLowerCase()}</h1>
      <div className="admin-grid">
        <section className="card admin-panel">
          <div className="section-head">
            <h2>Entries</h2>
            {!isSingleton ? <button className="button secondary" type="button" onClick={() => setSelected(emptyItem)}>New</button> : null}
          </div>
          <div className="item-list">
            {items.map((item) => (
              <button className={`item-button ${selected?._id === item._id ? 'active' : ''}`} key={item._id} type="button" onClick={() => setSelected(item)}>
                <strong>{itemTitle(item)}</strong>
                <div className="muted">{item.isPublic === false ? 'Hidden' : 'Published'}</div>
              </button>
            ))}
            {!items.length ? <p className="muted">No entries yet.</p> : null}
          </div>
        </section>

        <section className="card admin-panel">
          <AdminForm
            key={selected?._id || `new-${config.key}`}
            config={config}
            item={selected || emptyItem}
            onSave={save}
            onDelete={remove}
            canDelete={!isSingleton}
          />
          {status ? <p className="notice">{status}</p> : null}
        </section>
      </div>
    </div>
  )
}

function AdminForm({
  config,
  item,
  onSave,
  onDelete,
  canDelete
}: {
  config: CollectionConfig
  item: PortfolioItem
  onSave: (item: PortfolioItem) => void
  onDelete: (item: PortfolioItem) => void
  canDelete: boolean
}) {
  const [draft, setDraft] = useState<PortfolioItem>(item)

  function update(name: string, value: string | boolean) {
    setDraft((current) => ({ ...current, [name]: value }))
  }

  return (
    <form className="form" onSubmit={(event) => { event.preventDefault(); onSave(draft) }}>
      {config.fields.map((field) => (
        <label className="field" key={field.name}>
          <span>{field.label}</span>
          {field.type === 'textarea' ? (
            <textarea className="textarea" value={String(draft[field.name] || '')} placeholder={field.placeholder} onChange={(event) => update(field.name, event.target.value)} />
          ) : field.type === 'checkbox' ? (
            <select className="select" value={draft[field.name] === false ? 'false' : 'true'} onChange={(event) => update(field.name, event.target.value === 'true')}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : (
            <input className="input" type={field.type || 'text'} value={String(draft[field.name] || '')} placeholder={field.placeholder} onChange={(event) => update(field.name, event.target.value)} />
          )}
        </label>
      ))}
      <div className="admin-actions">
        <button className="button" type="submit">Save</button>
        {canDelete && draft._id ? <button className="button secondary" type="button" onClick={() => onDelete(draft)}>Delete</button> : null}
      </div>
    </form>
  )
}

function normalizePayload(item: PortfolioItem) {
  const payload: PortfolioItem = { ...item }
  delete payload._id

  if (typeof payload.technologies === 'string') {
    payload.technologies = toArray(payload.technologies)
  }

  for (const key of ['displayOrder', 'proficiency']) {
    if (payload[key] !== undefined && payload[key] !== '') {
      payload[key] = Number(payload[key])
    }
  }

  return payload
}

export default App
