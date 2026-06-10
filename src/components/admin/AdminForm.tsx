import { useState } from 'react'
import type { CollectionConfig, PortfolioItem } from '../../types/portfolio'

type AdminFormProps = {
  config: CollectionConfig
  item: PortfolioItem
  onSave: (item: PortfolioItem) => void
  onDelete: (item: PortfolioItem) => void
  canDelete: boolean
}

export function AdminForm({ config, item, onSave, onDelete, canDelete }: AdminFormProps) {
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
