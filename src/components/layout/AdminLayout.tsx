import { LayoutDashboard, LogOut } from 'lucide-react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { collectionConfigs } from '../../config/adminCollections'
import { apiFetch } from '../../lib/api'
import { AdminCollectionPage } from '../../pages/AdminCollectionPage'
import { AdminDashboardPage } from '../../pages/AdminDashboardPage'
import { LoginPage } from '../../pages/LoginPage'

export function AdminLayout() {
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
          <Route path="/" element={<AdminDashboardPage />} />
          {collectionConfigs.map((config) => (
            <Route key={config.key} path={`/${config.key}`} element={<AdminCollectionPage config={config} />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
