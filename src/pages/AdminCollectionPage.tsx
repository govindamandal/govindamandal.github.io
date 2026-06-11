import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminForm } from '../components/admin/AdminForm'
import { apiFetch } from '../lib/api'
import { itemTitle, normalizePayload } from '../lib/portfolio'
import type { CollectionConfig, PortfolioItem } from '../types/portfolio'

export function AdminCollectionPage({ config }: { config: CollectionConfig }) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [selected, setSelected] = useState<PortfolioItem | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const isSingleton = config.key === 'profile' || config.key === 'siteSettings'

  const loadItems = useCallback(async () => {
    try {
      const data = await apiFetch<{ items: PortfolioItem[] }>(`/api/admin/${config.key}`)
      setItems(data.items)
      setSelected(data.items[0] || null)
    } catch (error) {
      setToast({ type: 'error', message: error instanceof Error ? error.message : 'Could not load items' })
    }
  }, [config.key])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadItems()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadItems])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timer = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const emptyItem = useMemo(() => {
    const initial: PortfolioItem = { isPublic: true }
    if (config.key === 'siteSettings') initial.key = 'default'
    return initial
  }, [config.key])

  async function save(item: PortfolioItem) {
    const payload = normalizePayload(item)
    const path = item._id ? `/api/admin/${config.key}/${item._id}` : `/api/admin/${config.key}`
    const method = item._id ? 'PUT' : 'POST'

    setIsSaving(true)
    setToast(null)

    try {
      await apiFetch(path, { method, body: JSON.stringify(payload) })
      await loadItems()
      setToast({ type: 'success', message: `${singularLabel(config.label)} is saved successfully!` })
    } catch (error) {
      setToast({ type: 'error', message: error instanceof Error ? error.message : `Could not save ${singularLabel(config.label).toLowerCase()}` })
    } finally {
      setIsSaving(false)
    }
  }

  async function remove(item: PortfolioItem) {
    if (!item._id) return
    try {
      await apiFetch(`/api/admin/${config.key}/${item._id}`, { method: 'DELETE' })
      await loadItems()
      setToast({ type: 'success', message: `${singularLabel(config.label)} is deleted successfully!` })
    } catch (error) {
      setToast({ type: 'error', message: error instanceof Error ? error.message : `Could not delete ${singularLabel(config.label).toLowerCase()}` })
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
            isSaving={isSaving}
          />
        </section>
      </div>
      {toast ? (
        <div className="toast-stack" aria-live="polite" aria-atomic="true">
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        </div>
      ) : null}
    </div>
  )
}

function singularLabel(label: string) {
  const labels: Record<string, string> = {
    Certifications: 'Certification',
    Courses: 'Course',
    Projects: 'Project',
    Services: 'Service',
    Skills: 'Skill',
    Testimonials: 'Testimonial',
    'Contact Messages': 'Contact Message',
    'Site Settings': 'Site Settings'
  }

  return labels[label] || label
}
