import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminForm } from '../components/admin/AdminForm'
import { apiFetch } from '../lib/api'
import { itemTitle, normalizePayload } from '../lib/portfolio'
import type { CollectionConfig, PortfolioItem } from '../types/portfolio'

export function AdminCollectionPage({ config }: { config: CollectionConfig }) {
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
