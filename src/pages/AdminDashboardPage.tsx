import { NavLink } from 'react-router-dom'
import { collectionConfigs } from '../config/adminCollections'

export function AdminDashboardPage() {
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
